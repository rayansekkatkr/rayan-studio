import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

export const KIND_LABELS: Record<ProjectRecord["kind"], Record<Locale, string>> = {
  product: { fr: "Produit du studio", en: "Studio product" },
  concept: { fr: "Concept", en: "Concept" },
  demo: { fr: "Démonstrateur", en: "Demonstrator" },
  mission: { fr: "Mission client", en: "Client engagement" },
};

/** Screens of a product, or a simplified diagram for engagements and demonstrators. */
export function projectImageAlt(project: ProjectRecord, locale: Locale) {
  const fr = locale === "fr";
  if (project.kind === "demo" || project.kind === "mission" || project.key === "product-infrastructure") {
    return fr ? `Schéma simplifié : ${project.title}` : `Simplified diagram: ${project.title}`;
  }
  return fr ? `Interface du projet ${project.title}` : `${project.title} project interface`;
}

export type StatusTone = "live" | "concept" | "tech" | "mission";

/** Public status of a project, shown as a coloured badge on the portfolio and case studies. */
export function projectStatusBadge(project: ProjectRecord, locale: Locale): { label: string; tone: StatusTone } {
  const fr = locale === "fr";
  if (project.key === "product-infrastructure") return { label: fr ? "Projet interne" : "Internal project", tone: "tech" };
  switch (project.kind) {
    case "product":
      return { label: fr ? "Produit en ligne" : "Live product", tone: "live" };
    case "concept":
      return { label: fr ? "Concept" : "Concept", tone: "concept" };
    case "demo":
      return { label: fr ? "Démonstrateur" : "Demonstrator", tone: "tech" };
    default:
      return { label: fr ? "Mission client" : "Client engagement", tone: "mission" };
  }
}

export const STATUS_TONE_CLASSES: Record<StatusTone, string> = {
  live: "bg-[#e7f6ec] text-[#17663a] before:bg-[#22a05a]",
  concept: "bg-[#fdf1e3] text-[#8a4f0e] before:bg-[#d98a2b]",
  tech: "bg-[#ecebfb] text-[#4644b8] before:bg-[#5957d9]",
  mission: "bg-[#e8eef6] text-[#2b527e] before:bg-[#3f78b5]",
};
