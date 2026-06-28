const assert = require('node:assert/strict');
const test = require('node:test');

const {
  buildFreelanceContactMessage,
  buildFreelanceContactQueue,
  extractOfferContactCandidates,
  extractPhoneCandidates,
} = require('./freelance-contact-queue');

test('extractPhoneCandidates extracts public phone numbers from offer HTML', () => {
  const phones = extractPhoneCandidates(`
    <p>Call us: +33 6 36 36 56 96</p>
    <p>UK office: +44 20 7946 0958</p>
    <p>Short code: 12345</p>
  `);

  assert.deepEqual(phones, ['+33 6 36 36 56 96', '+44 20 7946 0958']);
});

test('extractOfferContactCandidates returns emails and phones', () => {
  const contacts = extractOfferContactCandidates(`
    <a href="mailto:founder@clientproject.dev">Email founder</a>
    <p>Backup: product@clientstudio.co.uk</p>
    <p>Phone: +1 415 555 0188</p>
  `);

  assert.deepEqual(contacts.emails, ['founder@clientproject.dev', 'product@clientstudio.co.uk']);
  assert.deepEqual(contacts.phones, ['+1 415 555 0188']);
});

test('buildFreelanceContactMessage creates a humanized English offer reply', () => {
  const message = buildFreelanceContactMessage({
    title: 'Need a MERN stack developer',
    platform: 'peopleperhour',
    url: 'https://www.peopleperhour.com/freelance-jobs/technology-programming/website-development/need-a-mern-stack-developer-4501271',
  });

  assert.match(message.subject, /MERN stack developer/i);
  assert.match(message.text, /Hi,/);
  assert.match(message.text, /React\/Node|full-stack/i);
  assert.match(message.text, /https:\/\/www\.rayanstudios\.com\/fr/);
  assert.match(message.text, /If this reached you outside the platform/i);
  assert.equal(message.humanized, true);
  assert.doesNotMatch(message.text, /tailored solutions|digital presence/i);
});

test('buildFreelanceContactQueue records contactable and phone-only offers', async () => {
  const offers = [
    {
      rank: 1,
      title: 'Need a MERN stack developer',
      platform: 'peopleperhour',
      url: 'https://example.test/mern',
      proposalDraft: 'Hi, I can help.',
    },
    {
      rank: 2,
      title: 'Deployment of Ready Code',
      platform: 'peopleperhour',
      url: 'https://example.test/deploy',
      proposalDraft: 'Hi, I can help.',
    },
  ];
  const htmlByUrl = {
    'https://example.test/mern': '<a href="mailto:founder@clientproject.dev">Email</a><p>+44 20 7946 0958</p>',
    'https://example.test/deploy': '<p>Call +33 6 36 36 56 96</p>',
  };

  const queue = await buildFreelanceContactQueue({
    offers,
    fetchHtml: async (url) => htmlByUrl[url],
  });

  assert.equal(queue.summary.scannedOffers, 2);
  assert.equal(queue.summary.offersWithEmails, 1);
  assert.equal(queue.summary.offersWithPhones, 2);
  assert.equal(queue.summary.contactableEmails, 1);
  assert.equal(queue.contacts[0].email, 'founder@clientproject.dev');
  assert.equal(queue.contacts[0].status, 'needs_approval');
  assert.equal(queue.phoneOnly[0].phones[0], '+33 6 36 36 56 96');
});
