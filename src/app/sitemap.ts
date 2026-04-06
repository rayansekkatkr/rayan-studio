import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/brand";
import { getAllLocalSeoCombos } from "@/lib/local-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED
    ? new Date(process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED)
    : new Date("2026-04-06");
  const localSeoRoutes = getAllLocalSeoCombos().map(({ sector, city }) => ({
    url: `${baseUrl}/site/${sector.slug}/${city.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
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
      url: `${baseUrl}/a-propos-methodologie-preuves`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...localSeoRoutes,
  ];
}
