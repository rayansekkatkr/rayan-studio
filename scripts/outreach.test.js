const assert = require('node:assert/strict');
const test = require('node:test');

const {
  buildEmailContent,
  buildSearchQuery,
  getSearchTargets,
} = require('./outreach');

test('buildEmailContent creates a short human plain-text outreach email', () => {
  const details = {
    name: 'Boulangerie Martin',
    website: 'https://boulangerie-martin.fr',
  };

  const email = buildEmailContent(details);

  assert.match(email.subject, /site|question|avis/i);
  assert.ok(email.text, 'plain-text version is required');
  assert.match(email.text, /Bonjour/);
  assert.match(email.text, /Boulangerie Martin/);
  assert.match(email.text, /2-3 points simples/);
  assert.match(email.text, /Rayan/);
  assert.doesNotMatch(email.text, /performants|sur-mesure|tarifs transparents|convertir davantage/i);
  assert.ok(email.text.length < 900, 'message should stay short and personal');
});

test('buildEmailContent keeps a simple unsubscribe sentence', () => {
  const email = buildEmailContent({
    name: 'Hotel du Centre',
    website: 'https://hotelducentre.fr',
  });

  assert.match(email.text, /ne plus recevoir/i);
  assert.match(email.html, /ne plus recevoir/i);
});

test('buildEmailContent creates an English email for English-speaking markets', () => {
  const email = buildEmailContent({
    name: 'The Corner Bakery',
    website: 'https://cornerbakery.co.uk',
    language: 'en',
  });

  assert.match(email.subject, /website|question/i);
  assert.match(email.text, /Hello/);
  assert.match(email.text, /The Corner Bakery/);
  assert.match(email.text, /2-3 simple points/);
  assert.match(email.text, /free quick review/i);
  assert.match(email.text, /\/en/);
  assert.doesNotMatch(email.text, /Bonjour|désabonnement|petites entreprises/i);
});

test('buildSearchQuery targets francophone and English-speaking markets', () => {
  assert.equal(
    buildSearchQuery({ category: 'boulangerie', market: { query: 'Québec Canada' } }),
    'boulangerie Québec Canada',
  );
  assert.equal(
    buildSearchQuery({ category: 'bakery', market: { query: 'United Kingdom' } }),
    'bakery United Kingdom',
  );
});

test('getSearchTargets rotates across francophone and English-speaking markets', () => {
  const targets = getSearchTargets(0, 8, ['francophone', 'english']);
  const languages = new Set(targets.map((target) => target.market.language));
  const queries = targets.map((target) => buildSearchQuery(target));

  assert.ok(languages.has('fr'));
  assert.ok(languages.has('en'));
  assert.ok(queries.some((query) => query.includes('France')));
  assert.ok(queries.some((query) => query.includes('United Kingdom') || query.includes('United States')));
});
