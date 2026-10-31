import { getCraPage } from "@/content/cra";
import { FEATURED_INSIGHT } from "@/content/insights";
import type { Locale } from "@/lib/i18n";
import {
  contactPath,
  craPath,
  insightPath,
  quotePath,
  saasLandingPath,
  servicePath,
  smbLandingPath,
  startProjectPath,
  studioPath,
  workPath,
} from "@/lib/site-routes";

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; links: NavLink[] };
export type NavFeatured = {
  eyebrow: string;
  title: string;
  href: string;
  image?: string;
  cta: string;
};
export type NavMenuKey = "services" | "work" | "studio" | "insights";
export type NavMenu = {
  key: NavMenuKey;
  label: string;
  groups: NavGroup[];
  featured?: NavFeatured;
};

export type PrimaryNavLink = NavLink & { key: "websites" | "applications" | "work" | "studio" };

/** Header navigation: four direct links, no dropdowns. The footer keeps the full map of the site. */
export function getPrimaryNav(locale: Locale): PrimaryNavLink[] {
  const fr = locale === "fr";
  return [
    { key: "websites", label: fr ? "Sites web" : "Websites", href: smbLandingPath(locale) },
    { key: "applications", label: fr ? "Applications" : "Applications", href: saasLandingPath(locale) },
    { key: "work", label: fr ? "Réalisations" : "Work", href: workPath(locale) },
    { key: "studio", label: "Studio", href: studioPath(locale, "studio") },
  ];
}

export function getNavigation(locale: Locale): NavMenu[] {
  const fr = locale === "fr";

  return [
    {
      key: "services",
      label: "Services",
      groups: [
        {
          label: fr ? "PAR BESOIN" : "BY NEED",
          links: [
            { label: fr ? "Sites web pour commerces & PME" : "Websites for small businesses", href: smbLandingPath(locale) },
            { label: fr ? "Applications & SaaS sur mesure" : "Custom applications & SaaS", href: saasLandingPath(locale) },
            { label: fr ? "Demander un devis gratuit" : "Get a free quote", href: quotePath(locale) },
          ],
        },
        {
          label: fr ? "CONCEVOIR" : "BUILD",
          links: [
            { label: fr ? "Applications web & SaaS" : "Web applications & SaaS", href: servicePath(locale, "applications") },
            { label: fr ? "MVP & produits digitaux" : "MVP & digital products", href: servicePath(locale, "mvp") },
            { label: "APIs & backends", href: servicePath(locale, "backends") },
            { label: fr ? "Sites premium & refonte" : "Premium websites & redesign", href: servicePath(locale, "web") },
          ],
        },
        {
          label: fr ? "OPTIMISER & EXPLOITER" : "OPTIMIZE & RUN",
          links: [
            { label: fr ? "Automatisation & IA" : "Automation & AI", href: servicePath(locale, "automation") },
            { label: fr ? "IA générative en entreprise" : "Generative AI for business", href: servicePath(locale, "ai") },
            { label: fr ? "DevOps, cloud & déploiement" : "DevOps, cloud & deployment", href: servicePath(locale, "devops") },
            { label: getCraPage(locale).serviceCard.title, href: craPath(locale) },
          ],
        },
      ],
    },
    {
      key: "work",
      label: fr ? "Réalisations" : "Work",
      // Projects are presented on the work page only, not repeated in menus.
      groups: [{ label: fr ? "RÉALISATIONS" : "WORK", links: [{ label: fr ? "Toutes les réalisations" : "All work", href: workPath(locale) }] }],
    },
    {
      key: "studio",
      label: "Studio",
      groups: [
        {
          label: fr ? "À PROPOS" : "ABOUT",
          links: [
            { label: "Rayan Studio", href: studioPath(locale, "studio") },
            { label: "Rayan Sekkat", href: studioPath(locale, "rayan") },
          ],
        },
        {
          label: fr ? "TRAVAILLER ENSEMBLE" : "WORK TOGETHER",
          links: [
            { label: fr ? "Notre méthode" : "Our method", href: studioPath(locale, "method") },
            { label: fr ? "Offres" : "Offers", href: studioPath(locale, "offers") },
            { label: "FAQ", href: studioPath(locale, "faq") },
          ],
        },
        {
          label: "CONTACT",
          links: [
            { label: fr ? "Demander un devis gratuit" : "Get a free quote", href: quotePath(locale) },
            { label: fr ? "Parcours projet détaillé" : "Detailed project brief", href: startProjectPath(locale) },
            { label: fr ? "Nous contacter" : "Contact us", href: contactPath(locale) },
          ],
        },
      ],
    },
    {
      key: "insights",
      label: fr ? "Ressources" : "Insights",
      groups: [
        {
          label: "GUIDES",
          links: [
            { label: "Articles", href: insightPath(locale, "articles") },
            { label: fr ? "Guides pratiques" : "Practical guides", href: insightPath(locale, "guides") },
          ],
        },
        {
          label: fr ? "OUTILS & MODÈLES" : "RESOURCES",
          links: [
            { label: "Checklists", href: insightPath(locale, "checklists") },
            { label: fr ? "Modèles" : "Templates", href: insightPath(locale, "templates") },
            { label: fr ? "Outils" : "Tools", href: insightPath(locale, "tools") },
          ],
        },
      ],
      featured: {
        eyebrow: fr ? "À LA UNE" : "FEATURED",
        title: FEATURED_INSIGHT.title[locale],
        href: insightPath(locale, FEATURED_INSIGHT.category, FEATURED_INSIGHT.slug[locale]),
        cta: fr ? "Lire le guide" : "Read the guide",
      },
    },
  ];
}
