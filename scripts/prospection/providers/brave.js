'use strict';

/**
 * Client Brave Search API.
 * Contrainte de licence : les résultats (titres, snippets, positions) ne
 * sont JAMAIS persistés. Seule l'URL du site officiel retenu est renvoyée ;
 * toute donnée exploitée ensuite est collectée sur le site lui-même.
 */

const BASE_URL = 'https://api.search.brave.com/res/v1/web/search';
const THROTTLE_MS = 1100; // free tier : 1 req/s

let lastCallAt = 0;

async function throttle() {
  const wait = lastCallAt + THROTTLE_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCallAt = Date.now();
}

// Annuaires, réseaux sociaux et agrégateurs : jamais retenus comme site
// officiel d'une entreprise.
const EXCLUDED_HOSTS = [
  'pagesjaunes.fr', 'societe.com', 'pappers.fr', 'verif.com', 'infogreffe.fr',
  'kompass.com', 'linkedin.com', 'facebook.com', 'instagram.com', 'twitter.com',
  'x.com', 'tripadvisor.com', 'tripadvisor.fr', 'yelp.com', 'yelp.fr',
  'booking.com', 'thefork.fr', 'thefork.com', 'lafourchette.com', 'ubereats.com',
  'deliveroo.fr', 'google.com', 'goo.gl', 'wikipedia.org', 'youtube.com',
  'annuaire-entreprises.data.gouv.fr', 'trustpilot.com', 'mappy.com',
];

function isExcludedHost(hostname) {
  const h = hostname.toLowerCase();
  return EXCLUDED_HOSTS.some((excluded) => h === excluded || h.endsWith(`.${excluded}`));
}

/**
 * Sélectionne l'URL du site officiel le plus plausible dans une liste de
 * résultats {url}. Fonction pure, ne conserve rien d'autre que l'URL.
 */
function pickOfficialSiteUrl(results) {
  for (const result of results || []) {
    if (!result || !result.url) continue;
    let parsed;
    try {
      parsed = new URL(result.url);
    } catch {
      continue;
    }
    if (!['http:', 'https:'].includes(parsed.protocol)) continue;
    if (isExcludedHost(parsed.hostname)) continue;
    return parsed.origin; // URL racine uniquement, aucun snippet conservé
  }
  return null;
}

/**
 * Cherche le site officiel d'une entreprise. Retourne une URL ou null.
 * fetcher injectable pour les tests.
 */
async function findOfficialWebsite({ name, city, countryHint = '' }, fetcher = fetch) {
  const key = process.env.BRAVE_SEARCH_API_KEY;
  if (!key) throw new Error('BRAVE_SEARCH_API_KEY manquant.');

  const query = [name, city, countryHint, 'site officiel'].filter(Boolean).join(' ');
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&count=5&country=FR`;

  await throttle();
  const response = await fetcher(url, {
    headers: { 'X-Subscription-Token': key, Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Brave ${response.status}`);
  const data = await response.json();
  const results = (data.web && data.web.results) || [];
  // Seules les URLs transitent hors de cette fonction.
  return pickOfficialSiteUrl(results.map((r) => ({ url: r.url })));
}

module.exports = { findOfficialWebsite, pickOfficialSiteUrl, isExcludedHost };
