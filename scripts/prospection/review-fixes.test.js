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
      if (text.includes("status = 'RESERVED'") && text.includes('SELECT')) {
        return { rows };
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
    UNSUBSCRIBE_BASE_URL: 'https://x/api/unsubscribe', RESEND_API_KEY: 'k',
    RESEND_FROM: 'a@b.c', RESEND_BACKOFF_BASE_MS: '1',
  };
  const result = await recoverStalledReservations(client, { resendFetcher: fetcher, env, now });
  assert.equal(result.retried, 1);
  assert.equal(result.possiblySent, 1);
  assert.deepEqual(keys, ['cold-outreach/m1'], 'reprise avec la même clé, jamais une nouvelle');
  assert.ok(actions.some((a) => a.type === 'possibly_sent' && a.id === 'm2'), 'hors fenêtre = POSSIBLY_SENT');
});
