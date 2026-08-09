'use strict';

/**
 * Import one-shot du mini-CRM legacy (scripts/contacted.json, non suivi
 * par Git) vers suppression_list, sous forme d'empreintes HMAC uniquement.
 *
 * Aucune valeur en clair (email, domaine, nom) n'est écrite dans les logs
 * ni dans la table. Le fichier source reste local.
 *
 * Usage : DATABASE_URL=... SUPPRESSION_HMAC_SECRET=... node prospection/import-legacy.js [chemin]
 */

const fs = require('node:fs');
const path = require('node:path');
const { hmac, canonicalDomain, normalizeEmail } = require('./normalize');

const DEFAULT_FILE = path.join(__dirname, '..', 'contacted.json');

/**
 * Transforme les entrées legacy en lignes de suppression dédupliquées.
 * Fonction pure : testable sans base ni fichier réel.
 */
function buildSuppressionRows(entries, secret) {
  const rows = new Map();
  let emails = 0;
  let domains = 0;
  let skipped = 0;

  for (const entry of entries) {
    const email = normalizeEmail(entry.email);
    const domain = canonicalDomain(entry.website);
    if (!email && !domain) {
      skipped += 1;
      continue;
    }
    if (email) {
      const key = `email:${hmac(email, secret)}`;
      if (!rows.has(key)) {
        rows.set(key, { kind: 'email', valueHmac: hmac(email, secret) });
        emails += 1;
      }
    }
    if (domain) {
      const key = `domain:${hmac(domain, secret)}`;
      if (!rows.has(key)) {
        rows.set(key, { kind: 'domain', valueHmac: hmac(domain, secret) });
        domains += 1;
      }
    }
  }

  return { rows: [...rows.values()], stats: { entries: entries.length, emails, domains, skipped } };
}

async function importLegacy(filePath = DEFAULT_FILE) {
  const { query, closePool } = require('./db');

  if (!fs.existsSync(filePath)) {
    throw new Error(`Fichier legacy introuvable : ${filePath}`);
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const entries = Array.isArray(data.contacted) ? data.contacted : [];
  const { rows, stats } = buildSuppressionRows(entries, process.env.SUPPRESSION_HMAC_SECRET);

  let inserted = 0;
  for (const row of rows) {
    const result = await query(
      `INSERT INTO suppression_list (kind, value_hmac, reason, source)
       VALUES ($1, $2, 'legacy_import', 'contacted.json')
       ON CONFLICT (kind, value_hmac) DO NOTHING`,
      [row.kind, row.valueHmac],
    );
    inserted += result.rowCount;
  }

  const summary = { ...stats, rowsPrepared: rows.length, rowsInserted: inserted };
  console.log('Import legacy terminé (agrégats uniquement) :', JSON.stringify(summary));
  await closePool();
  return summary;
}

if (require.main === module) {
  importLegacy(process.argv[2]).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { buildSuppressionRows, importLegacy };
