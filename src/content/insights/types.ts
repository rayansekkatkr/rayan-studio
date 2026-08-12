import type { Locale } from "@/lib/i18n";
import type { InsightCategoryKey, ServiceKey } from "@/lib/site-routes";

export type InsightKey =
  | "prepare-saas"
  | "mvp-v1"
  | "redesign-or-new"
  | "application-launch-checklist"
  | "project-brief-template"
  | "no-code-saas-custom"
  | "legacy-redesign-checklist";

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
};
