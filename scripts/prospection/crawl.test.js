'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

process.env.SUPPRESSION_HMAC_SECRET = 'test-secret-0123456789abcdef';

const { extractEmails, extractSignals, pickInternalPages, isAllowedByRobots, auditWebsite } = require('./crawl');

const HOME_HTML = `
<html lang="fr"><head>
  <title>Boulangerie Épi d'Or, Lyon</title>
  <meta name="description" content="Pain artisanal au levain à Lyon 1er.">
</head><body>
  <nav><a href="/contact">Contact</a><a href="/a-propos">À propos</a><a href="/menu.pdf">Menu</a>
  <a href="https://facebook.com/epidor">FB</a></nav>
  <p>Bienvenue ! Nous vous accueillons du mardi au dimanche. Découvrez notre pain au levain.
  Réservation par téléphone uniquement au 04 78 00 00 00.</p>
  <a href="tel:+33478000000">Appeler</a>
  <footer>© 2017 Épi d'Or</footer>
</body></html>`;

const CONTACT_HTML = `
<html lang="fr"><body>
  <h1>Contact</h1>
  <a href="mailto:contact@epidor.fr?subject=Question">Écrivez-nous</a>
  <p>Ou par mail : marie.dupont@gmail.com (personnel, ne pas utiliser)</p>
  <p>exemple : votre-email@example.com</p>
  <form><input name="nom"><input name="email"><textarea name="message"></textarea></form>
</body></html>`;

test('extractEmails : mailto prioritaire, alias fonctionnel détecté, exemples exclus', () => {
  const emails = extractEmails(CONTACT_HTML, 'epidor.fr');
  const contact = emails.find((e) => e.email === 'contact@epidor.fr');
  assert.ok(contact);
  assert.equal(contact.isFunctional, true);
  assert.equal(contact.sameDomain, true);
  assert.ok(!emails.some((e) => e.email.includes('example.com')));
  assert.equal(emails[0].email, 'contact@epidor.fr', 'fonctionnel trié en premier');
});

test('extractEmails : générique hors domaine accepté seulement en mailto', () => {
  const emails = extractEmails(CONTACT_HTML, 'epidor.fr');
  assert.ok(!emails.some((e) => e.email === 'marie.dupont@gmail.com'), 'gmail en texte simple exclu');
  const mailtoGmail = extractEmails('<a href="mailto:bonjour@gmail.com">mail</a>', 'epidor.fr');
  assert.ok(mailtoGmail.some((e) => e.email === 'bonjour@gmail.com'), 'gmail en mailto publié = accepté');
});

test('extractSignals : signaux structurés observables uniquement', () => {
  const signals = extractSignals(HOME_HTML, { finalUrl: 'https://epidor.fr/', status: 200 });
  assert.equal(signals.https, true);
  assert.equal(signals.htmlLang, 'fr');
  assert.equal(signals.likelyFrench, true);
  assert.equal(signals.hasViewportMeta, false);
  assert.equal(signals.hasTelLink, true);
  assert.equal(signals.manualProcessHint, true, 'réservation par téléphone détectée');
  assert.equal(signals.oldestCopyrightYear, 2017);
  assert.ok(signals.title.includes('Boulangerie'));
});

test('pickInternalPages : 2 pages internes pertinentes max, même origine', () => {
  const picks = pickInternalPages(HOME_HTML, 'https://epidor.fr/');
  assert.deepEqual(picks, ['https://epidor.fr/contact', 'https://epidor.fr/a-propos']);
});

test('isAllowedByRobots respecte Disallow pour User-agent *', () => {
  const robots = 'User-agent: *\nDisallow: /admin\nDisallow: /contact';
  assert.equal(isAllowedByRobots(robots, '/contact'), false);
  assert.equal(isAllowedByRobots(robots, '/'), true);
  assert.equal(isAllowedByRobots(null, '/x'), true);
  assert.equal(isAllowedByRobots('User-agent: *\nDisallow: /', '/'), false);
});

function fakeSafeFetch(routes) {
  return async (url) => {
    const key = Object.keys(routes).find((k) => url === k || url.startsWith(k));
    if (!key) return { status: 404, ok: false, url, contentType: 'text/html', body: '' };
    return { status: 200, ok: true, url, contentType: 'text/html', body: routes[key] };
  };
}

test('auditWebsite : home + pages internes, emails et signaux fusionnés, preuves datées', async () => {
  const result = await auditWebsite('https://epidor.fr/', {
    safeFetch: fakeSafeFetch({
      'https://epidor.fr/robots.txt': 'User-agent: *\nDisallow: /admin',
      'https://epidor.fr/contact': CONTACT_HTML,
      'https://epidor.fr/a-propos': '<html lang="fr"><body>Notre histoire depuis 1990.</body></html>',
      'https://epidor.fr/': HOME_HTML,
    }),
  });
  assert.equal(result.blockedByRobots, false);
  assert.equal(result.pages.length, 3);
  assert.ok(result.emails.some((e) => e.email === 'contact@epidor.fr'));
  assert.equal(result.signals.hasContactForm, true, 'formulaire vu sur la page contact');
  assert.equal(result.signals.manualProcessHint, true);
  assert.ok(result.evidence.every((e) => e.url && e.collectedAt && e.method === 'http'));
});

test('auditWebsite : site interdit par robots.txt -> aucun crawl', async () => {
  const result = await auditWebsite('https://epidor.fr/', {
    safeFetch: fakeSafeFetch({
      'https://epidor.fr/robots.txt': 'User-agent: *\nDisallow: /',
    }),
  });
  assert.equal(result.blockedByRobots, true);
  assert.equal(result.pages.length, 0);
  assert.equal(result.emails.length, 0);
});
