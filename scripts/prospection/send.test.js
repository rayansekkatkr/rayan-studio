'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

process.env.SUPPRESSION_HMAC_SECRET = 'test-secret-0123456789abcdef';
process.env.UNSUBSCRIBE_TOKEN_SECRET = 'unsubscribe-secret-0123456789';

const { checkSendGuards, clampMaxSends, reserveOutreach, saveDryRunDraft, sendReserved, HARD_MAX_SENDS } = require('./send');
const { createUnsubscribeToken, verifyUnsubscribeToken } = require('./tokens');

const FULL_ENV = {
  SEND_ENABLED: 'true',
  ENABLED_COUNTRIES: 'FR',
  UNSUBSCRIBE_BASE_URL: 'https://www.rayanstudios.com/api/unsubscribe',
  UNSUBSCRIBE_TOKEN_SECRET: 'unsubscribe-secret-0123456789',
  RESEND_WEBHOOK_SECRET: 'whsec_x',
  SEND_DNS_VERIFIED: 'true',
  RESEND_API_KEY: 're_x',
  RESEND_FROM: 'Rayan <rayan@outreach.rayanstudios.com>',
  RESEND_BACKOFF_BASE_MS: '1',
};
const FR_POLICY = { country_code: 'FR', enabled: true, policy_version: 'fr-v1' };

test('checkSendGuards : toutes les conditions réunies -> autorisé', () => {
  assert.deepEqual(checkSendGuards({ env: FULL_ENV, countryPolicy: FR_POLICY }), { allowed: true, reasons: [] });
});

test('checkSendGuards : chaque condition manquante bloque (fail closed)', () => {
  const cases = [
    [{ ...FULL_ENV, SEND_ENABLED: 'false' }, FR_POLICY, 'SEND_ENABLED_false'],
    [FULL_ENV, { ...FR_POLICY, enabled: false }, 'country_policy_disabled'],
    [{ ...FULL_ENV, ENABLED_COUNTRIES: 'BE-FR' }, FR_POLICY, 'country_not_in_allowlist'],
    [FULL_ENV, { ...FR_POLICY, policy_version: null }, 'country_policy_unversioned'],
    [{ ...FULL_ENV, UNSUBSCRIBE_BASE_URL: '' }, FR_POLICY, 'unsubscribe_not_configured'],
    [{ ...FULL_ENV, RESEND_WEBHOOK_SECRET: '' }, FR_POLICY, 'webhook_not_configured'],
    [{ ...FULL_ENV, SEND_DNS_VERIFIED: 'false' }, FR_POLICY, 'dns_not_verified'],
  ];
  for (const [env, policy, expectedReason] of cases) {
    const result = checkSendGuards({ env, countryPolicy: policy });
    assert.equal(result.allowed, false);
    assert.ok(result.reasons.includes(expectedReason), expectedReason);
  }
});

test('clampMaxSends : plafond dur à 20, valeurs invalides fail closed à 0', () => {
  assert.equal(clampMaxSends(20), 20);
  assert.equal(clampMaxSends(5), 5);
  assert.equal(clampMaxSends(0), 0);
  assert.equal(clampMaxSends(500), HARD_MAX_SENDS);
  assert.equal(clampMaxSends('9999'), HARD_MAX_SENDS);
  assert.equal(clampMaxSends(undefined), HARD_MAX_SENDS, 'absent = défaut 20');
  assert.equal(clampMaxSends(-1), 0, 'négatif = aucun envoi');
  assert.equal(clampMaxSends('abc'), 0, 'invalide = aucun envoi');
});

/** Fake outbox émulant l'index unique partiel (business_id WHERE dry_run=false). */
function fakeOutboxClient(state) {
  return {
    async query(text, params) {
      if (text.includes('INSERT INTO outreach_messages')) {
        const dryRun = text.includes("true, 'DRAFT'");
        const businessId = params[1];
        if (!dryRun && state.messages.some((m) => m.business_id === businessId && !m.dry_run)) {
          return { rows: [], rowCount: 0 };
        }
        const msg = {
          id: params[0], business_id: businessId, dry_run: dryRun,
          status: dryRun ? 'DRAFT' : 'RESERVED',
          provider_idempotency_key: params[8],
          attempt_count: 0,
        };
        state.messages.push(msg);
        return { rows: [{ id: msg.id }], rowCount: 1 };
      }
      if (text.includes('UPDATE outreach_messages')) {
        const msg = state.messages.find((m) => m.id === params[0]);
        if (msg) {
          if (text.includes("status = 'SENT'")) { msg.status = 'SENT'; msg.resend_email_id = params[1]; }
          else if (text.includes("status = 'SEND_FAILED'")) { msg.status = 'SEND_FAILED'; }
          else if (text.includes("status = 'POSSIBLY_SENT'")) { msg.status = 'POSSIBLY_SENT'; }
          else if (text.includes('attempt_count')) { msg.attempt_count = params[1]; }
        }
        return { rows: [], rowCount: 1 };
      }
      if (text.includes('UPDATE businesses')) {
        state.businessStatus = text.match(/status = '(\w+)'/)?.[1] || state.businessStatus;
        return { rows: [], rowCount: 1 };
      }
      throw new Error(`non simulé : ${text.slice(0, 50)}`);
    },
  };
}

const RESERVE_INPUT = {
  businessId: 'b1', contactId: 1, runId: 'r1', campaign: 'refonte',
  subject: 'Objet', body: 'Corps {{unsubscribe_url}}', evidenceUrl: 'https://x.fr/',
};

test('réservation atomique : une seule réservation réelle par entreprise', async () => {
  const state = { messages: [] };
  const client = fakeOutboxClient(state);
  const first = await reserveOutreach(client, RESERVE_INPUT);
  const second = await reserveOutreach(client, RESERVE_INPUT);
  assert.equal(first.reserved, true);
  assert.equal(second.reserved, false, 'deuxième worker refusé');
  assert.equal(state.messages.filter((m) => !m.dry_run).length, 1);
});

test('dry-run : le brouillon ne bloque jamais un vrai envoi futur', async () => {
  const state = { messages: [] };
  const client = fakeOutboxClient(state);
  await saveDryRunDraft(client, RESERVE_INPUT);
  await saveDryRunDraft(client, RESERVE_INPUT);
  const real = await reserveOutreach(client, RESERVE_INPUT);
  assert.equal(real.reserved, true, 'réservation réelle possible après des brouillons');
  assert.equal(state.messages.filter((m) => m.dry_run).length, 2);
});

function makeMessage(state) {
  return {
    id: state.messages[0].id,
    business_id: 'b1',
    to: 'contact@exemple.fr',
    subject: 'Objet',
    body: 'Corps {{unsubscribe_url}}',
    provider_idempotency_key: state.messages[0].provider_idempotency_key,
    attempt_count: 0,
  };
}

test('envoi réussi : SENT, id fournisseur conservé, en-têtes List-Unsubscribe posés', async () => {
  const state = { messages: [] };
  const client = fakeOutboxClient(state);
  await reserveOutreach(client, RESERVE_INPUT);
  const calls = [];
  const fetcher = async (url, options) => {
    calls.push({ url, options: JSON.parse(options.body), headers: options.headers });
    return { ok: true, status: 200, json: async () => ({ id: 'resend-123' }) };
  };
  const result = await sendReserved(client, makeMessage(state), { resendFetcher: fetcher, env: FULL_ENV });
  assert.equal(result.outcome, 'sent');
  assert.equal(state.messages[0].status, 'SENT');
  assert.equal(calls[0].headers['Idempotency-Key'], state.messages[0].provider_idempotency_key);
  assert.ok(calls[0].options.headers['List-Unsubscribe'].includes('token=v1.'));
  assert.equal(calls[0].options.headers['List-Unsubscribe-Post'], 'List-Unsubscribe=One-Click');
  assert.ok(calls[0].options.text.includes('/api/unsubscribe?token='), 'lien de désinscription substitué');
});

test('timeout ambigu : retry avec la MÊME clé, puis POSSIBLY_SENT terminal', async () => {
  const state = { messages: [] };
  const client = fakeOutboxClient(state);
  await reserveOutreach(client, RESERVE_INPUT);
  const keys = [];
  const fetcher = async (url, options) => {
    keys.push(options.headers['Idempotency-Key']);
    const error = new Error('timeout');
    error.name = 'AbortError';
    throw error;
  };
  const result = await sendReserved(client, makeMessage(state), { resendFetcher: fetcher, env: FULL_ENV });
  assert.equal(result.outcome, 'possibly_sent');
  assert.equal(keys.length, 3, 'trois tentatives bornées');
  assert.ok(keys.every((k) => k === keys[0]), 'jamais de nouvelle clé, jamais de nouvel outreach_id');
  assert.equal(state.messages[0].status, 'POSSIBLY_SENT');
  assert.equal(state.businessStatus, 'POSSIBLY_SENT', 'entreprise bloquée définitivement');
});

test('retry après acceptation silencieuse : Resend renvoie l\'id original, un seul envoi', async () => {
  const state = { messages: [] };
  const client = fakeOutboxClient(state);
  await reserveOutreach(client, RESERVE_INPUT);
  let call = 0;
  const fetcher = async () => {
    call += 1;
    if (call === 1) { const e = new Error('socket hang up après acceptation'); e.code = 'ECONNRESET'; throw e; }
    // même clé -> Resend retourne la réponse originale sans renvoyer
    return { ok: true, status: 200, json: async () => ({ id: 'resend-original' }) };
  };
  const result = await sendReserved(client, makeMessage(state), { resendFetcher: fetcher, env: FULL_ENV });
  assert.equal(result.outcome, 'sent');
  assert.equal(result.resendEmailId, 'resend-original');
});

test('erreur 4xx définitive : SEND_FAILED sans retry aveugle', async () => {
  const state = { messages: [] };
  const client = fakeOutboxClient(state);
  await reserveOutreach(client, RESERVE_INPUT);
  let calls = 0;
  const fetcher = async () => { calls += 1; return { ok: false, status: 422, json: async () => ({}) }; };
  const result = await sendReserved(client, makeMessage(state), { resendFetcher: fetcher, env: FULL_ENV });
  assert.equal(result.outcome, 'failed');
  assert.equal(calls, 1);
  assert.equal(state.messages[0].status, 'SEND_FAILED');
});

test('jetons de désinscription : signés, versionnés, durables, secret dédié', () => {
  const token = createUnsubscribeToken('outreach-42');
  assert.ok(token.startsWith('v1.outreach-42.'));
  assert.equal(verifyUnsubscribeToken(token), 'outreach-42');
  assert.equal(verifyUnsubscribeToken('v1.outreach-42.mauvaise-signature'), null);
  assert.equal(verifyUnsubscribeToken('v2.outreach-42.x'), null);
  assert.equal(verifyUnsubscribeToken(null), null);
});
