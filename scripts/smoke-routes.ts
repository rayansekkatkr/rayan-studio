// Registry-derived production route smoke. Fails on any canonical route that
// does not return 2xx (redirects count as failures for canonical routes).
import { INSIGHTS } from "../src/content/insights";
import { PROJECTS } from "../src/content/projects";
import { SERVICES } from "../src/content/services";
import { getAllLocalSeoCombos } from "../src/lib/local-seo";
import {
  contactPath,
  insightPath,
  servicePath,
  startProjectPath,
  studioPath,
  workPath,
  type InsightCategoryKey,
  type StudioPageKey,
} from "../src/lib/site-routes";

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";
const LOCALES = ["fr", "en"] as const;
const STUDIO_PAGES: StudioPageKey[] = ["studio", "rayan", "method", "offers", "faq"];
const INSIGHT_CATEGORIES: InsightCategoryKey[] = [
  "articles",
  "guides",
  "checklists",
  "templates",
  "tools",
];

function canonicalRoutes(): string[] {
  const routes = new Set<string>();

  for (const locale of LOCALES) {
    routes.add(`/${locale}`);
    routes.add(`/${locale}/services`);
    for (const service of SERVICES) routes.add(servicePath(locale, service.key));
    routes.add(workPath(locale));
    for (const project of PROJECTS) routes.add(workPath(locale, project.slug));
    for (const page of STUDIO_PAGES) routes.add(studioPath(locale, page));
    routes.add(insightPath(locale));
    for (const category of INSIGHT_CATEGORIES) routes.add(insightPath(locale, category));
    for (const insight of INSIGHTS) {
      routes.add(insightPath(locale, insight.category, insight.slug[locale]));
    }
    routes.add(contactPath(locale));
    routes.add(startProjectPath(locale));
  }

  for (const { sector, city } of getAllLocalSeoCombos()) {
    routes.add(`/site/${sector.slug}/${city.slug}`);
  }

  for (const legal of ["/mentions-legales", "/politique-confidentialite", "/cgv"]) {
    routes.add(legal);
  }

  return Array.from(routes);
}

async function main() {
  const routes = canonicalRoutes();
  const localCount = routes.filter((route) => route.startsWith("/site/")).length;
  const failures: string[] = [];

  for (const route of routes) {
    const response = await fetch(`${BASE_URL}${route}`, { redirect: "manual" });
    if (response.status < 200 || response.status > 299) {
      failures.push(`${route} -> ${response.status}`);
    }
  }

  if (failures.length > 0) {
    console.error(`Smoke FAILED for ${failures.length}/${routes.length} canonical routes:`);
    for (const failure of failures) console.error(`  ${failure}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `Smoke checked ${routes.length} canonical routes, including ${localCount} local SEO routes.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
