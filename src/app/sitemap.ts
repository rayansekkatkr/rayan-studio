import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rayanstudio.fr";
  const lastModified = process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED
    ? new Date(process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED)
    : new Date("2026-04-06");

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
  ];
}
