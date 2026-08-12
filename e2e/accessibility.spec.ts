import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { declineAnalytics } from "./fixtures";

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
      await declineAnalytics(page);
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      expect(results.violations, formatViolations(results.violations)).toEqual([]);
    });
  }

  test("cookie consent banner itself passes WCAG A/AA while visible", async ({ page }) => {
    // No stored choice: the real CookieConsent must mount (the E2E server runs
    // with the non-production test id NEXT_PUBLIC_GA_ID=G-TEST) and be scanned
    // while visible. This test fails if the banner does not render.
    await page.goto("/fr");
    await expect(page.getByRole("button", { name: "Accepter" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Refuser" })).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations, formatViolations(results.violations)).toEqual([]);
  });

  test("EN consent banner renders localized choices", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("button", { name: "Accept" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Decline" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Learn more" })).toBeVisible();
  });
});
