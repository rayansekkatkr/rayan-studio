import type { Page } from "@playwright/test";

export const CONSENT_KEY = "rayan_cookie_consent_v1";

/** Pre-set analytics consent so the banner does not overlay unrelated tests. */
export async function acceptAnalytics(page: Page): Promise<void> {
  await page.addInitScript(
    ([key]) => window.localStorage.setItem(key, "accepted"),
    [CONSENT_KEY],
  );
}

export async function declineAnalytics(page: Page): Promise<void> {
  await page.addInitScript(
    ([key]) => window.localStorage.setItem(key, "declined"),
    [CONSENT_KEY],
  );
}

function fulfillJson(status: number, body: unknown) {
  return {
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  };
}

export async function mockContactSuccess(page: Page): Promise<void> {
  await page.route("**/api/contact", (route) => route.fulfill(fulfillJson(200, { ok: true })));
}

export async function mockContactError(page: Page, code = "SEND_FAILED"): Promise<void> {
  const status = code === "RATE_LIMITED" ? 429 : code === "SEND_FAILED" ? 502 : 400;
  await page.route("**/api/contact", (route) =>
    route.fulfill(fulfillJson(status, { error: "mocked", code })),
  );
}

export async function mockProjectSuccess(page: Page): Promise<void> {
  await page.route("**/api/project", (route) => route.fulfill(fulfillJson(200, { ok: true })));
}

export async function mockProjectError(page: Page, code = "SEND_FAILED"): Promise<void> {
  const status = code === "RATE_LIMITED" ? 429 : code === "SEND_FAILED" ? 502 : 400;
  await page.route("**/api/project", (route) =>
    route.fulfill(fulfillJson(status, { error: "mocked", code })),
  );
}

/** Fails the test if any unmocked submission reaches the real APIs. */
export async function failOnRealSubmissions(page: Page): Promise<void> {
  await page.route("**/api/contact", () => {
    throw new Error("Unmocked /api/contact submission in E2E");
  });
  await page.route("**/api/project", () => {
    throw new Error("Unmocked /api/project submission in E2E");
  });
}
