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

  test("desktop homepage follows the approved visual hierarchy", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop-only chapter layout");
    // Hierarchy is calibrated for real desktop screens, not the 1280x720 default.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/fr");
    const viewport = page.viewportSize()?.height ?? 0;
    const tolerance = 8;

    const heightOf = async (selector: string) =>
      page.locator(selector).first().evaluate((el) => el.getBoundingClientRect().height);

    // Editorial featured chapters: large, but below the immersive treatment.
    for (const key of ["pick4me", "pont-facturx"]) {
      const height = await heightOf(`[data-featured-project="${key}"]`);
      expect(height, `${key} large`).toBeGreaterThanOrEqual(viewport * 0.8);
      expect(height, `${key} below immersive`).toBeLessThan(viewport);
    }

    // GoodCall stays immersive: at least one viewport, may grow naturally.
    const goodcall = await heightOf(`[data-featured-project="goodcall"]`);
    expect(goodcall, "goodcall immersive").toBeGreaterThanOrEqual(viewport - tolerance);

    // Large supporting chapters: substantial but below the flagship treatment.
    for (const id of ["services", "studio", "offers"]) {
      const height = await heightOf(`section#${id} > div`);
      expect(height, `${id} substantial`).toBeGreaterThanOrEqual(viewport * 0.6);
      expect(height, `${id} below immersive`).toBeLessThan(viewport - tolerance);
    }

    // Compact editorial sections: clearly below one viewport.
    for (const id of ["method", "insights"]) {
      const height = await heightOf(`section#${id} > div`);
      expect(height, `${id} compact`).toBeLessThan(viewport - tolerance);
      expect(height, `${id} not collapsed`).toBeGreaterThan(viewport * 0.3);
    }
  });

  test("desktop featured work gives the product visual the dominant column", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "desktop-only two-column composition");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/fr");

    for (const key of ["pick4me", "pont-facturx"]) {
      const section = page.locator(`[data-featured-project="${key}"]`);
      const widthOf = (attr: string) =>
        section.locator(`[${attr}]`).first().evaluate((el) => el.getBoundingClientRect().width);
      const [copy, media] = await Promise.all([
        widthOf("data-project-copy"),
        widthOf("data-project-media"),
      ]);
      expect(media, `${key} media dominates copy`).toBeGreaterThan(copy);
    }
  });

  test("mobile homepage sections flow naturally without clipping", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile-only flow check");
    await page.goto("/fr");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, "horizontal overflow").toBeLessThanOrEqual(1);

    // A content-heavy section must not be clamped to the viewport height.
    const viewport = page.viewportSize()?.height ?? 0;
    const heroHeight = await page
      .locator("section#hero > div")
      .first()
      .evaluate((el) => el.getBoundingClientRect().height);
    expect(heroHeight).toBeGreaterThan(0);
    const offersHeight = await page
      .locator("section#offers > div")
      .first()
      .evaluate((el) => el.getBoundingClientRect().height);
    // natural flow: content may be shorter or taller than one screen, never zero/clipped
    expect(offersHeight).toBeGreaterThan(viewport * 0.3);
  });

  test("FR work CTA navigates to /fr/work", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("link", { name: "Voir nos réalisations" }).click();
    await expect(page).toHaveURL(/\/fr\/work$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Des produits conçus pour être utilisés/ }),
    ).toBeVisible();
  });
});
