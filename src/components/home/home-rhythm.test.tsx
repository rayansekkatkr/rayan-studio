import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InsightsPreview } from "@/components/home/insights-preview";
import { MethodPreview } from "@/components/home/method-preview";
import { getInsight } from "@/content/insights";
import { insightPath } from "@/lib/site-routes";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("MethodPreview density", () => {
  it("renders one short description per stage in FR", () => {
    const { container } = render(<MethodPreview locale="fr" />);
    for (const text of [
      "Comprendre le besoin, les utilisateurs et les contraintes.",
      "Structurer l'expérience, les parcours et les interfaces.",
      "Développer le produit et connecter les services nécessaires.",
      "Tester, déployer et préparer une mise en production fiable.",
      "Mesurer, corriger et faire évoluer le produit dans le temps.",
    ]) {
      expect(container.textContent, text).toContain(text);
    }
  });

  it("renders natural English stage descriptions", () => {
    const { container } = render(<MethodPreview locale="en" />);
    for (const text of [
      "Understand the problem, users and constraints.",
      "Structure the experience, flows and interfaces.",
      "Develop the product and connect the required services.",
      "Test, deploy and prepare a reliable production release.",
      "Measure, refine and evolve the product over time.",
    ]) {
      expect(container.textContent, text).toContain(text);
    }
  });
});

describe("InsightsPreview density", () => {
  it("renders title, existing typed description and detail link for each card", () => {
    const { container } = render(<InsightsPreview locale="fr" />);
    for (const key of ["prepare-saas", "application-launch-checklist", "redesign-or-new"] as const) {
      const insight = getInsight(key);
      expect(container.textContent, `${key} title`).toContain(insight.title.fr);
      expect(container.textContent, `${key} description`).toContain(insight.description.fr);
      const href = insightPath("fr", insight.category, insight.slug.fr);
      expect(container.querySelector(`a[href="${href}"]`), href).not.toBeNull();
    }
  });
});
