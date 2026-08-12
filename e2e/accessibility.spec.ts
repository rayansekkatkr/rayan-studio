import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { acceptAnalytics } from "./fixtures";

const CRITICAL_PAGES = [
  "/fr",
  "/en",
  "/fr/services/applications-web-saas",
  "/fr/work",
  "/fr/work/pick4me",
  "/fr/studio/offres",
  "/fr/insights/guides/preparer-projet-saas",
  "/fr/contact",
  "/fr/demarrer-un-projet",
  "/site/restaurant/paris",
];

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

function formatViolations(violations: Array<{ id: string; impact?: string | null; nodes: Array<{ target: unknown }> }>) {
  return violations
    .map((violation) => `${violation.id} (${violation.impact}): ${violation.nodes.length} nodes`)
    .join("\n");
}

test.describe("accessibility", () => {
  for (const path of CRITICAL_PAGES) {
    test(`${path} has no WCAG A/AA violations`, async ({ page }) => {
      // Deliberate consent choice so the page is scanned in its settled state.
      await acceptAnalytics(page);
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      expect(results.violations, formatViolations(results.violations)).toEqual([]);
    });
  }

  test("cookie consent banner itself passes WCAG A/AA while visible", async ({ page }) => {
    // No stored choice: the banner must be visible and accessible.
    await page.goto("/fr");

    const acceptButton = page.getByRole("button", { name: "Accepter" });
    const bannerMounted = (await acceptButton.count()) > 0;
    // RootBody only mounts CookieConsent when NEXT_PUBLIC_GA_ID is configured.
    // Local/CI E2E runs have no GA ID, so the banner cannot render there; its
    // behavior stays covered by CookieConsent unit tests (Lot 04).
    test.skip(!bannerMounted, "NEXT_PUBLIC_GA_ID not configured; consent banner not mounted");

    await expect(acceptButton).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations, formatViolations(results.violations)).toEqual([]);
  });
});
