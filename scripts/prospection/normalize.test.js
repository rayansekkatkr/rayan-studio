'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

process.env.SUPPRESSION_HMAC_SECRET = 'test-secret-0123456789abcdef';

const {
  hmac,
  canonicalDomain,
  normalizeEmail,
  normalizeName,
  normalizedIdentity,
  buildIdentityKeys,
} = require('./normalize');

test('canonicalDomain fait converger www, sous-domaines et URLs variables', () => {
  assert.equal(canonicalDomain('https://www.exemple.fr/page?a=1'), 'exemple.fr');
  assert.equal(canonicalDomain('http://exemple.fr'), 'exemple.fr');
  assert.equal(canonicalDomain('boutique.exemple.fr'), 'exemple.fr');
  assert.equal(canonicalDomain('WWW.EXEMPLE.FR'), 'exemple.fr');
  assert.equal(canonicalDomain('https://shop.demo.co.uk/x'), 'demo.co.uk');
});

test('canonicalDomain rejette les entrées inexploitables', () => {
  assert.equal(canonicalDomain(''), null);
  assert.equal(canonicalDomain(null), null);
  assert.equal(canonicalDomain('pas un domaine'), null);
  assert.equal(canonicalDomain('localhost'), null);
});

test('normalizeEmail est déterministe et strict', () => {
  assert.equal(normalizeEmail('  Contact@Exemple.FR '), 'contact@exemple.fr');
  assert.equal(normalizeEmail('invalide'), null);
  assert.equal(normalizeEmail('a@b'), null);
});

test('normalizeName retire accents, formes juridiques et ponctuation', () => {
  assert.equal(normalizeName('Boulangerie Épi d\'Or SARL'), 'boulangerie epi d or');
  assert.equal(normalizeName('Café ROUGE (SAS)'), 'cafe rouge');
  assert.equal(normalizeName('  Le   Fournil  '), 'le fournil');
});

test('normalizedIdentity exige nom et pays', () => {
  assert.equal(normalizedIdentity({ name: 'X', countryCode: 'fr', postalCode: '75001', city: 'Paris' }), 'x|75001|paris|FR');
  assert.equal(normalizedIdentity({ name: '', countryCode: 'FR' }), null);
  assert.equal(normalizedIdentity({ name: 'X', countryCode: '' }), null);
});

test('hmac est stable et ne révèle pas la valeur', () => {
  const a = hmac('contact@exemple.fr');
  const b = hmac('contact@exemple.fr');
  assert.equal(a, b);
  assert.equal(a.length, 64);
  assert.ok(!a.includes('exemple'));
});

test('buildIdentityKeys : même entreprise via sources différentes = mêmes clés', () => {
  const fromPlaces = buildIdentityKeys({
    website: 'https://www.exemple.fr/contact',
    name: 'Boulangerie Épi d\'Or SARL',
    postalCode: '75 001',
    city: 'Paris',
    countryCode: 'fr',
  });
  const fromSirene = buildIdentityKeys({
    website: 'exemple.fr',
    name: 'BOULANGERIE EPI D OR',
    postalCode: '75001',
    city: 'PARIS',
    countryCode: 'FR',
  });
  const domainA = fromPlaces.find((k) => k.kind === 'domain');
  const domainB = fromSirene.find((k) => k.kind === 'domain');
  assert.equal(domainA.valueHmac, domainB.valueHmac);
  const idA = fromPlaces.find((k) => k.kind === 'normalized_identity');
  const idB = fromSirene.find((k) => k.kind === 'normalized_identity');
  assert.equal(idA.valueHmac, idB.valueHmac);
});

test('buildIdentityKeys inclut siren et siret normalisés', () => {
  const keys = buildIdentityKeys({ siren: '123 456 789', siret: '12345678900012', name: 'X', countryCode: 'FR' });
  assert.ok(keys.find((k) => k.kind === 'siren'));
  assert.ok(keys.find((k) => k.kind === 'siret'));
  const siren1 = buildIdentityKeys({ siren: '123456789', name: 'X', countryCode: 'FR' }).find((k) => k.kind === 'siren');
  const siren2 = buildIdentityKeys({ siren: '123 456 789', name: 'X', countryCode: 'FR' }).find((k) => k.kind === 'siren');
  assert.equal(siren1.valueHmac, siren2.valueHmac);
});
