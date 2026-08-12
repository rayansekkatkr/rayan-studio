import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { resolveProjectPage } from "@/components/work/resolve-project-page";
import { ProjectSummaryPage } from "@/components/work/project-summary-page";
import { getProject } from "@/content/projects";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("project route resolution", () => {
  it("resolves all five registered slugs", () => {
    for (const slug of ["pick4me", "pont-facturx", "goodcall", "docextract", "manteigaria"]) {
      expect(resolveProjectPage(slug)?.project.slug, slug).toBe(slug);
    }
  });

  it("returns null for unknown slugs", () => {
    expect(resolveProjectPage("unknown-project")).toBeNull();
  });

  it("selects the flagship template only for featured projects", () => {
    expect(resolveProjectPage("pick4me")?.kind).toBe("case-study");
    expect(resolveProjectPage("pont-facturx")?.kind).toBe("case-study");
    expect(resolveProjectPage("goodcall")?.kind).toBe("case-study");
    expect(resolveProjectPage("docextract")?.kind).toBe("summary");
    expect(resolveProjectPage("manteigaria")?.kind).toBe("summary");
  });

  it("renders Manteigaria summary with the uncommissioned concept label", () => {
    const project = getProject("manteigaria");
    if (!project) throw new Error("Manteigaria missing");
    const { container } = render(<ProjectSummaryPage locale="fr" project={project} />);
    expect(container.textContent).toContain("Concept, refonte non commandée");
  });
});
