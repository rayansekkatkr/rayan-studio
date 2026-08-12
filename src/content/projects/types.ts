import type { Locale } from "@/lib/i18n";

export type ProjectKey = "pick4me" | "pont-facturx" | "goodcall" | "docextract" | "manteigaria";
export type LocalizedText = Record<Locale, string>;

export type ProjectRecord = {
  key: ProjectKey;
  slug: string;
  title: string;
  kind: "product" | "concept";
  year?: string;
  liveUrl?: string;
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
  solution: Record<Locale, string[]>;
  capabilities: Array<{ title: LocalizedText; body: LocalizedText }>;
  productUx: Record<Locale, string[]>;
  engineering: Record<Locale, Array<{ title: string; body: string }>>;
  outcome: Record<Locale, string[]>;
  gallery: Array<{ src: string; alt: LocalizedText }>;
  next?: ProjectKey;
};
