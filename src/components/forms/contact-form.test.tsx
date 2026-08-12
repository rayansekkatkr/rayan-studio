import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/forms/contact-form";

afterEach(() => vi.unstubAllGlobals());

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Nom/i), "Rayan");
  await user.type(screen.getByLabelText(/Email/i), "rayan@example.com");
  await user.type(screen.getByLabelText(/Sujet/i), "Une question");
  await user.type(screen.getByLabelText(/Message/i), "Bonjour, message de test.");
}

describe("ContactForm", () => {
  it("preserves every field after a server error and allows retry to success", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: "fail", code: "SEND_FAILED" }), { status: 502 }),
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm locale="fr" />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /Envoyer/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/n'a pas pu être envoyé|conservées/i);
    });
    expect(screen.getByLabelText(/Nom/i)).toHaveValue("Rayan");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("rayan@example.com");
    expect(screen.getByLabelText(/Sujet/i)).toHaveValue("Une question");
    expect(screen.getByLabelText(/Message/i)).toHaveValue("Bonjour, message de test.");

    await user.click(screen.getByRole("button", { name: /Envoyer/i }));
    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/envoyé|merci/i);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("preserves fields after a network error", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    render(<ContactForm locale="fr" />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /Envoyer/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/réessayer/i);
    });
    expect(screen.getByLabelText(/Message/i)).toHaveValue("Bonjour, message de test.");
  });

  it("keeps the honeypot hidden from the accessibility tree", () => {
    render(<ContactForm locale="fr" />);
    const honeypot = document.querySelector('input[name="companyWebsite"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
