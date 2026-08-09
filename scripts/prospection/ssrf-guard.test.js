'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { assertSafeUrl, safeFetch, isPrivateIp } = require('./ssrf-guard');

const publicResolver = async () => [{ address: '93.184.216.34', family: 4 }];
const privateResolver = async () => [{ address: '10.0.0.5', family: 4 }];
const mixedResolver = async () => [
  { address: '93.184.216.34', family: 4 },
  { address: '169.254.169.254', family: 4 },
];

test('isPrivateIp couvre IPv4 privées, loopback, link-local, metadata, CGNAT', () => {
  for (const ip of ['127.0.0.1', '10.1.2.3', '172.16.0.1', '172.31.255.255', '192.168.1.1', '169.254.169.254', '100.64.0.1', '0.0.0.0']) {
    assert.ok(isPrivateIp(ip), ip);
  }
  assert.ok(!isPrivateIp('93.184.216.34'));
  assert.ok(!isPrivateIp('8.8.8.8'));
});

test('isPrivateIp couvre IPv6 : loopback, ULA, link-local, mapped IPv4, NAT64', () => {
  for (const ip of ['::1', 'fe80::1', 'fd00::1', 'fc00::1', '::ffff:192.168.0.1', '64:ff9b::a00:1', 'ff02::1']) {
    assert.ok(isPrivateIp(ip), ip);
  }
  assert.ok(!isPrivateIp('2606:2800:220:1:248:1893:25c8:1946'));
});

test('assertSafeUrl rejette schémas et ports interdits', async () => {
  await assert.rejects(() => assertSafeUrl('ftp://exemple.fr'), /schéma interdit/);
  await assert.rejects(() => assertSafeUrl('file:///etc/passwd'), /schéma interdit/);
  await assert.rejects(() => assertSafeUrl('http://exemple.fr:8080/'), /port interdit/);
  await assert.rejects(() => assertSafeUrl('http://exemple.fr:22/'), /port interdit/);
});

test('assertSafeUrl rejette hôtes locaux et IP privées directes', async () => {
  await assert.rejects(() => assertSafeUrl('http://localhost/'), /hôte local/);
  await assert.rejects(() => assertSafeUrl('http://127.0.0.1/'), /IP privée/);
  await assert.rejects(() => assertSafeUrl('http://[::1]/'), /IP privée/);
  await assert.rejects(() => assertSafeUrl('http://169.254.169.254/latest/meta-data/'), /IP privée/);
});

test('assertSafeUrl rejette un hôte résolvant vers une adresse privée (même partiellement)', async () => {
  await assert.rejects(() => assertSafeUrl('http://interne.exemple.fr/', privateResolver), /privée/);
  await assert.rejects(() => assertSafeUrl('http://mixte.exemple.fr/', mixedResolver), /privée/);
  const ok = await assertSafeUrl('http://public.exemple.fr/', publicResolver);
  assert.equal(ok.hostname, 'public.exemple.fr');
});

function fetcherSequence(responses) {
  let i = 0;
  return async () => {
    const r = responses[Math.min(i, responses.length - 1)];
    i += 1;
    return {
      status: r.status,
      ok: r.status >= 200 && r.status < 300,
      headers: { get: (k) => r.headers?.[k.toLowerCase()] || null },
      text: async () => r.body || '',
      body: null,
    };
  };
}

test('safeFetch re-valide chaque redirection : redirect vers IP privée bloqué', async () => {
  const fetcher = fetcherSequence([
    { status: 302, headers: { location: 'http://169.254.169.254/secrets' } },
  ]);
  await assert.rejects(
    () => safeFetch('http://public.exemple.fr/', { fetcher, resolver: publicResolver }),
    /IP privée/,
  );
});

test('safeFetch suit une redirection publique et retourne le corps', async () => {
  const fetcher = fetcherSequence([
    { status: 301, headers: { location: 'https://public.exemple.fr/final' } },
    { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' }, body: '<html>ok</html>' },
  ]);
  const res = await safeFetch('http://public.exemple.fr/', { fetcher, resolver: publicResolver });
  assert.equal(res.status, 200);
  assert.equal(res.body, '<html>ok</html>');
});

test('safeFetch borne le nombre de redirections', async () => {
  const fetcher = fetcherSequence([{ status: 302, headers: { location: 'http://public.exemple.fr/loop' } }]);
  await assert.rejects(
    () => safeFetch('http://public.exemple.fr/', { fetcher, resolver: publicResolver }),
    /trop de redirections/,
  );
});

test('safeFetch rejette les content-types non autorisés', async () => {
  const fetcher = fetcherSequence([
    { status: 200, headers: { 'content-type': 'application/octet-stream' }, body: 'binaire' },
  ]);
  await assert.rejects(
    () => safeFetch('http://public.exemple.fr/', { fetcher, resolver: publicResolver }),
    /content-type interdit/,
  );
});

test('safeFetch rejette les corps trop volumineux', async () => {
  const fetcher = fetcherSequence([
    { status: 200, headers: { 'content-type': 'text/html' }, body: 'x'.repeat(3 * 1024 * 1024) },
  ]);
  await assert.rejects(
    () => safeFetch('http://public.exemple.fr/', { fetcher, resolver: publicResolver }),
    /volumineuse/,
  );
});
