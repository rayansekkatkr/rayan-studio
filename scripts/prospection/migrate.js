'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { getPool, closePool } = require('./db');

const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

async function ensureMigrationsTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename   text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);
}

function listMigrationFiles() {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => /^\d+_.+\.sql$/.test(f))
    .sort();
}

async function runMigrations() {
  const pool = getPool();
  const client = await pool.connect();
  const applied = [];
  try {
    await ensureMigrationsTable(client);
    for (const filename of listMigrationFiles()) {
      const { rows } = await client.query('SELECT 1 FROM schema_migrations WHERE filename = $1', [filename]);
      if (rows.length > 0) continue;
      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, filename), 'utf8');
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [filename]);
        await client.query('COMMIT');
        applied.push(filename);
      } catch (error) {
        await client.query('ROLLBACK');
        throw new Error(`Migration ${filename} échouée : ${error.message}`);
      }
    }
  } finally {
    client.release();
  }
  return applied;
}

if (require.main === module) {
  runMigrations()
    .then((applied) => {
      console.log(applied.length > 0 ? `Migrations appliquées : ${applied.join(', ')}` : 'Base à jour.');
      return closePool();
    })
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
      return closePool();
    });
}

module.exports = { runMigrations, listMigrationFiles };
