'use strict';

/**
 * Crawl d'audit : page d'accueil + 2 pages internes pertinentes maximum.
 * HTTP d'abord (safeFetch, protégé SSRF). Tout le contenu récupéré est
 * traité comme NON FIABLE : il n'alimente jamais d'instruction, seulement
 * des signaux structurés et de courts extraits nettoyés.
 */

const cheerio = require('cheerio');
const { safeFetch } = require('./ssrf-guard');
const { normalizeEmail, canonicalDomain } = require('./normalize');

const MAX_INTERNAL_PAGES = 2;
const INTERNAL_PAGE_HINTS = /contact|a-propos|apropos|about|mentions-legales|legal|services|prestations/i;
const FUNCTIONAL_ALIASES = /^(contact|info|infos|bonjour|hello|reservation|reservations|direction|commercial|accueil|boutique|magasin|cabinet|agence)@/;

const GENERIC_EMAIL_DOMAINS = new Set([
  'gmail.com', 'hotmail.com', 'hotmail.fr', 'outlook.com', 'outlook.fr',
  'yahoo.com', 'yahoo.fr', 'orange.fr', 'wanadoo.fr', 'free.fr', 'sfr.fr',
  'laposte.net', 'icloud.com', 'live.fr', 'live.com', 'protonmail.com',
]);

const EXAMPLE_EMAILS = /example|exemple|yourmail|votremail|email@|test@|noreply|no-reply|sentry|wixpress/i;

/** Extrait les emails d'un HTML : mailto d'abord, texte ensuite. */
function extractEmails(html, pageDomain) {
  const $ = cheerio.load(html);
  const found = new Map();

  const record = (raw, sourceKind) => {
    const email = normalizeEmail(String(raw).replace(/^mailto:/i, '').split('?')[0]);
    if (!email || EXAMPLE_EMAILS.test(email)) return;
    const domain = email.split('@')[1];
    const isFunctional = FUNCTIONAL_ALIASES.test(email);
    const sameDomain = pageDomain && canonicalDomain(domain) === pageDomain;
    // Une adresse générique (gmail...) est acceptable pour un commerce
    // local seulement si elle est publiée sur le site officiel.
    if (!sameDomain && GENERIC_EMAIL_DOMAINS.has(domain) && sourceKind !== 'mailto') return;
    if (!found.has(email)) {
      found.set(email, { email, isFunctional, sameDomain, source: sourceKind });
    }
  };

  $('a[href^="mailto:"]').each((_, el) => record($(el).attr('href'), 'mailto'));
  const text = $('body').text();
  const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  for (const m of matches) record(m, 'text');

  return [...found.values()].sort((a, b) => Number(b.isFunctional) - Number(a.isFunctional));
}

/** Signaux techniques structurés d'une page. Fonction pure. */
function extractSignals(html, { finalUrl, status }) {
  const $ = cheerio.load(html);
  const text = $('body').text().replace(/\s+/g, ' ');
  const htmlLower = html.toLowerCase();

  const copyrightYears = (text.match(/(?:©|&copy;|copyright)\s*(\d{4})/gi) || [])
    .map((m) => Number((m.match(/\d{4}/) || [])[0]))
    .filter((y) => y >= 1995 && y <= 2100);

  const lang = $('html').attr('lang') || null;
  const frenchHits = (text.match(/\b(nous|vous|notre|bienvenue|accueil|dcouvrez|découvrez|horaires|réservation|devis)\b/gi) || []).length;

  return {
    finalUrl,
    httpStatus: status,
    https: finalUrl.startsWith('https://'),
    htmlLang: lang,
    likelyFrench: Boolean((lang && lang.toLowerCase().startsWith('fr')) || frenchHits >= 5),
    title: ($('title').first().text() || '').trim().slice(0, 200) || null,
    metaDescription: ($('meta[name="description"]').attr('content') || '').trim().slice(0, 300) || null,
    hasViewportMeta: $('meta[name="viewport"]').length > 0,
    hasContactForm: $('form').toArray().some((f) => {
      const formHtml = $.html(f).toLowerCase();
      return /email|mail|message|nom|name|téléphone|telephone|phone/.test(formHtml);
    }),
    hasTelLink: $('a[href^="tel:"]').length > 0,
    hasMailtoLink: $('a[href^="mailto:"]').length > 0,
    hasWhatsappLink: htmlLower.includes('wa.me/') || htmlLower.includes('api.whatsapp.com'),
    hasReservationHint: /réserv|reservation|booking|commander|commande en ligne/i.test(text),
    manualProcessHint: /réservation par téléphone|réserver par téléphone|commande par téléphone|devis par mail|devis par email|formulaire pdf|téléchargez le formulaire|commandez par whatsapp/i.test(text),
    oldestCopyrightYear: copyrightYears.length ? Math.min(...copyrightYears) : null,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    builderHints: ['wix.com', 'squarespace', 'jimdo', 'weebly', 'wordpress', 'pagesjaunes'].filter((h) => htmlLower.includes(h)),
    jsRequiredHint: text.replace(/\s+/g, '').length < 200 && /enable javascript|activez javascript|<noscript/i.test(html),
  };
}

/** Choisit jusqu'à 2 pages internes pertinentes depuis la home. */
function pickInternalPages(html, baseUrl) {
  const $ = cheerio.load(html);
  const seen = new Set();
  const picks = [];
  $('a[href]').each((_, el) => {
    if (picks.length >= MAX_INTERNAL_PAGES) return;
    const href = $(el).attr('href');
    if (!href) return;
    let resolved;
    try {
      resolved = new URL(href, baseUrl);
    } catch {
      return;
    }
    if (resolved.origin !== new URL(baseUrl).origin) return;
    if (!INTERNAL_PAGE_HINTS.test(resolved.pathname)) return;
    const key = resolved.pathname.replace(/\/$/, '');
    if (seen.has(key) || key === '') return;
    seen.add(key);
    picks.push(resolved.toString());
  });
  return picks;
}

/** robots.txt : vérifie que le chemin n'est pas interdit à tous (User-agent: *). */
function isAllowedByRobots(robotsTxt, pathname) {
  if (!robotsTxt) return true;
  const lines = robotsTxt.split(/\r?\n/).map((l) => l.trim());
  let appliesToAll = false;
  const disallows = [];
  for (const line of lines) {
    const [rawKey, ...rest] = line.split(':');
    const key = rawKey.toLowerCase();
    const value = rest.join(':').trim();
    if (key === 'user-agent') appliesToAll = value === '*';
    else if (appliesToAll && key === 'disallow' && value) disallows.push(value);
  }
  return !disallows.some((rule) => pathname.startsWith(rule));
}

/**
 * Audit complet d'un site : home + pages internes, signaux fusionnés,
 * emails, preuves horodatées. deps injectables pour les tests.
 */
async function auditWebsite(siteUrl, deps = {}) {
  const fetchImpl = deps.safeFetch || safeFetch;
  const pages = [];
  const origin = new URL(siteUrl).origin;
  const domain = canonicalDomain(siteUrl);

  let robotsTxt = null;
  try {
    const robots = await fetchImpl(`${origin}/robots.txt`, deps.fetchOptions);
    if (robots.ok) robotsTxt = robots.body;
  } catch {
    robotsTxt = null; // pas de robots exploitable : on reste sur home + hints
  }

  if (!isAllowedByRobots(robotsTxt, '/')) {
    return { blockedByRobots: true, pages: [], emails: [], signals: null, evidence: [] };
  }

  const home = await fetchImpl(siteUrl, deps.fetchOptions);
  const homeSignals = extractSignals(home.body, { finalUrl: home.url, status: home.status });
  pages.push({ url: home.url, method: 'http', signals: homeSignals });

  let emails = extractEmails(home.body, domain);
  const internal = pickInternalPages(home.body, home.url)
    .filter((u) => isAllowedByRobots(robotsTxt, new URL(u).pathname));

  for (const pageUrl of internal) {
    try {
      const page = await fetchImpl(pageUrl, deps.fetchOptions);
      if (!page.ok) continue;
      const signals = extractSignals(page.body, { finalUrl: page.url, status: page.status });
      pages.push({ url: page.url, method: 'http', signals });
      const pageEmails = extractEmails(page.body, domain);
      const known = new Set(emails.map((e) => e.email));
      emails = emails.concat(pageEmails.filter((e) => !known.has(e.email)));
    } catch {
      // page interne en échec : non bloquant
    }
  }

  const merged = mergeSignals(pages.map((p) => p.signals));
  const evidence = buildEvidence(pages);

  return { blockedByRobots: false, pages, emails, signals: merged, evidence };
}

function mergeSignals(all) {
  if (all.length === 0) return null;
  const home = all[0];
  return {
    ...home,
    hasContactForm: all.some((s) => s.hasContactForm),
    hasTelLink: all.some((s) => s.hasTelLink),
    hasMailtoLink: all.some((s) => s.hasMailtoLink),
    hasWhatsappLink: all.some((s) => s.hasWhatsappLink),
    manualProcessHint: all.some((s) => s.manualProcessHint),
    pagesAudited: all.length,
  };
}

function buildEvidence(pages) {
  return pages.map((p) => ({
    url: p.url,
    collectedAt: new Date().toISOString(),
    method: p.method,
    signals: p.signals,
    confidence: 'observed',
  }));
}

module.exports = {
  extractEmails,
  extractSignals,
  pickInternalPages,
  isAllowedByRobots,
  auditWebsite,
};
