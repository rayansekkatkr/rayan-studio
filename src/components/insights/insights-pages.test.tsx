import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { InsightArticle } from "@/components/insights/insight-article";
import { InsightsIndex } from "@/components/insights/insights-index";
import { ProjectReadinessTool } from "@/components/insights/project-readiness-tool";
import { getInsight } from "@/content/insights";
import { servicePath } from "@/lib/site-routes";

describe("InsightsIndex", () => {
  it("features prepare-saas and links to its real detail page", () => {
    const { container } = render(<InsightsIndex locale="fr" />);
    const featured = container.querySelector("[data-featured-insight]");
    expect(featured?.getAttribute("data-featured-insight")).toBe("prepare-saas");
    expect(container.querySelector('a[href="/fr/insights/guides/preparer-projet-saas"]')).not.toBeNull();
  });
});

describe("InsightArticle", () => {
  it("uses a reading-width column and links the related service", () => {
    const insight = getInsight("prepare-saas");
    const { container } = render(<InsightArticle locale="fr" insight={insight} />);
    expect(container.querySelector('[class*="--rs-reading"]')).not.toBeNull();
    expect(container.querySelector(`a[href="${servicePath("fr", "applications")}"]`)).not.toBeNull();
    expect(container.textContent).not.toContain("—");
  });

  it("renders checklist blocks as readable list content", () => {
    const insight = getInsight("application-launch-checklist");
    const { container } = render(<InsightArticle locale="fr" insight={insight} />);
    expect(container.querySelectorAll("li").length).toBeGreaterThan(10);
  });
});

describe("ProjectReadinessTool", () => {
  it("renders five questions and computes the deterministic result", async () => {
    const user = userEvent.setup();
    render(<ProjectReadinessTool locale="en" />);

    const yesButtons = screen.getAllByRole("radio", { name: /^Yes$/i });
    expect(yesButtons).toHaveLength(5);
    expect(screen.getAllByRole("radio", { name: /^No$/i })).toHaveLength(5);

    for (const button of yesButtons) {
      await user.click(button);
    }
    await user.click(screen.getByRole("button", { name: /See the result/i }));
    expect(screen.getByRole("status").textContent).toMatch(/well prepared/i);
    expect(screen.getByRole("link", { name: /Start a project/i })).toHaveAttribute(
      "href",
      "/en/start-a-project",
    );
  });

  it("returns the clarify message for low scores", async () => {
    const user = userEvent.setup();
    render(<ProjectReadinessTool locale="en" />);
    for (const button of screen.getAllByRole("radio", { name: /^No$/i })) {
      await user.click(button);
    }
    await user.click(screen.getByRole("button", { name: /See the result/i }));
    expect(screen.getByRole("status").textContent).toMatch(/clarify/i);
  });
});
