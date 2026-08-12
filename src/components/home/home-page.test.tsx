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
    expect(ids).toEqual([
      "hero",
      "expertise",
      "selected-work",
      "services",
      "studio",
      "method",
      "offers",
      "insights",
      "final-cta",
    ]);
  });

  it("renders featured projects in the exact approved order", () => {
    const { container } = render(<HomePage locale="fr" />);
    const projectKeys = Array.from(container.querySelectorAll("[data-featured-project]"), (node) =>
      node.getAttribute("data-featured-project"),
    );
    expect(projectKeys).toEqual(["pick4me", "pont-facturx", "goodcall"]);
  });
});
