import type { MetadataRoute } from "next";
import { INSIGHTS } from "@/content/insights";
import { PROJECTS } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { getSiteUrl } from "@/lib/brand";
import { getAllLocalSeoCombos } from "@/lib/local-seo";
import {
  contactPath,
  insightPath,
  servicePath,
  startProjectPath,
  studioPath,
  workPath,
  type InsightCategoryKey,
  type StudioPageKey,
} from "@/lib/site-routes";

type ChangeFrequency = "weekly" | "monthly";

const INSIGHT_CATEGORIES: InsightCategoryKey[] = [
  "articles",
  "guides",
  "checklists",
  "templates",
  "tools",
];
const STUDIO_PAGES: StudioPageKey[] = ["studio", "rayan", "method", "offers", "faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED
    ? new Date(process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED)
    : new Date();

  function localizedPair(
    frPath: string,
    enPath: string,
    priority: number,
    changeFrequency: ChangeFrequency = "monthly",
  ): MetadataRoute.Sitemap {
    const languages = {
      fr: `${baseUrl}${frPath}`,
      en: `${baseUrl}${enPath}`,
      "x-default": `${baseUrl}${frPath}`,
    };
    return [frPath, enPath].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  }

  function serviceEntries(): MetadataRoute.Sitemap {
    return [
      ...localizedPair("/fr/services", "/en/services", 0.9),
      ...SERVICES.flatMap((service) =>
        localizedPair(servicePath("fr", service.key), servicePath("en", service.key), 0.9),
      ),
    ];
  }

  function workEntries(): MetadataRoute.Sitemap {
    return [
      ...localizedPair(workPath("fr"), workPath("en"), 0.8),
      ...PROJECTS.flatMap((project) =>
        localizedPair(workPath("fr", project.slug), workPath("en", project.slug), 0.8),
      ),
    ];
  }

  function studioEntries(): MetadataRoute.Sitemap {
    return STUDIO_PAGES.flatMap((page) =>
      localizedPair(studioPath("fr", page), studioPath("en", page), 0.8),
    );
  }

  function conversionEntries(): MetadataRoute.Sitemap {
    return [
      ...localizedPair(contactPath("fr"), contactPath("en"), 0.8),
      ...localizedPair(startProjectPath("fr"), startProjectPath("en"), 0.9),
    ];
  }

  function insightEntries(): MetadataRoute.Sitemap {
    return [
      ...localizedPair(insightPath("fr"), insightPath("en"), 0.8, "weekly"),
      ...INSIGHT_CATEGORIES.flatMap((category) =>
        localizedPair(insightPath("fr", category), insightPath("en", category), 0.7),
      ),
      ...INSIGHTS.flatMap((insight) =>
        localizedPair(
          insightPath("fr", insight.category, insight.slug.fr),
          insightPath("en", insight.category, insight.slug.en),
          0.7,
        ),
      ),
    ];
  }

  function localSeoEntries(): MetadataRoute.Sitemap {
    return getAllLocalSeoCombos().map(({ sector, city }) => ({
      url: `${baseUrl}/site/${sector.slug}/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  }

  const legalEntries: MetadataRoute.Sitemap = [
    "/mentions-legales",
    "/politique-confidentialite",
    "/cgv",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [
    ...localizedPair("/fr", "/en", 1, "weekly"),
    ...serviceEntries(),
    ...workEntries(),
    ...studioEntries(),
    ...conversionEntries(),
    ...insightEntries(),
    ...legalEntries,
    ...localSeoEntries(),
  ];
}
