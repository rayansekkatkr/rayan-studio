'use strict';

/**
 * Orchestrateur hebdomadaire : découverte -> ingestion -> audit ->
 * qualification -> (dry-run: brouillons | réel: garde-fous + réservation
 * atomique + envoi). Rapport agrégé sans aucune PII.
 *
 * Fail closed partout : preuve faible, pays non activé, contact non
 * conforme, suppression, conflit d'identité ou sortie LLM invalide
 * = aucun envoi.
 */

const crypto = require('node:crypto');
const { query, withTransaction, closePool } = require('./db');
const { runMigrations } = require('./migrate');
const { searchEtablissements } = require('./providers/sirene');
const { findOfficialWebsite } = require('./providers/brave');
const { ingestCandidate } = require('./ingest');
const { auditWebsite } = require('./crawl');
const { qualifyProspect, renderEmail } = require('./qualify');
const { hmac } = require('./normalize');
const {
  checkSendGuards, clampMaxSends, isSuppressed, reserveOutreach, saveDryRunDraft, sendReserved,
} = require('./send');
const { LIMITS, targetsForWeek } = require('./config');

/** Choix de campagne fondé uniquement sur des signaux observés. Pure. */
function chooseCampaign(signals) {
  if (!signals) return null;
  if (signals.manualProcessHint) return 'application';
  const oldSite =
    signals.https === false ||
    signals.hasViewportMeta === false ||
    (signals.oldestCopyrightYear && signals.oldestCopyrightYear < new Date().getFullYear() - 3) ||
    (signals.builderHints || []).length > 0;
  if (oldSite) return 'refonte';
  return null; // site correct : pas de prospection sans problème observable
}

function isoWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

async function runWeekly(options = {}) {
  const dryRun = options.dryRun !== false; // dry-run par défaut, toujours
  const maxSends = clampMaxSends(options.maxSends);
  const runId = crypto.randomUUID();
  const stats = {
    dryRun, discovered: 0, ingested: 0, identityConflicts: 0, audited: 0,
    suppressed: 0, noCampaignSignal: 0, noCompliantContact: 0, llmSkipped: 0,
    llmInvalid: 0, qualified: 0, drafts: 0, reserved: 0, sent: 0,
    possiblySent: 0, sendFailed: 0, errors: 0, guardsBlocked: [],
  };

  await runMigrations();
  await query(`INSERT INTO campaign_runs (id, dry_run, git_sha) VALUES ($1, $2, $3)`, [runId, dryRun, process.env.GITHUB_SHA || null]);

  // 1. Découverte (France / SIRENE, puis site officiel via Brave)
  const week = isoWeek();
  for (const target of targetsForWeek(week)) {
    if (stats.discovered >= LIMITS.maxDiscoveredPerRun) break;
    let candidates = [];
    try {
      candidates = await searchEtablissements({ naf: target.naf, department: target.department, rows: 25 });
    } catch (error) {
      stats.errors += 1;
      continue;
    }
    for (const candidate of candidates) {
      if (stats.discovered >= LIMITS.maxDiscoveredPerRun) break;
      stats.discovered += 1;
      try {
        candidate.website = await findOfficialWebsite({ name: candidate.name, city: candidate.city }).catch(() => null);
        const result = await withTransaction((client) => ingestCandidate(client, candidate));
        if (result.outcome === 'created' || result.outcome === 'attached') stats.ingested += 1;
        else if (result.outcome === 'conflict') stats.identityConflicts += 1;
      } catch (error) {
        if (error.code === 'IDENTITY_CONFLICT') stats.identityConflicts += 1;
        else stats.errors += 1;
      }
    }
  }

  // 2. Sélection des candidats à auditer (avec site, jamais encore traités)
  const { rows: toAudit } = await query(
    `SELECT b.id, b.canonical_domain, b.name_normalized, b.country_code, b.status
     FROM businesses b
     WHERE b.status = 'DISCOVERED' AND b.canonical_domain IS NOT NULL
     ORDER BY b.created_at DESC
     LIMIT $1`,
    [LIMITS.maxDeepAudits],
  );

  const sendCandidates = [];
  for (const business of toAudit) {
    try {
      const audit = await auditWebsite(`https://${business.canonical_domain}`);
      if (audit.blockedByRobots) {
        await markSkipped(business.id, 'robots_disallow');
        continue;
      }
      stats.audited += 1;
      for (const page of audit.pages) {
        await query(
          `INSERT INTO website_audits (business_id, page_url, method, signals, evidence)
           VALUES ($1, $2, $3, $4::jsonb, $5::jsonb)`,
          [business.id, page.url, page.method, JSON.stringify(page.signals), JSON.stringify(audit.evidence)],
        );
      }

      if (!audit.signals || !audit.signals.likelyFrench) {
        await markSkipped(business.id, 'not_french');
        continue;
      }

      const campaign = chooseCampaign(audit.signals);
      if (!campaign) {
        stats.noCampaignSignal += 1;
        await markSkipped(business.id, 'no_observable_problem');
        continue;
      }

      // Contact conforme : publié sur le site, fonctionnel de préférence.
      const contact = audit.emails.find((e) => e.isFunctional) || audit.emails[0] || null;
      if (!contact) {
        stats.noCompliantContact += 1;
        await markSkipped(business.id, 'no_published_professional_email');
        continue;
      }

      if (await withTransaction((c) => isSuppressed(c, { email: contact.email, website: business.canonical_domain, businessStatus: business.status }))) {
        stats.suppressed += 1;
        await markSkipped(business.id, 'suppressed');
        continue;
      }

      sendCandidates.push({ business, audit, campaign, contact });
      await query(`UPDATE businesses SET status = 'ENRICHED', updated_at = now() WHERE id = $1`, [business.id]);
    } catch (error) {
      stats.errors += 1;
    }
  }

  // 3. Qualification LLM + 4. envoi ou brouillon
  const countryPolicies = new Map(
    (await query('SELECT country_code, enabled, policy_version FROM country_policies')).rows.map((r) => [r.country_code, r]),
  );

  let sends = 0;
  for (const item of sendCandidates) {
    if (sends >= maxSends) break;
    const policy = countryPolicies.get(item.business.country_code);

    if (!dryRun) {
      const guards = checkSendGuards({ env: process.env, countryPolicy: policy });
      if (!guards.allowed) {
        stats.guardsBlocked = [...new Set([...stats.guardsBlocked, ...guards.reasons])];
        continue;
      }
    }

    let qualification;
    try {
      if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
        stats.llmSkipped += 1;
        continue;
      }
      qualification = await qualifyProspect({
        countryCode: item.business.country_code,
        sector: null,
        campaignCandidate: item.campaign,
        signals: item.audit.signals,
        evidence: item.audit.evidence,
      });
    } catch (error) {
      stats.errors += 1;
      continue;
    }
    if (!qualification.valid) { stats.llmInvalid += 1; continue; }
    if (qualification.decision === 'skip') { await markSkipped(item.business.id, 'llm_skip'); continue; }
    stats.qualified += 1;

    const email = renderEmail(qualification, { businessName: item.business.name_normalized });

    const contactRow = await query(
      `INSERT INTO contacts (business_id, email, email_hmac, source_url, is_functional_alias)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email_hmac) DO UPDATE SET business_id = contacts.business_id
       RETURNING id`,
      [item.business.id, item.contact.email, hmac(item.contact.email), qualification.evidenceUrl, item.contact.isFunctional],
    );
    const contactId = contactRow.rows[0].id;

    if (dryRun) {
      await withTransaction((c) => saveDryRunDraft(c, {
        businessId: item.business.id, contactId, runId, campaign: qualification.campaign,
        subject: email.subject, body: email.body, evidenceUrl: qualification.evidenceUrl,
      }));
      stats.drafts += 1;
      sends += 1;
      continue;
    }

    const reservation = await withTransaction((c) => reserveOutreach(c, {
      businessId: item.business.id, contactId, runId, campaign: qualification.campaign,
      subject: email.subject, body: email.body, evidenceUrl: qualification.evidenceUrl,
    }));
    if (!reservation.reserved) continue;
    stats.reserved += 1;

    const outcome = await withTransaction((c) => sendReserved(c, {
      id: reservation.outreachId,
      business_id: item.business.id,
      to: item.contact.email,
      subject: email.subject,
      body: email.body,
      provider_idempotency_key: reservation.idempotencyKey,
      attempt_count: 0,
    }));
    if (outcome.outcome === 'sent') { stats.sent += 1; sends += 1; }
    else if (outcome.outcome === 'possibly_sent') { stats.possiblySent += 1; sends += 1; }
    else stats.sendFailed += 1;
  }

  await query(`UPDATE campaign_runs SET finished_at = now(), stats = $2::jsonb WHERE id = $1`, [runId, JSON.stringify(stats)]);
  // Rapport agrégé uniquement : aucun nom, email, domaine ou URL.
  console.log(JSON.stringify({ runId, ...stats }, null, 2));
  return stats;
}

async function markSkipped(businessId, reason) {
  await query(
    `UPDATE businesses SET status = 'SKIPPED', status_reason = $2, updated_at = now() WHERE id = $1`,
    [businessId, reason],
  );
}

if (require.main === module) {
  const dryRun = process.env.DRY_RUN !== 'false';
  runWeekly({ dryRun, maxSends: process.env.MAX_SENDS })
    .then(() => closePool())
    .catch(async (error) => {
      console.error('Run échoué :', error.message);
      process.exitCode = 1;
      await closePool();
    });
}

module.exports = { runWeekly, chooseCampaign, isoWeek };
