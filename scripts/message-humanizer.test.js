const assert = require('node:assert/strict');
const test = require('node:test');

const {
  humanizeMessage,
  textToSimpleHtml,
} = require('./message-humanizer');

test('humanizeMessage softens French marketing outreach while preserving facts', () => {
  const message = `Bonjour,

Je me permets de vous écrire car je propose des solutions sur-mesure pour optimiser votre présence digitale.
N'hésitez pas à revenir vers moi si cela vous intéresse.

https://www.rayanstudios.com/fr`;

  const humanized = humanizeMessage(message, { language: 'fr' });

  assert.match(humanized, /Je vous écris parce que/i);
  assert.match(humanized, /rendre votre site plus clair/i);
  assert.match(humanized, /vous pouvez me répondre/i);
  assert.match(humanized, /https:\/\/www\.rayanstudios\.com\/fr/);
  assert.doesNotMatch(humanized, /solutions sur-mesure|présence digitale|N'hésitez pas/i);
});

test('humanizeMessage softens English outreach while keeping the ask', () => {
  const message = `Hello,

I hope you don't mind me reaching out. I provide tailored solutions to optimize your digital presence.
If useful, I can send you a free quick review.`;

  const humanized = humanizeMessage(message, { language: 'en' });

  assert.match(humanized, /I came across/i);
  assert.match(humanized, /make your website clearer/i);
  assert.match(humanized, /free quick review/i);
  assert.doesNotMatch(humanized, /tailored solutions|digital presence/i);
});

test('textToSimpleHtml keeps paragraphs, links and unsubscribe lines readable', () => {
  const html = textToSimpleHtml(`Bonjour,

Voici le lien: https://www.rayanstudios.com/fr

Si vous préférez ne plus recevoir de messages, répondez simplement "désabonnement".`);

  assert.match(html, /<p>Bonjour,<\/p>/);
  assert.match(html, /href="https:\/\/www\.rayanstudios\.com\/fr"/);
  assert.match(html, /font-size: 12px/);
  assert.match(html, /désabonnement/);
});
