import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
});
