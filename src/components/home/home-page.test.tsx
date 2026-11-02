import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "@/components/home/home-page";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("HomePage", () => {
  it("renders the approved homepage section order", () => {
    const { container } = render(<HomePage locale="fr" />);
    const ids = Array.from(container.querySelectorAll("[data-home-section]"), (node) => node.id);
    expect(ids).toEqual(["hero", "statement", "founder", "services", "next-steps", "final-cta"]);
  });

  it("names the founder and the four studio products once, each linked to its case study", () => {
    const { container } = render(<HomePage locale="fr" />);
    expect(container.textContent).toContain("Rayan Sekkat");
    const links = Array.from(container.querySelectorAll("[data-home-products] a"), (a) => [a.textContent, a.getAttribute("href")]);
    expect(links.map(([, href]) => href)).toEqual([
      "/fr/work/pick4me",
      "/fr/work/pont-facturx",
      "/fr/work/goodcall",
      "/fr/work/docextract",
    ]);
    // Demos, missions and concepts stay on the work page.
    expect(container.textContent).not.toMatch(/Manteigaria|Ops Knowledge|STMicroelectronics/);
  });
});
