import { expect, test, type Page } from "@playwright/test";
import { declineAnalytics, mockProjectError, mockProjectSuccess } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await declineAnalytics(page);
});

// The step transition re-renders and moves focus; retry the whole
// check-then-verify block on state conditions instead of sleeping.
async function checkRadio(page: Page, name: string, exact = false) {
  const radio = page.getByRole("radio", { name, exact });
  await expect(async () => {
    await radio.check();
    await expect(radio).toBeChecked({ timeout: 1000 });
  }).toPass();
}

async function walkToFinalStep(page: Page) {
  await checkRadio(page, "Application / SaaS");
  await page.getByRole("button", { name: "Suivant" }).click();
  await checkRadio(page, "Produit existant");
  await page.getByRole("button", { name: "Suivant" }).click();
  await page.getByLabel("Objectif du projet").fill("Faire évoluer une plateforme métier existante.");
  await page.getByRole("button", { name: "Suivant" }).click();
  await checkRadio(page, "1-3 mois");
  await page.getByRole("button", { name: "Suivant" }).click();
  await page.getByLabel("Nom", { exact: true }).fill("Rayan Test");
  await page.getByLabel("Entreprise").fill("Studio Test");
  await page.getByLabel("Email").fill("rayan@example.com");
}

test.describe("project intake", () => {
  test("blocks required steps without a selection", async ({ page }) => {
    await page.goto("/fr/demarrer-un-projet");
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page.getByRole("status")).toContainText(/choix/);
    await expect(page.getByRole("radio", { name: "Application / SaaS" })).toBeVisible();
  });

  test("preserves all five steps after a mocked error, then succeeds on retry", async ({
    page,
  }) => {
    await mockProjectError(page, "SEND_FAILED");
    await page.goto("/fr/demarrer-un-projet");
    await walkToFinalStep(page);
    await page.getByRole("button", { name: "Envoyer" }).click();
    await expect(page.getByRole("status")).toContainText(/conservées/);

    await expect(page.getByLabel("Nom", { exact: true })).toHaveValue("Rayan Test");
    await expect(page.getByLabel("Entreprise")).toHaveValue("Studio Test");
    await expect(page.getByLabel("Email")).toHaveValue("rayan@example.com");
    await expect(page.getByLabel(/Budget/)).toHaveValue("");

    await page.getByRole("button", { name: "Retour" }).click();
    await expect(page.getByRole("radio", { name: "1-3 mois" })).toBeChecked();
    await page.getByRole("button", { name: "Retour" }).click();
    await expect(page.getByLabel("Objectif du projet")).toHaveValue(
      "Faire évoluer une plateforme métier existante.",
    );
    await page.getByRole("button", { name: "Retour" }).click();
    await expect(page.getByRole("radio", { name: "Produit existant" })).toBeChecked();
    await page.getByRole("button", { name: "Retour" }).click();
    await expect(page.getByRole("radio", { name: "Application / SaaS" })).toBeChecked();

    for (let i = 0; i < 4; i += 1) {
      await page.getByRole("button", { name: "Suivant" }).click();
    }

    await page.unroute("**/api/project");
    await mockProjectSuccess(page);
    await page.getByRole("button", { name: "Envoyer" }).click();
    await expect(page.getByRole("status")).toContainText(/envoyée/i);
  });

  test("EN smoke: natural labels on the canonical route", async ({ page }) => {
    await mockProjectSuccess(page);
    await page.goto("/en/start-a-project");
    await expect(page).toHaveURL(/\/en\/start-a-project$/);
    await expect(page.getByRole("heading", { level: 1, name: "Start a project" })).toBeVisible();

    await checkRadio(page, "MVP", true);
    await page.getByRole("button", { name: "Next" }).click();
    await checkRadio(page, "An idea");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByLabel("Project objective").fill("Validate a product idea quickly.");
    await page.getByRole("button", { name: "Next" }).click();
    await checkRadio(page, "As soon as possible");
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByLabel("Name", { exact: true }).fill("Rayan");
    await page.getByLabel("Company", { exact: true }).fill("Studio");
    await page.getByLabel("Email").fill("rayan@example.com");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByRole("status")).toContainText(/sent/i);
  });
});
