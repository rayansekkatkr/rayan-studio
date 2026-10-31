export type Locale = "fr" | "en";

export const SUPPORTED_LOCALES: Locale[] = ["fr", "en"];

export function normalizeLocale(input?: string): Locale {
  if (!input) return "en";
  return input.toLowerCase().startsWith("fr") ? "fr" : "en";
}

/**
 * Locale for a visitor arriving on "/": French unless the browser explicitly asks for
 * other languages only. A French reader with an English browser UI usually lists "fr"
 * further down, and crawlers or tools that send no header land on the French site.
 */
export function preferredLocaleFromHeader(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage || !acceptLanguage.trim()) return "fr";
  const tags = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);
  if (tags.length === 0 || tags.includes("*")) return "fr";
  return tags.some((tag) => tag.startsWith("fr")) ? "fr" : "en";
}

export function isEnglish(locale: Locale) {
  return locale === "en";
}
