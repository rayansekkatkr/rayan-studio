'use strict';

const { Pool } = require('pg');

let pool = null;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL manquant.');
    }
    pool = new Pool({
      connectionString,
      max: 4,
      // Neon exige TLS ; sslmode=require attendu dans l'URL. Pas de
      // désactivation de vérification de certificat ici.
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return pool;
}

async function query(text, params) {
  return getPool().query(text, params);
}

/** Exécute fn dans une transaction ; rollback sur toute erreur. */
async function withTransaction(fn) {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // la connexion sera détruite par release(error)
    }
    throw error;
  } finally {
    client.release();
  }
}

async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = { getPool, query, withTransaction, closePool };
