"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { EMAIL_RE } from "@/lib/forms/validation";
import type { Locale } from "@/lib/i18n";
import type { QuoteType } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { FormStatus } from "./form-status";

type SubmissionState = "idle" | "sending" | "success" | "error";

const TYPES: Array<{ value: QuoteType; label: Record<Locale, string>; placeholder: Record<Locale, string> }> = [
  {
    value: "site",
    label: { fr: "Création ou refonte de site", en: "New website or redesign" },
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
    FIELD_NAME: "Indiquez votre nom.",
    FIELD_EMAIL: "Indiquez une adresse email valide, par exemple vous@entreprise.fr.",
    FIELD_MESSAGE: "Décrivez votre projet en quelques lignes.",
    FIX_FIELDS: "Vérifiez les champs signalés.",
  },
  en: {
    MISSING_FIELDS: "Please fill in every field.",
    INVALID_EMAIL: "Invalid email address.",
    RATE_LIMITED: "Too many attempts. Try again in a few minutes.",
    SEND_FAILED: "Your request could not be sent. Your information is preserved, you can retry.",
    NETWORK: "Connection failed. Your information is preserved, you can retry.",
    SENDING: "Sending...",
    SUCCESS: "Request sent. Thank you, first response within 24 business hours.",
    FIELD_NAME: "Enter your name.",
    FIELD_EMAIL: "Enter a valid email address, for example you@company.com.",
    FIELD_MESSAGE: "Describe your project in a few lines.",
    FIX_FIELDS: "Check the highlighted fields.",
  },
};

function isQuoteType(value: string | null): value is QuoteType {
  return value === "site" || value === "app" || value === "other";
}

type Field = "name" | "email" | "message";
type FieldErrors = Partial<Record<Field, string>>;

// Same rules as the server (src/lib/forms/validation.ts): required, trimmed, plausible email.
// Checked before sending so an incomplete form never reaches /api/contact.

function validate(values: Record<Field, string>, locale: Locale): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = MESSAGES[locale].FIELD_NAME;
  if (!EMAIL_RE.test(values.email.trim())) errors.email = MESSAGES[locale].FIELD_EMAIL;
  if (!values.message.trim()) errors.message = MESSAGES[locale].FIELD_MESSAGE;
  return errors;
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
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sentTo, setSentTo] = useState("");
  const startedRef = useRef(false);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") confirmationRef.current?.focus();
  }, [status]);

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
    const fieldErrors = validate({ name, email, message }, locale);
    setErrors(fieldErrors);
    const firstInvalid = (["name", "email", "message"] as Field[]).find((field) => fieldErrors[field]);
    if (firstInvalid) {
      setStatus("error");
      setStatusMessage(MESSAGES[locale].FIX_FIELDS);
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }
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
        setSentTo(email.trim());
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
    "mt-1.5 w-full rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] bg-rs-bg px-4 py-3 text-base text-rs-fg outline-none transition-colors duration-150 placeholder:text-rs-muted focus:border-rs-accent aria-[invalid=true]:border-red-700";
  const id = (field: string) => `quote-${source}-${field}`;
  const errorId = (field: Field) => `${id(field)}-error`;
  const fieldProps = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
  });
  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={errorId(field)} className="mt-1.5 text-sm font-medium text-red-700">
        {errors[field]}
      </p>
    ) : null;
  const clearError = (field: Field) => {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const required = (
    <span className="font-normal text-rs-muted">{fr ? " (obligatoire)" : " (required)"}</span>
  );

  if (status === "success") {
    // Replaces the form: say what happens next, to whom, and when.
    return (
      <div data-quote-form={source} data-quote-sent className="border-l-2 border-rs-accent pl-5">
        <h3 ref={confirmationRef} tabIndex={-1} className="text-2xl font-bold tracking-[-0.03em]">
          {fr ? "Demande envoyée, merci." : "Request sent, thank you."}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-rs-muted">
          {type === "site"
            ? fr
              ? "Vous recevrez la maquette de votre page d'accueil sous 24 h ouvrées (jours ouvrés français), à l'adresse "
              : "You will receive the mockup of your home page within 24 business hours (French business days), at "
            : fr
              ? "Je vous réponds sous 24 h ouvrées (jours ouvrés français), à l'adresse "
              : "I will reply within 24 business hours (French business days), at "}
          {/* A long address must wrap instead of widening the page (overflow-wrap: anywhere also
              shrinks the min-content width that grid columns size from). */}
          <span className="font-medium text-rs-fg [overflow-wrap:anywhere]">{sentTo}</span>.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setStatusMessage("");
          }}
          className="mt-5 text-base font-semibold underline underline-offset-4 transition-colors duration-150 hover:text-rs-accent-fg"
        >
          {fr ? "Envoyer une autre demande" : "Send another request"}
        </button>
      </div>
    );
  }

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
                "cursor-pointer rounded-none border px-4 py-2 text-sm font-medium transition-colors duration-150 has-[:focus-visible]:[outline:2px_solid_var(--rs-accent-fg)] has-[:focus-visible]:[outline-offset:2px]",
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
            {required}
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            enterKeyHint="next"
            dir="auto"
            value={name}
            onChange={(event) => {
              started();
              clearError("name");
              setName(event.target.value);
            }}
            className={inputClass}
            {...fieldProps("name")}
          />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor={id("email")} className="text-sm font-semibold text-rs-fg">
            Email
            {required}
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            maxLength={160}
            autoComplete="email"
            enterKeyHint="next"
            value={email}
            onChange={(event) => {
              started();
              clearError("email");
              setEmail(event.target.value);
            }}
            className={inputClass}
            {...fieldProps("email")}
          />
          {fieldError("email")}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={id("message")} className="text-sm font-semibold text-rs-fg">
          {fr ? "Votre besoin en quelques lignes" : "Your need in a few lines"}
          {required}
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={4}
          maxLength={5000}
          dir="auto"
          placeholder={current.placeholder[locale]}
          value={message}
          onChange={(event) => {
            started();
            clearError("message");
            setMessage(event.target.value);
          }}
          className={inputClass}
          {...fieldProps("message")}
        />
        {fieldError("message")}
        {message.length > 4000 ? (
          // Shown near the limit only: maxLength would otherwise cut a long paste silently.
          <p className="mt-1.5 text-sm text-rs-muted" aria-live="polite">
            {message.length.toLocaleString(fr ? "fr-FR" : "en-GB")} / 5 000
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center rounded-none bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent active:bg-rs-accent-hover active:text-[var(--rs-dark-fg)] active:duration-0 disabled:pointer-events-none disabled:opacity-60"
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
      <p className="mt-4 text-sm leading-relaxed text-rs-muted">
        {fr
          ? "Réponse sous 24 h ouvrées. Vos informations servent uniquement à vous répondre."
          : "Reply within 24 business hours. Your information is only used to answer you."}
      </p>
    </form>
  );
}
