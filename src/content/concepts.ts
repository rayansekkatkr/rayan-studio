import type { Locale } from "@/lib/i18n";

/**
 * Concept redesigns shown as before / after (websites landing and work page). None was
 * commissioned. "Before" = capture of the business's live home page on CONCEPT_CAPTURE_DATE;
 * "after" = the studio's home page mockup. Mockup copy only restates facts published on each
 * business's own site; photos are royalty-free illustrations (Unsplash), never theirs.
 * Images: /public/realisations/concepts/<slug>-{before,after}.webp, 1440x900.
 */
export type Concept = {
  slug: string;
  name: string;
  place: string;
  sector: Record<Locale, string>;
  /** Live site the "before" capture comes from. */
  siteUrl: string;
};

export const CONCEPT_CAPTURE_DATE: Record<Locale, string> = { fr: "3 novembre 2026", en: "3 November 2026" };

export const CONCEPTS: Concept[] = [
  {
    slug: "fromagerie",
    name: "Fromagerie de l'Abbaye",
    place: "Vergaville",
    sector: { fr: "Commerce", en: "Shop" },
    siteUrl: "https://fromagerie-de-l-abbaye.webnode.fr/",
  },
  {
    slug: "dedieu",
    name: "Atelier Dedieu",
    place: "Villeurbanne",
    sector: { fr: "Artisan", en: "Craftsman" },
    siteUrl: "https://atelier-dedieu.webnode.fr/",
  },
  {
    slug: "ploegmans",
    name: "Brasserie Ploegmans",
    place: "Bruxelles",
    sector: { fr: "Restaurant", en: "Restaurant" },
    siteUrl: "https://ploegmans.wordpress.com/",
  },
  {
    slug: "cormorandiere",
    name: "La Cormorandière",
    place: "Broons",
    sector: { fr: "Chambres d'hôtes", en: "Guest house" },
    siteUrl: "https://sites.google.com/site/cormorandiere",
  },
];
