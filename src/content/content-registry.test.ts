import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS, PROJECTS, getProject } from "@/content/projects";
import { SERVICES, getService } from "@/content/services";

function allStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(allStrings);
  return [];
}

describe("content registries", () => {
  it("keeps the exact approved featured work order", () => {
    expect(FEATURED_PROJECTS.map((project) => project.key)).toEqual([
      "pick4me",
      "pont-facturx",
      "goodcall",
    ]);
  });

  it("registers the eight real project surfaces currently available", () => {
    expect(PROJECTS.map((project) => project.key)).toEqual([
      "pick4me",
      "pont-facturx",
      "goodcall",
      "ops-knowledge-agent",
      "ci-cd-platform",
      "product-infrastructure",
      "docextract",
      "manteigaria",
    ]);
    expect(getProject("ops-knowledge-agent")?.kind).toBe("demo");
    expect(getProject("ci-cd-platform")?.kind).toBe("mission");
    expect(getProject("pick4me")?.heroImage).toBe("/realisations/pick4me.webp");
    expect(getProject("manteigaria")?.kind).toBe("concept");
  });

  it("registers exactly the seven approved services", () => {
    expect(SERVICES.map((service) => service.key)).toEqual([
      "applications",
      "mvp",
      "backends",
      "automation",
      "ai",
      "web",
      "devops",
    ]);
    expect(getService("applications").proofProjects).toContain("pick4me");
    expect(getService("automation").proofProjects).toEqual(["docextract", "pont-facturx", "ops-knowledge-agent"]);
    expect(getService("devops").proofProjects).toEqual(["ci-cd-platform", "product-infrastructure"]);
  });

  it("contains no public em dash copy", () => {
    const strings = allStrings({ PROJECTS, SERVICES });
    expect(strings.filter((text) => text.includes("—"))).toEqual([]);
  });
});
