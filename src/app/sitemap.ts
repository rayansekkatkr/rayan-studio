import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/brand";
import { getAllServiceSeoPages } from "@/lib/service-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED
    ? new Date(process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED)
    : new Date();
  // Pages locales /site/* volontairement absentes du sitemap tant qu'elles
  // sont en noindex (contenu trop similaire entre villes — audit P3).
  const serviceRoutes = getAllServiceSeoPages().map((page) => {
    const languages: Record<string, string> = {
      [page.locale]: `${baseUrl}${page.path}`,
    };

    if (page.alternatePath) {
      languages[page.locale === "fr" ? "en" : "fr"] = `${baseUrl}${page.alternatePath}`;
    }

    return {
      url: `${baseUrl}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: {
        languages,
      },
    };
  });

  const homeLanguages = {
    fr: `${baseUrl}/fr`,
    en: `${baseUrl}/en`,
    "x-default": baseUrl,
  };

  return [
    {
      url: `${baseUrl}/fr`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/fr/a-propos-methodologie-preuves`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/a-propos-methodologie-preuves`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...serviceRoutes,
  ];
}
