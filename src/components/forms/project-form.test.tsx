import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProjectForm } from "@/components/forms/project-form";

afterEach(() => vi.unstubAllGlobals());

async function walkToFinalStep(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("radio", { name: /Application \/ SaaS/i }));
  await user.click(screen.getByRole("button", { name: /Suivant/i }));

  await user.click(screen.getByRole("radio", { name: /Produit existant/i }));
  await user.click(screen.getByRole("button", { name: /Suivant/i }));

  await user.type(
    screen.getByLabelText(/Objectif/i),
    "Faire évoluer une plateforme existante.",
  );
  await user.click(screen.getByRole("button", { name: /Suivant/i }));

  await user.click(screen.getByRole("radio", { name: /1-3 mois/i }));
  await user.click(screen.getByRole("button", { name: /Suivant/i }));

  await user.type(screen.getByLabelText(/^Nom/i), "Rayan");
  await user.type(screen.getByLabelText(/Entreprise/i), "Studio");
  await user.type(screen.getByLabelText(/Email/i), "rayan@example.com");
}

describe("ProjectForm", () => {
  it("blocks Next without a selection", async () => {
    const user = userEvent.setup();
    render(<ProjectForm locale="fr" />);
    await user.click(screen.getByRole("button", { name: /Suivant/i }));
    expect(screen.getByRole("radio", { name: /Application \/ SaaS/i })).toBeInTheDocument();
  });

  it("preserves all answers across Back navigation and a server error, then succeeds on retry", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: "fail", code: "SEND_FAILED" }), { status: 502 }),
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    render(<ProjectForm locale="fr" />);
    await walkToFinalStep(user);
    await user.click(screen.getByRole("button", { name: /Envoyer/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/conservées/i);
    });

    expect(screen.getByLabelText(/^Nom/i)).toHaveValue("Rayan");
    expect(screen.getByLabelText(/Entreprise/i)).toHaveValue("Studio");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("rayan@example.com");

    await user.click(screen.getByRole("button", { name: /Retour/i }));
    expect(screen.getByRole("radio", { name: /1-3 mois/i })).toBeChecked();
    await user.click(screen.getByRole("button", { name: /Retour/i }));
    expect(screen.getByLabelText(/Objectif/i)).toHaveValue(
      "Faire évoluer une plateforme existante.",
    );
    await user.click(screen.getByRole("button", { name: /Retour/i }));
    expect(screen.getByRole("radio", { name: /Produit existant/i })).toBeChecked();
    await user.click(screen.getByRole("button", { name: /Retour/i }));
    expect(screen.getByRole("radio", { name: /Application \/ SaaS/i })).toBeChecked();

    for (let i = 0; i < 4; i += 1) {
      await user.click(screen.getByRole("button", { name: /Suivant/i }));
    }
    await user.click(screen.getByRole("button", { name: /Envoyer/i }));
    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/envoyée|merci/i);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("submits without a budget", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    render(<ProjectForm locale="fr" />);
    await walkToFinalStep(user);
    await user.click(screen.getByRole("button", { name: /Envoyer/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body.budget).toBeUndefined();
    expect(body.projectType).toBe("application");
    expect(body.stage).toBe("existing-product");
    expect(body.timing).toBe("1-3-months");
  });
});
