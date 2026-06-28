const fs = require('fs');
const path = require('path');
const { humanizeMessage } = require('./message-humanizer');

const STUDIO_URL = (process.env.STUDIO_URL || 'https://www.rayanstudios.com').replace(/\/$/, '');
const PORTFOLIO_URL = process.env.PORTFOLIO_URL || `${STUDIO_URL}/fr`;
const REPORT_FILE = path.join(__dirname, 'freelance-opportunities-report.json');

function readPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const MAX_OPPORTUNITIES = readPositiveInteger(process.env.MAX_OPPORTUNITIES, 30);
const FETCH_TIMEOUT_MS = readPositiveInteger(process.env.FREELANCE_FETCH_TIMEOUT_MS, 12000);
const REQUEST_DELAY_MS = readPositiveInteger(process.env.FREELANCE_REQUEST_DELAY_MS, 1500);
const MIN_SCORE = readPositiveInteger(process.env.FREELANCE_MIN_SCORE, 35);
const MAX_DEFAULT_SOURCES = readPositiveInteger(process.env.FREELANCE_MAX_DEFAULT_SOURCES, 18);

const WEB_INTENT_PATTERNS = [
  /refonte/i,
  /site\s+(internet|web|vitrine)/i,
  /creation\s+de\s+site/i,
  /landing\s+page/i,
  /web\s+app(?:lication)?/i,
  /website/i,
  /redesign/i,
  /wordpress/i,
  /webflow/i,
  /next\.?js/i,
];

const FULL_STACK_PATTERNS = [
  /full[-\s]?stack/i,
  /front[-\s]?end/i,
  /back[-\s]?end/i,
  /react/i,
  /next\.?js/i,
  /vue\.?js/i,
  /typescript/i,
  /node\.?js/i,
  /nest\.?js/i,
  /fastapi/i,
  /django/i,
  /postgres(?:ql)?/i,
  /prisma/i,
  /\bapi(?:s)?\b/i,
  /api\s+integration/i,
  /integration\s+api/i,
  /admin\s+(system|dashboard|interface|panel)/i,
  /back[-\s]?office/i,
  /saas/i,
  /e[-\s]?commerce/i,
  /plateforme\s+web/i,
  /web\s+platform/i,
];

const DEVOPS_PATTERNS = [
  /devops/i,
  /docker/i,
  /docker\s+compose/i,
  /kubernetes/i,
  /\bk8s\b/i,
  /github\s+actions/i,
  /gitlab\s+ci/i,
  /ci\/cd/i,
  /\bcicd\b/i,
  /deploy(?:ment)?/i,
  /deploiement/i,
  /déploiement/i,
  /mise\s+en\s+ligne/i,
  /hosting/i,
  /hebergement/i,
  /hébergement/i,
  /\bvps\b/i,
  /\bcloud\b/i,
  /\baws\b/i,
  /nginx/i,
  /caddy/i,
  /terraform/i,
  /ansible/i,
  /monitoring/i,
  /prometheus/i,
  /grafana/i,
  /\bssl\b/i,
  /\bdns\b/i,
];

const AUTOMATION_PATTERNS = [
  /automation/i,
  /automatisation/i,
  /workflow/i,
  /stripe/i,
  /payment/i,
  /paiement/i,
  /\bocr\b/i,
  /\bllm\b/i,
  /mistral/i,
  /celery/i,
  /async\s+worker/i,
  /websocket/i,
  /socket\.?io/i,
];

const SEO_PATTERNS = [
  /seo/i,
  /referencement/i,
  /visibilite/i,
  /google/i,
  /local/i,
];

const UX_PATTERNS = [
  /mobile/i,
  /responsive/i,
  /conversion/i,
  /contact/i,
  /parcours/i,
  /ux/i,
];

const TPE_PATTERNS = [
  /restaurant/i,
  /hotel/i,
  /boulangerie/i,
  /commerce/i,
  /artisan/i,
  /tpe/i,
  /small\s+business/i,
];

const URGENCY_PATTERNS = [
  /urgent/i,
  /rapidement/i,
  /avant\s+ouverture/i,
  /lancement/i,
  /deadline/i,
];

const WEAK_FIT_PATTERNS = [
  /logo/i,
  /instagram/i,
  /community\s+manager/i,
  /social\s+media/i,
  /reseaux\s+sociaux/i,
];

const REMOTE_PATTERNS = [
  /\bremote\b/i,
  /fully\s+remote/i,
  /remote\s+only/i,
  /work\s+from\s+home/i,
  /\bwfh\b/i,
  /anywhere/i,
  /worldwide/i,
  /teletravail/i,
  /a\s+distance/i,
  /distanciel/i,
  /travail\s+a\s+distance/i,
];

const ONSITE_PATTERNS = [
  /on[-\s]?site/i,
  /sur\s+site/i,
  /presentiel/i,
  /hybride/i,
  /\bhybrid\b/i,
  /in[-\s]?person/i,
  /office[-\s]?based/i,
  /in\s+office/i,
  /au\s+bureau/i,
  /en\s+bureau/i,
  /local\s+candidates/i,
  /relocation/i,
];

const PLATFORM_PLAYBOOK = [
  {
    name: 'Malt',
    angle: 'Priorite aux missions de refonte, site vitrine, landing page et SEO local.',
    note: 'Reponse courte, portfolio en lien, puis proposition de mini diagnostic avant devis.',
  },
  {
    name: 'Codeur.com',
    angle: 'Scanner les appels d offres web et filtrer les demandes trop low-cost ou hors site.',
    note: 'Repondre avec un perimetre clair: structure, maquette, developpement, mise en ligne.',
  },
  {
    name: 'RemoteOK / We Work Remotely',
    angle: 'Priorite aux offres full-stack, DevOps, platform engineering et web apps garanties remote.',
    note: 'Verifier le statut contract/freelance avant reponse, puis adapter le message au contexte international.',
  },
  {
    name: 'LinkedIn / reseaux',
    angle: 'Reperer les posts de dirigeants TPE qui cherchent un site ou une refonte.',
    note: 'Approche manuelle, ton humain, pas de message automatique en masse.',
  },
];

const DEFAULT_SEARCH_QUERIES = [
  'remote full stack web developer',
  'remote devops deployment',
  'remote api integration',
  'remote docker kubernetes deployment',
  'teletravail developpeur full stack',
  'teletravail deploiement devops',
  'remote next.js react node',
  'remote website maintenance',
  'remote website redesign',
  'remote website development',
  'remote wordpress deployment',
  'remote saas admin dashboard',
  'remote ci cd pipeline',
  'remote vps cloud deployment',
  'refonte site internet',
  'deploiement docker vps',
  'maintenance site web',
  'creation site internet',
];

const DEFAULT_PLATFORM_IDS = [
  'codeur',
  '404works',
  'freelancer',
  'peopleperhour',
  'remoteok',
];

const DEFAULT_PLATFORM_CATALOG = [
  {
    id: 'codeur',
    label: 'Codeur',
    urlForQuery: (query) => `https://www.codeur.com/projects?keywords=${encodeURIComponent(query)}`,
  },
  {
    id: '404works',
    label: '404Works',
    urlForQuery: (query) => `https://www.404works.com/fr/projects?search=${encodeURIComponent(query)}`,
  },
  {
    id: 'upwork',
    label: 'Upwork',
    urlForQuery: (query) => `https://www.upwork.com/freelance-jobs/${slugifySearchQuery(query)}/`,
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    urlForQuery: (query) => `https://www.freelancer.com/jobs/${slugifyFreelancerQuery(query)}`,
  },
  {
    id: 'peopleperhour',
    label: 'PeoplePerHour',
    urlForQuery: (query) => `https://www.peopleperhour.com/freelance-${slugifySearchQuery(query)}-jobs`,
  },
  {
    id: 'remoteok',
    label: 'RemoteOK',
    remoteGuaranteed: true,
    urlForQuery: (query) => `https://remoteok.com/remote-${slugifyRemoteJobQuery(query)}-jobs`,
  },
  {
    id: 'weworkremotely',
    label: 'We Work Remotely',
    remoteGuaranteed: true,
    urlForQuery: (query) => `https://weworkremotely.com/remote-jobs/search?term=${encodeURIComponent(query)}`,
  },
];

function splitList(value) {
  if (!value) return [];
  return String(value)
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugifySearchQuery(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugifyFreelancerQuery(value) {
  const normalized = normalizeText(value);

  if (/redesign|design|refonte|creation/.test(normalized) && /site|website|web/.test(normalized)) {
    return 'website-design';
  }

  if (/maintenance|maintaining|deployment|deploiement|deploy/.test(normalized)) {
    return 'website-management';
  }

  if (/full[- ]?stack|react|next|node|api|saas|admin/.test(normalized)) {
    return 'website-development';
  }

  if (/docker|kubernetes|devops|ci[-/ ]?cd|vps|cloud/.test(normalized)) {
    return 'devops';
  }

  if (/wordpress/.test(normalized)) return 'wordpress';
  if (/shopify/.test(normalized)) return 'shopify';
  if (/wix/.test(normalized)) return 'wix';

  return slugifySearchQuery(value);
}

function slugifyRemoteJobQuery(value) {
  const normalized = normalizeText(value)
    .replace(/\bremote\b/g, ' ')
    .replace(/\bteletravail\b/g, ' ')
    .replace(/\bdeveloppeur\b/g, 'developer')
    .replace(/\bdeploiement\b/g, 'deployment')
    .replace(/\bci cd\b/g, 'ci cd')
    .replace(/\s+/g, ' ')
    .trim();

  return slugifySearchQuery(normalized || 'developer');
}

function getDefaultPlatformCatalog(platforms = DEFAULT_PLATFORM_IDS) {
  const selected = new Set(platforms.map((platform) => normalizeText(platform)));
  return DEFAULT_PLATFORM_CATALOG.filter((platform) => selected.has(platform.id));
}

function buildDefaultSearchSources({
  platforms = splitList(process.env.FREELANCE_PLATFORMS),
  queries = splitList(process.env.FREELANCE_SEARCH_QUERIES),
  maxSources = MAX_DEFAULT_SOURCES,
} = {}) {
  const selectedPlatforms = platforms.length > 0 ? platforms : DEFAULT_PLATFORM_IDS;
  const selectedQueries = queries.length > 0 ? queries : DEFAULT_SEARCH_QUERIES;
  const catalog = getDefaultPlatformCatalog(selectedPlatforms);
  const sources = [];

  for (const query of selectedQueries) {
    for (const platform of catalog) {
      sources.push({
        name: `${platform.label} - ${query}`,
        url: platform.urlForQuery(query),
        platform: platform.id,
        searchQuery: query,
        remoteGuaranteed: Boolean(platform.remoteGuaranteed),
        autoDiscovered: true,
      });

      if (sources.length >= maxSources) return sources;
    }
  }

  return sources;
}

function normalizeSource(source, index) {
  if (typeof source === 'string') {
    return { name: `Source ${index}`, url: source };
  }

  if (!source || typeof source !== 'object') return null;

  const normalized = {
    name: source.name || source.label || `Source ${index}`,
  };

  if (source.url) normalized.url = source.url;
  if (source.htmlPath) normalized.htmlPath = source.htmlPath;
  if (source.html) normalized.html = source.html;
  if (source.platform) normalized.platform = source.platform;
  if (source.searchQuery) normalized.searchQuery = source.searchQuery;
  if (source.remoteGuaranteed) normalized.remoteGuaranteed = true;
  if (source.autoDiscovered) normalized.autoDiscovered = true;

  return normalized.url || normalized.htmlPath || normalized.html ? normalized : null;
}

function readSourceFile(sourceFile) {
  if (!sourceFile) return [];

  const absolutePath = path.isAbsolute(sourceFile)
    ? sourceFile
    : path.resolve(process.cwd(), sourceFile);
  const parsed = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  const rawSources = Array.isArray(parsed) ? parsed : parsed.sources || [];

  return rawSources;
}

function loadSearchSources({
  envUrls = process.env.FREELANCE_SEARCH_URLS,
  sourceFile = process.env.FREELANCE_SOURCE_FILE,
  useDefaultSources = process.env.FREELANCE_USE_DEFAULT_SOURCES !== 'false',
  defaultPlatforms = splitList(process.env.FREELANCE_PLATFORMS),
  defaultQueries = splitList(process.env.FREELANCE_SEARCH_QUERIES),
} = {}) {
  const rawSources = [
    ...readSourceFile(sourceFile),
    ...splitList(envUrls),
  ];

  if (rawSources.length === 0 && useDefaultSources) {
    return buildDefaultSearchSources({
      platforms: defaultPlatforms,
      queries: defaultQueries,
    });
  }

  const sources = [];
  const seen = new Set();

  for (const rawSource of rawSources) {
    const source = normalizeSource(rawSource, sources.length + 1);
    if (!source) continue;

    const key = source.url || source.htmlPath || source.name;
    if (seen.has(key)) continue;

    seen.add(key);
    sources.push(source);
  }

  return sources;
}

function decodeHtmlEntities(value) {
  return String(value || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripTags(value) {
  return decodeHtmlEntities(String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function firstMatch(source, regex) {
  const match = String(source || '').match(regex);
  return match ? stripTags(match[1]) : '';
}

function absoluteUrl(href, baseUrl) {
  if (!href || /^(javascript:|mailto:|tel:|#)/i.test(href)) return null;

  try {
    return new URL(decodeHtmlEntities(href), baseUrl).toString();
  } catch {
    return null;
  }
}

function isGenericPlatformUrl(value) {
  const url = String(value || '');
  return [
    /codeur\.com\/developpeur\//i,
    /freelancer\.com\/jobs\/[^/?#]+\/?$/i,
    /peopleperhour\.com\/freelance-[^/?#]+-jobs\/?$/i,
  ].some((pattern) => pattern.test(url));
}

function hostWithoutWww(value) {
  return String(value || '').replace(/^www\./i, '').toLowerCase();
}

function inferPlatformFromUrl(value) {
  try {
    const host = hostWithoutWww(new URL(value).hostname);
    if (host.endsWith('peopleperhour.com')) return 'peopleperhour';
    if (host.endsWith('freelancer.com')) return 'freelancer';
    if (host.endsWith('codeur.com')) return 'codeur';
    if (host.endsWith('404works.com')) return '404works';
    if (host.endsWith('remoteok.com')) return 'remoteok';
    if (host.endsWith('weworkremotely.com')) return 'weworkremotely';
    if (host.endsWith('upwork.com')) return 'upwork';
  } catch {
    return null;
  }

  return null;
}

function isRealOpportunityUrl(value, source = {}) {
  if (!value || isGenericPlatformUrl(value)) return false;

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }

  const platform = source.platform || inferPlatformFromUrl(source.url) || inferPlatformFromUrl(value);
  const host = hostWithoutWww(parsed.hostname);
  const pathName = parsed.pathname.replace(/\/+$/, '') || '/';

  if (platform === 'peopleperhour') {
    return host.endsWith('peopleperhour.com')
      && /^\/freelance-jobs\/.+\/[^/]+-\d+$/.test(pathName);
  }

  if (platform === 'freelancer') {
    return host.endsWith('freelancer.com')
      && /^\/projects\/[^/]+\/[^/]+$/.test(pathName);
  }

  if (platform === 'codeur') {
    return host.endsWith('codeur.com')
      && /^\/projects\/[^/]+/.test(pathName);
  }

  if (platform === '404works') {
    return host.endsWith('404works.com')
      && /^\/fr\/projects?\/[^/]+/.test(pathName);
  }

  if (platform === 'remoteok') {
    return host.endsWith('remoteok.com')
      && /^\/remote-jobs\/[^/]+/.test(pathName);
  }

  if (platform === 'weworkremotely') {
    return host.endsWith('weworkremotely.com')
      && /^\/remote-jobs\/[^/]+/.test(pathName);
  }

  if (platform === 'upwork') {
    return host.endsWith('upwork.com')
      && /^\/freelance-jobs\/[^/]+/.test(pathName);
  }

  return true;
}

function hasAnyPattern(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function getRemoteStatus(opportunity) {
  const contentText = normalizeText(
    `${opportunity.title || ''} ${opportunity.description || ''} ${opportunity.url || ''}`,
  );

  if (hasAnyPattern(contentText, ONSITE_PATTERNS)) {
    return {
      remoteOnly: false,
      remoteStatus: 'onsite_or_hybrid',
      remoteReason: 'mention sur site, presentiel ou hybride',
    };
  }

  if (hasAnyPattern(contentText, REMOTE_PATTERNS)) {
    return {
      remoteOnly: true,
      remoteStatus: 'remote',
      remoteReason: 'teletravail explicite dans la mission',
    };
  }

  if (isRemoteListingContext(opportunity)) {
    return {
      remoteOnly: true,
      remoteStatus: 'remote_listing',
      remoteReason: 'offre issue d une page de missions teletravail',
    };
  }

  if (opportunity.remoteGuaranteed) {
    return {
      remoteOnly: true,
      remoteStatus: 'remote_platform',
      remoteReason: 'plateforme garantie teletravail',
    };
  }

  return {
    remoteOnly: false,
    remoteStatus: 'unknown',
    remoteReason: 'teletravail non mentionne',
  };
}

function isRemoteListingContext(opportunity) {
  if (opportunity.platform !== 'peopleperhour' || !opportunity.sourceUrl) return false;

  try {
    const sourceUrl = new URL(opportunity.sourceUrl);
    return hostWithoutWww(sourceUrl.hostname).endsWith('peopleperhour.com')
      && /^\/freelance-remote-[^/]+-jobs\/?$/.test(sourceUrl.pathname);
  } catch {
    return false;
  }
}

function isPotentialOpportunity(opportunity) {
  const text = normalizeText(
    `${opportunity.title || ''} ${opportunity.description || ''} ${opportunity.url || ''}`,
  );
  return hasAnyPattern(text, [
    ...WEB_INTENT_PATTERNS,
    ...FULL_STACK_PATTERNS,
    ...DEVOPS_PATTERNS,
    ...AUTOMATION_PATTERNS,
    ...SEO_PATTERNS,
    ...UX_PATTERNS,
  ]);
}

function flattenJsonLd(value, items = []) {
  if (Array.isArray(value)) {
    for (const item of value) flattenJsonLd(item, items);
    return items;
  }

  if (!value || typeof value !== 'object') return items;

  items.push(value);

  if (value['@graph']) flattenJsonLd(value['@graph'], items);
  if (value.itemListElement) flattenJsonLd(value.itemListElement, items);
  if (value.item) flattenJsonLd(value.item, items);

  return items;
}

function jsonLdType(value) {
  const type = value && value['@type'];
  return Array.isArray(type) ? type.join(' ') : String(type || '');
}

function extractJsonLdOpportunities(html, source) {
  const opportunities = [];
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of String(html || '').matchAll(regex)) {
    try {
      const parsed = JSON.parse(decodeHtmlEntities(match[1]).trim());
      const items = flattenJsonLd(parsed);

      for (const item of items) {
        const title = item.title || item.name || item.headline;
        const description = item.description || item.text || '';
        const type = jsonLdType(item);
        const url = absoluteUrl(item.url || item.sameAs || '', source.url) || source.url || null;

        if (!title || !/jobposting|creativework|offer|project/i.test(type)) continue;

        const opportunity = {
          source: source.name,
          sourceUrl: source.url || null,
          platform: source.platform || null,
          searchQuery: source.searchQuery || null,
          remoteGuaranteed: Boolean(source.remoteGuaranteed),
          title: stripTags(title),
          description: stripTags(description),
          url,
          extractionMethod: 'json-ld',
        };

        if (isPotentialOpportunity(opportunity)) {
          opportunities.push(opportunity);
        }
      }
    } catch {
      // Ignore malformed JSON-LD from third-party pages.
    }
  }

  return opportunities;
}

function extractAnchorOpportunities(html, source) {
  const opportunities = [];
  const regex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const pageDescription = firstMatch(
    html,
    /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
  );

  for (const match of String(html || '').matchAll(regex)) {
    const title = stripTags(match[2]);
    if (title.length < 8) continue;

    const url = absoluteUrl(match[1], source.url);
    if (!url) continue;
    if (!isRealOpportunityUrl(url, source)) continue;

    const opportunity = {
      source: source.name,
      sourceUrl: source.url || null,
      platform: source.platform || null,
      searchQuery: source.searchQuery || null,
      remoteGuaranteed: Boolean(source.remoteGuaranteed),
      title,
      description: '',
      sourceDescription: pageDescription,
      url,
      extractionMethod: 'anchor',
    };

    if (isPotentialOpportunity(opportunity)) {
      opportunities.push(opportunity);
    }
  }

  return opportunities;
}

function dedupeOpportunities(opportunities) {
  const seen = new Set();
  const deduped = [];

  for (const opportunity of opportunities) {
    const key = opportunity.url || `${opportunity.source}:${normalizeText(opportunity.title)}`;
    if (!key || seen.has(key)) continue;

    seen.add(key);
    deduped.push(opportunity);
  }

  return deduped;
}

function extractOpportunitiesFromHtml(html, source) {
  const safeSource = {
    name: source.name || 'Source',
    url: source.url || 'https://example.invalid/',
    platform: source.platform || null,
    searchQuery: source.searchQuery || null,
    remoteGuaranteed: Boolean(source.remoteGuaranteed),
  };

  return dedupeOpportunities([
    ...extractJsonLdOpportunities(html, safeSource),
    ...extractAnchorOpportunities(html, safeSource),
  ]);
}

function scoreOpportunity(opportunity) {
  const text = `${opportunity.title || ''} ${opportunity.description || ''} ${opportunity.url || ''}`;
  const normalized = normalizeText(text);
  let score = 10;
  const reasons = [];

  if (hasAnyPattern(normalized, WEB_INTENT_PATTERNS)) {
    score += 45;
    reasons.push('besoin site/refonte');
  }

  if (hasAnyPattern(normalized, FULL_STACK_PATTERNS)) {
    score += 30;
    reasons.push('profil full-stack/platform');
  }

  if (hasAnyPattern(normalized, DEVOPS_PATTERNS)) {
    score += 30;
    reasons.push('DevOps, CI/CD ou deploiement');
  }

  if (hasAnyPattern(normalized, AUTOMATION_PATTERNS)) {
    score += 15;
    reasons.push('automation, paiement ou integration');
  }

  if (hasAnyPattern(normalized, SEO_PATTERNS)) {
    score += 20;
    reasons.push('SEO ou visibilite locale');
  }

  if (hasAnyPattern(normalized, UX_PATTERNS)) {
    score += 15;
    reasons.push('UX, mobile ou conversion');
  }

  if (hasAnyPattern(normalized, TPE_PATTERNS)) {
    score += 10;
    reasons.push('profil TPE/local');
  }

  if (hasAnyPattern(normalized, URGENCY_PATTERNS)) {
    score += 10;
    reasons.push('besoin court terme');
  }

  if (/(budget|eur|€|\$)/i.test(text)) {
    score += 5;
    reasons.push('budget mentionne');
  }

  if (hasAnyPattern(normalized, WEAK_FIT_PATTERNS) && !hasAnyPattern(normalized, WEB_INTENT_PATTERNS)) {
    score -= 25;
    reasons.push('hors coeur site web');
  }

  const clampedScore = Math.max(0, Math.min(100, score));
  return {
    score: clampedScore,
    fit: clampedScore >= 70 ? 'high' : clampedScore >= 45 ? 'medium' : 'low',
    reasons,
  };
}

function cleanMissionTitle(value) {
  return String(value || 'votre mission')
    .replace(/\s+Il y a\s+\d+\s+(minute|minutes|heure|heures|jour|jours|semaine|semaines|mois)\b/gi, '')
    .replace(/\s+Ouvert\b[\s\S]*$/i, '')
    .replace(/\s+\d+\s+Offres?\b[\s\S]*$/i, '')
    .replace(/\s+Je recherche\b[\s\S]*$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)
    .trim() || 'votre mission';
}

function buildProposalDraft(opportunity, { portfolioUrl = PORTFOLIO_URL } = {}) {
  const title = cleanMissionTitle(opportunity.title);
  const missionUrl = opportunity.url ? `\nMission: ${opportunity.url}` : '';
  const language = detectProposalLanguage(opportunity);

  if (language === 'en') {
    const angle = buildEnglishProposalAngle(opportunity);
    const rawDraft = `Hi,

I saw your project "${title}" and it looks close to the kind of full-stack/platform work I handle.

${angle}

I can help clarify the scope, then take care of the implementation, API/backend work, responsive front-end, deployment details, and clean handover.

Portfolio: ${portfolioUrl}

If you can share the current stack, priority features and timeline, I can reply with a concrete scope and estimate.

Best,
Rayan${missionUrl}`;

    return humanizeMessage(rawDraft, { language: 'en' });
  }

  const rawDraft = `Bonjour,

J'ai vu votre mission "${title}". Je peux vous aider sur la partie site.

Je commencerais par clarifier la structure et les priorites, puis je peux prendre en charge la maquette, le developpement, le responsive, le SEO de depart, le domaine/DNS et la mise en ligne.

Quelques exemples de mon travail: ${portfolioUrl}

Si vous avez l'URL actuelle, 2-3 references ou une contrainte de delai/budget, je peux vous repondre avec un perimetre concret et une estimation plus precise.

Bonne journee,
Rayan${missionUrl}`;

  return humanizeMessage(rawDraft, { language: 'fr' });
}

function detectProposalLanguage(opportunity) {
  const text = normalizeText(
    `${opportunity.title || ''} ${opportunity.description || ''} ${opportunity.source || ''}`,
  );

  if (opportunity.platform && ['peopleperhour', 'freelancer', 'remoteok', 'weworkremotely', 'upwork'].includes(opportunity.platform)) {
    return 'en';
  }

  if (hasAnyPattern(text, [
    /besoin/i,
    /recherche/i,
    /mission/i,
    /developpeur/i,
    /deploiement/i,
    /site\s+internet/i,
    /refonte/i,
  ])) {
    return 'fr';
  }

  return 'en';
}

function buildEnglishProposalAngle(opportunity) {
  const text = normalizeText(`${opportunity.title || ''} ${opportunity.description || ''}`);

  if (/mern|react|node|full[-\s]?stack/.test(text)) {
    return 'My strongest fit here is React/Node full-stack delivery, with the backend, API integrations and deployment side handled together rather than split across separate people.';
  }

  if (/devops|docker|kubernetes|ci\/cd|deployment|vps|cloud/.test(text)) {
    return 'My strongest fit here is the DevOps and deployment side: Docker, CI/CD, VPS/cloud setup, SSL/DNS and production handover.';
  }

  if (/stripe|payment|api|integration/.test(text)) {
    return 'My strongest fit here is API and payment integration work, including Stripe-style flows, backend reliability and practical production checks.';
  }

  if (/shopify|wix|squarespace|wordpress|landing|e-?commerce/.test(text)) {
    return 'My strongest fit here is turning the business goal into a clean, responsive implementation with the technical setup around launch handled properly.';
  }

  return 'My strongest fit here is taking a web product from a clear scope to a working, maintainable implementation.';
}

function enrichOpportunity(opportunity) {
  const scoreInfo = scoreOpportunity(opportunity);
  const remoteInfo = getRemoteStatus(opportunity);

  return {
    ...opportunity,
    score: scoreInfo.score,
    fit: scoreInfo.fit,
    reasons: scoreInfo.reasons,
    ...remoteInfo,
    proposalDraft: buildProposalDraft(opportunity),
  };
}

function buildReport({
  sources,
  opportunities,
  errors,
  maxOpportunities = MAX_OPPORTUNITIES,
  minScore = MIN_SCORE,
  requireRemoteOnly = process.env.FREELANCE_REQUIRE_REMOTE !== 'false',
  sourceMode = 'configured_sources',
}) {
  const scoredCandidates = dedupeOpportunities(opportunities)
    .map(enrichOpportunity)
    .filter((opportunity) => opportunity.score >= minScore);
  const remoteFilteredCandidates = requireRemoteOnly
    ? scoredCandidates.filter((opportunity) => opportunity.remoteOnly)
    : scoredCandidates;
  const remoteRejectedCount = requireRemoteOnly
    ? scoredCandidates.length - remoteFilteredCandidates.length
    : 0;
  const candidates = remoteFilteredCandidates
    .sort((a, b) => b.score - a.score)
    .slice(0, maxOpportunities);

  const hasSources = sources.length > 0;

  return {
    runAt: new Date().toISOString(),
    status: hasSources ? (candidates.length > 0 ? 'ready' : 'no_candidates') : 'needs_sources',
    sourceMode,
    sourceCount: sources.length,
    sources,
    scannedOpportunities: opportunities.length,
    scoredCandidateCount: scoredCandidates.length,
    remotePolicy: requireRemoteOnly ? 'explicit_remote_only' : 'disabled',
    remoteRejectedCount,
    candidateCount: candidates.length,
    maxOpportunities,
    minScore,
    nextStep: hasSources
      ? (
        sourceMode === 'default_platforms'
          ? 'Review candidates from the automatic platform catalog, then paste the proposalDraft into the platform.'
          : 'Review candidates manually, then paste the proposalDraft into the platform.'
      )
      : 'Configure FREELANCE_SEARCH_URLS or FREELANCE_SOURCE_FILE with public search/result pages to scan.',
    platformPlaybook: PLATFORM_PLAYBOOK,
    candidates,
    errors,
  };
}

async function resolveSourceHtml(source) {
  if (source.html) return source.html;

  if (source.htmlPath) {
    const absolutePath = path.isAbsolute(source.htmlPath)
      ? source.htmlPath
      : path.resolve(process.cwd(), source.htmlPath);
    return fs.readFileSync(absolutePath, 'utf8');
  }

  if (!source.url) {
    throw new Error(`Missing url or htmlPath for source "${source.name}"`);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(source.url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.text();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Timeout after ${FETCH_TIMEOUT_MS}ms`);
    }

    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

function saveReport(report) {
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const sources = loadSearchSources();
  const sourceMode = sources.some((source) => source.autoDiscovered)
    ? 'default_platforms'
    : 'configured_sources';
  const opportunities = [];
  const errors = [];

  if (sources.length === 0) {
    const report = buildReport({
      sources,
      opportunities,
      errors,
      maxOpportunities: MAX_OPPORTUNITIES,
      sourceMode,
    });

    saveReport(report);
    console.log('Aucune source configuree. Ajoutez FREELANCE_SEARCH_URLS ou FREELANCE_SOURCE_FILE.');
    console.log(`Rapport ecrit dans ${REPORT_FILE}`);
    return;
  }

  console.log(`Scan de ${sources.length} source(s) freelance (${sourceMode})`);

  for (const source of sources) {
    try {
      console.log(`[SCAN] ${source.name}`);
      const html = await resolveSourceHtml(source);
      const found = extractOpportunitiesFromHtml(html, source);
      opportunities.push(...found);
      console.log(`[OK] ${found.length} opportunite(s) extraite(s)`);
    } catch (err) {
      console.error(`[ERREUR] ${source.name}: ${err.message}`);
      errors.push({
        source: source.name,
        url: source.url || null,
        htmlPath: source.htmlPath || null,
        error: err.message,
      });
    }

    if (REQUEST_DELAY_MS > 0) {
      await sleep(REQUEST_DELAY_MS);
    }
  }

  const report = buildReport({
    sources,
    opportunities,
    errors,
    maxOpportunities: MAX_OPPORTUNITIES,
    sourceMode,
  });

  saveReport(report);
  console.log(`Termine - ${report.candidateCount} candidat(s) dans ${REPORT_FILE}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  buildProposalDraft,
  buildDefaultSearchSources,
  buildReport,
  dedupeOpportunities,
  extractOpportunitiesFromHtml,
  getRemoteStatus,
  loadSearchSources,
  scoreOpportunity,
};
