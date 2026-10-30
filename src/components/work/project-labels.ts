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
