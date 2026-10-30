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
  capabilities: Array<{ title: LocalizedText; body: LocalizedText }>;
  productUx: Record<Locale, string[]>;
  engineering: Record<Locale, Array<{ title: string; body: string }>>;
  outcome: Record<Locale, string[]>;
  gallery: Array<{ src: string; alt: LocalizedText }>;
  next?: ProjectKey;
};
