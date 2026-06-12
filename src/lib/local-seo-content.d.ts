export type LocalSeoContentInput = {
  citySlug: string;
  cityLabel: string;
  sectorSlug: string;
  sectorLabel: string;
  kpi: string;
};

export type LocalSeoContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  localContext: string;
  sectorIntent: string;
  painPoints: string[];
  checklist: string[];
  proof: string;
  ctaIntro: string;
};

export const CITY_PROFILES: Record<string, unknown>;
export const SECTOR_PROFILES: Record<string, unknown>;
export function buildLocalSeoContent(input: LocalSeoContentInput): LocalSeoContent;
