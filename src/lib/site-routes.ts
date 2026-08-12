import type { Locale } from "@/lib/i18n";

export type ServiceKey = "applications" | "mvp" | "backends" | "automation" | "web" | "devops";
export type StudioPageKey = "studio" | "rayan" | "method" | "offers" | "faq";
export type InsightCategoryKey = "articles" | "guides" | "checklists" | "templates" | "tools";

const SERVICE_SLUGS: Record<ServiceKey, Record<Locale, string>> = {
  applications: { fr: "applications-web-saas", en: "web-applications-saas" },
  mvp: { fr: "mvp-produits-digitaux", en: "mvp-digital-products" },
  backends: { fr: "apis-backends", en: "apis-backends" },
  automation: { fr: "automatisation-ia", en: "automation-ai" },
  web: { fr: "sites-web-refonte", en: "premium-websites-redesign" },
  devops: { fr: "devops-cloud", en: "devops-cloud" },
};

const STUDIO_SLUGS: Record<StudioPageKey, Record<Locale, string>> = {
  studio: { fr: "rayan-studio", en: "rayan-studio" },
  rayan: { fr: "rayan-sekkat", en: "rayan-sekkat" },
  method: { fr: "methode", en: "method" },
  offers: { fr: "offres", en: "offers" },
  faq: { fr: "faq", en: "faq" },
};

const INSIGHT_CATEGORY_SLUGS: Record<InsightCategoryKey, Record<Locale, string>> = {
  articles: { fr: "articles", en: "articles" },
  guides: { fr: "guides", en: "guides" },
  checklists: { fr: "checklists", en: "checklists" },
  templates: { fr: "templates", en: "templates" },
  tools: { fr: "outils", en: "tools" },
};

export function servicePath(locale: Locale, key: ServiceKey) {
  return `/${locale}/services/${SERVICE_SLUGS[key][locale]}`;
}

export function resolveServiceSlug(locale: Locale, slug: string): ServiceKey | null {
  const entry = (Object.entries(SERVICE_SLUGS) as Array<[ServiceKey, Record<Locale, string>]>).find(
    ([, slugs]) => slugs[locale] === slug,
  );
  return entry?.[0] ?? null;
}

export function workPath(locale: Locale, slug?: string) {
  return slug ? `/${locale}/work/${slug}` : `/${locale}/work`;
}

export function studioPath(locale: Locale, page: StudioPageKey) {
  return `/${locale}/studio/${STUDIO_SLUGS[page][locale]}`;
}

export function resolveStudioSlug(locale: Locale, slug: string): StudioPageKey | null {
  const entry = (Object.entries(STUDIO_SLUGS) as Array<[StudioPageKey, Record<Locale, string>]>).find(
    ([, slugs]) => slugs[locale] === slug,
  );
  return entry?.[0] ?? null;
}

export function insightPath(locale: Locale, category?: InsightCategoryKey, slug?: string) {
  if (!category) return `/${locale}/insights`;
  const base = `/${locale}/insights/${INSIGHT_CATEGORY_SLUGS[category][locale]}`;
  return slug ? `${base}/${slug}` : base;
}

export function resolveInsightCategorySlug(locale: Locale, slug: string): InsightCategoryKey | null {
  const entry = (
    Object.entries(INSIGHT_CATEGORY_SLUGS) as Array<[InsightCategoryKey, Record<Locale, string>]>
  ).find(([, slugs]) => slugs[locale] === slug);
  return entry?.[0] ?? null;
}

export function contactPath(locale: Locale) {
  return `/${locale}/contact`;
}

export function startProjectPath(locale: Locale) {
  return locale === "fr" ? "/fr/demarrer-un-projet" : "/en/start-a-project";
}
