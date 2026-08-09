'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { chooseCampaign, isoWeek } = require('./run');
const { targetsForWeek, LIMITS } = require('./config');

test('chooseCampaign : processus manuel observé -> application', () => {
  assert.equal(chooseCampaign({ manualProcessHint: true, https: true, hasViewportMeta: true }), 'application');
});

test('chooseCampaign : site daté observable -> refonte', () => {
  assert.equal(chooseCampaign({ https: false, hasViewportMeta: true }), 'refonte');
  assert.equal(chooseCampaign({ https: true, hasViewportMeta: false }), 'refonte');
  assert.equal(chooseCampaign({ https: true, hasViewportMeta: true, oldestCopyrightYear: 2015 }), 'refonte');
  assert.equal(chooseCampaign({ https: true, hasViewportMeta: true, builderHints: ['wix.com'] }), 'refonte');
});

test('chooseCampaign : aucun problème observable -> null (pas de prospection)', () => {
  assert.equal(chooseCampaign({ https: true, hasViewportMeta: true, oldestCopyrightYear: new Date().getFullYear(), builderHints: [] }), null);
  assert.equal(chooseCampaign(null), null);
});

test('targetsForWeek : déterministe et borné', () => {
  const a = targetsForWeek(32);
  const b = targetsForWeek(32);
  assert.deepEqual(a, b);
  assert.equal(a.length, 4);
  assert.ok(a.every((t) => t.naf && t.department));
  assert.notDeepEqual(targetsForWeek(33), a, 'rotation entre semaines');
});

test('les limites V1 sont celles validées', () => {
  assert.equal(LIMITS.maxDiscoveredPerRun, 200);
  assert.equal(LIMITS.maxDeepAudits, 50);
  assert.equal(LIMITS.maxPagesPerDomain, 3);
  assert.equal(LIMITS.networkConcurrency, 4);
});

test('isoWeek retourne un numéro de semaine plausible', () => {
  const week = isoWeek(new Date('2026-08-10'));
  assert.ok(week >= 1 && week <= 53);
  assert.equal(isoWeek(new Date('2026-01-05')), 2);
});
