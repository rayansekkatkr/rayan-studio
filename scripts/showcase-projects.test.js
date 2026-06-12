const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const showcaseSource = readFileSync(path.join(process.cwd(), "src/components/site/Showcase.tsx"), "utf8");

function getProjectArraySource(arrayName) {
  const start = showcaseSource.indexOf(`const ${arrayName} = [`);
  assert.notEqual(start, -1, `${arrayName} should exist`);

  const end = showcaseSource.indexOf("];", start);
  assert.notEqual(end, -1, `${arrayName} should be closed`);

  return showcaseSource.slice(start, end);
}

function getFirstProjectId(arrayName) {
  const projects = getProjectArraySource(arrayName);
  const firstId = projects.match(/id: "([^"]+)"/);
  assert.ok(firstId, `${arrayName} should contain project ids`);
  return firstId[1];
}

test("Showcase starts the active French and English project selection with Pick4Me", () => {
  assert.equal(getFirstProjectId("projectsFr"), "pick4me");
  assert.equal(getFirstProjectId("projectsEn"), "pick4me");
});

test("Showcase active project selection no longer includes Stampeo", () => {
  assert.doesNotMatch(getProjectArraySource("projectsFr"), /id: "stampeo"/);
  assert.doesNotMatch(getProjectArraySource("projectsEn"), /id: "stampeo"/);
});
