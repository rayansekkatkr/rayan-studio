const fs = require('fs');
const path = require('path');
const { extractEmailCandidates } = require('./outreach');
const { humanizeMessage, textToSimpleHtml } = require('./message-humanizer');

const OFFERS_FILE = path.join(__dirname, 'freelance-valid-offers.json');
const QUEUE_FILE = path.join(__dirname, 'freelance-contact-queue.json');
const QUEUE_MARKDOWN_FILE = path.join(__dirname, 'freelance-contact-queue.md');
const PORTFOLIO_URL = process.env.PORTFOLIO_URL || 'https://www.rayanstudios.com/fr';
const FETCH_TIMEOUT_MS = Number.parseInt(process.env.FREELANCE_CONTACT_FETCH_TIMEOUT_MS || '12000', 10);
const SEND_APPROVED = process.env.FREELANCE_CONTACT_SEND_APPROVED === 'true';
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

function normalizePhoneCandidate(value) {
  const raw = String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/[()[\].]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const digits = raw.replace(/\D/g, '');

  if (digits.length < 9 || digits.length > 15) return null;
  if (!/^\+/.test(raw)) return null;

  return raw;
}

function extractPhoneCandidates(html) {
  if (!html) return [];

  const source = String(html);
  const candidates = [];
  const phoneRegex = /(?:tel:)?(\+\d[\d\s().-]{7,}\d)/g;

  for (const match of source.matchAll(phoneRegex)) {
    candidates.push(match[1]);
  }

  const seen = new Set();
  const phones = [];

  for (const candidate of candidates) {
    const normalized = normalizePhoneCandidate(candidate);
    if (!normalized || seen.has(normalized)) continue;

    seen.add(normalized);
    phones.push(normalized);
  }

  return phones;
}

function extractOfferContactCandidates(html) {
  return {
    emails: extractEmailCandidates(html),
    phones: extractPhoneCandidates(html),
  };
}

function cleanTitle(value) {
  return String(value || 'your project')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)
    .trim() || 'your project';
}

function buildOfferAngle(offer) {
  const text = `${offer.title || ''} ${offer.url || ''}`.toLowerCase();

  if (/mern|react|node|full[-\s]?stack/.test(text)) {
    return 'My strongest fit here is React/Node full-stack delivery, including backend APIs, integrations and production deployment.';
  }

  if (/devops|docker|kubernetes|deployment|deploy|ci[-/\s]?cd|vps|cloud/.test(text)) {
    return 'My strongest fit here is the DevOps and deployment side: Docker, CI/CD, VPS/cloud setup, SSL/DNS and clean production handover.';
  }

  if (/stripe|payment|api|integration/.test(text)) {
    return 'My strongest fit here is API and payment integration work, including backend reliability and practical production checks.';
  }

  if (/shopify|wix|squarespace|wordpress|landing|e-?commerce/.test(text)) {
    return 'My strongest fit here is turning the business need into a clean, responsive implementation with the launch details handled properly.';
  }

  return 'My strongest fit here is taking a web product from a clear scope to a working, maintainable implementation.';
}

function buildFreelanceContactMessage(offer) {
  const title = cleanTitle(offer.title);
  const subject = `Regarding your project: ${title}`;
  const rawText = `Hi,

I saw your project "${title}" and wanted to reach out directly in case email is easier.

${buildOfferAngle(offer)}

I can help clarify the scope, then handle the implementation, API/backend work, responsive front-end, deployment details and clean handover.

Portfolio: ${PORTFOLIO_URL}

If you can share the current stack, priority features and timeline, I can reply with a concrete scope and estimate.

Best,
Rayan

If this reached you outside the platform and you prefer not to receive email, just reply "unsubscribe".

Project: ${offer.url || ''}`;

  const text = humanizeMessage(rawText, { language: 'en' });
  return {
    subject,
    text,
    html: textToSimpleHtml(text),
    humanized: true,
  };
}

async function defaultFetchHtml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function buildFreelanceContactQueue({
  offers,
  fetchHtml = defaultFetchHtml,
  generatedAt = new Date().toISOString(),
} = {}) {
  const contacts = [];
  const phoneOnly = [];
  const noPublicContact = [];
  const errors = [];
  const seenEmails = new Set();

  for (const offer of offers || []) {
    try {
      const html = await fetchHtml(offer.url);
      const contactCandidates = extractOfferContactCandidates(html);
      const message = buildFreelanceContactMessage(offer);

      if (contactCandidates.emails.length === 0 && contactCandidates.phones.length === 0) {
        noPublicContact.push({
          rank: offer.rank,
          title: offer.title,
          platform: offer.platform,
          url: offer.url,
          status: 'no_public_contact_found',
        });
        continue;
      }

      for (const email of contactCandidates.emails) {
        if (seenEmails.has(email)) continue;
        seenEmails.add(email);
        contacts.push({
          rank: offer.rank,
          title: offer.title,
          platform: offer.platform,
          url: offer.url,
          email,
          phones: contactCandidates.phones,
          status: 'needs_approval',
          approved: false,
          subject: message.subject,
          text: message.text,
          html: message.html,
          humanized: message.humanized,
        });
      }

      if (contactCandidates.emails.length === 0 && contactCandidates.phones.length > 0) {
        phoneOnly.push({
          rank: offer.rank,
          title: offer.title,
          platform: offer.platform,
          url: offer.url,
          phones: contactCandidates.phones,
          status: 'phone_only',
          suggestedMessage: message.text,
        });
      }
    } catch (err) {
      errors.push({
        rank: offer.rank,
        title: offer.title,
        platform: offer.platform,
        url: offer.url,
        error: err.message,
      });
    }
  }

  return {
    generatedAt,
    policy: {
      automaticSending: 'disabled_by_default',
      sendRequires: ['approved=true per contact', 'FREELANCE_CONTACT_SEND_APPROVED=true', 'GMAIL_USER', 'GMAIL_APP_PASSWORD'],
      note: 'Emails are prepared for manual approval to avoid bypassing platform rules or sending unsolicited bulk messages.',
    },
    summary: {
      scannedOffers: (offers || []).length,
      offersWithEmails: new Set(contacts.map((contact) => contact.url)).size,
      offersWithPhones: new Set([
        ...contacts.filter((contact) => contact.phones.length > 0).map((contact) => contact.url),
        ...phoneOnly.map((offer) => offer.url),
      ]).size,
      contactableEmails: contacts.length,
      phoneOnly: phoneOnly.length,
      noPublicContact: noPublicContact.length,
      errors: errors.length,
    },
    contacts,
    phoneOnly,
    noPublicContact,
    errors,
  };
}

function renderQueueMarkdown(queue) {
  const lines = [
    '# Freelance contact queue',
    '',
    `Generated at: ${queue.generatedAt}`,
    '',
    '## Policy',
    '',
    '- Automatic sending is disabled by default.',
    '- Every email starts as `needs_approval` with `approved: false`.',
    '- Sending requires `approved: true`, `FREELANCE_CONTACT_SEND_APPROVED=true`, and Gmail credentials.',
    '',
    '## Summary',
    '',
    `- Scanned offers: ${queue.summary.scannedOffers}`,
    `- Offers with emails: ${queue.summary.offersWithEmails}`,
    `- Offers with phones: ${queue.summary.offersWithPhones}`,
    `- Contactable emails: ${queue.summary.contactableEmails}`,
    `- Phone-only offers: ${queue.summary.phoneOnly}`,
    `- No public contact found: ${queue.summary.noPublicContact}`,
    `- Errors: ${queue.summary.errors}`,
    '',
  ];

  if (queue.contacts.length > 0) {
    lines.push('## Email Contacts', '');
    for (const contact of queue.contacts) {
      lines.push(
        `### ${contact.rank}. ${contact.title}`,
        '',
        `- Platform: ${contact.platform || 'n/a'}`,
        `- URL: ${contact.url}`,
        `- Email: ${contact.email}`,
        `- Phones: ${contact.phones.join(', ') || 'n/a'}`,
        `- Status: ${contact.status}`,
        `- Approved: ${contact.approved}`,
        `- Subject: ${contact.subject}`,
        '',
        '```text',
        contact.text,
        '```',
        '',
      );
    }
  }

  if (queue.phoneOnly.length > 0) {
    lines.push('## Phone Only', '');
    for (const offer of queue.phoneOnly) {
      lines.push(
        `### ${offer.rank}. ${offer.title}`,
        '',
        `- Platform: ${offer.platform || 'n/a'}`,
        `- URL: ${offer.url}`,
        `- Phones: ${offer.phones.join(', ')}`,
        '',
      );
    }
  }

  return `${lines.join('\n')}\n`;
}

async function sendApprovedContacts(queue) {
  if (!SEND_APPROVED) return { sent: [], skipped: queue.contacts.map((contact) => contact.email) };

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD');
  }

  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
  const sent = [];
  const skipped = [];

  for (const contact of queue.contacts) {
    if (!contact.approved) {
      skipped.push(contact.email);
      continue;
    }

    await transporter.sendMail({
      from: `Rayan Studio <${GMAIL_USER}>`,
      to: contact.email,
      subject: contact.subject,
      text: contact.text,
      html: contact.html,
    });
    contact.status = 'sent';
    contact.sentAt = new Date().toISOString();
    sent.push(contact.email);
  }

  return { sent, skipped };
}

function loadOffers(filePath = OFFERS_FILE) {
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return Array.isArray(parsed) ? parsed : parsed.offers || [];
}

async function main() {
  const offers = loadOffers();
  const queue = await buildFreelanceContactQueue({ offers });
  const sendResult = await sendApprovedContacts(queue);

  queue.sendResult = sendResult;
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
  fs.writeFileSync(QUEUE_MARKDOWN_FILE, renderQueueMarkdown(queue));

  console.log(`Contact queue written to ${QUEUE_FILE}`);
  console.log(`Markdown report written to ${QUEUE_MARKDOWN_FILE}`);
  console.log(`Emails found: ${queue.summary.contactableEmails}`);
  console.log(`Phones found on offers: ${queue.summary.offersWithPhones}`);
  console.log(`Emails sent: ${sendResult.sent.length}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}

module.exports = {
  buildFreelanceContactMessage,
  buildFreelanceContactQueue,
  extractOfferContactCandidates,
  extractPhoneCandidates,
  renderQueueMarkdown,
};
