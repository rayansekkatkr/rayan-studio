import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { CaseStudyPage } from "@/components/work/case-study-page";
import { getProject } from "@/content/projects";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

it("renders the complete approved case study sequence", () => {
  const project = getProject("pick4me");
  if (!project) throw new Error("Pick4Me missing");
  const { container } = render(<CaseStudyPage locale="fr" project={project} />);
  const sections = Array.from(container.querySelectorAll("[data-case-section]"), (node) =>
    node.getAttribute("data-case-section"),
  );
  expect(sections).toEqual([
    "hero",
    "overview",
    "challenge",
    "solution",
    "capabilities",
    "product-ux",
    "engineering",
    "technologies",
    "outcome",
    "gallery",
    "next-project",
    "cta",
  ]);
});
