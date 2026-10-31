import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/navigation/site-header";

describe("SiteHeader", () => {
  it("shows four direct links and no dropdown", () => {
    render(<SiteHeader locale="fr" />);
    const nav = screen.getByRole("navigation", { name: "Navigation principale" });
    const links = Array.from(nav.querySelectorAll("a"), (link) => [link.textContent, link.getAttribute("href")]);
    expect(links).toEqual([
      ["Sites web", "/fr/site-internet-commerces-pme"],
      ["Applications", "/fr/developpement-application-saas"],
      ["Réalisations", "/fr/work"],
      ["Studio", "/fr/studio/rayan-studio"],
    ]);
    expect(nav.querySelector("button")).toBeNull();
  });

  it("sends the header CTA to the free-quote page", () => {
    render(<SiteHeader locale="en" />);
    expect(screen.getByRole("link", { name: /Get a free quote/i })).toHaveAttribute("href", "/en/free-quote");
  });

  it("exposes a mobile menu button with aria controls", () => {
    render(<SiteHeader locale="fr" />);
    const button = screen.getByRole("button", { name: /Ouvrir le menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "mobile-site-menu");
  });

  it("exposes the dark-hero foreground state when topTheme is dark", () => {
    render(<SiteHeader locale="fr" topTheme="dark" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-top-theme", "dark");
    expect(header).toHaveAttribute("data-surface", "transparent");
  });

  it("keeps the normal foreground state by default (light top theme)", () => {
    render(<SiteHeader locale="fr" />);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-top-theme", "light");
    expect(header).toHaveAttribute("data-surface", "transparent");
  });

  it("switches to the opaque surface state once scrolled past the threshold", () => {
    render(<SiteHeader locale="fr" topTheme="dark" />);
    const header = screen.getByRole("banner");
    Object.defineProperty(window, "scrollY", { value: 30, writable: true });
    fireEvent.scroll(window);
    expect(header).toHaveAttribute("data-surface", "solid");
  });
});
