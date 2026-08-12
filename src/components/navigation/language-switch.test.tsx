import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const usePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));

import { LanguageSwitch } from "@/components/navigation/language-switch";

function enHrefFor(pathname: string): string | null {
  usePathname.mockReturnValue(pathname);
  const { container, unmount } = render(<LanguageSwitch locale="fr" />);
  const href = container.querySelector('a[aria-label="English version"]')?.getAttribute("href") ?? null;
  unmount();
  return href;
}

describe("LanguageSwitch locale equivalence", () => {
  it("maps insight detail slugs to their localized equivalent", () => {
    expect(enHrefFor("/fr/insights/guides/preparer-projet-saas")).toBe(
      "/en/insights/guides/prepare-saas-project",
    );
    expect(enHrefFor("/fr/insights/checklists/checklist-refonte-site-internet")).toBe(
      "/en/insights/checklists/website-redesign-checklist",
    );
  });

  it("falls back to the category root for an unknown detail slug", () => {
    expect(enHrefFor("/fr/insights/guides/inconnu")).toBe("/en/insights/guides");
  });

  it("keeps known static equivalences", () => {
    expect(enHrefFor("/fr/services/applications-web-saas")).toBe(
      "/en/services/web-applications-saas",
    );
    expect(enHrefFor("/fr/studio/offres")).toBe("/en/studio/offers");
    expect(enHrefFor("/fr/insights/outils")).toBe("/en/insights/tools");
    expect(enHrefFor("/fr/demarrer-un-projet")).toBe("/en/start-a-project");
  });
});
