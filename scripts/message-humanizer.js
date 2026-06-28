function applyRewrites(text, rewrites) {
  return rewrites.reduce((current, [pattern, replacement]) => {
    return current.replace(pattern, replacement);
  }, text);
}

const FRENCH_REWRITES = [
  [/Je me permets de vous écrire car/gi, 'Je vous écris parce que'],
  [/Sans vouloir être intrusif, je pense qu'il y aurait peut-être/gi, 'En le parcourant rapidement, je vois peut-être'],
  [/Si cela vous intéresse/gi, "Si c'est utile"],
  [/N'hésitez pas à revenir vers moi/gi, 'vous pouvez me répondre'],
  [/solutions?\s+sur[- ]mesure/gi, 'un travail adapté à votre situation'],
  [/optimiser votre présence digitale/gi, 'rendre votre site plus clair'],
  [/présence digitale/gi, 'site web'],
  [/convertir davantage/gi, 'recevoir plus de demandes utiles'],
  [/performants?/gi, 'clair'],
];

const ENGLISH_REWRITES = [
  [/I hope you don't mind me reaching out\.?\s+I came across/gi, 'I came across'],
  [/I hope you don't mind me reaching out\.?\s*/gi, 'I came across your website. '],
  [/tailored solutions?/gi, 'practical work'],
  [/optimi[sz]e your digital presence/gi, 'make your website clearer'],
  [/digital presence/gi, 'website'],
  [/high-performing/gi, 'clear'],
];

function compactWhitespace(text) {
  return text
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function humanizeMessage(message, { language = 'fr' } = {}) {
  const rewrites = language === 'en' ? ENGLISH_REWRITES : FRENCH_REWRITES;
  return compactWhitespace(applyRewrites(String(message || ''), rewrites));
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function linkifyEscapedHtml(value) {
  return value.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" style="color: #17120f;">$1</a>',
  );
}

function isUnsubscribeBlock(block) {
  return /unsubscribe|désabonnement|ne plus recevoir/i.test(block);
}

function textToSimpleHtml(text) {
  const blocks = compactWhitespace(text).split(/\n{2,}/).filter(Boolean);
  const paragraphs = blocks.map((block) => {
    const escapedLines = block
      .split('\n')
      .map((line) => linkifyEscapedHtml(escapeHtml(line)));
    const style = isUnsubscribeBlock(block)
      ? ' style="font-size: 12px; color: #6f6256;"'
      : '';

    return `  <p${style}>${escapedLines.join('<br/>')}</p>`;
  });

  return `<div style="font-family: Arial, sans-serif; max-width: 560px; color: #17120f; line-height: 1.55;">
${paragraphs.join('\n\n')}
</div>`;
}

module.exports = {
  humanizeMessage,
  textToSimpleHtml,
};
