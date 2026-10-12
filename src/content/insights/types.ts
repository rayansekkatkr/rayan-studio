import type { Locale } from "@/lib/i18n";
import type { InsightCategoryKey, ServiceKey } from "@/lib/site-routes";

export type InsightKey =
  | "prepare-saas"
  | "mvp-v1"
  | "redesign-or-new"
  | "application-launch-checklist"
  | "project-brief-template"
  | "no-code-saas-custom"
  | "legacy-redesign-checklist"
  | "cra-reporting-checklist";

export type InsightBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "callout"; title: string; body: string };

export type InsightRecord = {
  key: InsightKey;
  category: InsightCategoryKey;
  slug: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  relatedService: ServiceKey;
  blocks: Record<Locale, InsightBlock[]>;
  /**
   * Locales the article is published in. Defaults to every locale. Content for a
   * locale left out stays in the record, ready, but is never routed, listed or linked.
   */
  availableLocales?: readonly Locale[];
  /** Replaces the default footer links (related service, start a project). */
  cta?: Partial<Record<Locale, InsightCta>>;
};

export type InsightCta = {
  serviceLabel: string;
  serviceHref: string;
  primaryLabel: string;
  primaryHref: string;
};
