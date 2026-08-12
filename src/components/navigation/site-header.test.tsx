import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/navigation/site-header";

describe("SiteHeader", () => {
  it("opens Services with aria-expanded and closes it on Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader locale="fr" />);
    const trigger = screen.getByRole("button", { name: "Services" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Applications web & SaaS/i })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("uses the canonical start-project path", () => {
    render(<SiteHeader locale="en" />);
    expect(screen.getByRole("link", { name: /Start a project/i })).toHaveAttribute(
      "href",
      "/en/start-a-project",
    );
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
