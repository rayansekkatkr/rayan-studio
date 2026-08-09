'use strict';

const crypto = require('node:crypto');
const { getDomain } = require('tldts');

/**
 * Normalisation des identités d'entreprise.
 * Toutes les empreintes sont des HMAC-SHA256 hex : aucune valeur en clair
 * ne doit sortir de ce module vers les logs, rapports ou la suppression_list.
 */

function requireHmacSecret() {
  const secret = process.env.SUPPRESSION_HMAC_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('SUPPRESSION_HMAC_SECRET manquant ou trop court (16 caractères minimum).');
  }
  return secret;
}

function hmac(value, secret = requireHmacSecret()) {
  return crypto.createHmac('sha256', secret).update(String(value), 'utf8').digest('hex');
}

/**
 * Domaine enregistrable canonique (eTLD+1) : minuscule, sans protocole,
 * sans www, sans port ni chemin. Retourne null si non extractible.
 */
function canonicalDomain(input) {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//.test(trimmed) ? trimmed : `http://${trimmed}`;
  let hostname;
  try {
    hostname = new URL(withScheme).hostname;
  } catch {
    return null;
  }
  const domain = getDomain(hostname, { allowPrivateDomains: false });
  return domain || null;
}

function normalizeEmail(input) {
  if (!input || typeof input !== 'string') return null;
  const email = input.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  return email;
}

/**
 * Nom normalisé : minuscule, sans accents, sans formes juridiques usuelles,
 * sans ponctuation, espaces réduits.
 */
const LEGAL_FORMS = /\b(sarl|sas|sasu|eurl|sa|sci|snc|scop|scp|selarl|gmbh|sprl|srl|sagl|inc|ltd|llc|micro[- ]?entreprise|auto[- ]?entrepreneur)\b/g;

function normalizeName(input) {
  if (!input || typeof input !== 'string') return null;
  const name = input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(LEGAL_FORMS, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return name || null;
}

function normalizePostalCode(input) {
  if (!input) return null;
  const pc = String(input).replace(/\s+/g, '').toUpperCase();
  return pc || null;
}

/**
 * Identité métier normalisée : nom|codePostal|ville|pays.
 * Sert d'empreinte de secours quand ni domaine ni identifiant officiel.
 */
function normalizedIdentity({ name, postalCode, city, countryCode }) {
  const parts = [
    normalizeName(name),
    normalizePostalCode(postalCode),
    normalizeName(city),
    String(countryCode || '').toUpperCase(),
  ];
  if (!parts[0] || !parts[3]) return null;
  return parts.map((p) => p || '').join('|');
}

/**
 * Clés d'identité pour business_identity_keys.
 * Chaque clé: { kind, valueHmac }. kinds: domain, siren, siret,
 * normalized_identity, legacy_domain, provider_id.
 */
function buildIdentityKeys({ website, siren, siret, name, postalCode, city, countryCode }, secret) {
  const keys = [];
  const domain = canonicalDomain(website);
  if (domain) keys.push({ kind: 'domain', valueHmac: hmac(domain, secret) });
  if (siren) keys.push({ kind: 'siren', valueHmac: hmac(String(siren).replace(/\s+/g, ''), secret) });
  if (siret) keys.push({ kind: 'siret', valueHmac: hmac(String(siret).replace(/\s+/g, ''), secret) });
  const identity = normalizedIdentity({ name, postalCode, city, countryCode });
  if (identity) keys.push({ kind: 'normalized_identity', valueHmac: hmac(identity, secret) });
  return keys;
}

module.exports = {
  hmac,
  canonicalDomain,
  normalizeEmail,
  normalizeName,
  normalizePostalCode,
  normalizedIdentity,
  buildIdentityKeys,
};
