const assert = require("node:assert/strict");
const test = require("node:test");

const { buildPricingLeadDefaults } = require("../src/lib/pricing-leads");

test("buildPricingLeadDefaults maps the redesign offer to the dated-site form state in French", () => {
  const defaults = buildPricingLeadDefaults("redesign", "fr");

  assert.equal(defaults.projectType, "dated-site");
  assert.match(defaults.message, /Refonte Pro/);
  assert.match(defaults.message, /site actuel/);
});

test("buildPricingLeadDefaults maps the express offer to the no-site form state in English", () => {
  const defaults = buildPricingLeadDefaults("express", "en");

  assert.equal(defaults.projectType, "no-site");
  assert.match(defaults.message, /Express Creation/);
  assert.match(defaults.message, /first website/);
});

test("buildPricingLeadDefaults maps custom projects to other needs", () => {
  const defaults = buildPricingLeadDefaults("custom", "fr");

  assert.equal(defaults.projectType, "other");
  assert.match(defaults.message, /Sur mesure/);
});
