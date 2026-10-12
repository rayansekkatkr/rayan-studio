import type { Locale } from "@/lib/i18n";
import type { InsightCategoryKey } from "@/lib/site-routes";
import { applicationLaunchChecklist } from "./application-launch-checklist";
import { craReportingChecklist } from "./cra-reporting-checklist";
import { legacyRedesignChecklist } from "./legacy-redesign-checklist";
import { mvpV1 } from "./mvp-v1";
import { noCodeSaasCustom } from "./no-code-saas-custom";
import { prepareSaas } from "./prepare-saas";
import { projectBriefTemplate } from "./project-brief-template";
import { redesignOrNew } from "./redesign-or-new";
import type { InsightKey, InsightRecord } from "./types";

export const INSIGHTS: readonly InsightRecord[] = [
  prepareSaas,
  mvpV1,
  redesignOrNew,
  applicationLaunchChecklist,
  projectBriefTemplate,
  noCodeSaasCustom,
  legacyRedesignChecklist,
  craReportingChecklist,
];

export function isInsightAvailable(insight: InsightRecord, locale: Locale): boolean {
  return insight.availableLocales ? insight.availableLocales.includes(locale) : true;
}

export function getInsightsForLocale(locale: Locale): InsightRecord[] {
  return INSIGHTS.filter((insight) => isInsightAvailable(insight, locale));
}

export const FEATURED_INSIGHT: InsightRecord =
  INSIGHTS.find((insight) => insight.featured) ?? INSIGHTS[0];

export function getInsight(key: InsightKey): InsightRecord {
  const insight = INSIGHTS.find((item) => item.key === key);
  if (!insight) throw new Error(`Unknown insight key: ${key}`);
  return insight;
}

/** Without a locale: every record of the category. With one: only those published in it. */
export function getInsightsByCategory(category: InsightCategoryKey, locale?: Locale): InsightRecord[] {
  return INSIGHTS.filter(
    (insight) => insight.category === category && (!locale || isInsightAvailable(insight, locale)),
  );
}

export function resolveInsightSlug(
  locale: Locale,
  category: InsightCategoryKey,
  slug: string,
): InsightRecord | null {
  return (
    INSIGHTS.find(
      (insight) =>
        insight.category === category &&
        insight.slug[locale] === slug &&
        isInsightAvailable(insight, locale),
    ) ?? null
  );
}

export * from "./types";
