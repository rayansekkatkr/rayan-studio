import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ServicePage } from "@/components/services/service-page";
import { getService } from "@/content/services";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

it("renders business need before engineering and technology", () => {
  const { container } = render(<ServicePage locale="fr" service={getService("applications")} />);
  const sections = Array.from(container.querySelectorAll("[data-service-section]"), (node) =>
    node.getAttribute("data-service-section"),
  );
  expect(sections).toEqual(["hero", "need", "use-cases", "approach", "engineering", "proof", "faq", "cta"]);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /produits web conçus autour de votre métier/i,
  );
});
