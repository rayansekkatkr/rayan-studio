import { expect, test } from "@playwright/test";
import { declineAnalytics } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await declineAnalytics(page);
});

const PAGES = [
  {
    locale: "fr",
    path: "/fr/cyber-resilience-act",
    other: "/en/cyber-resilience-act",
    h1: "La conformité CRA pour les petits fabricants d'objets connectés.",
    booking: "Réserver un diagnostic",
    subjectLabel: "Sujet",
    subject: "Diagnostic CRA",
  },
  {
    locale: "en",
    path: "/en/cyber-resilience-act",
    other: "/fr/cyber-resilience-act",
    h1: "CRA compliance for small connected-device manufacturers.",
    booking: "Book an assessment",
    subjectLabel: "Subject",
    subject: "CRA assessment",
  },
] as const;

test.describe("Cyber Resilience Act page", () => {
  for (const cra of PAGES) {
    test(`${cra.locale}: stands alone and leads to the prefilled diagnostic form`, async ({ page }) => {
      await page.goto(cra.path);
      await expect(page.locator("html")).toHaveAttribute("lang", new RegExp(`^${cra.locale}`));
      await expect(page.getByRole("heading", { level: 1, name: cra.h1 })).toBeVisible();

      // No link to the studio's web and software offers.
      const hrefs = await page.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
      expect(
        hrefs.filter((href) => /\/(services|work|demarrer-un-projet|start-a-project|studio)(\/|$)/.test(href)),
      ).toEqual([]);
      expect(hrefs).toContain(cra.other);

      await page.getByRole("link", { name: cra.booking }).first().click();
      await expect(page).toHaveURL(/#diagnostic$/);
      await expect(page.getByLabel(cra.subjectLabel)).toHaveValue(cra.subject);
    });
  }

  test("declares FR and EN alternates", async ({ page }) => {
    await page.goto("/en/cyber-resilience-act");
    await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute("href", /\/fr\/cyber-resilience-act$/);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/cyber-resilience-act$/);
  });

  test("both services lists link to the CRA page in their language", async ({ page }) => {
    await page.goto("/fr/services");
    await expect(page.locator("main").getByRole("link", { name: /Sécurité & conformité CRA/ })).toHaveAttribute(
      "href",
      "/fr/cyber-resilience-act",
    );
    await page.goto("/en/services");
    await expect(page.locator("main").getByRole("link", { name: /Security & CRA compliance/ })).toHaveAttribute(
      "href",
      "/en/cyber-resilience-act",
    );
  });

  test("the checklist articles end with the diagnostic call to action", async ({ page }) => {
    await page.goto("/fr/insights/checklists/cra-declarer-faille-24h");
    await expect(page.getByRole("link", { name: /Réserver un diagnostic/ })).toHaveAttribute(
      "href",
      "/fr/cyber-resilience-act#diagnostic",
    );
    await page.goto("/en/insights/checklists/cra-24-hour-vulnerability-reporting-checklist");
    await expect(page.getByRole("link", { name: /Book an assessment/ })).toHaveAttribute(
      "href",
      "/en/cyber-resilience-act#diagnostic",
    );
  });
});
