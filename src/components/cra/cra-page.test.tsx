import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CraPage } from "@/components/cra/cra-page";
import { CRA_CONTENT, getCraPage, type CraPageContent } from "@/content/cra";
import { getInsight } from "@/content/insights";
import type { Locale } from "@/lib/i18n";
import { craPath, insightPath, legalPath } from "@/lib/site-routes";

const CASES = [
  {
    locale: "fr",
    h1: "La conformité CRA pour les petits fabricants d'objets connectés.",
    booking: /Réserver un diagnostic/,
    subjectLabel: "Sujet",
    subject: "Diagnostic CRA",
    other: "en",
  },
  {
    locale: "en",
    h1: "CRA compliance for small connected-device manufacturers.",
    booking: /Book an assessment/,
    subjectLabel: "Subject",
    subject: "CRA assessment",
    other: "fr",
  },
] as const satisfies ReadonlyArray<{ locale: Locale; other: Locale } & Record<string, unknown>>;

describe.each(CASES)("Cyber Resilience Act page ($locale)", ({ locale, h1, booking, subjectLabel, subject, other }) => {
  it("renders the offer headline and both offers", () => {
    const { container } = render(<CraPage locale={locale} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(h1);
    const offers = Array.from(container.querySelectorAll("[data-cra-offer]"), (node) =>
      node.getAttribute("data-cra-offer"),
    );
    expect(offers).toEqual(["diagnostic", "veille"]);
  });

  it("stands alone: links stay on the page, the checklist, legal pages or its other-language version", () => {
    const { container } = render(<CraPage locale={locale} />);
    const checklist = getInsight("cra-reporting-checklist");
    const allowed = new Set([
      insightPath(locale, checklist.category, checklist.slug[locale]),
      legalPath(locale, "legal"),
      legalPath(locale, "privacy"),
      legalPath(locale, "terms"),
      craPath(other),
    ]);
    const hrefs = Array.from(container.querySelectorAll("a"), (link) => link.getAttribute("href") ?? "");
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.startsWith("#") || allowed.has(href), href).toBe(true);
    }
    expect(hrefs).toContain(craPath(other));
  });

  it("points every booking call to action at the prefilled diagnostic form", () => {
    const { container } = render(<CraPage locale={locale} />);
    const links = screen.getAllByRole("link", { name: booking });
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) expect(link).toHaveAttribute("href", "#diagnostic");
    expect(container.querySelector("section#diagnostic form")).not.toBeNull();
    expect(screen.getByLabelText(subjectLabel)).toHaveValue(subject);
  });
});

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]));
  }
  return typeof value;
}

describe("Cyber Resilience Act copy", () => {
  it("has the same structure in both languages (same number of steps, offers, items and questions)", () => {
    expect(shape(CRA_CONTENT.en)).toEqual(shape(CRA_CONTENT.fr));
    expect(CRA_CONTENT.en.ui.sections.map((section) => section.id)).toEqual(
      CRA_CONTENT.fr.ui.sections.map((section) => section.id),
    );
  });

  it("never promises compliance or certification", () => {
    const serialized = JSON.stringify(CRA_CONTENT);
    expect(serialized).not.toMatch(
      /garantissons|certifié conforme|conformité assurée|100 % conforme|we guarantee|guaranteed compliant|fully compliant|certified compliant/i,
    );
    expect(getCraPage("fr").notDone.map((item) => item.title)).toContain("Pas de certification ni de conformité garantie.");
    expect(getCraPage("en").notDone.map((item) => item.title)).toContain("No certification and no guaranteed compliance.");
    expect(getCraPage("fr").hero.note).toMatch(/Vous restez responsable de votre déclaration UE de conformité/);
    expect(getCraPage("en").hero.note).toMatch(/You remain responsible for your EU declaration of conformity/);
  });

  it("states the small-enterprise exemption precisely", () => {
    const answer = (content: CraPageContent, needle: string) =>
      content.faq.find((item) => item.question.includes(needle))?.answer ?? "";
    const fr = answer(getCraPage("fr"), "petite entreprise");
    expect(fr).toContain("retard sur l'alerte de 24 h");
    expect(fr).toContain("toutes les autres obligations s'appliquent");
    const en = answer(getCraPage("en"), "small company");
    expect(en).toContain("missing the 24-hour early warning deadline");
    expect(en).toContain("all other obligations apply");
  });

  it("shows no public price and no em dash", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const offer of getCraPage(locale).offers) {
        expect(`${offer.terms} ${offer.items.join(" ")}`, `${locale} ${offer.id}`).not.toMatch(
          /\d\s?€|€\s?\d|euros?|\$\s?\d/i,
        );
      }
    }
    expect(JSON.stringify(CRA_CONTENT)).not.toContain("—");
  });
});
