const assert = require("node:assert/strict");
const test = require("node:test");

const { buildLocalSeoContent } = require("../src/lib/local-seo-content");

test("buildLocalSeoContent creates specific content for a restaurant in Paris", () => {
  const content = buildLocalSeoContent({
    citySlug: "paris",
    cityLabel: "Paris",
    sectorSlug: "restaurant",
    sectorLabel: "Restaurant",
    objective: "Rendre la réservation et l'appel immédiats depuis mobile",
  });

  assert.match(content.metaTitle, /restaurant/i);
  assert.match(content.metaTitle, /Paris/);
  assert.ok(content.metaDescription.length > 120);
  assert.match(content.localContext, /Paris/);
  assert.ok(content.painPoints.some((point) => /réservation|menu|avis/i.test(point)));
});

test("buildLocalSeoContent varies city and sector content across local pages", () => {
  const restaurantParis = buildLocalSeoContent({
    citySlug: "paris",
    cityLabel: "Paris",
    sectorSlug: "restaurant",
    sectorLabel: "Restaurant",
    objective: "Rendre la réservation et l'appel immédiats depuis mobile",
  });
  const hotelLyon = buildLocalSeoContent({
    citySlug: "lyon",
    cityLabel: "Lyon",
    sectorSlug: "hotel",
    sectorLabel: "Hôtel",
    objective: "Faire remonter la demande directe avant les plateformes",
  });

  assert.notEqual(restaurantParis.localContext, hotelLyon.localContext);
  assert.notDeepEqual(restaurantParis.painPoints, hotelLyon.painPoints);
  assert.notDeepEqual(restaurantParis.checklist, hotelLyon.checklist);
});

test("buildLocalSeoContent falls back safely for unknown slugs", () => {
  const content = buildLocalSeoContent({
    citySlug: "unknown-city",
    cityLabel: "Ville",
    sectorSlug: "unknown-sector",
    sectorLabel: "Commerce",
    objective: "Rendre l'offre et les informations pratiques accessibles en un écran",
  });

  assert.match(content.metaTitle, /Commerce/);
  assert.match(content.localContext, /Ville/);
  assert.equal(content.painPoints.length, 3);
  assert.equal(content.checklist.length, 4);
});
