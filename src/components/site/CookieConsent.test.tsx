import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CONSENT_KEY } from "@/lib/analytics";
import { CookieConsent } from "@/components/site/CookieConsent";

beforeEach(() => {
  window.localStorage.clear();
  window.history.pushState({}, "", "/fr");
});

describe("CookieConsent", () => {
  it("shows the banner when no choice is saved", () => {
    render(<CookieConsent />);
    expect(screen.getByRole("button", { name: /Accepter/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Refuser/i })).toBeInTheDocument();
  });

  it("accept stores the choice, dispatches the granted event and hides the banner", async () => {
    const user = userEvent.setup();
    const granted = vi.fn();
    window.addEventListener("rs-consent-granted", granted);

    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: /Accepter/i }));

    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("accepted");
    expect(granted).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: /Accepter/i })).not.toBeInTheDocument();
    window.removeEventListener("rs-consent-granted", granted);
  });

  it("decline stores the choice, dispatches the revoked event and hides the banner", async () => {
    const user = userEvent.setup();
    const revoked = vi.fn();
    window.addEventListener("rs-consent-revoked", revoked);

    render(<CookieConsent />);
    await user.click(screen.getByRole("button", { name: /Refuser/i }));

    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("declined");
    expect(revoked).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: /Refuser/i })).not.toBeInTheDocument();
    window.removeEventListener("rs-consent-revoked", revoked);
  });

  it("reopens through the rs-open-consent event after a saved choice", async () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    render(<CookieConsent />);
    expect(screen.queryByRole("button", { name: /Accepter/i })).not.toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event("rs-open-consent"));
    });
    expect(screen.getByRole("button", { name: /Accepter/i })).toBeInTheDocument();
  });

  it("renders FR copy on FR paths and EN copy on EN paths", () => {
    const { unmount } = render(<CookieConsent />);
    expect(screen.getByText(/cookies de mesure d'audience/i)).toBeInTheDocument();
    unmount();

    window.history.pushState({}, "", "/en/work");
    render(<CookieConsent />);
    expect(screen.getByText(/analytics cookies/i)).toBeInTheDocument();
  });
});
