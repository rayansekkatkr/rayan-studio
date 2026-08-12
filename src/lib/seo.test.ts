import { describe, expect, it } from "vitest";
import { buildLocalizedMetadata } from "@/lib/seo";

describe("buildLocalizedMetadata", () => {
  it("creates canonical, FR/EN alternates and x-default", () => {
    const metadata = buildLocalizedMetadata({
      locale: "en",
      title: "Web applications & SaaS",
      description: "Custom web products built around real business needs.",
      path: "/en/services/web-applications-saas",
      alternatePath: "/fr/services/applications-web-saas",
    });

    expect(metadata.alternates?.canonical).toBe("/en/services/web-applications-saas");
    expect(metadata.alternates?.languages).toEqual({
      fr: "/fr/services/applications-web-saas",
      en: "/en/services/web-applications-saas",
      "x-default": "/fr/services/applications-web-saas",
    });
    expect(metadata.openGraph).toMatchObject({
      locale: "en_US",
      url: "/en/services/web-applications-saas",
    });
  });
});
