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
        name: "Je conçois et mets en ligne vos sites et applications, sans intermédiaire.",
      }),
    ).toBeVisible();

    const quoteCta = page.getByRole("link", { name: "Demander un devis gratuit" }).first();
    await expect(quoteCta).toHaveAttribute("href", "/fr/devis-gratuit");
    await expect(page.getByRole("link", { name: /Sites web & refonte/ }).first()).toHaveAttribute(
      "href",
      "/fr/creation-site-internet",
    );
    await expect(page.getByRole("link", { name: /Applications & SaaS/ }).first()).toHaveAttribute(
      "href",
      "/fr/developpement-application-saas",
    );
    await expect(page.getByRole("link", { name: "Voir les réalisations", exact: true })).toHaveAttribute(
      "href",
      "/fr/work",
    );
  });

  test("EN home renders the approved hero and CTAs", async ({ page }) => {
    await page.goto("/en");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "I design and launch your websites and applications, with no middleman.",
      }),
    ).toBeVisible();

    const quoteCta = page.getByRole("link", { name: "Get a free quote" }).first();
    await expect(quoteCta).toHaveAttribute("href", "/en/free-quote");
    await expect(page.getByRole("link", { name: "See the work", exact: true })).toHaveAttribute(
      "href",
      "/en/work",
    );
  });

  for (const locale of ["fr", "en"] as const) {
    test(`${locale} home names the founder and the four products, nothing else`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("[data-featured-project]")).toHaveCount(0);
      await expect(page.getByRole("heading", { level: 2, name: "Rayan Sekkat" })).toBeVisible();
      await expect(page.locator("[data-home-products] a")).toHaveCount(4);
      await expect(page.locator("main")).not.toContainText(/Manteigaria|Ops Knowledge|STMicroelectronics/);
    });
  }

  test("desktop homepage opens on the night hero with the product wall", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop-only layout");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/fr");

    // Night hero: dark background, light header ink on top of it.
    const heroBg = await page.locator("#hero > div").first().evaluate((el) => getComputedStyle(el).backgroundColor);
    const [r, g, b] = heroBg.match(/\d+/g)!.map(Number);
    expect(r + g + b, `dark hero expected, got ${heroBg}`).toBeLessThan(120);
    await expect(page.locator("header[data-top-theme='dark']")).toHaveCount(1);

    // Decorative wall of product screens on the right, hidden from assistive tech and unnamed.
    const wall = page.locator("[data-hero-wall]");
    await expect(wall).toBeVisible();
    await expect(wall).toHaveAttribute("aria-hidden", "true");
    const box = await wall.boundingBox();
    expect(box!.x).toBeGreaterThan(1440 * 0.4);

    // Two path doors first, then the single quote CTA.
    const paths = page.locator("[data-hero-paths] a");
    await expect(paths).toHaveCount(2);
    await expect(paths.first()).toBeVisible();

    // The statement continues the night: desk photo blended in, sentence on top.
    const statementBg = await page.locator("#statement > div").first().evaluate((el) => getComputedStyle(el).backgroundColor);
    const [sr, sg, sb] = statementBg.match(/\d+/g)!.map(Number);
    expect(sr + sg + sb, `dark statement expected, got ${statementBg}`).toBeLessThan(120);
    const visual = await page.locator("#statement img").evaluate((el) => el.getBoundingClientRect().height);
    expect(visual).toBeGreaterThan(900 * 0.5);
  });

  test("hero motion can be paused, and pauses itself off-screen", async ({ page }) => {
    await page.goto("/fr");
    const hero = page.locator("[data-hero-motion]");
    const toggle = page.getByRole("button", { name: "Mettre l'animation en pause" });

    await expect(hero).not.toHaveAttribute("data-motion-paused", /.*/);
    await toggle.click();
    await expect(hero).toHaveAttribute("data-motion-paused", "");
    await expect(page.getByRole("button", { name: "Relancer l'animation" })).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Relancer l'animation" }).click();
    await expect(hero).not.toHaveAttribute("data-motion-paused", /.*/);

    await page.locator("#final-cta").scrollIntoViewIfNeeded();
    await expect(hero).toHaveAttribute("data-motion-paused", "");
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
    await page.getByRole("link", { name: "Voir les réalisations", exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/work$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Des produits en ligne, pas des promesses/ }),
    ).toBeVisible();
  });
});
