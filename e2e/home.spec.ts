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
        name: "Sites web, applications et logiciels sur mesure.",
      }),
    ).toBeVisible();

    const quoteCta = page.getByRole("link", { name: "Demander un devis gratuit" }).first();
    await expect(quoteCta).toHaveAttribute("href", "/fr/devis-gratuit");
    await expect(page.getByRole("link", { name: /Sites web & refonte/ }).first()).toHaveAttribute(
      "href",
      "/fr/site-internet-commerces-pme",
    );
    await expect(page.getByRole("link", { name: /Applications & SaaS/ }).first()).toHaveAttribute(
      "href",
      "/fr/developpement-application-saas",
    );
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
        name: "Websites, applications and custom software.",
      }),
    ).toBeVisible();

    const quoteCta = page.getByRole("link", { name: "Get a free quote" }).first();
    await expect(quoteCta).toHaveAttribute("href", "/en/free-quote");
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

    // Editorial featured chapters: large, but below one viewport (min-height 64svh
    // since the 2026-10-03 tighter scale, content ~74% of 900px). GoodCall joined
    // the standard two-column layout with its 16:9 capture (2026-10-04).
    for (const key of ["pick4me", "pont-facturx", "goodcall"]) {
      const height = await heightOf(`[data-featured-project="${key}"]`);
      expect(height, `${key} large`).toBeGreaterThanOrEqual(viewport * 0.65);
      expect(height, `${key} below immersive`).toBeLessThan(viewport);
    }

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

    for (const key of ["pick4me", "pont-facturx", "goodcall"]) {
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
      page.getByRole("heading", { level: 1, name: /Des produits en ligne, pas des promesses/ }),
    ).toBeVisible();
  });
});
