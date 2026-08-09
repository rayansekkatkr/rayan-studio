'use strict';

/**
 * Ingestion d'un candidat découvert : résolution d'identité multi-clés
 * puis insertion transactionnelle.
 *
 * Fail closed : si les clés d'identité pointent vers PLUSIEURS entreprises
 * existantes différentes (fusion incertaine), le candidat est écarté :
 * aucune création, aucune réservation possible.
 */

const { buildIdentityKeys, canonicalDomain, normalizeName } = require('./normalize');

/**
 * Décide quoi faire d'un candidat à partir des correspondances existantes.
 * matches : lignes { kind, value_hmac, business_id } trouvées en base.
 * Fonction pure.
 */
function resolveIdentity(matches) {
  const businessIds = [...new Set((matches || []).map((m) => m.business_id))];
  if (businessIds.length === 0) return { action: 'CREATE' };
  if (businessIds.length === 1) return { action: 'ATTACH', businessId: businessIds[0] };
  return { action: 'CONFLICT', businessIds };
}

/**
 * Ingestion transactionnelle d'un candidat.
 * candidate : { provider, siren?, siret?, name, postalCode?, city?, countryCode, website? }
 * client : client pg transactionnel (withTransaction).
 * Retourne { outcome: 'created'|'attached'|'conflict'|'invalid', businessId? }.
 */
async function ingestCandidate(client, candidate, secret = process.env.SUPPRESSION_HMAC_SECRET) {
  const nameNormalized = normalizeName(candidate.name);
  if (!nameNormalized || !candidate.countryCode) {
    return { outcome: 'invalid' };
  }

  const keys = buildIdentityKeys(candidate, secret);
  if (keys.length === 0) return { outcome: 'invalid' };

  const { rows: matches } = await client.query(
    `SELECT kind, value_hmac, business_id FROM business_identity_keys
     WHERE (kind, value_hmac) IN (${keys.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ')})`,
    keys.flatMap((k) => [k.kind, k.valueHmac]),
  );

  const decision = resolveIdentity(matches);

  if (decision.action === 'CONFLICT') {
    return { outcome: 'conflict', businessIds: decision.businessIds };
  }

  let businessId = decision.businessId;

  if (decision.action === 'CREATE') {
    const domain = canonicalDomain(candidate.website);
    const { rows } = await client.query(
      `INSERT INTO businesses (canonical_domain, name_normalized, display_name, country_code, city, postal_code)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (canonical_domain) WHERE canonical_domain IS NOT NULL DO NOTHING
       RETURNING id`,
      [domain, nameNormalized, candidate.name || null, candidate.countryCode, candidate.city || null, candidate.postalCode || null],
    );
    if (rows.length === 0) {
      // course : le domaine vient d'être créé par un autre chemin
      const existing = await client.query(
        'SELECT id FROM businesses WHERE canonical_domain = $1',
        [domain],
      );
      if (existing.rows.length === 0) return { outcome: 'conflict', businessIds: [] };
      businessId = existing.rows[0].id;
    } else {
      businessId = rows[0].id;
    }
  }

  // Attache les clés d'identité manquantes ; un conflit d'unicité ici
  // signifie qu'une clé appartient déjà à une autre entreprise -> abandon.
  for (const key of keys) {
    const res = await client.query(
      `INSERT INTO business_identity_keys (business_id, kind, value_hmac)
       VALUES ($1, $2, $3)
       ON CONFLICT (kind, value_hmac) DO NOTHING
       RETURNING id`,
      [businessId, key.kind, key.valueHmac],
    );
    if (res.rowCount === 0) {
      const owner = await client.query(
        'SELECT business_id FROM business_identity_keys WHERE kind = $1 AND value_hmac = $2',
        [key.kind, key.valueHmac],
      );
      if (owner.rows.length > 0 && owner.rows[0].business_id !== businessId) {
        const error = new Error('identity_conflict');
        error.code = 'IDENTITY_CONFLICT';
        throw error; // rollback de la transaction : fail closed
      }
    }
  }

  for (const ext of ['siren', 'siret']) {
    if (candidate[ext]) {
      await client.query(
        `INSERT INTO business_external_ids (business_id, provider, external_id)
         VALUES ($1, $2, $3) ON CONFLICT (provider, external_id) DO NOTHING`,
        [businessId, `sirene_${ext}`, String(candidate[ext]).replace(/\s+/g, '')],
      );
    }
  }

  return { outcome: decision.action === 'CREATE' ? 'created' : 'attached', businessId };
}

module.exports = { resolveIdentity, ingestCandidate };
