"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import { FormStatus } from "./form-status";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  companyWebsite: string;
};

type SubmissionState = "idle" | "sending" | "success" | "error";

const EMPTY_STATE: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  companyWebsite: "",
};

const MESSAGES: Record<Locale, Record<string, string>> = {
  fr: {
    INVALID_REQUEST: "Requête invalide. Vérifiez les champs et réessayez.",
    MISSING_FIELDS: "Merci de remplir tous les champs.",
    INVALID_EMAIL: "Adresse email invalide.",
    RATE_LIMITED: "Trop de tentatives. Réessayez dans quelques minutes.",
    EMAIL_CONFIG_MISSING: "Envoi indisponible pour le moment. Vos informations sont conservées, vous pouvez réessayer.",
    SEND_FAILED: "Votre message n'a pas pu être envoyé. Vos informations sont conservées, vous pouvez réessayer.",
    NETWORK: "Connexion impossible. Vos informations sont conservées, vous pouvez réessayer.",
    SENDING: "Envoi en cours...",
    SUCCESS: "Message envoyé. Merci, première réponse sous 24h ouvrées.",
  },
  en: {
    INVALID_REQUEST: "Invalid request. Check the fields and try again.",
    MISSING_FIELDS: "Please fill in every field.",
    INVALID_EMAIL: "Invalid email address.",
    RATE_LIMITED: "Too many attempts. Try again in a few minutes.",
    EMAIL_CONFIG_MISSING: "Sending is unavailable right now. Your information is preserved, you can retry.",
    SEND_FAILED: "Your message could not be sent. Your information is preserved, you can retry.",
    NETWORK: "Connection failed. Your information is preserved, you can retry.",
    SENDING: "Sending...",
    SUCCESS: "Message sent. Thank you, first response within 24 business hours.",
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [formState, setFormState] = useState<ContactFormState>(EMPTY_STATE);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedRef = useRef(false);

  function update(field: keyof ContactFormState) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!startedRef.current) {
        startedRef.current = true;
        trackEvent("contact_form_start");
      }
      setFormState((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage(MESSAGES[locale].SENDING);
    trackEvent("contact_form_submit");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, ...formState }),
      });
      const body = (await response.json().catch(() => ({}))) as { ok?: boolean; code?: string };

      if (response.ok && body.ok) {
        setStatus("success");
        setStatusMessage(MESSAGES[locale].SUCCESS);
        trackEvent("contact_form_success");
        setFormState(EMPTY_STATE);
        startedRef.current = false;
        return;
      }

      const code = body.code && MESSAGES[locale][body.code] ? body.code : "SEND_FAILED";
      setStatus("error");
      setStatusMessage(MESSAGES[locale][code]);
      trackEvent("contact_form_error", { code });
    } catch {
      setStatus("error");
      setStatusMessage(MESSAGES[locale].NETWORK);
      trackEvent("contact_form_error", { code: "NETWORK" });
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] bg-rs-surface px-4 py-3 text-base text-rs-fg outline-none transition-colors duration-150 focus:border-rs-accent";

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl">
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-company-website">Company website</label>
        <input
          id="contact-company-website"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formState.companyWebsite}
          onChange={(event) =>
            setFormState((current) => ({ ...current, companyWebsite: event.target.value }))
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold text-rs-fg">
            {fr ? "Nom" : "Name"}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            value={formState.name}
            onChange={update("name")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold text-rs-fg">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={160}
            value={formState.email}
            onChange={update("email")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-subject" className="text-sm font-semibold text-rs-fg">
          {fr ? "Sujet" : "Subject"}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          maxLength={160}
          value={formState.subject}
          onChange={update("subject")}
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-sm font-semibold text-rs-fg">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          value={formState.message}
          onChange={update("message")}
          className={inputClass}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent disabled:opacity-60"
        >
          {fr ? "Envoyer" : "Send"}
        </button>
        <FormStatus state={status} message={statusMessage} />
      </div>
    </form>
  );
}
