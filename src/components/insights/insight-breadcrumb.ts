import type { InsightRecord } from "@/content/insights";
import type { Locale } from "@/lib/i18n";
import { insightPath, type InsightCategoryKey } from "@/lib/site-routes";

export const INSIGHT_CATEGORY_LABELS: Record<InsightCategoryKey, Record<Locale, string>> = {
  articles: { fr: "Articles", en: "Articles" },
  guides: { fr: "Guides", en: "Guides" },
  checklists: { fr: "Checklists", en: "Checklists" },
  templates: { fr: "Templates", en: "Templates" },
  tools: { fr: "Outils", en: "Tools" },
};

/** Breadcrumb contract for Insight articles: Home -> Insights -> Category -> Article. */
export function buildInsightBreadcrumbItems(
  locale: Locale,
  insight: InsightRecord,
  siteUrl: string,
): Array<{ name: string; path: string }> {
  return [
    { name: locale === "fr" ? "Accueil" : "Home", path: `${siteUrl}/${locale}` },
    { name: "Insights", path: `${siteUrl}${insightPath(locale)}` },
    {
      name: INSIGHT_CATEGORY_LABELS[insight.category][locale],
      path: `${siteUrl}${insightPath(locale, insight.category)}`,
    },
    {
      name: insight.title[locale],
      path: `${siteUrl}${insightPath(locale, insight.category, insight.slug[locale])}`,
    },
  ];
}
