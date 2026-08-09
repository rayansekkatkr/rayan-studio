'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { pickOfficialSiteUrl, isExcludedHost } = require('./brave');

test('pickOfficialSiteUrl écarte annuaires et réseaux sociaux', () => {
  const url = pickOfficialSiteUrl([
    { url: 'https://www.pagesjaunes.fr/pros/12345' },
    { url: 'https://fr.linkedin.com/company/exemple' },
    { url: 'https://www.exemple-boulangerie.fr/accueil?utm=1' },
  ]);
  assert.equal(url, 'https://www.exemple-boulangerie.fr');
});

test('pickOfficialSiteUrl ne retourne que l\'origine, jamais chemin ni querystring', () => {
  const url = pickOfficialSiteUrl([{ url: 'https://site.fr/page/interne?token=abc' }]);
  assert.equal(url, 'https://site.fr');
});

test('pickOfficialSiteUrl retourne null si aucun candidat acceptable', () => {
  assert.equal(pickOfficialSiteUrl([{ url: 'https://facebook.com/page' }]), null);
  assert.equal(pickOfficialSiteUrl([]), null);
  assert.equal(pickOfficialSiteUrl([{ url: 'ftp://site.fr' }]), null);
});

test('isExcludedHost couvre les sous-domaines', () => {
  assert.ok(isExcludedHost('fr.linkedin.com'));
  assert.ok(isExcludedHost('www.pagesjaunes.fr'));
  assert.ok(!isExcludedHost('exemple.fr'));
  assert.ok(!isExcludedHost('notlinkedin.com.exemple.fr'));
});
