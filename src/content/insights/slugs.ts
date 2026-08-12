import type { Locale } from "@/lib/i18n";
import type { InsightCategoryKey } from "@/lib/site-routes";

// Lightweight literal mirror of the insight slug registry, safe to ship in the
// client bundle (the full INSIGHTS records carry article bodies). A registry
// consistency test in insights.test.ts fails if this map drifts from INSIGHTS.
export const INSIGHT_SLUG_PAIRS: ReadonlyArray<{
  category: InsightCategoryKey;
  fr: string;
  en: string;
}> = [
  { category: "guides", fr: "preparer-projet-saas", en: "prepare-saas-project" },
  { category: "guides", fr: "mvp-fonctionnalites-v1", en: "mvp-v1-features" },
  { category: "articles", fr: "refonte-ou-nouveau-site", en: "redesign-or-new-website" },
  { category: "checklists", fr: "checklist-lancement-application", en: "application-launch-checklist" },
  { category: "templates", fr: "template-cahier-des-charges-digital", en: "digital-project-brief-template" },
  { category: "guides", fr: "no-code-saas-ou-sur-mesure", en: "no-code-saas-or-custom-development" },
  { category: "checklists", fr: "checklist-refonte-site-internet", en: "website-redesign-checklist" },
];

export function translateInsightSlug(
  from: Locale,
  to: Locale,
  category: InsightCategoryKey,
  slug: string,
): string | null {
  const pair = INSIGHT_SLUG_PAIRS.find(
    (entry) => entry.category === category && entry[from] === slug,
  );
  return pair ? pair[to] : null;
}
