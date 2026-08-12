import { expect, test } from "@playwright/test";
import { declineAnalytics } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await declineAnalytics(page);
});

test.describe("homepage", () => {
  test("FR home renders the approved hero and CTAs", async ({ page }) => {
    await page.goto("/fr");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Des produits digitaux conçus pour faire avancer votre entreprise.",
      }),
    ).toBeVisible();

    const startCta = page.getByRole("link", { name: "Parler de votre projet" }).first();
    await expect(startCta).toHaveAttribute("href", "/fr/demarrer-un-projet");
    await expect(page.getByRole("link", { name: "Voir nos réalisations" })).toHaveAttribute(
      "href",
      "/fr/work",
    );
  });

  test("EN home renders the approved hero and CTAs", async ({ page }) => {
    await page.goto("/en");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Digital products built to move your business forward.",
      }),
    ).toBeVisible();

    const startCta = page.getByRole("link", { name: "Start a project" }).first();
    await expect(startCta).toHaveAttribute("href", "/en/start-a-project");
    await expect(page.getByRole("link", { name: "View our work" })).toHaveAttribute(
      "href",
      "/en/work",
    );
  });

  for (const locale of ["fr", "en"] as const) {
    test(`${locale} featured work keeps the approved order`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const keys = await page
        .locator("[data-featured-project]")
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-featured-project")));
      expect(keys).toEqual(["pick4me", "pont-facturx", "goodcall"]);
    });
  }

  test("FR work CTA navigates to /fr/work", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("link", { name: "Voir nos réalisations" }).click();
    await expect(page).toHaveURL(/\/fr\/work$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Des produits conçus pour être utilisés/ }),
    ).toBeVisible();
  });
});
