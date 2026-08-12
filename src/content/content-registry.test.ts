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

  it("registers the five real project surfaces currently available", () => {
    expect(PROJECTS.map((project) => project.key)).toEqual([
      "pick4me",
      "pont-facturx",
      "goodcall",
      "docextract",
      "manteigaria",
    ]);
    expect(getProject("pick4me")?.heroImage).toBe("/realisations/pick4me.png");
    expect(getProject("manteigaria")?.kind).toBe("concept");
  });

  it("registers exactly the six approved services", () => {
    expect(SERVICES.map((service) => service.key)).toEqual([
      "applications",
      "mvp",
      "backends",
      "automation",
      "web",
      "devops",
    ]);
    expect(getService("applications").proofProjects).toContain("pick4me");
    expect(getService("automation").proofProjects).toEqual(["docextract", "pont-facturx"]);
  });

  it("contains no public em dash copy", () => {
    const strings = allStrings({ PROJECTS, SERVICES });
    expect(strings.filter((text) => text.includes("—"))).toEqual([]);
  });
});
