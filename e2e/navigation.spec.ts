import { expect, test } from "@playwright/test";
import { acceptAnalytics } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await acceptAnalytics(page);
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
