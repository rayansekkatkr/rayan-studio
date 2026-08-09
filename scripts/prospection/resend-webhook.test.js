'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const test = require('node:test');

const { verifyResendSignature, planTransition } = require('../../src/lib/resend-webhook');

const SECRET_BYTES = Buffer.from('super-secret-webhook-key-1234');
const SECRET = `whsec_${SECRET_BYTES.toString('base64')}`;

function signPayload(payload, { id = 'msg_1', timestamp = Math.floor(Date.now() / 1000) } = {}) {
  const signature = crypto
    .createHmac('sha256', SECRET_BYTES)
    .update(`${id}.${timestamp}.${payload}`, 'utf8')
    .digest('base64');
  return {
    'svix-id': id,
    'svix-timestamp': String(timestamp),
    'svix-signature': `v1,${signature}`,
  };
}

test('verifyResendSignature accepte une signature valide', () => {
  const payload = JSON.stringify({ type: 'email.bounced' });
  const result = verifyResendSignature({ payload, headers: signPayload(payload), secret: SECRET });
  assert.equal(result.valid, true);
  assert.equal(result.eventId, 'msg_1');
});

test('verifyResendSignature rejette signature altérée, secret manquant, headers absents', () => {
  const payload = JSON.stringify({ type: 'email.bounced' });
  const headers = signPayload(payload);

  assert.equal(verifyResendSignature({ payload: payload + 'x', headers, secret: SECRET }).valid, false);
  assert.equal(verifyResendSignature({ payload, headers, secret: undefined }).valid, false);
  assert.equal(verifyResendSignature({ payload, headers: {}, secret: SECRET }).valid, false);
  const badSig = { ...headers, 'svix-signature': 'v1,AAAA' };
  assert.equal(verifyResendSignature({ payload, headers: badSig, secret: SECRET }).valid, false);
});

test('verifyResendSignature rejette un timestamp hors tolérance (anti-rejeu)', () => {
  const payload = '{}';
  const old = signPayload(payload, { timestamp: Math.floor(Date.now() / 1000) - 3600 });
  assert.equal(verifyResendSignature({ payload, headers: old, secret: SECRET }).reason, 'timestamp_out_of_tolerance');
});

test('verifyResendSignature accepte plusieurs signatures dans l\'en-tête (rotation)', () => {
  const payload = '{}';
  const headers = signPayload(payload);
  headers['svix-signature'] = `v1,INVALIDE ${headers['svix-signature']}`;
  assert.equal(verifyResendSignature({ payload, headers, secret: SECRET }).valid, true);
});

test('planTransition : bounce et complaint suppriment, delivered trace, inconnu ignoré', () => {
  assert.deepEqual(planTransition('email.bounced'), { businessStatus: 'BOUNCED', suppressionReason: 'bounced', record: true });
  assert.deepEqual(planTransition('email.complained'), { businessStatus: 'COMPLAINED', suppressionReason: 'complained', record: true });
  assert.deepEqual(planTransition('email.delivered'), { record: true });
  assert.deepEqual(planTransition('email.opened'), { record: false });
  assert.deepEqual(planTransition(''), { record: false });
});
