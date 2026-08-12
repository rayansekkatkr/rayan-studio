import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { LEGACY_REDIRECTS } from "../../config/legacy-redirects.mjs";
import { INSIGHTS } from "@/content/insights";
import { PROJECTS } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { getSiteUrl } from "@/lib/brand";
import { insightPath, servicePath, studioPath, workPath } from "@/lib/site-routes";

const base = getSiteUrl();
const entries = sitemap();
const urls = entries.map((entry) => entry.url);

function expectUrl(path: string) {
  expect(urls, path).toContain(`${base}${path}`);
}

describe("canonical sitemap", () => {
  it("contains exactly 70 local SEO routes", () => {
    expect(urls.filter((url) => url.startsWith(`${base}/site/`)).length).toBe(70);
  });

  it("contains both homepages", () => {
    expectUrl("/fr");
    expectUrl("/en");
  });

  it("contains the 12 canonical service detail routes", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const service of SERVICES) {
        expectUrl(servicePath(locale, service.key));
      }
    }
  });

  it("contains work roots and the 10 project routes", () => {
    for (const locale of ["fr", "en"] as const) {
      expectUrl(workPath(locale));
      for (const project of PROJECTS) {
        expectUrl(workPath(locale, project.slug));
      }
    }
  });

  it("contains all canonical studio pages", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const page of ["studio", "rayan", "method", "offers", "faq"] as const) {
        expectUrl(studioPath(locale, page));
      }
    }
  });

  it("contains canonical conversion routes only", () => {
    expectUrl("/fr/contact");
    expectUrl("/en/contact");
    expectUrl("/fr/demarrer-un-projet");
    expectUrl("/en/start-a-project");
    expect(urls).not.toContain(`${base}/fr/start-a-project`);
    expect(urls).not.toContain(`${base}/en/demarrer-un-projet`);
  });

  it("contains insights root, categories and all records in both locales", () => {
    for (const locale of ["fr", "en"] as const) {
      expectUrl(insightPath(locale));
      for (const category of ["articles", "guides", "checklists", "templates", "tools"] as const) {
        expectUrl(insightPath(locale, category));
      }
      for (const insight of INSIGHTS) {
        expectUrl(insightPath(locale, insight.category, insight.slug[locale]));
      }
    }
  });

  it("excludes every legacy redirect source", () => {
    for (const redirect of LEGACY_REDIRECTS as Array<{ source: string }>) {
      expect(urls, redirect.source).not.toContain(`${base}${redirect.source}`);
    }
  });

  it("gives bilingual groups fr, en and x-default alternates and none to local SEO", () => {
    const home = entries.find((entry) => entry.url === `${base}/fr`);
    expect(home?.alternates?.languages).toMatchObject({
      fr: `${base}/fr`,
      en: `${base}/en`,
      "x-default": `${base}/fr`,
    });

    const localEntry = entries.find((entry) => entry.url.startsWith(`${base}/site/`));
    expect(localEntry?.alternates).toBeUndefined();
    expect(localEntry?.changeFrequency).toBe("monthly");
    expect(localEntry?.priority).toBe(0.7);
  });
});
