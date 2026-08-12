import { describe, expect, it } from "vitest";
import {
  FEATURED_INSIGHT,
  INSIGHTS,
  getInsight,
  getInsightsByCategory,
  resolveInsightSlug,
} from "@/content/insights";
import { SERVICES } from "@/content/services";
import { resolveInsightCategorySlug, insightPath } from "@/lib/site-routes";

const EXPECTED_KEYS = [
  "prepare-saas",
  "mvp-v1",
  "redesign-or-new",
  "application-launch-checklist",
  "project-brief-template",
  "no-code-saas-custom",
  "legacy-redesign-checklist",
];

const PLACEHOLDER_RE = /TODO|Coming soon|Bientôt disponible|Lorem ipsum/i;

describe("insights registry", () => {
  it("registers exactly the approved launch records in order", () => {
    expect(INSIGHTS.map((insight) => insight.key)).toEqual(EXPECTED_KEYS);
  });

  it("features exactly one insight: prepare-saas", () => {
    const featured = INSIGHTS.filter((insight) => insight.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].key).toBe("prepare-saas");
    expect(FEATURED_INSIGHT.key).toBe("prepare-saas");
  });

  it("provides FR and EN slug, title, description and meaningful blocks", () => {
    for (const insight of INSIGHTS) {
      for (const locale of ["fr", "en"] as const) {
        expect(insight.slug[locale], `${insight.key} slug ${locale}`).toBeTruthy();
        expect(insight.title[locale], `${insight.key} title ${locale}`).toBeTruthy();
        expect(insight.description[locale], `${insight.key} description ${locale}`).toBeTruthy();
        expect(insight.blocks[locale].length, `${insight.key} blocks ${locale}`).toBeGreaterThan(3);
      }
    }
  });

  it("has no duplicate slug within a locale/category", () => {
    for (const locale of ["fr", "en"] as const) {
      const seen = new Set<string>();
      for (const insight of INSIGHTS) {
        const composite = `${insight.category}/${insight.slug[locale]}`;
        expect(seen.has(composite), composite).toBe(false);
        seen.add(composite);
      }
    }
  });

  it("references only valid services and resolvable categories", () => {
    const serviceKeys = SERVICES.map((service) => service.key);
    for (const insight of INSIGHTS) {
      expect(serviceKeys, `${insight.key} relatedService`).toContain(insight.relatedService);
      for (const locale of ["fr", "en"] as const) {
        const categoryPath = insightPath(locale, insight.category);
        const categorySlug = categoryPath.split("/").pop() as string;
        expect(resolveInsightCategorySlug(locale, categorySlug)).toBe(insight.category);
      }
    }
  });

  it("resolves localized slugs and rejects wrong-locale slugs", () => {
    expect(resolveInsightSlug("fr", "guides", "preparer-projet-saas")?.key).toBe("prepare-saas");
    expect(resolveInsightSlug("en", "guides", "prepare-saas-project")?.key).toBe("prepare-saas");
    expect(resolveInsightSlug("fr", "guides", "prepare-saas-project")).toBeNull();
    expect(resolveInsightSlug("en", "articles", "prepare-saas-project")).toBeNull();
  });

  it("filters by category", () => {
    expect(getInsightsByCategory("guides").map((insight) => insight.key)).toEqual([
      "prepare-saas",
      "mvp-v1",
      "no-code-saas-custom",
    ]);
    expect(getInsightsByCategory("checklists").map((insight) => insight.key)).toEqual([
      "application-launch-checklist",
      "legacy-redesign-checklist",
    ]);
    expect(getInsight("project-brief-template").category).toBe("templates");
  });

  it("contains no em dash, placeholder or generic filler intro", () => {
    const serialized = JSON.stringify(INSIGHTS);
    expect(serialized).not.toContain("—");
    expect(serialized).not.toMatch(PLACEHOLDER_RE);
    expect(serialized).not.toMatch(/dans un monde de plus en plus|in today's rapidly evolving/i);
  });

  it("keeps the lightweight slug map in sync with the registry", async () => {
    const { INSIGHT_SLUG_PAIRS } = await import("@/content/insights/slugs");
    expect(INSIGHT_SLUG_PAIRS).toEqual(
      INSIGHTS.map((insight) => ({
        category: insight.category,
        fr: insight.slug.fr,
        en: insight.slug.en,
      })),
    );
  });

  it("uses the launch publication date without fabricated history", () => {
    for (const insight of INSIGHTS) {
      expect(insight.publishedAt).toBe("2026-08-12");
    }
  });
});
