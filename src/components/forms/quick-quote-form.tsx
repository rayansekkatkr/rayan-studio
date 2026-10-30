"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import type { QuoteType } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { FormStatus } from "./form-status";

type SubmissionState = "idle" | "sending" | "success" | "error";

const TYPES: Array<{ value: QuoteType; label: Record<Locale, string>; placeholder: Record<Locale, string> }> = [
  {
    value: "site",
    label: { fr: "Site vitrine ou refonte", en: "Website or redesign" },
    placeholder: {
      fr: "Votre activité, votre site actuel s'il existe, ce que vous attendez du nouveau site.",
      en: "Your business, your current website if any, what you expect from the new one.",
    },
  },
  {
    value: "app",
    label: { fr: "Application ou SaaS", en: "Application or SaaS" },
    placeholder: {
      fr: "Le problème à résoudre, les utilisateurs, où en est le projet aujourd'hui.",
      en: "The problem to solve, the users, where the project stands today.",
    },
  },
  {
    value: "other",
    label: { fr: "Autre besoin", en: "Something else" },
    placeholder: {
      fr: "Décrivez votre besoin en quelques lignes.",
      en: "Describe your need in a few lines.",
    },
  },
];

const MESSAGES: Record<Locale, Record<string, string>> = {
  fr: {
    MISSING_FIELDS: "Merci de remplir tous les champs.",
    INVALID_EMAIL: "Adresse email invalide.",
    RATE_LIMITED: "Trop de tentatives. Réessayez dans quelques minutes.",
    SEND_FAILED: "Votre demande n'a pas pu être envoyée. Vos informations sont conservées, vous pouvez réessayer.",
    NETWORK: "Connexion impossible. Vos informations sont conservées, vous pouvez réessayer.",
    SENDING: "Envoi en cours...",
    SUCCESS: "Demande envoyée. Merci, première réponse sous 24 h ouvrées.",
  },
  en: {
    MISSING_FIELDS: "Please fill in every field.",
    INVALID_EMAIL: "Invalid email address.",
    RATE_LIMITED: "Too many attempts. Try again in a few minutes.",
    SEND_FAILED: "Your request could not be sent. Your information is preserved, you can retry.",
    NETWORK: "Connection failed. Your information is preserved, you can retry.",
    SENDING: "Sending...",
    SUCCESS: "Request sent. Thank you, first response within 24 business hours.",
  },
};

function isQuoteType(value: string | null): value is QuoteType {
  return value === "site" || value === "app" || value === "other";
}

/**
 * Short quote request: same fields as the contact form (name, email, subject, message),
 * the subject being built from the chosen project type. Sent through /api/contact.
 */
export function QuickQuoteForm({
  locale,
  defaultType = "site",
  source,
  readTypeFromUrl = false,
}: {
  locale: Locale;
  defaultType?: QuoteType;
  /** Where the form is shown, for analytics. */
  source: string;
  /** On the quote page, `?type=app` preselects the project type. */
  readTypeFromUrl?: boolean;
}) {
  const fr = locale === "fr";
  const [type, setType] = useState<QuoteType>(defaultType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    if (!readTypeFromUrl) return;
    const fromUrl = new URLSearchParams(window.location.search).get("type");
    if (isQuoteType(fromUrl)) setType(fromUrl);
  }, [readTypeFromUrl]);

  function started() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("quote_form_start", { source, type });
    }
  }

  const current = TYPES.find((item) => item.value === type) ?? TYPES[0];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage(MESSAGES[locale].SENDING);
    trackEvent("quote_form_submit", { source, type });
    const subject = `${fr ? "Devis gratuit" : "Free quote"} · ${current.label[locale]}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, name, email, subject, message, companyWebsite }),
      });
      const body = (await response.json().catch(() => ({}))) as { ok?: boolean; code?: string };
      if (response.ok && body.ok) {
        setStatus("success");
        setStatusMessage(MESSAGES[locale].SUCCESS);
        trackEvent("quote_form_success", { source, type });
        setName("");
        setEmail("");
        setMessage("");
        startedRef.current = false;
        return;
      }
      const code = body.code && MESSAGES[locale][body.code] ? body.code : "SEND_FAILED";
      setStatus("error");
      setStatusMessage(MESSAGES[locale][code]);
      trackEvent("quote_form_error", { source, code });
    } catch {
      setStatus("error");
      setStatusMessage(MESSAGES[locale].NETWORK);
      trackEvent("quote_form_error", { source, code: "NETWORK" });
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] bg-rs-bg px-4 py-3 text-base text-rs-fg outline-none transition-colors duration-150 focus:border-rs-accent";
  const id = (field: string) => `quote-${source}-${field}`;

  return (
    <form onSubmit={handleSubmit} noValidate data-quote-form={source}>
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id("company-website")}>Company website</label>
        <input
          id={id("company-website")}
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)}
        />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-rs-fg">{fr ? "Votre projet" : "Your project"}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {TYPES.map((item) => (
            <label
              key={item.value}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150",
                type === item.value
                  ? "border-rs-accent bg-[color-mix(in_srgb,var(--rs-accent)_10%,transparent)] text-rs-accent-fg"
                  : "border-[var(--rs-border)] text-rs-fg hover:border-[var(--rs-border-strong)]",
              )}
            >
              <input
                type="radio"
                name={id("type")}
                value={item.value}
                checked={type === item.value}
                onChange={() => {
                  started();
                  setType(item.value);
                }}
                className="sr-only"
              />
              {item.label[locale]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="text-sm font-semibold text-rs-fg">
            {fr ? "Nom" : "Name"}
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            value={name}
            onChange={(event) => {
              started();
              setName(event.target.value);
            }}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={id("email")} className="text-sm font-semibold text-rs-fg">
            Email
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            value={email}
            onChange={(event) => {
              started();
              setEmail(event.target.value);
            }}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={id("message")} className="text-sm font-semibold text-rs-fg">
          {fr ? "Votre besoin en quelques lignes" : "Your need in a few lines"}
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={4}
          maxLength={5000}
          placeholder={current.placeholder[locale]}
          value={message}
          onChange={(event) => {
            started();
            setMessage(event.target.value);
          }}
          className={inputClass}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent disabled:opacity-60"
        >
          {type === "site"
            ? fr
              ? "Recevoir ma maquette gratuite"
              : "Get my free mockup"
            : fr
              ? "Demander mon devis gratuit"
              : "Request my free quote"}
        </button>
        <FormStatus state={status} message={statusMessage} />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-rs-muted">
        {fr
          ? "Réponse sous 24 h ouvrées. Vos informations servent uniquement à vous répondre."
          : "Reply within 24 business hours. Your information is only used to answer you."}
      </p>
    </form>
  );
}
