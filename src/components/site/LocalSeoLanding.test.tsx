import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LocalSeoLanding } from "@/components/site/LocalSeoLanding";
import { buildLocalSeoContent } from "@/lib/local-seo-content";

function renderRepresentativePage() {
  const content = buildLocalSeoContent({
    citySlug: "paris",
    cityLabel: "Paris",
    sectorSlug: "restaurant",
    sectorLabel: "Restaurant",
    objective: "Rendre la réservation et l'appel immédiats depuis mobile",
  });
  return render(
    <LocalSeoLanding
      city="Paris"
      citySlug="paris"
      sector="Restaurant"
      sectorSlug="restaurant"
      content={content}
    />,
  );
}

describe("LocalSeoLanding studio shell", () => {
  it("keeps local intent content while using the new studio shell", () => {
    const { container } = renderRepresentativePage();

    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/restaurant/i);
    expect(container.textContent).toContain("Paris");
    expect(container.textContent).toMatch(/Contexte local/);
    expect(container.textContent).toMatch(/Questions fréquentes/);

    expect(container.querySelector('a[href="/site/restaurant/lyon"]')).not.toBeNull();
    expect(container.querySelector('a[href="/site/cafe/paris"]')).not.toBeNull();

    expect(container.querySelector('a[href="/fr/demarrer-un-projet"]')).not.toBeNull();

    expect(screen.getAllByText("RAYAN STUDIO").length).toBeGreaterThan(0);
    expect(container.textContent).not.toMatch(/\bRS\b(?! )/);

    const schema = container.querySelector('script[type="application/ld+json"]');
    expect(schema?.textContent).toContain("FAQPage");
    expect(schema?.textContent).toContain("BreadcrumbList");
    expect(schema?.textContent).toContain('"City"');
  });

  it("does not rely on the legacy warm shell colors", () => {
    const { container } = renderRepresentativePage();
    expect(container.innerHTML).not.toContain("#c2461f");
    expect(container.innerHTML).not.toContain("#fffaf0");
  });
});
