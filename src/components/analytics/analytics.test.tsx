import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CONSENT_KEY, trackEvent } from "@/lib/analytics";
import { TrackedLink } from "@/components/analytics/tracked-link";

const gtag = vi.fn();

beforeEach(() => {
  window.localStorage.clear();
  gtag.mockReset();
  window.gtag = gtag;
});

afterEach(() => {
  delete (window as { gtag?: unknown }).gtag;
});

describe("consent gate", () => {
  it("sends nothing without consent", () => {
    trackEvent("cta_click", { cta_id: "hero_start_project" });
    expect(gtag).not.toHaveBeenCalled();
  });

  it("sends nothing when consent is declined", () => {
    window.localStorage.setItem(CONSENT_KEY, "declined");
    trackEvent("cta_click", { cta_id: "hero_start_project" });
    expect(gtag).not.toHaveBeenCalled();
  });

  it("sends events when consent is accepted", () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    trackEvent("cta_click", { cta_id: "hero_start_project" });
    expect(gtag).toHaveBeenCalledWith("event", "cta_click", { cta_id: "hero_start_project" });
  });
});

describe("form analytics contain no PII", () => {
  it("contact form lifecycle events never contain typed values", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    const { ContactForm } = await import("@/components/forms/contact-form");
    render(<ContactForm locale="fr" />);
    await user.type(screen.getByLabelText(/Nom/i), "Jean-PII Dupont");
    await user.type(screen.getByLabelText(/Email/i), "jean.pii@example.com");
    await user.type(screen.getByLabelText(/Sujet/i), "Sujet PII secret");
    await user.type(screen.getByLabelText(/Message/i), "Message PII ultra confidentiel");
    await user.click(screen.getByRole("button", { name: /Envoyer/i }));

    const serialized = JSON.stringify(gtag.mock.calls);
    expect(gtag.mock.calls.length).toBeGreaterThan(0);
    expect(serialized).not.toContain("jean.pii@example.com");
    expect(serialized).not.toContain("Jean-PII");
    expect(serialized).not.toContain("PII secret");
    expect(serialized).not.toContain("confidentiel");
    vi.unstubAllGlobals();
  });

  it("project form lifecycle events never contain typed values", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );

    const { ProjectForm } = await import("@/components/forms/project-form");
    render(<ProjectForm locale="fr" />);
    await user.click(screen.getByRole("radio", { name: /MVP/i }));
    await user.click(screen.getByRole("button", { name: /Suivant/i }));
    await user.click(screen.getByRole("radio", { name: /Une idée/i }));
    await user.click(screen.getByRole("button", { name: /Suivant/i }));
    await user.type(screen.getByLabelText(/Objectif/i), "Objectif PII tres confidentiel");
    await user.click(screen.getByRole("button", { name: /Suivant/i }));
    await user.click(screen.getByRole("radio", { name: /Dès que possible/i }));
    await user.click(screen.getByRole("button", { name: /Suivant/i }));
    await user.type(screen.getByLabelText(/^Nom/i), "Marie-PII");
    await user.type(screen.getByLabelText(/Entreprise/i), "Entreprise-PII SARL");
    await user.type(screen.getByLabelText(/Email/i), "marie.pii@example.com");
    await user.type(screen.getByLabelText(/Budget/i), "42000 euros secrets");
    await user.click(screen.getByRole("button", { name: /Envoyer/i }));

    const serialized = JSON.stringify(gtag.mock.calls);
    expect(gtag.mock.calls.length).toBeGreaterThan(0);
    expect(serialized).not.toContain("marie.pii@example.com");
    expect(serialized).not.toContain("Marie-PII");
    expect(serialized).not.toContain("Entreprise-PII");
    expect(serialized).not.toContain("42000");
    expect(serialized).not.toContain("confidentiel");
    vi.unstubAllGlobals();
  });
});

describe("TrackedLink", () => {
  it("emits cta_click with categorical values only", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    const user = userEvent.setup();

    render(
      <TrackedLink
        href="/fr/demarrer-un-projet"
        event={{
          ctaId: "hero_start_project",
          source: "home_hero",
          destination: "/fr/demarrer-un-projet",
          locale: "fr",
        }}
      >
        Parler de votre projet
      </TrackedLink>,
    );

    await user.click(screen.getByRole("link", { name: /Parler de votre projet/i }));
    expect(gtag).toHaveBeenCalledTimes(1);
    const [, eventName, params] = gtag.mock.calls[0];
    expect(eventName).toBe("cta_click");
    expect(params).toEqual({
      cta_id: "hero_start_project",
      source: "home_hero",
      destination: "/fr/demarrer-un-projet",
      locale: "fr",
    });
  });
});
