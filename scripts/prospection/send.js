'use strict';

/**
 * Envoi « exactement une fois » : garde-fous cumulatifs, réservation
 * atomique dans l'outbox, envoi Resend idempotent, réconciliation par
 * ré-emploi de la MÊME clé, POSSIBLY_SENT terminal en cas d'ambiguïté.
 */

const crypto = require('node:crypto');
const { hmac, canonicalDomain } = require('./normalize');
const { createUnsubscribeToken } = require('./tokens');

const HARD_MAX_SENDS = 20;
const MAX_SEND_ATTEMPTS = 3;
const SEND_TIMEOUT_MS = 15_000;
const RESEND_IDEMPOTENCY_WINDOW_MS = 24 * 60 * 60 * 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Garde-fous d'envoi réel. TOUTES les conditions doivent être vraies.
 * Fonction pure : env et politique injectés. Retourne { allowed, reasons }.
 */
function checkSendGuards({ env, countryPolicy }) {
  const reasons = [];
  if (env.SEND_ENABLED !== 'true') reasons.push('SEND_ENABLED_false');
  if (!countryPolicy || countryPolicy.enabled !== true) reasons.push('country_policy_disabled');
  const allowlist = String(env.ENABLED_COUNTRIES || '').split(',').map((c) => c.trim()).filter(Boolean);
  if (!countryPolicy || !allowlist.includes(countryPolicy.country_code)) reasons.push('country_not_in_allowlist');
  if (countryPolicy && !countryPolicy.policy_version) reasons.push('country_policy_unversioned');
  if (!env.UNSUBSCRIBE_BASE_URL) reasons.push('unsubscribe_not_configured');
  if (!env.UNSUBSCRIBE_TOKEN_SECRET) reasons.push('unsubscribe_secret_missing');
  if (!env.RESEND_WEBHOOK_SECRET) reasons.push('webhook_not_configured');
  if (env.SEND_DNS_VERIFIED !== 'true') reasons.push('dns_not_verified');
  if (!env.RESEND_API_KEY) reasons.push('resend_key_missing');
  if (!env.RESEND_FROM) reasons.push('resend_from_missing');
  return { allowed: reasons.length === 0, reasons };
}

/**
 * Plafond strict, fail closed : une valeur invalide ou négative donne 0
 * (aucun envoi), jamais le maximum. Une valeur trop haute est ramenée à 20.
 */
function clampMaxSends(requested) {
  if (requested === undefined || requested === null || requested === '') return HARD_MAX_SENDS;
  const n = Number(requested);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(Math.floor(n), HARD_MAX_SENDS);
}

/** L'entreprise ou le contact est-il supprimé/bloqué ? */
async function isSuppressed(client, { email, website, businessStatus }) {
  const blockedStatuses = ['SENT', 'POSSIBLY_SENT', 'UNSUBSCRIBED', 'COMPLAINED', 'BOUNCED', 'BLOCKED'];
  if (blockedStatuses.includes(businessStatus)) return true;
  const checks = [];
  if (email) checks.push(['email', hmac(email)]);
  const domain = canonicalDomain(website || (email ? email.split('@')[1] : null));
  if (domain) checks.push(['domain', hmac(domain)]);
  if (checks.length === 0) return true; // fail closed
  const { rows } = await client.query(
    `SELECT 1 FROM suppression_list WHERE (kind, value_hmac) IN (${checks.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ')}) LIMIT 1`,
    checks.flat(),
  );
  return rows.length > 0;
}

/**
 * Réservation atomique d'un message RÉEL. L'index unique partiel
 * (business_id WHERE dry_run = false) garantit qu'une entreprise ne peut
 * être réservée qu'une seule fois, même avec deux workers concurrents.
 * Retourne { reserved, outreachId? }.
 */
async function reserveOutreach(client, { businessId, contactId, runId, campaign, subject, body, evidenceUrl }) {
  const outreachId = crypto.randomUUID();
  const idempotencyKey = `cold-outreach/${outreachId}`;
  const { rows } = await client.query(
    `INSERT INTO outreach_messages
       (id, business_id, contact_id, run_id, campaign, dry_run, status, subject, body, evidence_url, provider_idempotency_key)
     VALUES ($1, $2, $3, $4, $5, false, 'RESERVED', $6, $7, $8, $9)
     ON CONFLICT (business_id) WHERE dry_run = false DO NOTHING
     RETURNING id`,
    [outreachId, businessId, contactId, runId, campaign, subject, body, evidenceUrl, idempotencyKey],
  );
  if (rows.length === 0) return { reserved: false };
  await client.query(`UPDATE businesses SET status = 'RESERVED', updated_at = now() WHERE id = $1`, [businessId]);
  return { reserved: true, outreachId, idempotencyKey };
}

/** Brouillon dry-run : jamais bloquant pour un futur envoi réel. */
async function saveDryRunDraft(client, { businessId, contactId, runId, campaign, subject, body, evidenceUrl }) {
  const id = crypto.randomUUID();
  await client.query(
    `INSERT INTO outreach_messages
       (id, business_id, contact_id, run_id, campaign, dry_run, status, subject, body, evidence_url, provider_idempotency_key)
     VALUES ($1, $2, $3, $4, $5, true, 'DRAFT', $6, $7, $8, $9)`,
    [id, businessId, contactId, runId, campaign, subject, body, evidenceUrl, `dry-run/${id}`],
  );
  return { draftId: id };
}

/**
 * Envoie un message RESERVED via Resend avec sa clé d'idempotence stable.
 * Un timeout ambigu réutilise la MÊME ligne et la MÊME clé (jamais un
 * nouvel outreach_id). Après épuisement des tentatives : POSSIBLY_SENT,
 * entreprise bloquée définitivement.
 */
async function sendReserved(client, message, { resendFetcher = fetch, env = process.env } = {}) {
  const unsubscribeToken = createUnsubscribeToken(message.id);
  const unsubscribeUrl = `${env.UNSUBSCRIBE_BASE_URL}?token=${unsubscribeToken}`;
  const finalBody = message.body.replaceAll('{{unsubscribe_url}}', unsubscribeUrl);

  let lastError = null;
  for (let attempt = message.attempt_count || 0; attempt < MAX_SEND_ATTEMPTS; attempt += 1) {
    await client.query(
      `UPDATE outreach_messages SET attempt_count = $2, last_attempt_at = now() WHERE id = $1`,
      [message.id, attempt + 1],
    );
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
    try {
      const response = await resendFetcher('https://api.resend.com/emails', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': message.provider_idempotency_key,
        },
        body: JSON.stringify({
          from: env.RESEND_FROM,
          to: [message.to],
          reply_to: env.RESEND_REPLY_TO || undefined,
          subject: message.subject,
          text: finalBody,
          headers: {
            'List-Unsubscribe': `<${unsubscribeUrl}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await client.query(
          `UPDATE outreach_messages SET status = 'SENT', resend_email_id = $2, sent_at = now() WHERE id = $1`,
          [message.id, data.id || null],
        );
        await client.query(`UPDATE businesses SET status = 'SENT', updated_at = now() WHERE id = $1`, [message.business_id]);
        return { outcome: 'sent', resendEmailId: data.id || null };
      }

      // 4xx définitif (payload refusé) : échec franc, pas ambigu.
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        await client.query(
          `UPDATE outreach_messages SET status = 'SEND_FAILED', last_error_code = $2 WHERE id = $1`,
          [message.id, `http_${response.status}`],
        );
        await client.query(`UPDATE businesses SET status = 'SEND_FAILED', updated_at = now() WHERE id = $1`, [message.business_id]);
        return { outcome: 'failed', code: `http_${response.status}` };
      }

      lastError = `http_${response.status}`;
    } catch (error) {
      lastError = error.name === 'AbortError' ? 'timeout' : (error.code || 'network');
    } finally {
      clearTimeout(timer);
    }
    // ambigu (5xx, 429, réseau, timeout) : backoff puis nouvelle tentative
    // avec la même clé d'idempotence — Resend renverra l'id original si le
    // premier appel avait été accepté.
    await sleep(Math.min(Number(env.RESEND_BACKOFF_BASE_MS || 2000) * 2 ** attempt, 10_000));
  }

  await client.query(
    `UPDATE outreach_messages SET status = 'POSSIBLY_SENT', last_error_code = $2 WHERE id = $1`,
    [message.id, lastError],
  );
  await client.query(
    `UPDATE businesses SET status = 'POSSIBLY_SENT', status_reason = 'ambiguous_send', updated_at = now() WHERE id = $1`,
    [message.business_id],
  );
  return { outcome: 'possibly_sent', code: lastError };
}

/**
 * Reprise des messages restés RESERVED (crash entre l'acceptation Resend
 * et le commit). Dans la fenêtre d'idempotence : retente avec la MÊME
 * clé (réconciliation sûre). Au-delà : POSSIBLY_SENT, entreprise bloquée.
 *
 * SOUMISE AUX MÊMES GARDE-FOUS que tout envoi : SEND_ENABLED, politique
 * pays, allowlist, DNS, suppression. L'arrêt d'urgence
 * (SEND_ENABLED=false) bloque aussi les reprises. Un message non
 * autorisé reste RESERVED (aucun envoi) jusqu'à réautorisation ou
 * sortie de fenêtre.
 */
async function recoverStalledReservations(client, { resendFetcher, env = process.env, now = Date.now() } = {}) {
  const results = { retried: 0, possiblySent: 0, blockedByGuards: 0, suppressed: 0 };
  if (env.SEND_ENABLED !== 'true') return results; // arrêt d'urgence respecté

  const { rows } = await client.query(
    `SELECT om.id, om.business_id, om.subject, om.body, om.provider_idempotency_key,
            om.attempt_count, om.reserved_at,
            c.email AS to, b.country_code, b.canonical_domain, b.status AS business_status
     FROM outreach_messages om
     JOIN contacts c ON c.id = om.contact_id
     JOIN businesses b ON b.id = om.business_id
     WHERE om.status = 'RESERVED' AND om.dry_run = false
       AND om.reserved_at < now() - interval '30 minutes'`,
  );
  const { rows: policies } = await client.query(
    `SELECT country_code, enabled, policy_version FROM country_policies`,
  );
  const policyByCountry = new Map(policies.map((p) => [p.country_code, p]));

  for (const row of rows) {
    const age = now - new Date(row.reserved_at).getTime();
    if (age < RESEND_IDEMPOTENCY_WINDOW_MS) {
      const guards = checkSendGuards({ env, countryPolicy: policyByCountry.get(row.country_code) });
      if (!guards.allowed) { results.blockedByGuards += 1; continue; }
      if (await isSuppressed(client, { email: row.to, website: row.canonical_domain, businessStatus: 'RESERVED' })) {
        results.suppressed += 1;
        continue;
      }
      await sendReserved(client, row, { resendFetcher, env });
      results.retried += 1;
    } else {
      await client.query(
        `UPDATE outreach_messages SET status = 'POSSIBLY_SENT', last_error_code = 'stalled_beyond_idempotency_window' WHERE id = $1`,
        [row.id],
      );
      await client.query(
        `UPDATE businesses SET status = 'POSSIBLY_SENT', status_reason = 'stalled_reservation', updated_at = now() WHERE id = $1`,
        [row.business_id],
      );
      results.possiblySent += 1;
    }
  }
  return results;
}

module.exports = {
  HARD_MAX_SENDS,
  recoverStalledReservations,
  checkSendGuards,
  clampMaxSends,
  isSuppressed,
  reserveOutreach,
  saveDryRunDraft,
  sendReserved,
};
