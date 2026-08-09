'use strict';

/**
 * Protection SSRF pour le crawler : les URLs proviennent de sources non
 * fiables (Brave, sites tiers, redirections).
 *
 * - schémas http/https uniquement, ports 80/443 uniquement ;
 * - résolution DNS complète (IPv4 + IPv6) et rejet des plages privées,
 *   loopback, link-local et metadata ;
 * - re-validation après CHAQUE redirection (bornées) ;
 * - taille de réponse et content-type bornés, timeout strict.
 */

const dns = require('node:dns').promises;
const net = require('node:net');

const ALLOWED_PORTS = new Set([80, 443]);
const MAX_REDIRECTS = 4;
const MAX_BODY_BYTES = 2 * 1024 * 1024; // 2 Mo
const FETCH_TIMEOUT_MS = 15_000;
const ALLOWED_CONTENT_TYPES = /^(text\/html|application\/xhtml\+xml|text\/plain)/i;

function isPrivateIPv4(ip) {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p))) return true;
  const [a, b] = parts;
  if (a === 0 || a === 10 || a === 127) return true;            // 0/8, 10/8, loopback
  if (a === 100 && b >= 64 && b <= 127) return true;            // CGNAT 100.64/10
  if (a === 169 && b === 254) return true;                      // link-local + metadata 169.254.169.254
  if (a === 172 && b >= 16 && b <= 31) return true;             // 172.16/12
  if (a === 192 && b === 168) return true;                      // 192.168/16
  if (a === 192 && b === 0) return true;                        // 192.0.0/24, 192.0.2/24 doc
  if (a === 198 && (b === 18 || b === 19)) return true;         // benchmark
  if (a >= 224) return true;                                    // multicast + réservé
  return false;
}

function isPrivateIPv6(ip) {
  const lower = ip.toLowerCase();
  if (lower === '::' || lower === '::1') return true;           // unspecified, loopback
  if (lower.startsWith('fe80:')) return true;                   // link-local
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true; // ULA fc00::/7
  if (lower.startsWith('ff')) return true;                      // multicast
  if (lower.startsWith('::ffff:')) {
    const mapped = lower.slice(7);
    return net.isIPv4(mapped) ? isPrivateIPv4(mapped) : true;   // IPv4-mapped
  }
  if (lower.startsWith('64:ff9b')) return true;                 // NAT64 : cache des IPv4 arbitraires
  if (lower.startsWith('2001:db8')) return true;                // documentation
  return false;
}

function isPrivateIp(ip) {
  if (net.isIPv4(ip)) return isPrivateIPv4(ip);
  if (net.isIPv6(ip)) return isPrivateIPv6(ip);
  return true; // inconnu = rejeté
}

/**
 * Valide une URL avant requête : schéma, port, résolution DNS, IPs.
 * resolver injectable pour les tests.
 * Retourne l'URL parsée ou lève une erreur SSRF_BLOCKED.
 */
async function assertSafeUrl(rawUrl, resolver = dns.lookup.bind(dns)) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    throw ssrfError(`URL invalide`);
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw ssrfError(`schéma interdit ${url.protocol}`);
  }
  const port = url.port ? Number(url.port) : url.protocol === 'https:' ? 443 : 80;
  if (!ALLOWED_PORTS.has(port)) {
    throw ssrfError(`port interdit ${port}`);
  }
  const hostname = url.hostname.replace(/^\[|\]$/g, ''); // IPv6 : [::1] -> ::1
  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) throw ssrfError('IP privée directe');
    return url;
  }
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    throw ssrfError('hôte local interdit');
  }
  let addresses;
  try {
    addresses = await resolver(hostname, { all: true, verbatim: true });
  } catch {
    throw ssrfError('résolution DNS impossible');
  }
  if (!addresses || addresses.length === 0) throw ssrfError('aucune adresse résolue');
  for (const { address } of addresses) {
    if (isPrivateIp(address)) throw ssrfError(`résout vers une adresse privée`);
  }
  return url;
}

function ssrfError(reason) {
  const error = new Error(`SSRF bloqué : ${reason}`);
  error.code = 'SSRF_BLOCKED';
  return error;
}

/**
 * fetch sécurisé : redirections suivies manuellement avec re-validation
 * SSRF à chaque saut, taille et content-type bornés.
 * fetcher/resolver injectables pour les tests.
 */
async function safeFetch(rawUrl, { fetcher = fetch, resolver } = {}) {
  let currentUrl = rawUrl;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const url = await assertSafeUrl(currentUrl, resolver);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let response;
    try {
      response = await fetcher(url.toString(), {
        redirect: 'manual',
        signal: controller.signal,
        headers: { 'User-Agent': 'RayanStudioProspection/1.0 (+https://www.rayanstudios.com)' },
      });
    } finally {
      clearTimeout(timer);
    }

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      if (!location) throw ssrfError('redirection sans Location');
      currentUrl = new URL(location, url).toString();
      continue; // re-validation au prochain tour de boucle
    }

    const contentType = response.headers.get('content-type') || '';
    if (response.ok && !ALLOWED_CONTENT_TYPES.test(contentType)) {
      throw ssrfError(`content-type interdit ${contentType.slice(0, 40)}`);
    }

    const reader = response.body?.getReader ? response.body.getReader() : null;
    let body = '';
    if (reader) {
      const decoder = new TextDecoder();
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        if (received > MAX_BODY_BYTES) {
          await reader.cancel();
          throw ssrfError('réponse trop volumineuse');
        }
        body += decoder.decode(value, { stream: true });
      }
    } else if (typeof response.text === 'function') {
      body = await response.text();
      if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
        throw ssrfError('réponse trop volumineuse');
      }
    }

    return { status: response.status, ok: response.ok, url: url.toString(), contentType, body };
  }
  throw ssrfError('trop de redirections');
}

module.exports = { assertSafeUrl, safeFetch, isPrivateIp, MAX_REDIRECTS, MAX_BODY_BYTES };
