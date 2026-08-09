'use strict';

/**
 * Client API Sirene (INSEE, portail-api.insee.fr).
 * Source officielle de découverte pour la France uniquement.
 * Throttle : l'API est limitée à ~30 requêtes/minute.
 */

const DEFAULT_BASE_URL = 'https://api.insee.fr/api-sirene/3.11';
const THROTTLE_MS = 2100; // ~28 req/min, marge sous la limite de 30

let lastCallAt = 0;

async function throttle() {
  const wait = lastCallAt + THROTTLE_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCallAt = Date.now();
}

function requireApiKey() {
  const key = process.env.SIRENE_API_KEY;
  if (!key) throw new Error('SIRENE_API_KEY manquant.');
  return key;
}

/**
 * Extrait les champs utiles d'un établissement Sirene.
 * Fonction pure, testable sur fixtures.
 */
function parseEtablissement(etab) {
  if (!etab || !etab.siret) return null;
  const unite = etab.uniteLegale || {};
  const adresse = etab.adresseEtablissement || {};
  const name =
    unite.denominationUniteLegale ||
    etab.periodesEtablissement?.[0]?.enseigne1Etablissement ||
    [unite.prenom1UniteLegale, unite.nomUniteLegale].filter(Boolean).join(' ') ||
    null;
  if (!name) return null;
  return {
    provider: 'sirene',
    siren: etab.siren || String(etab.siret).slice(0, 9),
    siret: String(etab.siret),
    name,
    postalCode: adresse.codePostalEtablissement || null,
    city: adresse.libelleCommuneEtablissement || null,
    countryCode: 'FR',
    naf: etab.periodesEtablissement?.[0]?.activitePrincipaleEtablissement || unite.activitePrincipaleUniteLegale || null,
  };
}

/**
 * Recherche d'établissements actifs par code NAF et département.
 * fetcher injectable pour les tests (défaut : fetch global).
 */
async function searchEtablissements({ naf, department, rows = 20 }, fetcher = fetch) {
  const q = [
    `periode(activitePrincipaleEtablissement:${naf} AND etatAdministratifEtablissement:A)`,
    `codePostalEtablissement:${department}*`,
  ].join(' AND ');
  const url = `${process.env.SIRENE_BASE_URL || DEFAULT_BASE_URL}/siret?q=${encodeURIComponent(q)}&nombre=${rows}`;

  await throttle();
  const response = await fetcher(url, {
    headers: { 'X-INSEE-Api-Key-Integration': requireApiKey(), Accept: 'application/json' },
  });
  if (response.status === 404) return []; // aucun résultat
  if (!response.ok) {
    throw new Error(`SIRENE ${response.status}`);
  }
  const data = await response.json();
  const etabs = data.etablissements || [];
  return etabs.map(parseEtablissement).filter(Boolean);
}

module.exports = { searchEtablissements, parseEtablissement };
