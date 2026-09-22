"use client";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_KEY = "rayan_cookie_consent_v1";
const CONSENT_AT_KEY = `${CONSENT_KEY}_at`;
// 6 months: CNIL recommendation before asking for consent again. Documented in the privacy policy.
export const CONSENT_MAX_AGE_MS = 6 * 30 * 24 * 60 * 60 * 1000;

type ConsentChoice = "accepted" | "declined";

export function saveConsent(choice: ConsentChoice, now = Date.now()) {
  window.localStorage.setItem(CONSENT_KEY, choice);
  window.localStorage.setItem(CONSENT_AT_KEY, String(now));
}

// Returns the saved choice, or null when none exists or it is older than 6 months
// (the expired choice is cleared so the banner shows again).
export function readConsent(now = Date.now()): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const choice = window.localStorage.getItem(CONSENT_KEY);
  if (choice !== "accepted" && choice !== "declined") return null;

  const savedAt = Number(window.localStorage.getItem(CONSENT_AT_KEY));
  if (!savedAt) {
    // Choice saved before timestamps existed: start its 6-month clock now.
    window.localStorage.setItem(CONSENT_AT_KEY, String(now));
    return choice;
  }
  if (now - savedAt > CONSENT_MAX_AGE_MS) {
    window.localStorage.removeItem(CONSENT_KEY);
    window.localStorage.removeItem(CONSENT_AT_KEY);
    return null;
  }
  return choice;
}

export function hasAnalyticsConsent() {
  return readConsent() === "accepted";
}

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}
