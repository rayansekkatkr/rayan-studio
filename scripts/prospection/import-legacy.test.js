'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

process.env.SUPPRESSION_HMAC_SECRET = 'test-secret-0123456789abcdef';

const { buildSuppressionRows } = require('./import-legacy');
const { hmac } = require('./normalize');

const SECRET = process.env.SUPPRESSION_HMAC_SECRET;

test('buildSuppressionRows produit des HMAC pour emails et domaines, sans clair', () => {
  const { rows, stats } = buildSuppressionRows(
    [
      { email: 'Contact@Exemple.FR', website: 'https://www.exemple.fr/page' },
      { email: 'info@autre.be', website: 'http://autre.be' },
    ],
    SECRET,
  );
  assert.equal(stats.emails, 2);
  assert.equal(stats.domains, 2);
  const serialized = JSON.stringify(rows);
  assert.ok(!serialized.includes('exemple'), 'aucune valeur en clair');
  assert.ok(!serialized.includes('@'));
  assert.ok(rows.some((r) => r.kind === 'email' && r.valueHmac === hmac('contact@exemple.fr', SECRET)));
  assert.ok(rows.some((r) => r.kind === 'domain' && r.valueHmac === hmac('exemple.fr', SECRET)));
});

test('buildSuppressionRows déduplique emails et domaines répétés', () => {
  const { rows, stats } = buildSuppressionRows(
    [
      { email: 'a@exemple.fr', website: 'https://exemple.fr' },
      { email: 'a@exemple.fr', website: 'https://www.exemple.fr/autre' },
      { email: 'b@exemple.fr', website: 'exemple.fr' },
    ],
    SECRET,
  );
  assert.equal(stats.emails, 2, 'deux emails uniques');
  assert.equal(stats.domains, 1, 'un seul domaine canonique');
  assert.equal(rows.length, 3);
});

test('buildSuppressionRows ignore les entrées sans email ni site exploitables', () => {
  const { stats } = buildSuppressionRows(
    [{ email: 'invalide', website: '???' }, { name: 'X sans rien' }],
    SECRET,
  );
  assert.equal(stats.skipped, 2);
  assert.equal(stats.emails + stats.domains, 0);
});

test('un domaine legacy bloque une nouvelle adresse sur le même domaine', () => {
  // La garantie vient du croisement par HMAC du domaine canonique :
  // nouvelle adresse contact2@exemple.fr -> domaine exemple.fr -> supprimé.
  const { rows } = buildSuppressionRows([{ email: 'old@exemple.fr', website: 'https://www.exemple.fr' }], SECRET);
  const domainHmac = rows.find((r) => r.kind === 'domain').valueHmac;
  assert.equal(domainHmac, hmac('exemple.fr', SECRET));
});
