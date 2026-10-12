import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CraPage } from "@/components/cra/cra-page";
import { CRA_PAGE } from "@/content/cra";
import { getInsight } from "@/content/insights";
import { insightPath, legalPath } from "@/lib/site-routes";

describe("Cyber Resilience Act page", () => {
  it("renders the offer headline and both offers", () => {
    const { container } = render(<CraPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "La conformité CRA pour les petits fabricants d'objets connectés.",
    );
    const offers = Array.from(container.querySelectorAll("[data-cra-offer]"), (node) =>
      node.getAttribute("data-cra-offer"),
    );
    expect(offers).toEqual(["diagnostic", "veille"]);
  });

  it("stands alone: every link stays on the page, on the checklist or on legal pages", () => {
    const { container } = render(<CraPage />);
    const checklist = getInsight("cra-reporting-checklist");
    const allowed = new Set([
      insightPath("fr", checklist.category, checklist.slug.fr),
      legalPath("fr", "legal"),
      legalPath("fr", "privacy"),
      legalPath("fr", "terms"),
    ]);
    const hrefs = Array.from(container.querySelectorAll("a"), (link) => link.getAttribute("href") ?? "");
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.startsWith("#") || allowed.has(href), href).toBe(true);
    }
  });

  it("points every booking call to action at the prefilled diagnostic form", () => {
    const { container } = render(<CraPage />);
    const booking = screen.getAllByRole("link", { name: /Réserver un diagnostic/ });
    expect(booking.length).toBeGreaterThanOrEqual(2);
    for (const link of booking) expect(link).toHaveAttribute("href", "#diagnostic");
    expect(container.querySelector("section#diagnostic form")).not.toBeNull();
    expect(screen.getByLabelText("Sujet")).toHaveValue("Diagnostic CRA");
  });
});

describe("Cyber Resilience Act copy", () => {
  const serialized = JSON.stringify(CRA_PAGE);

  it("never promises compliance or certification", () => {
    expect(serialized).not.toMatch(/garantissons|certifié conforme|conformité assurée|100 % conforme/i);
    expect(CRA_PAGE.notDone.map((item) => item.title)).toContain("Pas de certification ni de conformité garantie.");
    expect(CRA_PAGE.hero.note).toMatch(/Vous restez responsable de votre déclaration UE de conformité/);
  });

  it("states the small-enterprise exemption precisely", () => {
    const answer = CRA_PAGE.faq.find((item) => item.question.includes("petite entreprise"))?.answer ?? "";
    expect(answer).toContain("retard sur l'alerte de 24 h");
    expect(answer).toContain("toutes les autres obligations s'appliquent");
  });

  it("shows no public price and no em dash", () => {
    for (const offer of CRA_PAGE.offers) {
      expect(`${offer.terms} ${offer.items.join(" ")}`, offer.id).not.toMatch(/\d\s?€|€\s?\d|euros?/i);
    }
    expect(serialized).not.toContain("—");
  });
});
