export type ServiceSeoLocale = "fr" | "en";

export type ServiceSeoSection = {
  title: string;
  items: string[];
};

export type ServiceSeoFaq = {
  question: string;
  answer: string;
};

export type ServiceSeoPage = {
  locale: ServiceSeoLocale;
  slug: string;
  intent: string;
  path: string;
  alternatePath?: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  proofLabel: string;
  proofValue: string;
  sections: ServiceSeoSection[];
  process: string[];
  faq: ServiceSeoFaq[];
};

export const SERVICE_SEO_PAGES: ServiceSeoPage[];
export function getAllServiceSeoPages(): ServiceSeoPage[];
export function getServiceSeoPagesByLocale(locale: ServiceSeoLocale): ServiceSeoPage[];
export function getServiceSeoPage(locale: ServiceSeoLocale, slug: string): ServiceSeoPage | null;
