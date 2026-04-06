export type Locale = "fr" | "en";

export const SUPPORTED_LOCALES: Locale[] = ["fr", "en"];

export function normalizeLocale(input?: string): Locale {
  if (!input) return "en";
  return input.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function isEnglish(locale: Locale) {
  return locale === "en";
}
