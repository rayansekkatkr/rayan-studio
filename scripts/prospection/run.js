'use strict';

/**
 * Orchestrateur hebdomadaire.
 * Fail closed partout. Reprenable : un dry-run, un garde-fou fermé ou un
 * échec LLM ne consomment jamais un prospect (il reste sélectionnable).
 * Les statuts SKIPPED ne sont posés que pour des raisons définitives.
 */

const crypto = require('node:crypto');
const { query, withTransaction, closePool } = require('./db');
const { runMigrations } = require('./migrate');
const { searchEtablissements } = require('./providers/sirene');
const { findOfficialWebsite } = require('./providers/brave');
const { ingestCandidate } = require('./ingest');
const { auditWebsite, verifyWebsiteMatch } = require('./crawl');
const { safeFetch } = require('./ssrf-guard');
const { qualifyProspect, renderEmail } = require('./qualify');
const { hmac } = require('./normalize');
const {
  checkSendGuards, clampMaxSends, isSuppressed, reserveOutreach, saveDryRunDraft,
  sendReserved, recoverStalledReservations,
} = require('./send');
const { LIMITS, targetsForWeek } = require('./config');

const AUDIT_REUSE_DAYS = 14;

/**
 * Choix de campagne fondé uniquement sur des signaux observés. Pure.
 * - Un CMS/builder n'est JAMAIS un problème en soi.
 * - L'âge du copyright utilise la DERNIÈRE année affichée (une plage
 *   « 2010-2026 » est un site à jour).
 */
function chooseCampaign(signals) {
  if (!signals) return null;
  if (signals.manualProcessHint) return 'application';
  const currentYear = new Date().getFullYear();
  const staleCopyright = signals.newestCopyrightYear && signals.newestCopyrightYear < currentYear - 2;
  const oldSite = signals.https === false || signals.hasViewportMeta === false || staleCopyright;
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

/** Pool de concurrence simple et borné. */
async function mapWithConcurrency(items, limit, fn) {
  const results = [];
  let index = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i).catch((error) => ({ error }));
    }
  });
  await Promise.all(workers);
  return results;
}

/**
 * Réconcilie les événements webhook arrivés avant l'enregistrement du
 * resend_email_id (course webhook/envoi) : les événements non appariés
 * (processed_at NULL) sont rejoués.
 */
async function reconcilePendingProviderEvents() {
  const { rows } = await query(
    `SELECT id, event_type, payload FROM email_provider_events
     WHERE processed_at IS NULL AND event_type IN ('email.bounced','email.complained')`,
  );
  let reconciled = 0;
  for (const event of rows) {
    const emailId = event.payload?.email_id;
    if (!emailId) {
      await query(`UPDATE email_provider_events SET processed_at = now() WHERE id = $1`, [event.id]);
      continue;
    }
    const { rows: matches } = await query(
      `SELECT om.business_id, c.email_hmac, b.canonical_domain
       FROM outreach_messages om
       JOIN contacts c ON c.id = om.contact_id
       JOIN businesses b ON b.id = om.business_id
       WHERE om.resend_email_id = $1`,
      [emailId],
    );
    if (matches.length === 0) continue; // toujours pas apparié : on garde pending
    const { business_id: businessId, email_hmac: emailHmac } = matches[0];
    const status = event.event_type === 'email.bounced' ? 'BOUNCED' : 'COMPLAINED';
    const reason = event.event_type === 'email.bounced' ? 'bounced' : 'complained';
    await query(`UPDATE businesses SET status = $2, updated_at = now() WHERE id = $1`, [businessId, status]);
    await query(
      `INSERT INTO suppression_list (kind, value_hmac, reason, source)
       VALUES ('email', $1, $2, 'reconciliation') ON CONFLICT (kind, value_hmac) DO NOTHING`,
      [emailHmac, reason],
    );
    await query(`UPDATE email_provider_events SET processed_at = now() WHERE id = $1`, [event.id]);
    reconciled += 1;
  }
  return reconciled;
}

/**
 * Insertion sûre d'un contact : une adresse déjà rattachée à une AUTRE
 * entreprise n'est jamais réutilisée (conflit d'identité -> fail closed).
 * Retourne { contactId } ou { conflict: true }.
 */
async function upsertContactSafely({ businessId, email, sourceUrl, isFunctional }) {
  const emailHmac = hmac(email);
  const inserted = await query(
    `INSERT INTO contacts (business_id, email, email_hmac, source_url, is_functional_alias)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email_hmac) DO NOTHING
     RETURNING id`,
    [businessId, email, emailHmac, sourceUrl, isFunctional],
  );
  if (inserted.rows.length > 0) return { contactId: inserted.rows[0].id };
  const existing = await query(
    `SELECT id, business_id FROM contacts WHERE email_hmac = $1`,
    [emailHmac],
  );
  if (existing.rows.length === 0) return { conflict: true };
  if (existing.rows[0].business_id !== businessId) return { conflict: true };
  return { contactId: existing.rows[0].id };
}

/** Réutilise un audit récent au lieu de re-crawler. */
async function loadRecentAudit(businessId) {
  const { rows } = await query(
    `SELECT signals, evidence, fetched_at FROM website_audits
     WHERE business_id = $1 AND is_summary = true
       AND fetched_at > now() - make_interval(days => $2)
     ORDER BY fetched_at DESC LIMIT 1`,
    [businessId, AUDIT_REUSE_DAYS],
  );
  if (rows.length === 0) return null;
  const { rows: contacts } = await query(
    `SELECT email, source_url, is_functional_alias FROM contacts WHERE business_id = $1`,
    [businessId],
  );
  return {
    signals: rows[0].signals,
    evidence: rows[0].evidence,
    emails: contacts.map((c) => ({ email: c.email, sourceUrl: c.source_url, isFunctional: c.is_functional_alias })),
    reused: true,
  };
}

async function runWeekly(options = {}) {
  const dryRun = options.dryRun !== false; // dry-run par défaut, toujours
  const maxSends = clampMaxSends(options.maxSends);
  const runId = crypto.randomUUID();
  const stats = {
    dryRun, discovered: 0, ingested: 0, identityConflicts: 0, websiteMismatches: 0,
    audited: 0, auditsReused: 0, suppressed: 0, noCampaignSignal: 0,
    noCompliantContact: 0, contactConflicts: 0, jsRequired: 0, llmSkipped: 0,
    llmInvalid: 0, qualified: 0, drafts: 0, draftsExisting: 0, reserved: 0, sent: 0,
    possiblySent: 0, sendFailed: 0, stalledRecovered: 0, webhooksReconciled: 0,
    errors: 0, guardsBlocked: [],
  };

  await runMigrations();
  await query(`INSERT INTO campaign_runs (id, dry_run, git_sha) VALUES ($1, $2, $3)`, [runId, dryRun, process.env.GITHUB_SHA || null]);

  // 0. Reprises : réservations bloquées et webhooks non appariés.
  // La reprise est un ENVOI : elle exige SEND_ENABLED et repasse tous les
  // garde-fous par message (elle-même vérifie politique pays + suppression).
  if (!dryRun && process.env.SEND_ENABLED === 'true') {
    const recovered = await withTransaction((c) => recoverStalledReservations(c));
    stats.stalledRecovered = recovered.retried + recovered.possiblySent;
  }
  stats.webhooksReconciled = await reconcilePendingProviderEvents();

  // 1. Découverte (France / SIRENE, site officiel via Brave, VÉRIFIÉ avant
  // toute association d'identité).
  const week = isoWeek();
  for (const target of targetsForWeek(week)) {
    if (stats.discovered >= LIMITS.maxDiscoveredPerRun) break;
    let candidates = [];
    try {
      candidates = await searchEtablissements({ naf: target.naf, department: target.department, rows: 25 });
    } catch {
      stats.errors += 1;
      continue;
    }
    for (const candidate of candidates) {
      if (stats.discovered >= LIMITS.maxDiscoveredPerRun) break;
      stats.discovered += 1;
      try {
        const websiteCandidate = await findOfficialWebsite({ name: candidate.name, city: candidate.city }).catch(() => null);
        candidate.website = null;
        if (websiteCandidate) {
          try {
            const home = await safeFetch(websiteCandidate);
            const match = verifyWebsiteMatch(home.body, {
              name: candidate.name, city: candidate.city,
              postalCode: candidate.postalCode, siren: candidate.siren,
            });
            if (match.matched) candidate.website = websiteCandidate;
            else stats.websiteMismatches += 1; // fail closed : pas d'association
          } catch {
            stats.websiteMismatches += 1;
          }
        }
        const result = await withTransaction((client) => ingestCandidate(client, candidate));
        if (result.outcome === 'created' || result.outcome === 'attached') stats.ingested += 1;
        else if (result.outcome === 'conflict') stats.identityConflicts += 1;
      } catch (error) {
        if (error.code === 'IDENTITY_CONFLICT') stats.identityConflicts += 1;
        else stats.errors += 1;
      }
    }
  }

  // 2. Sélection reprenable : DISCOVERED et ENRICHED (jamais consommés par
  // un dry-run, un garde-fou fermé ou un échec LLM).
  const { rows: toProcess } = await query(
    `SELECT b.id, b.canonical_domain, b.name_normalized, b.display_name, b.country_code, b.status
     FROM businesses b
     WHERE b.status IN ('DISCOVERED', 'ENRICHED') AND b.canonical_domain IS NOT NULL
     ORDER BY b.created_at DESC
     LIMIT $1`,
    [LIMITS.maxDeepAudits],
  );

  const auditResults = await mapWithConcurrency(toProcess, LIMITS.networkConcurrency, async (business) => {
    const reusable = business.status === 'ENRICHED' ? await loadRecentAudit(business.id) : null;
    if (reusable) return { business, audit: reusable };
    const audit = await auditWebsite(`https://${business.canonical_domain}`);
    return { business, audit };
  });

  const sendCandidates = [];
  for (const entry of auditResults) {
    if (entry.error) { stats.errors += 1; continue; }
    const { business, audit } = entry;
    try {
      if (audit.reused) {
        stats.auditsReused += 1;
      } else {
        if (audit.blockedByRobots) { await markSkipped(business.id, 'robots_disallow'); continue; }
        stats.audited += 1;
        for (const page of audit.pages) {
          await query(
            `INSERT INTO website_audits (business_id, page_url, method, signals, evidence)
             VALUES ($1, $2, $3, $4::jsonb, $5::jsonb)`,
            [business.id, page.url, page.method, JSON.stringify(page.signals), JSON.stringify(audit.evidence)],
          );
        }
        // Ligne summary : signaux FUSIONNÉS du site, seule ligne rechargée
        // par loadRecentAudit (jamais les signaux d'une page interne seule).
        if (audit.signals) {
          await query(
            `INSERT INTO website_audits (business_id, page_url, method, signals, evidence, is_summary)
             VALUES ($1, $2, 'http', $3::jsonb, $4::jsonb, true)`,
            [business.id, audit.signals.finalUrl || `https://${business.canonical_domain}`,
             JSON.stringify(audit.signals), JSON.stringify(audit.evidence)],
          );
        }
      }

      const signals = audit.signals;
      if (!signals) { await markSkipped(business.id, 'no_signals'); continue; }
      if (signals.jsRequiredHint) {
        // Fallback Playwright non implémenté en V1 : on n'audite pas à
        // l'aveugle un site vide, on l'écarte explicitement.
        stats.jsRequired += 1;
        await markSkipped(business.id, 'js_required_no_fallback');
        continue;
      }
      if (!signals.likelyFrench) { await markSkipped(business.id, 'not_french'); continue; }

      const campaign = chooseCampaign(signals);
      if (!campaign) { stats.noCampaignSignal += 1; await markSkipped(business.id, 'no_observable_problem'); continue; }

      const contact = (audit.emails || []).find((e) => e.isFunctional) || (audit.emails || [])[0] || null;
      if (!contact || !contact.sourceUrl) {
        stats.noCompliantContact += 1;
        await markSkipped(business.id, 'no_published_professional_email');
        continue;
      }

      if (await withTransaction((c) => isSuppressed(c, { email: contact.email, website: business.canonical_domain, businessStatus: business.status }))) {
        stats.suppressed += 1;
        await markSkipped(business.id, 'suppressed');
        continue;
      }

      // Le contact conforme est persisté ICI, avant ENRICHED : un échec
      // LLM ou un garde-fou fermé plus tard ne peut plus le perdre, et
      // loadRecentAudit le retrouvera au run suivant.
      const contactResult = await upsertContactSafely({
        businessId: business.id,
        email: contact.email,
        sourceUrl: contact.sourceUrl,
        isFunctional: Boolean(contact.isFunctional),
      });
      if (contactResult.conflict) {
        stats.contactConflicts += 1;
        await markSkipped(business.id, 'contact_identity_conflict');
        continue;
      }

      sendCandidates.push({ business, audit, campaign, contact, contactId: contactResult.contactId });
      // ENRICHED = prêt pour qualification, toujours re-sélectionnable.
      await query(`UPDATE businesses SET status = 'ENRICHED', updated_at = now() WHERE id = $1`, [business.id]);
    } catch {
      stats.errors += 1;
    }
  }

  // 3. Qualification de TOUS les candidats, puis tri par confiance : les
  // 20 meilleurs sont retenus, pas les 20 premiers.
  const qualified = [];
  for (const item of sendCandidates) {
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) { stats.llmSkipped += 1; continue; }
    let qualification;
    try {
      qualification = await qualifyProspect({
        countryCode: item.business.country_code,
        sector: null,
        campaignCandidate: item.campaign,
        signals: item.audit.signals,
        evidence: item.audit.evidence,
      });
    } catch {
      stats.errors += 1;
      continue;
    }
    if (!qualification.valid) { stats.llmInvalid += 1; continue; }
    if (qualification.decision === 'skip') { await markSkipped(item.business.id, 'llm_skip'); continue; }
    stats.qualified += 1;
    qualified.push({ ...item, qualification });
  }
  qualified.sort((a, b) => b.qualification.confidence - a.qualification.confidence);

  // 4. Envoi réel ou brouillon, dans l'ordre de pertinence.
  const countryPolicies = new Map(
    (await query('SELECT country_code, enabled, policy_version FROM country_policies')).rows.map((r) => [r.country_code, r]),
  );

  let sends = 0;
  for (const item of qualified) {
    if (sends >= maxSends) break;
    const policy = countryPolicies.get(item.business.country_code);

    if (!dryRun) {
      const guards = checkSendGuards({ env: process.env, countryPolicy: policy });
      if (!guards.allowed) {
        stats.guardsBlocked = [...new Set([...stats.guardsBlocked, ...guards.reasons])];
        continue; // le prospect reste ENRICHED, reprenable
      }
    }

    const email = renderEmail(item.qualification, {
      businessName: item.business.display_name || item.business.name_normalized,
    });

    if (dryRun) {
      // Un second dry-run ne duplique pas les brouillons (README).
      const { rows: existingDraft } = await query(
        `SELECT 1 FROM outreach_messages WHERE business_id = $1 AND dry_run = true LIMIT 1`,
        [item.business.id],
      );
      if (existingDraft.length > 0) {
        stats.draftsExisting += 1;
        continue;
      }
      await withTransaction((c) => saveDryRunDraft(c, {
        businessId: item.business.id, contactId: item.contactId, runId,
        campaign: item.qualification.campaign, subject: email.subject, body: email.body,
        evidenceUrl: item.qualification.evidenceUrl,
      }));
      stats.drafts += 1;
      sends += 1;
      continue;
    }

    const reservation = await withTransaction((c) => reserveOutreach(c, {
      businessId: item.business.id, contactId: item.contactId, runId,
      campaign: item.qualification.campaign, subject: email.subject, body: email.body,
      evidenceUrl: item.qualification.evidenceUrl,
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

module.exports = { runWeekly, chooseCampaign, isoWeek, mapWithConcurrency, upsertContactSafely };
