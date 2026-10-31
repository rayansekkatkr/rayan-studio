import { expect, test } from "@playwright/test";
import { declineAnalytics } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await declineAnalytics(page);
});

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "desktop-only links");

  test("the header shows four direct links that reach their pages", async ({ page }) => {
    await page.goto("/fr");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    await expect(nav.getByRole("link")).toHaveCount(4);
    await expect(nav.getByRole("button")).toHaveCount(0);
    await nav.getByRole("link", { name: "Réalisations", exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/work$/);
    await expect(nav.getByRole("link", { name: "Réalisations", exact: true })).toHaveAttribute("aria-current", "page");
  });

  test("Applications link reaches the applications landing", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("navigation", { name: "Navigation principale" }).getByRole("link", { name: "Applications", exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/developpement-application-saas$/);
  });
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile-only menu");

  test("full mobile menu journey with focus return and scroll unlock", async ({ page }) => {
    await page.goto("/fr");
    const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(page.getByRole("button", { name: "Fermer le menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    const menu = page.locator("#mobile-site-menu");
    await menu.getByRole("link", { name: "Applications", exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/developpement-application-saas$/);

    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).not.toBe("hidden");

    const toggleAgain = page.getByRole("button", { name: "Ouvrir le menu" });
    await toggleAgain.click();
    await expect(page.locator("#mobile-site-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-site-menu")).toHaveCount(0);
    await expect(toggleAgain).toBeFocused();

    const overflowAfterEscape = await page.evaluate(() => document.body.style.overflow);
    expect(overflowAfterEscape).not.toBe("hidden");
  });

  test("mobile language switch reaches the EN equivalent", async ({ page }) => {
    await page.goto("/fr/studio/offres");
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await page
      .locator("#mobile-site-menu")
      .getByRole("link", { name: "English version" })
      .click();
    await expect(page).toHaveURL(/\/en\/studio\/offers$/);
  });
});

test.describe("header surfaces", () => {
  test.skip(({ isMobile }) => isMobile, "desktop surface contract");

  const TRANSPARENT = new Set(["rgba(0, 0, 0, 0)", "transparent"]);

  test("solid header has a real light background and dark brand text", async ({ page }) => {
    await page.goto("/fr");
    const header = page.locator("header");
    await expect(header).toHaveAttribute("data-surface", "transparent");

    // scroll down past threshold then slightly up so the header is shown solid
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.evaluate(() => window.scrollTo(0, 850));
    await expect(header).toHaveAttribute("data-surface", "solid");

    const surface = header.locator("> div").first();
    // The surface fades in through a colour transition: wait for it to settle.
    await expect
      .poll(() => surface.evaluate((el) => getComputedStyle(el).backgroundColor))
      .not.toMatch(/^(transparent|rgba\(0, 0, 0, 0\))$/);
    const bg = await surface.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(TRANSPARENT.has(bg), `solid header bg=${bg}`).toBe(false);
    const match = bg.match(/rgba?\((\d+), (\d+), (\d+)/);
    expect(match, bg).not.toBeNull();
    const [r, g, b] = match!.slice(1, 4).map(Number);
    expect(r + g + b, `light surface expected, got ${bg}`).toBeGreaterThan(600);

    const brand = page.getByRole("link", { name: "RAYAN STUDIO", exact: true });
    const color = await brand.evaluate((el) => getComputedStyle(el).color);
    const cm = color.match(/rgba?\((\d+), (\d+), (\d+)/);
    const [cr, cg, cb] = cm!.slice(1, 4).map(Number);
    expect(cr + cg + cb, `dark brand text expected, got ${color}`).toBeLessThan(300);
  });
});

test.describe("language switch equivalence", () => {
  test.skip(({ isMobile }) => isMobile, "desktop header language switch");

  const CASES: Array<{ from: string; to: string }> = [
    { from: "/fr", to: "/en" },
    { from: "/fr/services/applications-web-saas", to: "/en/services/web-applications-saas" },
    { from: "/fr/studio/offres", to: "/en/studio/offers" },
    { from: "/fr/insights/outils", to: "/en/insights/tools" },
    { from: "/fr/demarrer-un-projet", to: "/en/start-a-project" },
    {
      from: "/fr/insights/guides/preparer-projet-saas",
      to: "/en/insights/guides/prepare-saas-project",
    },
  ];

  for (const { from, to } of CASES) {
    test(`${from} switches to ${to}`, async ({ page }) => {
      await page.goto(from);
      await page.getByRole("link", { name: "English version" }).first().click();
      await expect(page).toHaveURL(new RegExp(`${to.replaceAll("/", "\\/")}$`));
    });
  }
});
