import { expect, test } from "@playwright/test";
import { declineAnalytics } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await declineAnalytics(page);
});

test.describe("Cyber Resilience Act page", () => {
  test("stands alone and leads to the prefilled diagnostic form", async ({ page }) => {
    await page.goto("/fr/cyber-resilience-act");
    await expect(
      page.getByRole("heading", { level: 1, name: "La conformité CRA pour les petits fabricants d'objets connectés." }),
    ).toBeVisible();

    // No link to the studio's web and software offers.
    const hrefs = await page.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
    expect(hrefs.filter((href) => /\/(services|work|demarrer-un-projet|studio)(\/|$)/.test(href))).toEqual([]);

    await page.getByRole("link", { name: "Réserver un diagnostic" }).first().click();
    await expect(page).toHaveURL(/#diagnostic$/);
    await expect(page.getByLabel("Sujet")).toHaveValue("Diagnostic CRA");
  });

  test("the FR services list links to the CRA page, the EN one does not", async ({ page }) => {
    await page.goto("/fr/services");
    await expect(page.locator("main").getByRole("link", { name: /Sécurité & conformité CRA/ })).toHaveAttribute(
      "href",
      "/fr/cyber-resilience-act",
    );
    await page.goto("/en/services");
    await expect(page.getByRole("link", { name: /CRA|Cyber Resilience/ })).toHaveCount(0);
  });

  test("the checklist article ends with the diagnostic call to action", async ({ page }) => {
    await page.goto("/fr/insights/checklists/cra-declarer-faille-24h");
    await expect(page.getByRole("link", { name: /Réserver un diagnostic/ })).toHaveAttribute(
      "href",
      "/fr/cyber-resilience-act#diagnostic",
    );
  });
});
