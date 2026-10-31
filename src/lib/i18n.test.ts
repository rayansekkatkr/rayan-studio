import { describe, expect, it } from "vitest";
import { SUPPORTED_LOCALES, isEnglish, normalizeLocale, preferredLocaleFromHeader } from "@/lib/i18n";

describe("i18n helpers", () => {
  it("keeps the commercial locale contract limited to fr and en", () => {
    expect(SUPPORTED_LOCALES).toEqual(["fr", "en"]);
  });

  it("normalizes French variants to fr and everything else to en", () => {
    expect(normalizeLocale("fr-FR")).toBe("fr");
    expect(normalizeLocale("FR")).toBe("fr");
    expect(normalizeLocale("en-US")).toBe("en");
    expect(normalizeLocale(undefined)).toBe("en");
  });

  it("reports English only for en", () => {
    expect(isEnglish("en")).toBe(true);
    expect(isEnglish("fr")).toBe(false);
  });

  it("sends root visitors to French unless the browser lists only other languages", () => {
    expect(preferredLocaleFromHeader("fr-FR,fr;q=0.9,en;q=0.8")).toBe("fr");
    expect(preferredLocaleFromHeader("en-US,en;q=0.9,fr;q=0.8")).toBe("fr");
    expect(preferredLocaleFromHeader(null)).toBe("fr");
    expect(preferredLocaleFromHeader("")).toBe("fr");
    expect(preferredLocaleFromHeader("*")).toBe("fr");
    expect(preferredLocaleFromHeader("en-US,en;q=0.9")).toBe("en");
    expect(preferredLocaleFromHeader("ko-KR,ko;q=0.9,en;q=0.8")).toBe("en");
  });
});
