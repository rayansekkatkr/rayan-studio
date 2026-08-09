'use strict';

/**
 * Vérification de signature des webhooks Resend (format Svix) et
 * planification des transitions d'état. Logique pure, partagée entre la
 * route Next et les tests du pipeline.
 */

const crypto = require('node:crypto');

const TIMESTAMP_TOLERANCE_S = 5 * 60;

/**
 * Vérifie une signature Svix : `${id}.${timestamp}.${payload}` signé
 * HMAC-SHA256 avec le secret whsec_ (base64), comparé aux entrées
 * "v1,<base64sig>" de l'en-tête svix-signature.
 */
function verifyResendSignature({ payload, headers, secret, nowSeconds = Math.floor(Date.now() / 1000) }) {
  if (!secret) return { valid: false, reason: 'secret_missing' };
  const id = headers['svix-id'];
  const timestamp = headers['svix-timestamp'];
  const signatureHeader = headers['svix-signature'];
  if (!id || !timestamp || !signatureHeader) return { valid: false, reason: 'headers_missing' };

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(nowSeconds - ts) > TIMESTAMP_TOLERANCE_S) {
    return { valid: false, reason: 'timestamp_out_of_tolerance' };
  }

  const secretBytes = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const signedContent = `${id}.${timestamp}.${payload}`;
  const expected = crypto.createHmac('sha256', secretBytes).update(signedContent, 'utf8').digest('base64');

  const candidates = signatureHeader.split(' ').map((entry) => entry.split(',')[1]).filter(Boolean);
  const expectedBuffer = Buffer.from(expected, 'utf8');
  for (const candidate of candidates) {
    const candidateBuffer = Buffer.from(candidate, 'utf8');
    if (
      candidateBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(candidateBuffer, expectedBuffer)
    ) {
      return { valid: true, eventId: id };
    }
  }
  return { valid: false, reason: 'signature_mismatch' };
}

/**
 * Transition à appliquer pour un type d'événement Resend.
 * Retourne { businessStatus?, suppressionReason?, record: boolean }.
 */
function planTransition(eventType) {
  switch (eventType) {
    case 'email.bounced':
      return { businessStatus: 'BOUNCED', suppressionReason: 'bounced', record: true };
    case 'email.complained':
      return { businessStatus: 'COMPLAINED', suppressionReason: 'complained', record: true };
    case 'email.delivered':
    case 'email.sent':
    case 'email.delivery_delayed':
      return { record: true };
    default:
      return { record: false };
  }
}

module.exports = { verifyResendSignature, planTransition, TIMESTAMP_TOLERANCE_S };
