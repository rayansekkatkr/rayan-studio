'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

process.env.SUPPRESSION_HMAC_SECRET = 'test-secret-0123456789abcdef';

const { resolveIdentity, ingestCandidate } = require('./ingest');

test('resolveIdentity : aucune correspondance -> CREATE', () => {
  assert.deepEqual(resolveIdentity([]), { action: 'CREATE' });
});

test('resolveIdentity : une seule entreprise -> ATTACH', () => {
  const decision = resolveIdentity([
    { kind: 'domain', value_hmac: 'x', business_id: 'b1' },
    { kind: 'siren', value_hmac: 'y', business_id: 'b1' },
  ]);
  assert.deepEqual(decision, { action: 'ATTACH', businessId: 'b1' });
});

test('resolveIdentity : deux entreprises différentes -> CONFLICT (fail closed)', () => {
  const decision = resolveIdentity([
    { kind: 'domain', value_hmac: 'x', business_id: 'b1' },
    { kind: 'siren', value_hmac: 'y', business_id: 'b2' },
  ]);
  assert.equal(decision.action, 'CONFLICT');
  assert.deepEqual(decision.businessIds.sort(), ['b1', 'b2']);
});

/** Client pg factice en mémoire, couvrant les requêtes d'ingest. */
function fakeClient(state) {
  return {
    async query(text, params) {
      if (text.includes('FROM business_identity_keys') && text.includes('IN (')) {
        const pairs = [];
        for (let i = 0; i < params.length; i += 2) pairs.push([params[i], params[i + 1]]);
        const rows = state.identityKeys.filter((k) => pairs.some(([kind, v]) => k.kind === kind && k.value_hmac === v));
        return { rows, rowCount: rows.length };
      }
      if (text.startsWith('INSERT INTO businesses')) {
        const domain = params[0];
        if (domain && state.businesses.some((b) => b.canonical_domain === domain)) {
          return { rows: [], rowCount: 0 };
        }
        const id = `b${state.businesses.length + 1}`;
        state.businesses.push({ id, canonical_domain: domain });
        return { rows: [{ id }], rowCount: 1 };
      }
      if (text.includes('UPDATE businesses SET canonical_domain')) {
        const b = state.businesses.find((x) => x.id === params[0]);
        if (b && b.canonical_domain === null) b.canonical_domain = params[1];
        return { rows: [], rowCount: 1 };
      }
      if (text.includes('SELECT id FROM businesses WHERE canonical_domain')) {
        const rows = state.businesses.filter((b) => b.canonical_domain === params[0]).map((b) => ({ id: b.id }));
        return { rows, rowCount: rows.length };
      }
      if (text.startsWith('INSERT INTO business_identity_keys')) {
        const [businessId, kind, valueHmac] = params;
        if (state.identityKeys.some((k) => k.kind === kind && k.value_hmac === valueHmac)) {
          return { rows: [], rowCount: 0 };
        }
        state.identityKeys.push({ business_id: businessId, kind, value_hmac: valueHmac });
        return { rows: [{ id: state.identityKeys.length }], rowCount: 1 };
      }
      if (text.includes('SELECT business_id FROM business_identity_keys')) {
        const rows = state.identityKeys
          .filter((k) => k.kind === params[0] && k.value_hmac === params[1])
          .map((k) => ({ business_id: k.business_id }));
        return { rows, rowCount: rows.length };
      }
      if (text.startsWith('INSERT INTO business_external_ids')) {
        return { rows: [], rowCount: 1 };
      }
      throw new Error(`Requête non simulée : ${text.slice(0, 60)}`);
    },
  };
}

const CANDIDATE = {
  provider: 'sirene',
  siren: '123456789',
  name: 'Boulangerie Épi d\'Or',
  postalCode: '69001',
  city: 'Lyon',
  countryCode: 'FR',
  website: 'https://www.epidor.fr',
};

test('ingestCandidate crée une nouvelle entreprise avec ses clés', async () => {
  const state = { businesses: [], identityKeys: [] };
  const result = await ingestCandidate(fakeClient(state), CANDIDATE);
  assert.equal(result.outcome, 'created');
  assert.equal(state.businesses.length, 1);
  assert.ok(state.identityKeys.length >= 3); // domain + siren + normalized_identity
});

test('ingestCandidate rattache la même entreprise vue par une autre source', async () => {
  const state = { businesses: [], identityKeys: [] };
  const first = await ingestCandidate(fakeClient(state), CANDIDATE);
  const second = await ingestCandidate(fakeClient(state), {
    provider: 'brave',
    name: 'BOULANGERIE EPI D OR',
    postalCode: '69 001',
    city: 'LYON',
    countryCode: 'FR',
    website: 'epidor.fr/contact',
  });
  assert.equal(second.outcome, 'attached');
  assert.equal(second.businessId, first.businessId);
  assert.equal(state.businesses.length, 1, 'aucun doublon');
});

test('ingestCandidate : identités éclatées sur deux entreprises -> conflict, rien créé', async () => {
  const state = {
    businesses: [{ id: 'b1', canonical_domain: 'a.fr' }, { id: 'b2', canonical_domain: 'b.fr' }],
    identityKeys: [],
  };
  const { hmac, canonicalDomain, normalizedIdentity } = require('./normalize');
  state.identityKeys.push(
    { business_id: 'b1', kind: 'domain', value_hmac: hmac(canonicalDomain(CANDIDATE.website)) },
    { business_id: 'b2', kind: 'siren', value_hmac: hmac('123456789') },
  );
  const before = state.businesses.length;
  const result = await ingestCandidate(fakeClient(state), CANDIDATE);
  assert.equal(result.outcome, 'conflict');
  assert.equal(state.businesses.length, before, 'aucune création en cas de conflit');
});

test('ingestCandidate rejette un candidat sans identité exploitable', async () => {
  const state = { businesses: [], identityKeys: [] };
  const result = await ingestCandidate(fakeClient(state), { name: '', countryCode: 'FR' });
  assert.equal(result.outcome, 'invalid');
});
