'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

process.env.SIRENE_API_KEY = 'test-key';

const { searchEtablissements, parseEtablissement } = require('./sirene');

const FIXTURE = {
  etablissements: [
    {
      siren: '123456789',
      siret: '12345678900012',
      uniteLegale: { denominationUniteLegale: 'BOULANGERIE EPI D OR' },
      adresseEtablissement: { codePostalEtablissement: '69001', libelleCommuneEtablissement: 'LYON 1ER' },
      periodesEtablissement: [{ activitePrincipaleEtablissement: '10.71C', etatAdministratifEtablissement: 'A' }],
    },
    {
      siren: '987654321',
      siret: '98765432100021',
      uniteLegale: { prenom1UniteLegale: 'MARIE', nomUniteLegale: 'DUPONT' },
      adresseEtablissement: { codePostalEtablissement: '69002', libelleCommuneEtablissement: 'LYON 2EME' },
      periodesEtablissement: [{ activitePrincipaleEtablissement: '10.71C' }],
    },
    { siret: null },
  ],
};

function mockFetcher(status, body) {
  return async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
}

test('parseEtablissement extrait les champs utiles', () => {
  const parsed = parseEtablissement(FIXTURE.etablissements[0]);
  assert.equal(parsed.siren, '123456789');
  assert.equal(parsed.siret, '12345678900012');
  assert.equal(parsed.name, 'BOULANGERIE EPI D OR');
  assert.equal(parsed.postalCode, '69001');
  assert.equal(parsed.countryCode, 'FR');
});

test('searchEtablissements parse la réponse et ignore les entrées invalides', async () => {
  const results = await searchEtablissements({ naf: '10.71C', department: '69' }, mockFetcher(200, FIXTURE));
  assert.equal(results.length, 2);
  assert.equal(results[1].name, 'MARIE DUPONT');
});

test('searchEtablissements retourne [] sur 404 (aucun résultat)', async () => {
  const results = await searchEtablissements({ naf: '10.71C', department: '69' }, mockFetcher(404, {}));
  assert.deepEqual(results, []);
});

test('searchEtablissements échoue sur erreur API', async () => {
  await assert.rejects(
    () => searchEtablissements({ naf: '10.71C', department: '69' }, mockFetcher(500, {})),
    /SIRENE 500/,
  );
});
