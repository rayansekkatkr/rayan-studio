const axios = require('axios');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const STUDIO_URL = 'https://www.rayanstudios.com/';

// Grandes villes françaises en rotation pour couvrir tout le territoire
const FRENCH_CITIES = [
  'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier',
  'Strasbourg', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Toulon',
  'Grenoble', 'Dijon', 'Angers', 'Nîmes', 'Aix-en-Provence', 'Clermont-Ferrand',
  'Saint-Étienne', 'Brest', 'Tours', 'Amiens', 'Limoges', 'Perpignan', 'Metz',
  'Besançon', 'Orléans', 'Rouen',
];
const MAX_EMAILS_PER_DAY = 20;
const DELAY_BETWEEN_EMAILS_MS = 3000;

const CONTACTED_FILE = path.join(__dirname, 'contacted.json');

// Catégories métiers qui ont souvent besoin d'un site web
const BUSINESS_CATEGORIES = [
  'restaurant', 'boulangerie', 'salon de coiffure', 'salle de sport',
  'pharmacie', 'cabinet dentaire', 'cabinet d\'avocat', 'agence immobilière',
  'hôtel', 'boutique vêtements', 'café', 'plombier', 'électricien',
  'architecte', 'cabinet comptable', 'agence de voyage', 'fleuriste',
  'photographe', 'entreprise de construction', 'agence marketing',
  'traiteur', 'auto-école', 'kinésithérapeute', 'opticien',
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

function getDayOfYear() {
  return Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
}

function getTodayCategory() {
  return BUSINESS_CATEGORIES[getDayOfYear() % BUSINESS_CATEGORIES.length];
}

function getTodayCity() {
  return FRENCH_CITIES[getDayOfYear() % FRENCH_CITIES.length];
}

async function searchBusinesses(query, location) {
  const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
  try {
    const response = await axios.get(url, {
      params: { query: `${query} ${location}`, key: GOOGLE_API_KEY },
      timeout: 10000,
    });
    return response.data.results || [];
  } catch (err) {
    console.error(`Erreur recherche Google Places: ${err.message}`);
    return [];
  }
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

    // Priorité aux liens mailto
    const mailtoMatch = html.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/);
    if (mailtoMatch) return mailtoMatch[1].toLowerCase();

    // Fallback : regex email dans le HTML
    const emailRegex = /\b([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\b/g;
    const matches = [...html.matchAll(emailRegex)];
    const filtered = matches
      .map((m) => m[1].toLowerCase())
      .filter(
        (e) =>
          !e.includes('example') &&
          !e.includes('test@') &&
          !e.includes('@sentry') &&
          !e.includes('@google') &&
          !e.includes('@schema') &&
          !e.includes('noreply') &&
          !e.includes('no-reply')
      );

    return filtered[0] || null;
  } catch {
    return null;
  }
}

function buildEmailContent(businessName, hasWebsite) {
  const subject = hasWebsite
    ? `Refonte de votre site — Rayan Studios`
    : `Création de votre site web — Rayan Studios`;

  const intro = hasWebsite
    ? `En recherchant des entreprises locales comme la vôtre, j'ai consulté votre présence en ligne. Je pense sincèrement qu'une refonte moderne pourrait vous aider à convertir davantage de visiteurs en clients.`
    : `En cherchant des entreprises locales, j'ai remarqué que <strong>${businessName}</strong> ne dispose pas encore d'un site web. Aujourd'hui, c'est souvent le premier réflexe de vos clients potentiels : chercher votre activité en ligne.`;

  const html = `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 580px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
  <div style="padding: 32px 0 24px;">
    <p style="font-size: 16px; margin: 0 0 16px;">Bonjour,</p>
    <p style="font-size: 15px; margin: 0 0 16px;">
      Je m'appelle Rayan, fondateur de <strong>Rayan Studios</strong> — une agence web créant des sites modernes et performants pour des entreprises comme la vôtre.
    </p>
    <p style="font-size: 15px; margin: 0 0 16px;">${intro}</p>

    <p style="font-size: 15px; margin: 0 0 8px;">Ce que je propose :</p>
    <ul style="margin: 0 0 20px; padding-left: 20px; font-size: 15px;">
      <li>Design <strong>sur-mesure</strong> adapté à votre identité</li>
      <li>Site <strong>responsive</strong> (mobile, tablette, desktop)</li>
      <li><strong>Optimisation SEO</strong> pour être trouvé sur Google</li>
      <li>Livraison rapide, tarifs <strong>transparents</strong></li>
    </ul>

    <p style="font-size: 15px; margin: 0 0 20px;">
      Découvrez nos réalisations ici →
      <a href="${STUDIO_URL}" style="color: #7c3aed; font-weight: 600; text-decoration: none;">${STUDIO_URL}</a>
    </p>

    <p style="font-size: 15px; margin: 0 0 24px;">
      Je serais ravi d'échanger avec vous sur votre projet — même un échange de 15 minutes peut suffire pour voir si on peut travailler ensemble.
    </p>

    <p style="font-size: 15px; margin: 0;">
      Bonne journée,<br/>
      <strong>Rayan</strong><br/>
      <span style="color: #666;">Fondateur · Rayan Studios</span><br/>
      <a href="${STUDIO_URL}" style="color: #7c3aed; text-decoration: none;">${STUDIO_URL}</a>
    </p>
  </div>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0 16px;"/>
  <p style="font-size: 12px; color: #9ca3af; margin: 0;">
    Vous ne souhaitez plus recevoir de messages ? Répondez simplement avec "Désabonnement" en objet.
  </p>
</div>`;

  return { subject, html };
}

async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: `Rayan Studios <${GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  if (!GOOGLE_API_KEY || !GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('Variables manquantes : GOOGLE_PLACES_API_KEY, GMAIL_USER, GMAIL_APP_PASSWORD');
    process.exit(1);
  }

  const contactedData = loadContacted();
  const contactedPlaceIds = new Set(contactedData.contacted.map((c) => c.placeId));

  const category = getTodayCategory();
  const city = getTodayCity();
  console.log(`\nRecherche : "${category}" dans "${city}"`);

  const businesses = await searchBusinesses(category, city);
  console.log(`${businesses.length} résultats trouvés`);

  let emailsSent = 0;

  for (const business of businesses) {
    if (emailsSent >= MAX_EMAILS_PER_DAY) break;
    if (contactedPlaceIds.has(business.place_id)) {
      console.log(`[SKIP] Déjà contacté : ${business.name}`);
      continue;
    }

    const details = await getPlaceDetails(business.place_id);
    if (!details) continue;

    const websiteUrl = details.website || null;
    let email = null;

    if (websiteUrl) {
      console.log(`[SCAN] ${details.name} — ${websiteUrl}`);
      email = await extractEmailFromWebsite(websiteUrl);
    }

    if (!email) {
      console.log(`[SKIP] Pas d'email trouvé pour : ${details.name}`);
      continue;
    }

    const { subject, html } = buildEmailContent(details.name, !!websiteUrl);

    try {
      await sendEmail(email, subject, html);
      console.log(`[OK] Email envoyé à ${details.name} <${email}>`);

      contactedData.contacted.push({
        placeId: business.place_id,
        name: details.name,
        email,
        website: websiteUrl || null,
        address: details.formatted_address || null,
        sentAt: new Date().toISOString(),
      });
      contactedPlaceIds.add(business.place_id);
      emailsSent++;

      await sleep(DELAY_BETWEEN_EMAILS_MS);
    } catch (err) {
      console.error(`[ERREUR] Envoi échoué pour ${details.name}: ${err.message}`);
    }
  }

  saveContacted(contactedData);
  console.log(`\nTerminé — ${emailsSent} email(s) envoyé(s) aujourd'hui.`);
}

main();
