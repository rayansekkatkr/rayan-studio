import type { MetadataRoute } from "next";
import { INSIGHTS, isInsightAvailable } from "@/content/insights";
import { PROJECTS } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { getSiteUrl } from "@/lib/brand";
import { getAllLocalSeoCombos } from "@/lib/local-seo";
import {
  contactPath,
  craPath,
  insightPath,
  legalPath,
  quotePath,
  saasLandingPath,
  servicePath,
  websitesLandingPath,
  startProjectPath,
  studioPath,
  workPath,
  type InsightCategoryKey,
  type LegalDocKey,
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
const LEGAL_DOCS: LegalDocKey[] = ["legal", "privacy", "terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  // lastmod only where the content carries a real date (insights: updatedAt or publishedAt).
  // A single date for every URL (fixed, or the deploy time) tells Google nothing and gets ignored.

  function localizedPair(
    frPath: string,
    enPath: string,
    priority: number,
    changeFrequency: ChangeFrequency = "monthly",
    lastModified?: Date,
  ): MetadataRoute.Sitemap {
    const languages = {
      fr: `${baseUrl}${frPath}`,
      en: `${baseUrl}${enPath}`,
      // Same fallback as the middleware: unmatched languages get English.
      "x-default": `${baseUrl}${enPath}`,
    };
    return [frPath, enPath].map((path) => ({
      url: `${baseUrl}${path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  }

  // A page published in a single locale: no hreflang alternates.
  function singleLocale(path: string, priority: number, lastModified?: Date): MetadataRoute.Sitemap {
    return [{ url: `${baseUrl}${path}`, ...(lastModified ? { lastModified } : {}), changeFrequency: "monthly", priority }];
  }

  function serviceEntries(): MetadataRoute.Sitemap {
    return [
      ...localizedPair("/fr/services", "/en/services", 0.9),
      ...SERVICES.flatMap((service) =>
        localizedPair(servicePath("fr", service.key), servicePath("en", service.key), 0.9),
      ),
      ...localizedPair(craPath("fr"), craPath("en"), 0.9),
      // The two commercial landings (historical SEO URLs kept).
      ...localizedPair(websitesLandingPath("fr"), websitesLandingPath("en"), 0.95),
      ...localizedPair(saasLandingPath("fr"), saasLandingPath("en"), 0.95),
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
      ...localizedPair(quotePath("fr"), quotePath("en"), 0.9),
    ];
  }

  function insightEntries(): MetadataRoute.Sitemap {
    return [
      ...localizedPair(insightPath("fr"), insightPath("en"), 0.8, "weekly"),
      ...INSIGHT_CATEGORIES.flatMap((category) =>
        localizedPair(insightPath("fr", category), insightPath("en", category), 0.7),
      ),
      ...INSIGHTS.flatMap((insight) => {
        const fr = isInsightAvailable(insight, "fr");
        const en = isInsightAvailable(insight, "en");
        const frPath = insightPath("fr", insight.category, insight.slug.fr);
        const enPath = insightPath("en", insight.category, insight.slug.en);
        const modified = new Date(insight.updatedAt ?? insight.publishedAt);
        if (fr && en) return localizedPair(frPath, enPath, 0.7, "monthly", modified);
        if (fr) return singleLocale(frPath, 0.7, modified);
        return en ? singleLocale(enPath, 0.7, modified) : [];
      }),
    ];
  }

  function localSeoEntries(): MetadataRoute.Sitemap {
    return getAllLocalSeoCombos().map(({ sector, city }) => ({
      url: `${baseUrl}/site/${sector.slug}/${city.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  }

  const legalEntries: MetadataRoute.Sitemap = LEGAL_DOCS.flatMap((doc) =>
    localizedPair(legalPath("fr", doc), legalPath("en", doc), 0.4),
  );

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
