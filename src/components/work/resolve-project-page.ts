import { PROJECTS, type ProjectRecord } from "@/content/projects";

export type ResolvedProjectPage = {
  kind: "case-study" | "summary";
  project: ProjectRecord;
};

export function resolveProjectPage(slug: string): ResolvedProjectPage | null {
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return null;
  return {
    kind: project.featuredOrder != null ? "case-study" : "summary",
    project,
  };
}
