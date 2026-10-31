import type { Locale } from "@/lib/i18n";

export type ProjectKey =
  | "pick4me"
  | "pont-facturx"
  | "goodcall"
  | "docextract"
  | "manteigaria"
  | "ops-knowledge-agent"
  | "ci-cd-platform"
  | "product-infrastructure";
export type LocalizedText = Record<Locale, string>;

export type ProjectRecord = {
  key: ProjectKey;
  slug: string;
  title: string;
  /** product: the studio's own product; concept: uncommissioned; demo: public demonstrator; mission: client engagement. */
  kind: "product" | "concept" | "demo" | "mission";
  year?: string;
  liveUrl?: string;
  /** Public links shown on the case study (store pages, product site...). */
  links?: Array<{ label: LocalizedText; href: string }>;
  beforeUrl?: string;
  heroImage: string;
  featuredOrder?: number;
  tone: "light" | "dark" | "energy";
  categories: Record<Locale, string[]>;
  summary: LocalizedText;
  role: LocalizedText;
  status?: LocalizedText;
  technologies: string[];
  challenge: Record<Locale, string[]>;
  /** Exact substring of the first challenge paragraph shown in the accent colour. */
  challengeHighlight?: Record<Locale, string>;
  solution: Record<Locale, string[]>;
  /** `benefit`: what the feature brings to the user, shown under the feature on case studies. */
  capabilities: Array<{ title: LocalizedText; body: LocalizedText; benefit?: LocalizedText }>;
  /** Case-study gallery, grouped by journey. Only real screenshots; empty groups are not rendered. */
  screens?: Array<{
    title: LocalizedText;
    items: Array<{ src: string; alt: LocalizedText; frame: "browser" | "phone"; width: number; height: number }>;
  }>;
  /** Secondary visual of the opening composition (e.g. a phone screen next to the website). */
  heroCompanion?: { src: string; alt: LocalizedText; width: number; height: number };
  productUx: Record<Locale, string[]>;
  engineering: Record<Locale, Array<{ title: string; body: string }>>;
  outcome: Record<Locale, string[]>;
  gallery: Array<{ src: string; alt: LocalizedText }>;
  next?: ProjectKey;
};
