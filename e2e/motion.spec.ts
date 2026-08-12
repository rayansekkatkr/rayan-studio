import { expect, test } from "@playwright/test";
import { acceptAnalytics } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await acceptAnalytics(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test.describe("reduced motion", () => {
  test("homepage stays fully usable without motion", async ({ page, isMobile }) => {
    await page.goto("/fr");

    const h1 = page.getByRole("heading", {
      level: 1,
      name: "Des produits digitaux conçus pour faire avancer votre entreprise.",
    });
    await expect(h1).toBeVisible();
    const h1Opacity = await h1.evaluate((node) => getComputedStyle(node).opacity);
    expect(Number(h1Opacity)).toBeGreaterThan(0.9);

    const heroMedia = page.getByRole("img", { name: /Pick4Me/i }).first();
    await expect(heroMedia).toBeVisible();
    await heroMedia.scrollIntoViewIfNeeded();
    await expect(heroMedia).toBeInViewport();

    const box1 = await heroMedia.boundingBox();
    await expect(heroMedia).toBeVisible();
    const box2 = await heroMedia.boundingBox();
    expect(box1?.y).toBeCloseTo(box2?.y ?? -1, 0);

    if (!isMobile) {
      await page.evaluate(() => window.scrollTo(0, 0));
      const trigger = page.getByRole("button", { name: "Services", exact: true });
      await expect(trigger).toBeInViewport();
      await trigger.click();
      await expect(
        page
          .locator("#mega-menu-services")
          .getByRole("link", { name: "Applications web & SaaS", exact: true }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
    }
  });

  test("work case study CTA remains actionable without motion", async ({ page }) => {
    await page.goto("/fr/work/pick4me");
    await expect(page.getByRole("heading", { level: 1, name: "Pick4Me" })).toBeVisible();
    const cta = page.getByRole("link", { name: "Parler de votre projet" }).first();
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page).toHaveURL(/\/fr\/demarrer-un-projet$/);
  });
});
