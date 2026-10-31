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
    expect(ids).toEqual(["hero", "statement", "services", "trust", "final-cta"]);
  });

  it("names no project: projects live on the work page only", () => {
    const { container } = render(<HomePage locale="fr" />);
    expect(container.querySelectorAll("[data-featured-project]")).toHaveLength(0);
    expect(container.textContent).not.toMatch(/Pick4Me|Pont Factur-X|GoodCall|DocExtract|Manteigaria|STMicroelectronics/);
  });
});
