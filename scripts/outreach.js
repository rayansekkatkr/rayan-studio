const axios = require('axios');
const nodemailer = require('nodemailer');
const dns = require('dns').promises;
const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const STUDIO_URL = process.env.STUDIO_URL || 'https://www.rayanstudios.com/';
const DRY_RUN = process.env.DRY_RUN === 'true';

function readPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const MAX_EMAILS_PER_DAY = readPositiveInteger(process.env.MAX_EMAILS_PER_DAY, 20);
const DELAY_BETWEEN_EMAILS_MS = readPositiveInteger(process.env.DELAY_BETWEEN_EMAILS_MS, 3000);
const SEARCH_TARGETS_PER_RUN = readPositiveInteger(
  process.env.SEARCH_TARGETS_PER_RUN || process.env.CATEGORIES_PER_RUN,
  12,
);
const GOOGLE_PLACES_MAX_PAGES = readPositiveInteger(process.env.GOOGLE_PLACES_MAX_PAGES, 3);
const GOOGLE_PLACES_PAGE_DELAY_MS = readPositiveInteger(process.env.GOOGLE_PLACES_PAGE_DELAY_MS, 2200);
const MAX_PLACES_TO_SCAN = readPositiveInteger(process.env.MAX_PLACES_TO_SCAN, 160);
const MAX_EMAILS_TO_EXTRACT = readPositiveInteger(process.env.MAX_EMAILS_TO_EXTRACT, 80);
const TARGET_MARKET_GROUPS = (process.env.TARGET_MARKET_GROUPS || 'francophone,english')
  .split(',')
  .map((group) => group.trim())
  .filter(Boolean);

const CONTACTED_FILE = path.join(__dirname, 'contacted.json');
const REPORT_FILE = path.join(__dirname, 'outreach-report.json');

const BLOCKED_EMAIL_TLDS = new Set([
  'png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'avif', 'ico',
  'css', 'js', 'json', 'xml', 'pdf', 'mp4', 'webm',
  'woff', 'woff2', 'ttf', 'eot',
]);

const BLOCKED_PLACEHOLDER_DOMAINS = new Set([
  'email.com',
  'example.com',
  'example.fr',
  'example.org',
  'domain.com',
  'yourdomain.com',
  'test.com',
]);

const BLOCKED_THIRD_PARTY_DOMAINS = new Set([
  'clearbit.com',
  'schema.org',
  'sentry.io',
]);

const BLOCKED_EXACT_EMAILS = new Set([
  'name@email.com',
  'jean.dupont@gmail.com',
  'john.doe@gmail.com',
  'jane.doe@gmail.com',
  'test@example.com',
]);

const BLOCKED_LOCAL_PARTS = new Set([
  'name',
  'email',
  'test',
  'example',
  'john.doe',
  'jane.doe',
  'jean.dupont',
  'firstname.lastname',
  'first.last',
  'yourname',
]);

const ASSET_LOCAL_PART_PATTERN = /(^|[._-])(asset|assets|avatar|banner|bg|background|footer|header|icn|icon|image|img|linkedin|logo|retina|social|sprite)([._-]|$)/;

// Catégories métiers qui ont souvent besoin d'un site web
const FRENCH_BUSINESS_CATEGORIES = [
  'restaurant', 'boulangerie', 'salon de coiffure', 'salle de sport',
  'pharmacie', 'cabinet dentaire', 'cabinet d\'avocat', 'agence immobilière',
  'hôtel', 'boutique vêtements', 'café', 'plombier', 'électricien',
  'architecte', 'cabinet comptable', 'agence de voyage', 'fleuriste',
  'photographe', 'entreprise de construction', 'agence marketing',
  'traiteur', 'auto-école', 'kinésithérapeute', 'opticien',
];

const ENGLISH_BUSINESS_CATEGORIES = [
  'restaurant', 'bakery', 'hair salon', 'gym',
  'pharmacy', 'dental clinic', 'law firm', 'real estate agency',
  'hotel', 'clothing store', 'cafe', 'plumber', 'electrician',
  'architect', 'accounting firm', 'travel agency', 'florist',
  'photographer', 'construction company', 'marketing agency',
  'caterer', 'driving school', 'physiotherapist', 'optician',
];

const TARGET_MARKETS = [
  {
    code: 'FR',
    group: 'francophone',
    language: 'fr',
    label: 'France',
    query: 'France',
    categories: FRENCH_BUSINESS_CATEGORIES,
  },
  {
    code: 'BE-FR',
    group: 'francophone',
    language: 'fr',
    label: 'Belgique francophone',
    query: 'Belgique francophone',
    categories: FRENCH_BUSINESS_CATEGORIES,
  },
  {
    code: 'CH-FR',
    group: 'francophone',
    language: 'fr',
    label: 'Suisse romande',
    query: 'Suisse romande',
    categories: FRENCH_BUSINESS_CATEGORIES,
  },
  {
    code: 'LU',
    group: 'francophone',
    language: 'fr',
    label: 'Luxembourg',
    query: 'Luxembourg',
    categories: FRENCH_BUSINESS_CATEGORIES,
  },
  {
    code: 'CA-QC',
    group: 'francophone',
    language: 'fr',
    label: 'Québec',
    query: 'Québec Canada',
    categories: FRENCH_BUSINESS_CATEGORIES,
  },
  {
    code: 'GB',
    group: 'english',
    language: 'en',
    label: 'United Kingdom',
    query: 'United Kingdom',
    categories: ENGLISH_BUSINESS_CATEGORIES,
  },
  {
    code: 'IE',
    group: 'english',
    language: 'en',
    label: 'Ireland',
    query: 'Ireland',
    categories: ENGLISH_BUSINESS_CATEGORIES,
  },
  {
    code: 'US',
    group: 'english',
    language: 'en',
    label: 'United States',
    query: 'United States',
    categories: ENGLISH_BUSINESS_CATEGORIES,
  },
  {
    code: 'CA-EN',
    group: 'english',
    language: 'en',
    label: 'English-speaking Canada',
    query: 'Canada',
    categories: ENGLISH_BUSINESS_CATEGORIES,
  },
  {
    code: 'AU',
    group: 'english',
    language: 'en',
    label: 'Australia',
    query: 'Australia',
    categories: ENGLISH_BUSINESS_CATEGORIES,
  },
  {
    code: 'NZ',
    group: 'english',
    language: 'en',
    label: 'New Zealand',
    query: 'New Zealand',
    categories: ENGLISH_BUSINESS_CATEGORIES,
  },
];

function loadContacted() {
  if (fs.existsSync(CONTACTED_FILE)) {
    return JSON.parse(fs.readFileSync(CONTACTED_FILE, 'utf8'));
  }
  return { contacted: [], lastUpdated: null };
}

function saveContacted(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(CONTACTED_FILE, JSON.stringify(data, null, 2));
}

function saveReport(report) {
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
}

function getDayOfYear() {
  return Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
}

function getMarketsForGroups(groups = TARGET_MARKET_GROUPS) {
  const selectedGroups = new Set(groups);
  return TARGET_MARKETS.filter((market) => selectedGroups.has(market.group));
}

function getSearchTargets(
  dayIndex = getDayOfYear(),
  targetCount = SEARCH_TARGETS_PER_RUN,
  groups = TARGET_MARKET_GROUPS,
) {
  const markets = getMarketsForGroups(groups);
  const targets = [];

  if (markets.length === 0) return targets;

  for (let index = 0; index < targetCount; index++) {
    const market = markets[(dayIndex + index) % markets.length];
    const category = market.categories[(dayIndex + index) % market.categories.length];
    targets.push({ category, market });
  }

  return targets;
}

function buildSearchQuery(target) {
  if (typeof target === 'string') {
    return `${target} France`;
  }

  return `${target.category} ${target.market.query}`;
}

async function searchBusinesses(query, maxPages = GOOGLE_PLACES_MAX_PAGES) {
  const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
  const results = [];
  let pageToken = null;

  try {
    for (let page = 0; page < maxPages; page++) {
      if (pageToken) {
        await sleep(GOOGLE_PLACES_PAGE_DELAY_MS);
      }

      const params = pageToken
        ? { pagetoken: pageToken, key: GOOGLE_API_KEY }
        : { query, key: GOOGLE_API_KEY };

      const response = await axios.get(url, {
        params,
        timeout: 10000,
      });

      results.push(...(response.data.results || []));
      pageToken = response.data.next_page_token || null;

      if (!pageToken) break;
    }
  } catch (err) {
    console.error(`Erreur recherche Google Places: ${err.message}`);
  }

  return results;
}

async function getPlaceDetails(placeId) {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json';
  try {
    const response = await axios.get(url, {
      params: {
        place_id: placeId,
        fields: 'name,formatted_address,website,formatted_phone_number',
        key: GOOGLE_API_KEY,
      },
      timeout: 10000,
    });
    return response.data.result || null;
  } catch {
    return null;
  }
}

function normalizeEmailCandidate(value) {
  if (!value) return null;

  let email = String(value).trim();
  email = email.replace(/^mailto:/i, '').split(/[?#]/)[0].trim();

  try {
    email = decodeURIComponent(email);
  } catch {
    // Garde la valeur brute si l'URL contient un encodage incomplet.
  }

  email = email
    .replace(/^["'<([{]+/, '')
    .replace(/[>"')\]}.,;:]+$/, '')
    .toLowerCase();

  return email || null;
}

function splitEmail(email) {
  const normalizedEmail = normalizeEmailCandidate(email);
  if (!normalizedEmail || normalizedEmail.split('@').length !== 2) return null;

  const [localPart, domain] = normalizedEmail.split('@');
  return { email: normalizedEmail, localPart, domain };
}

function invalidEmail(email, reason) {
  return { valid: false, email: normalizeEmailCandidate(email), reason };
}

function isLikelyDeliverableEmail(value) {
  const parts = splitEmail(value);
  if (!parts) return invalidEmail(value, 'invalid_format');

  const { email, localPart, domain } = parts;
  const labels = domain.split('.');
  const tld = labels[labels.length - 1];

  if (email.length > 254) return invalidEmail(email, 'too_long');
  if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(email)) {
    return invalidEmail(email, 'invalid_format');
  }
  if (!localPart || !domain || localPart.includes('..') || domain.includes('..')) {
    return invalidEmail(email, 'invalid_format');
  }
  if (
    labels.some((label) => (
      !label ||
      label.length > 63 ||
      label.startsWith('-') ||
      label.endsWith('-')
    ))
  ) {
    return invalidEmail(email, 'invalid_domain');
  }
  if (BLOCKED_EMAIL_TLDS.has(tld)) return invalidEmail(email, 'asset_extension');
  if (BLOCKED_EXACT_EMAILS.has(email)) return invalidEmail(email, 'placeholder_email');
  if (BLOCKED_PLACEHOLDER_DOMAINS.has(domain)) return invalidEmail(email, 'placeholder_domain');
  if (BLOCKED_THIRD_PARTY_DOMAINS.has(domain)) return invalidEmail(email, 'third_party_domain');
  if (BLOCKED_LOCAL_PARTS.has(localPart)) return invalidEmail(email, 'placeholder_local_part');
  if (/(^|[._-])(no-?reply|do-?not-?reply|sentry|schema|google)([._-]|$)/.test(localPart)) {
    return invalidEmail(email, 'technical_email');
  }
  if (/^2x([.-]|$)/.test(domain) || /(^|[.-])\d+x\d+([.-]|$)/.test(domain)) {
    return invalidEmail(email, 'asset_domain');
  }
  if (
    ASSET_LOCAL_PART_PATTERN.test(localPart) ||
    /^(image|img|sprite|icon|icn|logo)-?\d*$/.test(localPart)
  ) {
    return invalidEmail(email, 'asset_local_part');
  }

  return { valid: true, email };
}

function extractEmailCandidates(html) {
  if (!html) return [];

  const source = String(html);
  const candidates = [];
  const mailtoRegex = /mailto:([^"'<>\\\s]+)/gi;
  const emailRegex = /\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/g;

  for (const match of source.matchAll(mailtoRegex)) {
    candidates.push(match[1]);
  }

  for (const match of source.matchAll(emailRegex)) {
    candidates.push(match[1]);
  }

  const seen = new Set();
  const filtered = [];

  for (const candidate of candidates) {
    const validation = isLikelyDeliverableEmail(candidate);
    if (!validation.valid || seen.has(validation.email)) continue;

    seen.add(validation.email);
    filtered.push(validation.email);
  }

  return filtered;
}

async function hasDeliverableDomain(email) {
  const parts = splitEmail(email);
  if (!parts) return false;

  try {
    const mxRecords = await dns.resolveMx(parts.domain);
    if (mxRecords.length > 0) return true;
  } catch {
    // Certains petits domaines acceptent encore le mail via A/AAAA sans MX explicite.
  }

  try {
    const addressRecords = await dns.resolve4(parts.domain);
    if (addressRecords.length > 0) return true;
  } catch {
    try {
      const addressRecords = await dns.resolve6(parts.domain);
      return addressRecords.length > 0;
    } catch {
      return false;
    }
  }

  return false;
}

async function validateEmailBeforeSend(email) {
  const localValidation = isLikelyDeliverableEmail(email);
  if (!localValidation.valid) return localValidation;

  const hasMailDomain = await hasDeliverableDomain(localValidation.email);
  if (!hasMailDomain) {
    return { valid: false, email: localValidation.email, reason: 'domain_dns_missing' };
  }

  return localValidation;
}

async function extractEmailFromWebsite(websiteUrl) {
  try {
    const normalizedUrl = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
    const response = await axios.get(normalizedUrl, {
      timeout: 8000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
      },
      maxRedirects: 3,
    });

    const html = response.data;
    return extractEmailCandidates(html)[0] || null;
  } catch {
    return null;
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function displayUrl(value) {
  return String(value || '')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

function localizedStudioUrl(language) {
  const baseUrl = STUDIO_URL.replace(/\/$/, '');
  return `${baseUrl}/${language === 'en' ? 'en' : 'fr'}`;
}

function hashString(value) {
  return String(value || '').split('').reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0;
  }, 0);
}

function pickSubject(details) {
  const businessName = details.name || 'votre entreprise';
  const subjects = details.language === 'en'
    ? [
      'Quick question about your website',
      `About ${businessName}'s website`,
      'Your website',
    ]
    : [
      'Petite question sur votre site',
      `Au sujet du site de ${businessName}`,
      'Votre site web',
    ];

  return subjects[hashString(details.placeId || details.name || details.website) % subjects.length];
}

function scoreProspect(details, email) {
  let score = 0;
  const reasons = [];

  if (details.website) {
    score += 40;
    reasons.push('site existant');
  }

  if (email) {
    score += 30;
    reasons.push('email trouve');
  }

  if (details.formatted_phone_number) {
    score += 10;
    reasons.push('telephone disponible');
  }

  if (details.formatted_address) {
    score += 10;
    reasons.push('adresse locale');
  }

  if (details.name) {
    score += 5;
    reasons.push('fiche nommee');
  }

  return { score, reasons };
}

function buildEmailContent(details) {
  const language = details.language === 'en' ? 'en' : 'fr';
  const businessNameText = details.name || 'votre entreprise';
  const websiteText = displayUrl(details.website);
  const businessName = escapeHtml(businessNameText);
  const websiteUrl = escapeHtml(details.website);
  const websiteLabel = escapeHtml(websiteText);
  const studioUrlText = localizedStudioUrl(language);
  const studioUrl = escapeHtml(studioUrlText);
  const subject = pickSubject(details);

  if (language === 'en') {
    const text = `Hello,

I hope you don't mind me reaching out. I came across the website for ${businessNameText} (${websiteText}).

I work on website redesigns for small businesses, especially when the website already exists but no longer reflects the quality of the business.

Without wanting to be intrusive, I think there may be 2-3 simple points worth clarifying on your website: readability, mobile journey, contact path and overall image.

If useful, I can send you a free quick review of your website, with no obligation.

Best regards,
Rayan
Rayan Studio
${studioUrlText}

If you would rather not receive messages from me, simply reply "unsubscribe".`;

    const html = `
<div style="font-family: Arial, sans-serif; max-width: 560px; color: #17120f; line-height: 1.55;">
  <p>Hello,</p>

  <p>
    I hope you don't mind me reaching out. I came across the website for
    <strong>${businessName}</strong>
    (<a href="${websiteUrl}" style="color: #17120f;">${websiteLabel}</a>).
  </p>

  <p>
    I work on website redesigns for small businesses, especially when the website already exists
    but no longer reflects the quality of the business.
  </p>

  <p>
    Without wanting to be intrusive, I think there may be 2-3 simple points worth clarifying on your website:
    readability, mobile journey, contact path and overall image.
  </p>

  <p>If useful, I can send you a free quick review of your website, with no obligation.</p>

  <p>
    Best regards,<br/>
    Rayan<br/>
    Rayan Studio<br/>
    <a href="${studioUrl}" style="color: #17120f;">${studioUrl}</a>
  </p>

  <p style="font-size: 12px; color: #6f6256;">
    If you would rather not receive messages from me, simply reply "unsubscribe".
  </p>
</div>`;

    return { subject, text, html };
  }

  const text = `Bonjour,

Je me permets de vous écrire car je suis tombé sur le site de ${businessNameText} (${websiteText}).

Je travaille sur des refontes de sites pour petites entreprises, surtout quand le site existe déjà mais ne reflète plus vraiment la qualité de l’activité.

Sans vouloir être intrusif, je pense qu'il y aurait peut-être 2-3 points simples à clarifier sur votre site : lisibilité, parcours mobile, contact et image générale.

Si cela vous intéresse, je peux vous envoyer une mini lecture gratuite de votre site, sans engagement.

Bonne journée,
Rayan
Rayan Studio
${studioUrlText}

Si vous préférez ne plus recevoir de messages, répondez simplement "désabonnement".`;

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 560px; color: #17120f; line-height: 1.55;">
  <p>Bonjour,</p>

  <p>
    Je me permets de vous écrire car je suis tombé sur le site de
    <strong>${businessName}</strong>
    (<a href="${websiteUrl}" style="color: #17120f;">${websiteLabel}</a>).
  </p>

  <p>
    Je travaille sur des refontes de sites pour petites entreprises, surtout quand le site existe déjà
    mais ne reflète plus vraiment la qualité de l’activité.
  </p>

  <p>
    Sans vouloir être intrusif, je pense qu'il y aurait peut-être 2-3 points simples à clarifier sur votre site :
    lisibilité, parcours mobile, contact et image générale.
  </p>

  <p>Si cela vous intéresse, je peux vous envoyer une mini lecture gratuite de votre site, sans engagement.</p>

  <p>
    Bonne journée,<br/>
    Rayan<br/>
    Rayan Studio<br/>
    <a href="${studioUrl}" style="color: #17120f;">${studioUrl}</a>
  </p>

  <p style="font-size: 12px; color: #6f6256;">
    Si vous préférez ne plus recevoir de messages, répondez simplement "désabonnement".
  </p>
</div>`;

  return { subject, text, html };
}

async function sendEmail(to, subject, html, text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: `Rayan Studios <${GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  if (!GOOGLE_API_KEY) {
    console.error('Variable manquante : GOOGLE_PLACES_API_KEY');
    process.exit(1);
  }

  if (!DRY_RUN && (!GMAIL_USER || !GMAIL_APP_PASSWORD)) {
    console.error('Variables manquantes : GMAIL_USER, GMAIL_APP_PASSWORD');
    process.exit(1);
  }

  const contactedData = loadContacted();
  const contactedPlaceIds = new Set(contactedData.contacted.map((c) => c.placeId));

  const searchTargets = getSearchTargets();
  const report = {
    runAt: new Date().toISOString(),
    dryRun: DRY_RUN,
    queryMode: 'multilingual_markets',
    marketGroups: TARGET_MARKET_GROUPS,
    searchTargets: searchTargets.map((target) => ({
      category: target.category,
      marketCode: target.market.code,
      market: target.market.label,
      language: target.market.language,
      query: buildSearchQuery(target),
    })),
    maxEmailsPerDay: MAX_EMAILS_PER_DAY,
    maxEmailsToExtract: MAX_EMAILS_TO_EXTRACT,
    maxPlacesToScan: MAX_PLACES_TO_SCAN,
    scanned: 0,
    detailed: 0,
    skippedAlreadyContacted: 0,
    skippedNoDetails: 0,
    skippedNoWebsite: 0,
    skippedNoEmail: 0,
    skippedInvalidEmail: 0,
    skippedDuplicateEmail: 0,
    searches: [],
    candidates: [],
    sent: [],
    invalidEmails: [],
    errors: [],
  };

  console.log(`\nRecherche marchés ${TARGET_MARKET_GROUPS.join(', ')} : ${searchTargets.length} cible(s)`);
  console.log(DRY_RUN ? 'Mode DRY_RUN actif : aucun email ne sera envoye.' : 'Mode envoi actif.');

  const businessesByPlaceId = new Map();

  for (const target of searchTargets) {
    const searchQuery = buildSearchQuery(target);
    console.log(`[SEARCH] ${searchQuery}`);
    const results = await searchBusinesses(searchQuery);

    report.searches.push({
      category: target.category,
      marketCode: target.market.code,
      market: target.market.label,
      language: target.market.language,
      query: searchQuery,
      results: results.length,
    });

    for (const business of results) {
      if (!businessesByPlaceId.has(business.place_id)) {
        businessesByPlaceId.set(business.place_id, {
          ...business,
          matchedCategory: target.category,
          searchQuery,
          marketCode: target.market.code,
          marketLabel: target.market.label,
          marketGroup: target.market.group,
          language: target.market.language,
        });
      }
    }
  }

  const businesses = [...businessesByPlaceId.values()].slice(0, MAX_PLACES_TO_SCAN);
  console.log(`${businesses.length} fiche(s) unique(s) à scanner`);
  report.scanned = businesses.length;

  let preparedOrSentCount = 0;
  let contactedChanged = false;
  const extractedEmails = new Set(contactedData.contacted.map((contact) => contact.email).filter(Boolean));

  for (const business of businesses) {
    if (report.candidates.length >= MAX_EMAILS_TO_EXTRACT) break;

    if (contactedPlaceIds.has(business.place_id)) {
      console.log(`[SKIP] Déjà contacté : ${business.name}`);
      report.skippedAlreadyContacted++;
      continue;
    }

    const placeDetails = await getPlaceDetails(business.place_id);
    if (!placeDetails) {
      report.skippedNoDetails++;
      continue;
    }
    const details = {
      ...placeDetails,
      language: business.language || 'fr',
      marketCode: business.marketCode || null,
      marketLabel: business.marketLabel || null,
      marketGroup: business.marketGroup || null,
    };
    report.detailed++;

    const websiteUrl = details.website || null;
    let email = null;

    if (!websiteUrl) {
      console.log(`[SKIP] Pas de site web : ${details.name}`);
      report.skippedNoWebsite++;
      continue;
    }

    console.log(`[SCAN] ${details.name} — ${websiteUrl}`);
    email = await extractEmailFromWebsite(websiteUrl);

    if (!email) {
      console.log(`[SKIP] Pas d'email trouvé pour : ${details.name}`);
      report.skippedNoEmail++;
      continue;
    }

    const emailValidation = await validateEmailBeforeSend(email);
    if (!emailValidation.valid) {
      console.log(`[SKIP] Email invalide (${emailValidation.reason}) : ${details.name} <${email}>`);
      report.skippedInvalidEmail++;
      report.invalidEmails.push({
        placeId: business.place_id,
        name: details.name,
        email,
        reason: emailValidation.reason,
        website: websiteUrl,
        marketCode: business.marketCode || null,
        market: business.marketLabel || null,
        language: business.language || 'fr',
      });
      continue;
    }
    email = emailValidation.email;

    if (extractedEmails.has(email)) {
      console.log(`[SKIP] Email déjà extrait/contacté : ${details.name} <${email}>`);
      report.skippedDuplicateEmail++;
      continue;
    }

    const scoreInfo = scoreProspect(details, email);
    const candidate = {
      placeId: business.place_id,
      name: details.name,
      email,
      website: websiteUrl,
      phone: details.formatted_phone_number || null,
      address: details.formatted_address || null,
      matchedCategory: business.matchedCategory || null,
      searchQuery: business.searchQuery || null,
      marketCode: business.marketCode || null,
      market: business.marketLabel || null,
      marketGroup: business.marketGroup || null,
      language: business.language || 'fr',
      score: scoreInfo.score,
      reasons: scoreInfo.reasons,
    };
    report.candidates.push(candidate);
    extractedEmails.add(email);

    const { subject, html, text } = buildEmailContent(details);

    try {
      if (preparedOrSentCount >= MAX_EMAILS_PER_DAY) {
        console.log(`[LEAD] Email extrait sans envoi aujourd'hui : ${details.name} <${email}> — score ${scoreInfo.score}`);
      } else if (DRY_RUN) {
        console.log(`[DRY-RUN] Email pret pour ${details.name} <${email}> — score ${scoreInfo.score}`);
        report.sent.push({ ...candidate, status: 'dry-run', subject });
        preparedOrSentCount++;
      } else {
        await sendEmail(email, subject, html, text);
        console.log(`[OK] Email envoyé à ${details.name} <${email}> — score ${scoreInfo.score}`);

        contactedData.contacted.push({
          placeId: business.place_id,
          name: details.name,
          email,
          website: websiteUrl,
          phone: details.formatted_phone_number || null,
          address: details.formatted_address || null,
          marketCode: business.marketCode || null,
          market: business.marketLabel || null,
          marketGroup: business.marketGroup || null,
          language: business.language || 'fr',
          score: scoreInfo.score,
          reasons: scoreInfo.reasons,
          sentAt: new Date().toISOString(),
        });
        contactedPlaceIds.add(business.place_id);
        contactedChanged = true;
        report.sent.push({ ...candidate, status: 'sent', subject });
        preparedOrSentCount++;

        await sleep(DELAY_BETWEEN_EMAILS_MS);
      }
    } catch (err) {
      console.error(`[ERREUR] Envoi échoué pour ${details.name}: ${err.message}`);
      report.errors.push({
        placeId: business.place_id,
        name: details.name,
        email,
        error: err.message,
      });
    }
  }

  if (contactedChanged) {
    saveContacted(contactedData);
  }

  saveReport(report);
  console.log(`\nTerminé — ${report.candidates.length} email(s) extrait(s), ${preparedOrSentCount} prospect(s) ${DRY_RUN ? 'préparé(s)' : 'contacté(s)'} aujourd'hui.`);
  console.log(`Rapport écrit dans ${REPORT_FILE}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  buildSearchQuery,
  buildEmailContent,
  displayUrl,
  extractEmailCandidates,
  getSearchTargets,
  hasDeliverableDomain,
  isLikelyDeliverableEmail,
  pickSubject,
  scoreProspect,
  validateEmailBeforeSend,
};
