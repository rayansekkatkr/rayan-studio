import type { Locale } from "@/lib/i18n";
import type { ServiceKey } from "@/lib/site-routes";

export type ServiceRecord = {
  key: ServiceKey;
  slug: Record<Locale, string>;
  eyebrow: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  /** Search-oriented title and meta description (the visible title stays editorial). */
  seo: Record<Locale, { title: string; description: string }>;
  /** What the client gets, shown before the list of what is built. */
  benefits: Record<Locale, Array<{ title: string; body: string }>>;
  problem: Record<Locale, string>;
  /** Exact substring of `problem` shown in the accent colour on the service page. */
  problemHighlight?: Record<Locale, string>;
  useCases: Record<Locale, Array<{ title: string; body: string }>>;
  approach: Record<Locale, string[]>;
  engineering: Record<Locale, string[]>;
  technologies: string[];
  faq: Record<Locale, Array<{ question: string; answer: string }>>;
};
