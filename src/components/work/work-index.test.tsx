import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { WorkIndex } from "@/components/work/work-index";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

it("renders selected work before secondary work in the exact flagship order", () => {
  const { container } = render(<WorkIndex locale="fr" />);
  const featured = Array.from(container.querySelectorAll("[data-work-project]"), (node) =>
    node.getAttribute("data-work-project"),
  );
  expect(featured).toEqual(["pick4me", "pont-facturx", "goodcall"]);
  expect(screen.getByText("More work")).toBeInTheDocument();
});

it("labels Manteigaria as an uncommissioned concept in More work", () => {
  const { container } = render(<WorkIndex locale="fr" />);
  expect(container.textContent).toContain("Concept, refonte non commandée");
});
