import { FEATURED_INSIGHT } from "@/content/insights";
import { getProject } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import {
  contactPath,
  insightPath,
  servicePath,
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

export function getNavigation(locale: Locale): NavMenu[] {
  const fr = locale === "fr";
  const pick4me = getProject("pick4me");

  return [
    {
      key: "services",
      label: "Services",
      groups: [
        {
          label: "BUILD",
          links: [
            { label: fr ? "Applications web & SaaS" : "Web applications & SaaS", href: servicePath(locale, "applications") },
            { label: fr ? "MVP & produits digitaux" : "MVP & digital products", href: servicePath(locale, "mvp") },
            { label: "APIs & backends", href: servicePath(locale, "backends") },
          ],
        },
        {
          label: "OPTIMIZE",
          links: [
            { label: fr ? "Automatisation & IA" : "Automation & AI", href: servicePath(locale, "automation") },
            { label: fr ? "Sites premium & refonte" : "Premium websites & redesign", href: servicePath(locale, "web") },
          ],
        },
        {
          label: "RUN",
          links: [
            { label: fr ? "DevOps, cloud & déploiement" : "DevOps, cloud & deployment", href: servicePath(locale, "devops") },
          ],
        },
      ],
      featured: {
        eyebrow: "FEATURED",
        title: "Pick4Me",
        href: workPath(locale, "pick4me"),
        image: pick4me?.heroImage,
        cta: fr ? "Voir le projet" : "View project",
      },
    },
    {
      key: "work",
      label: "Work",
      groups: [
        {
          label: "SELECTED WORK",
          links: [
            { label: "Pick4Me", href: workPath(locale, "pick4me") },
            { label: "Pont Factur-X", href: workPath(locale, "pont-facturx") },
            { label: "GoodCall", href: workPath(locale, "goodcall") },
          ],
        },
        {
          label: "EXPLORE",
          links: [
            { label: fr ? "Tous les projets" : "All projects", href: workPath(locale) },
            { label: fr ? "Études de cas" : "Case studies", href: workPath(locale) },
          ],
        },
      ],
      featured: {
        eyebrow: "FEATURED",
        title: "Pick4Me",
        href: workPath(locale, "pick4me"),
        image: pick4me?.heroImage,
        cta: fr ? "Découvrir" : "Discover",
      },
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
            { label: fr ? "Démarrer un projet" : "Start a project", href: startProjectPath(locale) },
            { label: fr ? "Nous contacter" : "Contact us", href: contactPath(locale) },
          ],
        },
      ],
    },
    {
      key: "insights",
      label: "Insights",
      groups: [
        {
          label: "GUIDES",
          links: [
            { label: "Articles", href: insightPath(locale, "articles") },
            { label: fr ? "Guides pratiques" : "Practical guides", href: insightPath(locale, "guides") },
          ],
        },
        {
          label: "RESOURCES",
          links: [
            { label: "Checklists", href: insightPath(locale, "checklists") },
            { label: "Templates", href: insightPath(locale, "templates") },
            { label: fr ? "Outils" : "Tools", href: insightPath(locale, "tools") },
          ],
        },
      ],
      featured: {
        eyebrow: "FEATURED",
        title: FEATURED_INSIGHT.title[locale],
        href: insightPath(locale, FEATURED_INSIGHT.category, FEATURED_INSIGHT.slug[locale]),
        cta: fr ? "Lire le guide" : "Read the guide",
      },
    },
  ];
}
