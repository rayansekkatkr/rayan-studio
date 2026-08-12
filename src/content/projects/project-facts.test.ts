import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS, getProject } from "@/content/projects";

function stringify(value: unknown) {
  return JSON.stringify(value);
}

describe("project evidence contract", () => {
  it("keeps the exact flagship order and next-project loop", () => {
    expect(FEATURED_PROJECTS.map((project) => project.key)).toEqual([
      "pick4me",
      "pont-facturx",
      "goodcall",
    ]);
    expect(getProject("pick4me")?.next).toBe("pont-facturx");
    expect(getProject("pont-facturx")?.next).toBe("goodcall");
    expect(getProject("goodcall")?.next).toBe("pick4me");
  });

  it("keeps Manteigaria explicitly non-commissioned", () => {
    const project = getProject("manteigaria");
    expect(project?.kind).toBe("concept");
    expect(`${project?.status?.fr} ${project?.status?.en}`.toLowerCase()).toMatch(
      /concept|non command|uncommissioned/,
    );
  });

  it("contains no em dash in public project content", () => {
    const content = stringify(FEATURED_PROJECTS);
    expect(content).not.toContain("—");
  });

  it("populates flagship case-study content", () => {
    for (const project of FEATURED_PROJECTS) {
      expect(project.challenge.fr.length, `${project.key} challenge fr`).toBeGreaterThan(0);
      expect(project.challenge.en.length, `${project.key} challenge en`).toBeGreaterThan(0);
      expect(project.solution.fr.length, `${project.key} solution fr`).toBeGreaterThan(0);
      expect(project.capabilities.length, `${project.key} capabilities`).toBeGreaterThan(0);
      expect(project.productUx.fr.length, `${project.key} productUx fr`).toBeGreaterThan(0);
      expect(project.engineering.fr.length, `${project.key} engineering fr`).toBeGreaterThan(0);
      expect(project.outcome.fr.length, `${project.key} outcome fr`).toBeGreaterThan(0);
      expect(project.gallery.length, `${project.key} gallery`).toBeGreaterThan(0);
      expect(project.technologies.length, `${project.key} technologies`).toBeGreaterThan(0);
    }
  });
});
