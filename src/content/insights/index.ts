import type { Locale } from "@/lib/i18n";
import type { InsightCategoryKey } from "@/lib/site-routes";
import { applicationLaunchChecklist } from "./application-launch-checklist";
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
];

export const FEATURED_INSIGHT: InsightRecord =
  INSIGHTS.find((insight) => insight.featured) ?? INSIGHTS[0];

export function getInsight(key: InsightKey): InsightRecord {
  const insight = INSIGHTS.find((item) => item.key === key);
  if (!insight) throw new Error(`Unknown insight key: ${key}`);
  return insight;
}

export function getInsightsByCategory(category: InsightCategoryKey): InsightRecord[] {
  return INSIGHTS.filter((insight) => insight.category === category);
}

export function resolveInsightSlug(
  locale: Locale,
  category: InsightCategoryKey,
  slug: string,
): InsightRecord | null {
  return (
    INSIGHTS.find((insight) => insight.category === category && insight.slug[locale] === slug) ??
    null
  );
}

export * from "./types";
