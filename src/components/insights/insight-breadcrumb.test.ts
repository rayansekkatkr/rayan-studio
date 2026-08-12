import { describe, expect, it } from "vitest";
import { buildInsightBreadcrumbItems } from "@/components/insights/insight-breadcrumb";
import { getInsight } from "@/content/insights";
import { insightPath } from "@/lib/site-routes";

const SITE = "https://www.example.com";

describe("insight article breadcrumb", () => {
  it("emits exactly Home, Insights, Category, Article in FR", () => {
    const insight = getInsight("prepare-saas");
    const items = buildInsightBreadcrumbItems("fr", insight, SITE);

    expect(items).toHaveLength(4);
    expect(items[0]).toEqual({ name: "Accueil", path: `${SITE}/fr` });
    expect(items[1]).toEqual({ name: "Insights", path: `${SITE}${insightPath("fr")}` });
    expect(items[2]).toEqual({
      name: "Guides",
      path: `${SITE}${insightPath("fr", insight.category)}`,
    });
    expect(items[3]).toEqual({
      name: "Comment préparer un projet SaaS",
      path: `${SITE}${insightPath("fr", insight.category, insight.slug.fr)}`,
    });
  });

  it("emits exactly Home, Insights, Category, Article in EN", () => {
    const insight = getInsight("prepare-saas");
    const items = buildInsightBreadcrumbItems("en", insight, SITE);

    expect(items).toHaveLength(4);
    expect(items[0]).toEqual({ name: "Home", path: `${SITE}/en` });
    expect(items[1]).toEqual({ name: "Insights", path: `${SITE}${insightPath("en")}` });
    expect(items[2]).toEqual({
      name: "Guides",
      path: `${SITE}${insightPath("en", insight.category)}`,
    });
    expect(items[3]).toEqual({
      name: "How to prepare a SaaS project",
      path: `${SITE}${insightPath("en", insight.category, insight.slug.en)}`,
    });
  });

  it("localizes the tools category label", () => {
    const insight = getInsight("legacy-redesign-checklist");
    const fr = buildInsightBreadcrumbItems("fr", insight, SITE);
    expect(fr[2].name).toBe("Checklists");
    expect(fr[2].path).toBe(`${SITE}${insightPath("fr", "checklists")}`);
  });
});
