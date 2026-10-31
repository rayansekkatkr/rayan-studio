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

  test("desktop homepage follows the direction A hierarchy", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop-only layout");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/fr");
    await page.evaluate(() => document.fonts.ready);

    // The studio name is set in giant type across the container.
    const word = page.locator("#hero [data-giant-word]");
    await expect(word).toHaveText(/Rayan Studio/i);
    const [wordWidth, containerWidth] = await word.evaluate((el) => {
      const parent = el.parentElement as HTMLElement;
      return [el.getBoundingClientRect().width, parent.getBoundingClientRect().width];
    });
    expect(wordWidth, "giant word fills the container").toBeGreaterThan(containerWidth * 0.85);
    expect(wordWidth, "giant word never overflows").toBeLessThanOrEqual(containerWidth + 2);

    // The flagship product right below is large but stays under one screen.
    const flagship = await page.locator('[data-featured-project="pick4me"]').evaluate((el) => el.getBoundingClientRect().height);
    expect(flagship).toBeGreaterThan(900 * 0.5);
    expect(flagship).toBeLessThan(900);
  });

  test("desktop featured work gives the product visual the dominant space", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop-only composition");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/fr");

    for (const key of ["pick4me", "pont-facturx", "goodcall"]) {
      const section = page.locator(`[data-featured-project="${key}"]`);
      const areaOf = (attr: string) =>
        section.locator(`[${attr}]`).first().evaluate((el) => {
          const box = el.getBoundingClientRect();
          return box.width * box.height;
        });
      const [copy, media] = await Promise.all([areaOf("data-project-copy"), areaOf("data-project-media")]);
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

    const viewport = page.viewportSize()?.height ?? 0;
    const heroHeight = await page.locator("section#hero > div").first().evaluate((el) => el.getBoundingClientRect().height);
    expect(heroHeight).toBeGreaterThan(0);
    const servicesHeight = await page
      .locator("section#services > div")
      .first()
      .evaluate((el) => el.getBoundingClientRect().height);
    expect(servicesHeight).toBeGreaterThan(viewport * 0.3);
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
