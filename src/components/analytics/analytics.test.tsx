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
