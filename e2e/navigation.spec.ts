import { expect, test } from "@playwright/test";
import { declineAnalytics } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await declineAnalytics(page);
});

test.describe("desktop mega navigation", () => {
  test.skip(({ isMobile }) => isMobile, "desktop-only mega menu");

  test("Services opens with keyboard, closes on Escape and returns focus", async ({ page }) => {
    await page.goto("/fr");
    const trigger = page.getByRole("button", { name: "Services", exact: true });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.locator("#mega-menu-services").getByRole("link", { name: "Applications web & SaaS", exact: true }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("Work menu navigates to a flagship case study", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("button", { name: "Work", exact: true }).click();
    await page.locator("#mega-menu-work").getByRole("link", { name: "Pont Factur-X", exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/work\/pont-facturx$/);
    await expect(page.getByRole("heading", { level: 1, name: "Pont Factur-X" })).toBeVisible();
  });

  test("Studio menu navigates to the offers page", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("button", { name: "Studio", exact: true }).click();
    await page.locator("#mega-menu-studio").getByRole("link", { name: "Offres", exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/studio\/offres$/);
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
    await menu.getByRole("button", { name: "Services", exact: true }).click();
    const serviceLink = menu.getByRole("link", { name: "Applications web & SaaS", exact: true });
    await expect(serviceLink).toBeVisible();
    await serviceLink.click();
    await expect(page).toHaveURL(/\/fr\/services\/applications-web-saas$/);

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

test.describe("header and mega-menu surfaces", () => {
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

  test("open mega-menu panel has a real non-transparent surface", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("button", { name: "Services", exact: true }).click();
    const panel = page.locator("#mega-menu-services");
    await expect(
      panel.getByRole("link", { name: "Applications web & SaaS", exact: true }),
    ).toBeVisible();
    const bg = await panel.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(TRANSPARENT.has(bg), `mega panel bg=${bg}`).toBe(false);
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
