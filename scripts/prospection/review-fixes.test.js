'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

process.env.SUPPRESSION_HMAC_SECRET = 'test-secret-0123456789abcdef';
process.env.UNSUBSCRIBE_TOKEN_SECRET = 'unsubscribe-secret-0123456789';

const { verifyWebsiteMatch, extractEmails } = require('./crawl');
const { sanitizeExcerpt } = require('./qualify');
const { recoverStalledReservations } = require('./send');

// B3 : jamais associer un site sans correspondance vérifiée
test('verifyWebsiteMatch : accepte nom + ancrage local, refuse le reste', () => {
  const html = '<title>Boulangerie Épi d\'Or — Lyon 1er</title><footer>3 rue des Fours, 69001 Lyon — SIREN 123 456 789</footer>';
  assert.equal(verifyWebsiteMatch(html, { name: 'BOULANGERIE EPI D OR', city: 'Lyon' }).matched, true);
  assert.equal(verifyWebsiteMatch(html, { name: 'BOULANGERIE EPI D OR', postalCode: '69001' }).matched, true);
  assert.equal(verifyWebsiteMatch(html, { name: 'BOULANGERIE EPI D OR', siren: '123456789' }).matched, true);
  // nom proche mais autre entreprise, autre ville : refus
  assert.equal(verifyWebsiteMatch(html, { name: 'BOULANGERIE DES LILAS', city: 'Paris' }).matched, false);
  // bon nom mais aucun ancrage local vérifiable : refus (fail closed)
  assert.equal(verifyWebsiteMatch('<title>Épi d\'Or boulangerie</title>', { name: 'BOULANGERIE EPI D OR', city: 'Lyon' }).matched, false);
  assert.equal(verifyWebsiteMatch(null, { name: 'X' }).matched, false);
});

// I1 : la preuve du contact est la page où l'email a été trouvé
test('extractEmails conserve la sourceUrl exacte de chaque adresse', () => {
  const emails = extractEmails(
    '<a href="mailto:contact@epidor.fr">mail</a>',
    'epidor.fr',
    'https://epidor.fr/contact',
  );
  assert.equal(emails[0].sourceUrl, 'https://epidor.fr/contact');
});

// S4 : extraits sans adresse postale ni téléphone
test('sanitizeExcerpt retire téléphones, adresses de rue et codes postaux', () => {
  const out = sanitizeExcerpt('Épi d Or, 3 rue des Fours 69001 Lyon, tél 04 78 12 34 56, ouvert 7j/7');
  assert.ok(!out.includes('69001'), 'code postal retiré');
  assert.ok(!/rue des Fours/i.test(out), 'adresse retirée');
  assert.ok(!out.includes('04 78'), 'téléphone retiré');
  assert.ok(out.includes('Épi d Or'), 'le nom commercial public reste');
});

// I3 : reprise des réservations bloquées
function fakeRecoveryClient(rows, sent = []) {
  return {
    async query(text, params) {
      if (text.includes("om.status = 'RESERVED'")) {
        return { rows };
      }
      if (text.includes('FROM country_policies')) {
        return { rows: [{ country_code: 'FR', enabled: true, policy_version: 'fr-v1' }] };
      }
      if (text.includes('FROM suppression_list')) {
        return { rows: [] };
      }
      if (text.includes("SET status = 'POSSIBLY_SENT'")) {
        sent.push({ type: 'possibly_sent', id: params[0] });
        return { rows: [], rowCount: 1 };
      }
      if (text.includes('UPDATE businesses')) return { rows: [], rowCount: 1 };
      if (text.includes('attempt_count')) return { rows: [], rowCount: 1 };
      if (text.includes("SET status = 'SENT'")) {
        sent.push({ type: 'sent', id: params[0] });
        return { rows: [], rowCount: 1 };
      }
      return { rows: [], rowCount: 1 };
    },
  };
}

test('recoverStalledReservations : dans la fenêtre -> retry même clé ; au-delà -> POSSIBLY_SENT', async () => {
  const now = Date.now();
  const recent = {
    id: 'm1', business_id: 'b1', to: 'a@x.fr', subject: 's', body: 'b {{unsubscribe_url}}',
    provider_idempotency_key: 'cold-outreach/m1', attempt_count: 1,
    reserved_at: new Date(now - 60 * 60 * 1000).toISOString(), // 1h
    country_code: 'FR', canonical_domain: 'x.fr', business_status: 'RESERVED',
  };
  const stale = { ...recent, id: 'm2', business_id: 'b2', provider_idempotency_key: 'cold-outreach/m2',
    reserved_at: new Date(now - 30 * 60 * 60 * 1000).toISOString() }; // 30h > fenêtre 24h

  const actions = [];
  const keys = [];
  const client = fakeRecoveryClient([recent, stale], actions);
  const fetcher = async (url, options) => {
    keys.push(options.headers['Idempotency-Key']);
    return { ok: true, status: 200, json: async () => ({ id: 'resend-recovered' }) };
  };
  const env = {
    SEND_ENABLED: 'true', ENABLED_COUNTRIES: 'FR',
    UNSUBSCRIBE_BASE_URL: 'https://x/api/unsubscribe', UNSUBSCRIBE_TOKEN_SECRET: 'unsubscribe-secret-0123456789',
    RESEND_WEBHOOK_SECRET: 'w', SEND_DNS_VERIFIED: 'true', RESEND_API_KEY: 'k',
    RESEND_FROM: 'a@b.c', RESEND_BACKOFF_BASE_MS: '1',
  };
  const result = await recoverStalledReservations(client, { resendFetcher: fetcher, env, now });
  assert.equal(result.retried, 1);
  assert.equal(result.possiblySent, 1);
  assert.deepEqual(keys, ['cold-outreach/m1'], 'reprise avec la même clé, jamais une nouvelle');
  assert.ok(actions.some((a) => a.type === 'possibly_sent' && a.id === 'm2'), 'hors fenêtre = POSSIBLY_SENT');
});

// Round 2 — B1 : l'arrêt d'urgence bloque aussi les reprises
test('recoverStalledReservations : SEND_ENABLED=false -> zéro appel Resend, messages intacts', async () => {
  let fetchCalls = 0;
  const client = { async query() { throw new Error('la base ne doit même pas être lue'); } };
  const result = await recoverStalledReservations(client, {
    resendFetcher: async () => { fetchCalls += 1; return { ok: true, status: 200, json: async () => ({}) }; },
    env: { SEND_ENABLED: 'false' },
    now: Date.now(),
  });
  assert.equal(fetchCalls, 0);
  assert.deepEqual(result, { retried: 0, possiblySent: 0, blockedByGuards: 0, suppressed: 0 });
});

test('recoverStalledReservations : garde-fous par message (pays non activé -> blocage, pas d\'envoi)', async () => {
  const now = Date.now();
  const row = {
    id: 'm1', business_id: 'b1', to: 'a@x.fr', subject: 's', body: 'b {{unsubscribe_url}}',
    provider_idempotency_key: 'cold-outreach/m1', attempt_count: 0,
    reserved_at: new Date(now - 60 * 60 * 1000).toISOString(),
    country_code: 'FR', canonical_domain: 'x.fr', business_status: 'RESERVED',
  };
  let fetchCalls = 0;
  const client = {
    async query(text) {
      if (text.includes("om.status = 'RESERVED'")) return { rows: [row] };
      if (text.includes('FROM country_policies')) return { rows: [{ country_code: 'FR', enabled: false, policy_version: null }] };
      if (text.includes('FROM suppression_list')) return { rows: [] };
      return { rows: [], rowCount: 1 };
    },
  };
  const env = {
    SEND_ENABLED: 'true', ENABLED_COUNTRIES: 'FR',
    UNSUBSCRIBE_BASE_URL: 'https://x/api/unsubscribe', UNSUBSCRIBE_TOKEN_SECRET: 'unsubscribe-secret-0123456789',
    RESEND_WEBHOOK_SECRET: 'w', SEND_DNS_VERIFIED: 'true', RESEND_API_KEY: 'k', RESEND_FROM: 'a@b.c',
    RESEND_BACKOFF_BASE_MS: '1',
  };
  const result = await recoverStalledReservations(client, {
    resendFetcher: async () => { fetchCalls += 1; return { ok: true, status: 200, json: async () => ({}) }; },
    env, now,
  });
  assert.equal(fetchCalls, 0, 'politique pays désactivée = aucun envoi de reprise');
  assert.equal(result.blockedByGuards, 1);
});

// Round 2 — enrichissement du domaine lors d'un ATTACH
const { ingestCandidate: ingestForEnrich } = require('./ingest');
test('ingestCandidate ATTACH : une entreprise sans domaine reçoit son domaine vérifié', async () => {
  const { hmac: h } = require('./normalize');
  const state = {
    businesses: [{ id: 'b1', canonical_domain: null }],
    identityKeys: [{ business_id: 'b1', kind: 'siren', value_hmac: h('123456789') }],
    domainUpdates: [],
  };
  const client = {
    async query(text, params) {
      if (text.includes('FROM business_identity_keys') && text.includes('IN (')) {
        const pairs = [];
        for (let i = 0; i < params.length; i += 2) pairs.push([params[i], params[i + 1]]);
        const rows = state.identityKeys.filter((k) => pairs.some(([kind, v]) => k.kind === kind && k.value_hmac === v));
        return { rows, rowCount: rows.length };
      }
      if (text.includes('UPDATE businesses SET canonical_domain')) {
        state.domainUpdates.push({ id: params[0], domain: params[1] });
        return { rows: [], rowCount: 1 };
      }
      if (text.startsWith('INSERT INTO business_identity_keys')) {
        const [businessId, kind, valueHmac] = params;
        if (state.identityKeys.some((k) => k.kind === kind && k.value_hmac === valueHmac)) return { rows: [], rowCount: 0 };
        state.identityKeys.push({ business_id: businessId, kind, value_hmac: valueHmac });
        return { rows: [{ id: 1 }], rowCount: 1 };
      }
      if (text.includes('SELECT business_id FROM business_identity_keys')) {
        const rows = state.identityKeys.filter((k) => k.kind === params[0] && k.value_hmac === params[1]).map((k) => ({ business_id: k.business_id }));
        return { rows, rowCount: rows.length };
      }
      if (text.startsWith('INSERT INTO business_external_ids')) return { rows: [], rowCount: 1 };
      throw new Error(`non simulé : ${text.slice(0, 50)}`);
    },
  };
  const result = await ingestForEnrich(client, {
    provider: 'sirene', siren: '123456789', name: 'Épi d Or', countryCode: 'FR',
    website: 'https://www.epidor.fr',
  });
  assert.equal(result.outcome, 'attached');
  assert.deepEqual(state.domainUpdates, [{ id: 'b1', domain: 'epidor.fr' }]);
});

// Round 3 — pas de placeholder dans l'objet
const { validateLlmOutput: validateR3 } = require('./qualify');
test('validateLlmOutput rejette un placeholder dans l\'objet', () => {
  const body = Array(75).fill('mot').join(' ') + ' {{business_name}} {{offer_link}}';
  const out = {
    decision: 'send', campaign: 'refonte',
    observation: 'Le site n\'est pas servi en HTTPS, constat vérifiable.',
    evidence_url: 'https://x.fr/', confidence: 0.9,
    subject: 'Un mot pour {{business_name}}', body,
  };
  const result = validateR3(out, { campaignCandidate: 'refonte', evidenceUrls: ['https://x.fr/'] });
  assert.equal(result.reason, 'placeholder_in_subject');
});
