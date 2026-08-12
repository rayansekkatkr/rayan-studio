import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore plain .mjs config module without type declarations
import { LEGACY_REDIRECTS } from "../../config/legacy-redirects.mjs";
import { INSIGHTS } from "@/content/insights";
import { SERVICES } from "@/content/services";
import { insightPath, servicePath, startProjectPath, studioPath } from "@/lib/site-routes";

const require = createRequire(import.meta.url);
const { getAllServiceSeoPages } = require("../../src/lib/service-seo.js") as {
  getAllServiceSeoPages: () => Array<{ path: string }>;
};

type Redirect = { source: string; destination: string; permanent: boolean };
const redirects = LEGACY_REDIRECTS as Redirect[];

function canonicalRoutes(): Set<string> {
  const routes = new Set<string>();
  for (const locale of ["fr", "en"] as const) {
    routes.add(`/${locale}`);
    routes.add(`/${locale}/services`);
    routes.add(`/${locale}/work`);
    routes.add(`/${locale}/insights`);
    routes.add(`/${locale}/contact`);
    routes.add(startProjectPath(locale));
    for (const service of SERVICES) routes.add(servicePath(locale, service.key));
    for (const page of ["studio", "rayan", "method", "offers", "faq"] as const) {
      routes.add(studioPath(locale, page));
    }
    for (const insight of INSIGHTS) {
      routes.add(insightPath(locale, insight.category, insight.slug[locale]));
    }
  }
  return routes;
}

describe("legacy redirect map", () => {
  it("covers every existing legacy service-seo path exactly once", () => {
    const sources = redirects.map((redirect) => redirect.source);
    for (const page of getAllServiceSeoPages()) {
      const occurrences = sources.filter((source) => source === page.path).length;
      expect(occurrences, `${page.path} coverage`).toBe(1);
    }
  });

  it("has unique sources", () => {
    const sources = redirects.map((redirect) => redirect.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("targets only valid canonical routes", () => {
    const canonical = canonicalRoutes();
    for (const redirect of redirects) {
      expect(canonical.has(redirect.destination), `${redirect.destination} canonical`).toBe(true);
    }
  });

  it("is permanent, never self-referencing and never touches /site/", () => {
    for (const redirect of redirects) {
      expect(redirect.permanent, redirect.source).toBe(true);
      expect(redirect.source).not.toBe(redirect.destination);
      expect(redirect.source.startsWith("/site/"), redirect.source).toBe(false);
    }
  });

  it("introduces no redirect chain", () => {
    const sources = new Set(redirects.map((redirect) => redirect.source));
    for (const redirect of redirects) {
      expect(sources.has(redirect.destination), `${redirect.destination} chains`).toBe(false);
    }
  });
});
