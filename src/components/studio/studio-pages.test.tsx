import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FaqPage } from "@/components/studio/faq-page";
import { MethodPage } from "@/components/studio/method-page";
import { OffersPage } from "@/components/studio/offers-page";
import { RayanPage } from "@/components/studio/rayan-page";
import { StudioPage } from "@/components/studio/studio-page";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("Studio pages", () => {
  it("presents the independent studio honestly in FR", () => {
    const { container } = render(<StudioPage locale="fr" />);
    expect(container.textContent).toContain("Moins d'intermédiaires");
    expect(container.textContent).not.toContain("—");
    expect(container.textContent).not.toMatch(/notre équipe d'experts|our team of experts/i);
  });

  it("presents Rayan Sekkat without em dash or fabricated team", () => {
    const { container } = render(<RayanPage locale="fr" />);
    expect(container.textContent).toContain("Software Engineer & Founder");
    expect(container.textContent).not.toContain("—");
    expect(container.textContent).not.toMatch(/notre équipe d'experts|our team of experts/i);
  });

  it("renders the five approved method stages with the reassurance line", () => {
    const { container } = render(<MethodPage locale="fr" />);
    const methodText = container.textContent ?? "";
    expect(methodText).toMatch(/Discover/);
    expect(methodText).toMatch(/Design/);
    expect(methodText).toMatch(/Build/);
    expect(methodText).toMatch(/Launch/);
    expect(methodText).toMatch(/Improve/);
    expect(methodText).toContain("Vous n'avez pas besoin d'arriver avec un cahier des charges parfait.");
    expect(methodText).not.toContain("—");
  });

  it("renders four offers with the response promise and no public price", () => {
    const { container } = render(<OffersPage locale="fr" />);
    const offersText = container.textContent ?? "";
    expect(container.querySelectorAll("[data-offer]")).toHaveLength(4);
    expect(offersText).toContain("Première réponse sous 24h ouvrées.");
    expect(offersText).not.toMatch(/€|\bEUR\b|\bKRW\b|\$|à partir de|starting at/i);
    expect(offersText).not.toContain("—");
  });

  it("renders the seven cross-service FAQ subjects", () => {
    const { container } = render(<FaqPage locale="fr" />);
    expect(container.querySelectorAll("[data-faq-item]")).toHaveLength(7);
    expect(container.textContent).not.toContain("—");
  });
});
