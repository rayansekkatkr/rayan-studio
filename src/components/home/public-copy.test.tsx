import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "@/components/home/home-page";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("public homepage copy invariants", () => {
  for (const locale of ["fr", "en"] as const) {
    it(`contains no em dash, price or fabricated team language in ${locale}`, () => {
      const { container } = render(<HomePage locale={locale} />);
      const text = container.textContent ?? "";
      expect(text).not.toContain("—");
      expect(text).not.toMatch(/€|\bEUR\b|\bKRW\b|\$\d|à partir de|starting at/i);
      expect(text).not.toMatch(/notre équipe d'experts|our team of experts/i);
    });
  }
});
