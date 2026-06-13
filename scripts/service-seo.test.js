const assert = require("node:assert/strict");
const test = require("node:test");

const {
  getAllServiceSeoPages,
  getServiceSeoPage,
  getServiceSeoPagesByLocale,
} = require("../src/lib/service-seo");

test("service SEO pages expose the phase 1 French and English routes", () => {
  const paths = getAllServiceSeoPages().map((page) => page.path).sort();

  assert.deepEqual(paths, [
    "/en/small-business-website",
    "/en/small-business-website-redesign-cost",
    "/en/website-redesign",
    "/fr/checklist-refonte-site-internet",
    "/fr/cout-refonte-site-internet-petite-entreprise",
    "/fr/creation-site-vitrine",
    "/fr/refonte-site-internet",
    "/fr/site-internet-petite-entreprise",
  ]);
});

test("service SEO pages keep one canonical page per locale and slug", () => {
  const redesign = getServiceSeoPage("fr", "refonte-site-internet");
  const english = getServiceSeoPage("en", "website-redesign");

  assert.equal(redesign.locale, "fr");
  assert.equal(redesign.intent, "refonte");
  assert.equal(english.locale, "en");
  assert.equal(english.intent, "refonte");
});

test("service SEO pages expose enough content for non-thin pages", () => {
  for (const page of getAllServiceSeoPages()) {
    assert.ok(page.title.length > 20, page.path);
    assert.ok(page.description.length > 90, page.path);
    assert.ok(page.sections.length >= 3, page.path);
    assert.ok(page.faq.length >= 3, page.path);
  }
});

test("service SEO pages by locale returns only matching localized routes", () => {
  assert.deepEqual(
    getServiceSeoPagesByLocale("en").map((page) => page.path).sort(),
    ["/en/small-business-website", "/en/small-business-website-redesign-cost", "/en/website-redesign"],
  );
  assert.deepEqual(
    getServiceSeoPagesByLocale("fr").map((page) => page.path).sort(),
    [
      "/fr/checklist-refonte-site-internet",
      "/fr/cout-refonte-site-internet-petite-entreprise",
      "/fr/creation-site-vitrine",
      "/fr/refonte-site-internet",
      "/fr/site-internet-petite-entreprise",
    ],
  );
});
