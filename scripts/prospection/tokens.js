'use strict';

const crypto = require('node:crypto');

/**
 * Jetons de désinscription : opaques, signés, versionnés, durables.
 * Secret dédié UNSUBSCRIBE_TOKEN_SECRET, distinct de SUPPRESSION_HMAC_SECRET.
 * Format v1 : v1.<outreachId>.<hmac(outreachId)>
 * Aucune expiration : une désinscription doit fonctionner des mois après l'envoi.
 */

function requireSecret() {
  const secret = process.env.UNSUBSCRIBE_TOKEN_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('UNSUBSCRIBE_TOKEN_SECRET manquant ou trop court.');
  }
  if (secret === process.env.SUPPRESSION_HMAC_SECRET) {
    throw new Error('UNSUBSCRIBE_TOKEN_SECRET doit être distinct de SUPPRESSION_HMAC_SECRET.');
  }
  return secret;
}

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(`unsubscribe.v1.${value}`, 'utf8').digest('hex');
}

function createUnsubscribeToken(outreachId, secret = requireSecret()) {
  return `v1.${outreachId}.${sign(outreachId, secret)}`;
}

/** Retourne l'outreachId si le jeton est valide, null sinon. */
function verifyUnsubscribeToken(token, secret = requireSecret()) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') return null;
  const [, outreachId, signature] = parts;
  const expected = sign(outreachId, secret);
  if (signature.length !== expected.length) return null;
  const valid = crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(expected, 'utf8'));
  return valid ? outreachId : null;
}

module.exports = { createUnsubscribeToken, verifyUnsubscribeToken };
