import type { ProjectKey } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import type { ServiceKey } from "@/lib/site-routes";

export type ServiceRecord = {
  key: ServiceKey;
  slug: Record<Locale, string>;
  eyebrow: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  problem: Record<Locale, string>;
  useCases: Record<Locale, Array<{ title: string; body: string }>>;
  approach: Record<Locale, string[]>;
  engineering: Record<Locale, string[]>;
  technologies: string[];
  proofProjects: ProjectKey[];
  faq: Record<Locale, Array<{ question: string; answer: string }>>;
};
