export type LocalSeoContentInput = {
  citySlug: string;
  cityLabel: string;
  sectorSlug: string;
  sectorLabel: string;
  objective: string;
};

export type LocalSeoFaqEntry = {
  question: string;
  answer: string;
};

export type LocalSeoContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  localContext: string;
  districtsLine: string;
  sectorIntent: string;
  painPoints: string[];
  checklist: string[];
  objective: string;
  faq: LocalSeoFaqEntry[];
  ctaIntro: string;
};

export const CITY_PROFILES: Record<string, unknown>;
export const SECTOR_PROFILES: Record<string, unknown>;
export function buildLocalSeoContent(input: LocalSeoContentInput): LocalSeoContent;
