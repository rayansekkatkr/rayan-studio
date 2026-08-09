'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { listMigrationFiles } = require('./migrate');

test('les migrations sont ordonnées et nommées correctement', () => {
  const files = listMigrationFiles();
  assert.ok(files.length >= 1);
  assert.equal(files[0], '001_init.sql');
  const sorted = [...files].sort();
  assert.deepEqual(files, sorted);
});

// Tests d'intégration : nécessitent un Postgres de test.
// Skippés proprement si TEST_DATABASE_URL est absent (poste local sans
// Docker) ; la CI fournit un service postgres et les exécute toujours.
const hasDb = Boolean(process.env.TEST_DATABASE_URL);

test('migration sur base vide puis rejouée (idempotence)', { skip: !hasDb ? 'TEST_DATABASE_URL absent' : false }, async () => {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  const { runMigrations } = require('./migrate');
  const { query, closePool } = require('./db');

  const first = await runMigrations();
  assert.ok(first.length >= 1, 'première passe doit appliquer les migrations');

  const second = await runMigrations();
  assert.equal(second.length, 0, 'seconde passe ne doit rien réappliquer');

  const { rows } = await query(
    "SELECT country_code, enabled FROM country_policies ORDER BY country_code",
  );
  assert.equal(rows.length, 8);
  assert.ok(rows.every((r) => r.enabled === false), 'tous les pays désactivés par défaut');

  const constraints = await query(`
    SELECT indexname FROM pg_indexes
    WHERE tablename IN ('outreach_messages','business_identity_keys','suppression_list','email_provider_events')
  `);
  const names = constraints.rows.map((r) => r.indexname).join(' ');
  assert.ok(names.includes('uq_outreach_one_real_message_per_business'));

  await closePool();
});
