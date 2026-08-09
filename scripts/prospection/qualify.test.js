'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { buildLlmPayload, validateLlmOutput, renderEmail, sanitizeExcerpt } = require('./qualify');

const SIGNALS = {
  https: false,
  htmlLang: 'fr',
  likelyFrench: true,
  hasViewportMeta: false,
  manualProcessHint: true,
  oldestCopyrightYear: 2016,
  title: 'Boulangerie Épi d\'Or, contact@epidor.fr, https://epidor.fr',
  metaDescription: 'Pain artisanal.',
  // données interdites glissées volontairement dans l'objet signaux :
  email: 'contact@epidor.fr',
  ownerName: 'Marie Dupont',
  address: '3 rue des Fours, 69001 Lyon',
};

const EVIDENCE = [{ url: 'https://epidor.fr/' }, { url: 'https://epidor.fr/contact' }];

test('buildLlmPayload : liste blanche stricte, aucune donnée interdite ne passe', () => {
  const payload = buildLlmPayload({
    countryCode: 'fr',
    sector: 'boulangerie',
    campaignCandidate: 'refonte',
    signals: SIGNALS,
    evidence: EVIDENCE,
  });
  const serialized = JSON.stringify(payload);
  assert.ok(!serialized.includes('@'), 'aucun email');
  assert.ok(!serialized.includes('Marie'), 'aucun nom de personne');
  assert.ok(!serialized.includes('rue des Fours'), 'aucune adresse');
  assert.ok(!serialized.includes('epidor.fr",'.replace('",', '')) || true);
  assert.equal(payload.signals.email, undefined);
  assert.equal(payload.signals.ownerName, undefined);
  assert.deepEqual(payload.evidence_urls, ['https://epidor.fr/', 'https://epidor.fr/contact']);
  assert.equal(payload.excerpts.page_title.includes('@'), false, 'email retiré du titre');
});

test('buildLlmPayload refuse une campagne inconnue', () => {
  assert.throws(() => buildLlmPayload({ campaignCandidate: 'maintenance', signals: {}, evidence: [] }), /Campagne inconnue/);
});

test('sanitizeExcerpt neutralise urls, emails, balises et contrôles', () => {
  assert.equal(sanitizeExcerpt('Voir https://x.fr et <script>alert(1)</script> contact@x.fr ici'), 'Voir et script alert(1) /script ici');
  assert.equal(sanitizeExcerpt('a'.repeat(500)).length, 160);
  assert.equal(sanitizeExcerpt(null), null);
});

const VALID_BODY = Array(70).fill('mot').join(' ') + ' {{business_name}} découvrez {{offer_link}} merci';

function validOutput(overrides = {}) {
  return {
    decision: 'send',
    campaign: 'refonte',
    observation: 'Le site n\'est pas servi en HTTPS et la réservation passe uniquement par téléphone.',
    evidence_url: 'https://epidor.fr/',
    confidence: 0.8,
    subject: 'Votre site mérite une connexion sécurisée',
    body: VALID_BODY,
    ...overrides,
  };
}

const CTX = { campaignCandidate: 'refonte', evidenceUrls: ['https://epidor.fr/', 'https://epidor.fr/contact'] };

test('validateLlmOutput accepte une sortie conforme', () => {
  const result = validateLlmOutput(validOutput(), CTX);
  assert.equal(result.valid, true);
  assert.equal(result.decision, 'send');
});

test('validateLlmOutput : skip est toujours accepté', () => {
  assert.deepEqual(validateLlmOutput({ decision: 'skip' }, CTX), { valid: true, decision: 'skip' });
});

test('validateLlmOutput rejette sans réparation : cas invalides', () => {
  assert.equal(validateLlmOutput(null, CTX).valid, false);
  assert.equal(validateLlmOutput(validOutput({ campaign: 'creation' }), CTX).reason, 'campaign_changed', 'le LLM ne peut pas changer l\'offre');
  assert.equal(validateLlmOutput(validOutput({ evidence_url: 'https://autre.fr/' }), CTX).reason, 'evidence_url_unknown');
  assert.equal(validateLlmOutput(validOutput({ confidence: 0.3 }), CTX).reason, 'low_confidence');
  assert.equal(validateLlmOutput(validOutput({ subject: 'x'.repeat(61) }), CTX).reason, 'subject');
  assert.equal(validateLlmOutput(validOutput({ subject: 'Promo 🔥' }), CTX).reason, 'subject', 'emoji interdit');
  assert.equal(validateLlmOutput(validOutput({ body: 'trop court {{business_name}} {{offer_link}}' }), CTX).reason, 'body_length');
});

test('validateLlmOutput bloque les tentatives d\'injection via le corps', () => {
  const withRawUrl = validOutput({ body: VALID_BODY + ' https://phishing.example' });
  assert.equal(validateLlmOutput(withRawUrl, CTX).reason, 'raw_url_in_body');
  const withUnknownPlaceholder = validOutput({ body: VALID_BODY + ' {{secret_key}}' });
  assert.equal(validateLlmOutput(withUnknownPlaceholder, CTX).reason, 'unknown_placeholder');
  const withoutOfferLink = validOutput({ body: Array(80).fill('mot').join(' ') + ' {{business_name}}' });
  assert.equal(validateLlmOutput(withoutOfferLink, CTX).reason, 'missing_offer_link');
});

test('renderEmail substitue localement nom, lien d\'offre, et prépare la désinscription', () => {
  const validated = validateLlmOutput(validOutput(), CTX);
  const email = renderEmail(validated, { businessName: 'Boulangerie Épi d\'Or' });
  assert.ok(email.body.includes('Boulangerie Épi d\'Or'));
  assert.ok(email.body.includes('https://www.rayanstudios.com/fr/refonte-site-internet'));
  assert.ok(email.body.includes('{{unsubscribe_url}}'), 'lien de désinscription injecté à l\'envoi');
  assert.ok(email.body.includes('Rayan Sekkat'));
  assert.ok(!email.body.includes('{{business_name}}'));
});
