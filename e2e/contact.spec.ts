import { expect, test } from "@playwright/test";
import { declineAnalytics, mockContactError, mockContactSuccess } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await declineAnalytics(page);
});

async function fillContactForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Nom").fill("Rayan Test");
  await page.getByLabel("Email").fill("rayan@example.com");
  await page.getByLabel("Sujet").fill("Question E2E");
  await page.getByLabel("Message").fill("Bonjour, ceci est un message de test E2E.");
}

test.describe("contact form", () => {
  test("preserves every field after a mocked server error", async ({ page }) => {
    await mockContactError(page, "SEND_FAILED");
    await page.goto("/fr/contact");
    await fillContactForm(page);
    await page.getByRole("button", { name: "Envoyer" }).click();

    await expect(page.getByRole("status")).toContainText(/conservées/);
    await expect(page.getByLabel("Nom")).toHaveValue("Rayan Test");
    await expect(page.getByLabel("Email")).toHaveValue("rayan@example.com");
    await expect(page.getByLabel("Sujet")).toHaveValue("Question E2E");
    await expect(page.getByLabel("Message")).toHaveValue(
      "Bonjour, ceci est un message de test E2E.",
    );
  });

  test("shows success after a mocked accepted submission", async ({ page }) => {
    await mockContactSuccess(page);
    await page.goto("/fr/contact");
    await fillContactForm(page);
    await page.getByRole("button", { name: "Envoyer" }).click();
    await expect(page.getByRole("status")).toContainText(/envoyé/i);
  });

  test("shows localized invalid-email error and preserves values", async ({ page }) => {
    await mockContactError(page, "INVALID_EMAIL");
    await page.goto("/fr/contact");
    await page.getByLabel("Nom").fill("Rayan Test");
    await page.getByLabel("Email").fill("pas-un-email");
    await page.getByLabel("Sujet").fill("Sujet");
    await page.getByLabel("Message").fill("Message");
    await page.getByRole("button", { name: "Envoyer" }).click();

    await expect(page.getByRole("status")).toContainText("Adresse email invalide.");
    await expect(page.getByLabel("Email")).toHaveValue("pas-un-email");
    await expect(page.getByLabel("Nom")).toHaveValue("Rayan Test");
  });
});
