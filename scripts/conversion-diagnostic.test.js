const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const source = readFileSync(path.join(process.cwd(), "src/components/site/Contact.tsx"), "utf8");

test("Contact section explains the concrete free diagnosis deliverable", () => {
  assert.match(source, /Livrable diagnostic/);
  assert.match(source, /3 priorités d'action/);
  assert.match(source, /capture commentée/);
  assert.match(source, /réponse sous 24h/i);
});

test("Contact section keeps the English diagnosis deliverable clear", () => {
  assert.match(source, /Diagnosis deliverable/);
  assert.match(source, /3 action priorities/);
  assert.match(source, /annotated screenshot/);
});
