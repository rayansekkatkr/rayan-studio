import { describe, expect, it } from "vitest";
import {
  contactPath,
  insightPath,
  resolveInsightCategorySlug,
  resolveServiceSlug,
  resolveStudioSlug,
  servicePath,
  startProjectPath,
  studioPath,
  workPath,
} from "@/lib/site-routes";

describe("site routes", () => {
  it("generates the approved localized service paths", () => {
    expect(servicePath("fr", "applications")).toBe("/fr/services/applications-web-saas");
    expect(servicePath("en", "applications")).toBe("/en/services/web-applications-saas");
    expect(servicePath("fr", "mvp")).toBe("/fr/services/mvp-produits-digitaux");
    expect(servicePath("en", "mvp")).toBe("/en/services/mvp-digital-products");
    expect(servicePath("fr", "backends")).toBe("/fr/services/apis-backends");
    expect(servicePath("en", "backends")).toBe("/en/services/apis-backends");
    expect(servicePath("fr", "automation")).toBe("/fr/services/automatisation-ia");
    expect(servicePath("en", "automation")).toBe("/en/services/automation-ai");
    expect(servicePath("fr", "web")).toBe("/fr/services/sites-web-refonte");
    expect(servicePath("en", "web")).toBe("/en/services/premium-websites-redesign");
    expect(servicePath("fr", "devops")).toBe("/fr/services/devops-cloud");
    expect(servicePath("en", "devops")).toBe("/en/services/devops-cloud");
  });

  it("resolves service slugs only for the requested locale", () => {
    expect(resolveServiceSlug("fr", "applications-web-saas")).toBe("applications");
    expect(resolveServiceSlug("en", "web-applications-saas")).toBe("applications");
    expect(resolveServiceSlug("fr", "web-applications-saas")).toBeNull();
  });

  it("generates work, studio and conversion paths", () => {
    expect(workPath("fr")).toBe("/fr/work");
    expect(workPath("en", "pick4me")).toBe("/en/work/pick4me");
    expect(studioPath("fr", "method")).toBe("/fr/studio/methode");
    expect(studioPath("en", "method")).toBe("/en/studio/method");
    expect(studioPath("fr", "offers")).toBe("/fr/studio/offres");
    expect(studioPath("en", "offers")).toBe("/en/studio/offers");
    expect(contactPath("fr")).toBe("/fr/contact");
    expect(startProjectPath("fr")).toBe("/fr/demarrer-un-projet");
    expect(startProjectPath("en")).toBe("/en/start-a-project");
  });

  it("localizes the tools category while keeping shared category names stable", () => {
    expect(insightPath("fr", "tools")).toBe("/fr/insights/outils");
    expect(insightPath("en", "tools")).toBe("/en/insights/tools");
    expect(insightPath("fr", "guides")).toBe("/fr/insights/guides");
    expect(resolveInsightCategorySlug("fr", "outils")).toBe("tools");
    expect(resolveInsightCategorySlug("en", "tools")).toBe("tools");
  });

  it("resolves localized Studio child slugs", () => {
    expect(resolveStudioSlug("fr", "methode")).toBe("method");
    expect(resolveStudioSlug("en", "method")).toBe("method");
    expect(resolveStudioSlug("fr", "method")).toBeNull();
  });
});
