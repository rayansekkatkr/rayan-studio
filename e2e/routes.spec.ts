import { expect, test } from "@playwright/test";
// eslint-disable-next-line
import { LEGACY_REDIRECTS } from "../config/legacy-redirects.mjs";
import { getAllLocalSeoCombos } from "../src/lib/local-seo";
import { acceptAnalytics } from "./fixtures";

type Redirect = { source: string; destination: string; permanent: boolean };
const redirects = LEGACY_REDIRECTS as Redirect[];

test.describe("local SEO routes", () => {
  test("all 70 local routes return 200 without redirecting", async ({ request }) => {
    const combos = getAllLocalSeoCombos();
    expect(combos).toHaveLength(70);
    for (const { sector, city } of combos) {
      const response = await request.get(`/site/${sector.slug}/${city.slug}`, {
        maxRedirects: 0,
      });
      expect(response.status(), `/site/${sector.slug}/${city.slug}`).toBe(200);
    }
  });

  test("representative local page renders the studio shell and local intent", async ({ page }) => {
    await acceptAnalytics(page);
    await page.goto("/site/restaurant/paris");
    await expect(page.getByRole("link", { name: "RAYAN STUDIO" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/restaurant/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Paris/);
    await expect(
      page.getByRole("link", { name: "Recevoir un diagnostic adapté à mon activité" }),
    ).toHaveAttribute("href", "/fr/demarrer-un-projet");
    await expect(page.getByText(/Contexte local à Paris/)).toBeVisible();
  });
});

test.describe("legacy redirects", () => {
  test("all 15 sources return 308 to their exact destination", async ({ request }) => {
    expect(redirects).toHaveLength(15);
    const sources = redirects.map((redirect) => redirect.source);
    expect(new Set(sources).size).toBe(15);

    for (const redirect of redirects) {
      expect(redirect.source.startsWith("/site/"), redirect.source).toBe(false);
      const response = await request.get(redirect.source, { maxRedirects: 0 });
      expect(response.status(), redirect.source).toBe(308);
      const location = response.headers()["location"];
      expect(location, redirect.source).toBeTruthy();
      expect(location.endsWith(redirect.destination), `${redirect.source} -> ${location}`).toBe(
        true,
      );
    }
  });

  test("no redirect chain exists", async ({ request }) => {
    const sources = new Set(redirects.map((redirect) => redirect.source));
    for (const redirect of redirects) {
      expect(sources.has(redirect.destination), redirect.destination).toBe(false);
      const response = await request.get(redirect.destination, { maxRedirects: 0 });
      expect(response.status(), redirect.destination).toBe(200);
    }
  });
});

test.describe("canonical route families", () => {
  const FAMILIES: string[] = [
    "/fr/services/applications-web-saas",
    "/en/services/web-applications-saas",
    "/fr/studio/offres",
    "/en/studio/offers",
    "/fr/work/pick4me",
    "/en/work/pick4me",
    "/fr/insights/guides/preparer-projet-saas",
    "/en/insights/guides/prepare-saas-project",
    "/fr/contact",
    "/en/contact",
  ];

  for (const route of FAMILIES) {
    test(`${route} returns 200 without redirect`, async ({ request }) => {
      const response = await request.get(route, { maxRedirects: 0 });
      expect(response.status()).toBe(200);
    });
  }
});
