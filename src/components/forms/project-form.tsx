"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import type { ProjectStage, ProjectTiming, ProjectType } from "@/lib/forms/types";
import { cn } from "@/lib/utils";
import { FormStatus } from "./form-status";
import { ProjectStepper } from "./project-stepper";

type ProjectFormState = {
  projectType: ProjectType | "";
  stage: ProjectStage | "";
  objective: string;
  timing: ProjectTiming | "";
  name: string;
  company: string;
  email: string;
  budget: string;
  companyWebsite: string;
};

type SubmissionState = "idle" | "sending" | "success" | "error";

const EMPTY_STATE: ProjectFormState = {
  projectType: "",
  stage: "",
  objective: "",
  timing: "",
  name: "",
  company: "",
  email: "",
  budget: "",
  companyWebsite: "",
};

const PROJECT_TYPES: Array<{ value: ProjectType; fr: string; en: string }> = [
  { value: "application", fr: "Application / SaaS", en: "Application / SaaS" },
  { value: "mvp", fr: "MVP", en: "MVP" },
  { value: "website", fr: "Site / refonte", en: "Website / redesign" },
  { value: "automation", fr: "Automatisation / IA", en: "Automation / AI" },
  { value: "backend", fr: "Backend / API", en: "Backend / API" },
  { value: "devops", fr: "DevOps", en: "DevOps" },
  { value: "other", fr: "Autre", en: "Other" },
];

const STAGES: Array<{ value: ProjectStage; fr: string; en: string }> = [
  { value: "idea", fr: "Une idée", en: "An idea" },
  { value: "requirements", fr: "Cahier des charges", en: "Written requirements" },
  { value: "design", fr: "Design existant", en: "Existing design" },
  { value: "existing-product", fr: "Produit existant", en: "Existing product" },
  { value: "in-development", fr: "Projet déjà en développement", en: "Already in development" },
];

const TIMINGS: Array<{ value: ProjectTiming; fr: string; en: string }> = [
  { value: "asap", fr: "Dès que possible", en: "As soon as possible" },
  { value: "1-3-months", fr: "1-3 mois", en: "1-3 months" },
  { value: "3-6-months", fr: "3-6 mois", en: "3-6 months" },
  { value: "undefined", fr: "Pas encore défini", en: "Not defined yet" },
];

const MESSAGES: Record<Locale, Record<string, string>> = {
  fr: {
    STEP_REQUIRED: "Merci de faire un choix pour continuer.",
    OBJECTIVE_REQUIRED: "Merci de décrire votre objectif pour continuer.",
    MISSING_FIELDS: "Merci de remplir les champs requis.",
    INVALID_EMAIL: "Adresse email invalide.",
    RATE_LIMITED: "Trop de tentatives. Réessayez dans quelques minutes.",
    SEND_FAILED: "L'envoi a échoué. Vos réponses sont conservées, vous pouvez réessayer.",
    EMAIL_CONFIG_MISSING: "Envoi indisponible pour le moment. Vos réponses sont conservées, vous pouvez réessayer.",
    NETWORK: "Connexion impossible. Vos réponses sont conservées, vous pouvez réessayer.",
    SENDING: "Envoi en cours...",
    SUCCESS: "Demande envoyée. Merci, première réponse sous 24h ouvrées.",
  },
  en: {
    STEP_REQUIRED: "Please make a choice to continue.",
    OBJECTIVE_REQUIRED: "Please describe your objective to continue.",
    MISSING_FIELDS: "Please fill in the required fields.",
    INVALID_EMAIL: "Invalid email address.",
    RATE_LIMITED: "Too many attempts. Try again in a few minutes.",
    SEND_FAILED: "Sending failed. Your answers are preserved, you can retry.",
    EMAIL_CONFIG_MISSING: "Sending is unavailable right now. Your answers are preserved, you can retry.",
    NETWORK: "Connection failed. Your answers are preserved, you can retry.",
    SENDING: "Sending...",
    SUCCESS: "Request sent. Thank you, first response within 24 business hours.",
  },
};

const STEP_TITLES: Record<Locale, string[]> = {
  fr: ["Type de projet", "Où en êtes-vous ?", "Votre objectif", "Timing", "Vos coordonnées"],
  en: ["Project type", "Where are you now?", "Your objective", "Timing", "Your details"],
};

function OptionGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  locale,
}: {
  legend: string;
  name: string;
  options: Array<{ value: T; fr: string; en: string }>;
  value: T | "";
  onChange: (value: T) => void;
  locale: Locale;
}) {
  return (
    <fieldset>
      <legend className="text-xl font-semibold text-rs-fg">{legend}</legend>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-[var(--rs-radius-sm)] border px-4 py-3.5 text-base font-medium transition-colors duration-150",
                checked
                  ? "border-rs-accent bg-rs-surface text-rs-fg"
                  : "border-[var(--rs-border)] bg-rs-surface text-rs-fg hover:border-[var(--rs-border-strong)]",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="h-4 w-4 accent-[var(--rs-accent)]"
              />
              {locale === "fr" ? option.fr : option.en}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ProjectForm({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<ProjectFormState>(EMPTY_STATE);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const stepLabel = fr ? `Étape ${step} sur 5` : `Step ${step} of 5`;

  useEffect(() => {
    if (step > 1) headingRef.current?.focus();
  }, [step]);

  function markStarted() {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("project_form_start");
    }
  }

  function update<K extends keyof ProjectFormState>(field: K, value: ProjectFormState[K]) {
    markStarted();
    setFormState((current) => ({ ...current, [field]: value }));
    if (status === "error") return;
    setStatusMessage("");
  }

  function goNext() {
    if (step === 1 && !formState.projectType) {
      setStatus("error");
      setStatusMessage(MESSAGES[locale].STEP_REQUIRED);
      return;
    }
    if (step === 2 && !formState.stage) {
      setStatus("error");
      setStatusMessage(MESSAGES[locale].STEP_REQUIRED);
      return;
    }
    if (step === 3 && !formState.objective.trim()) {
      setStatus("error");
      setStatusMessage(MESSAGES[locale].OBJECTIVE_REQUIRED);
      return;
    }
    if (step === 4 && !formState.timing) {
      setStatus("error");
      setStatusMessage(MESSAGES[locale].STEP_REQUIRED);
      return;
    }
    setStatus("idle");
    setStatusMessage("");
    const nextStep = Math.min(step + 1, 5);
    setStep(nextStep);
    trackEvent("project_form_step", { step: nextStep });
  }

  function goBack() {
    setStatus("idle");
    setStatusMessage("");
    setStep((current) => Math.max(current - 1, 1));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formState.name.trim() || !formState.company.trim() || !formState.email.trim()) {
      setStatus("error");
      setStatusMessage(MESSAGES[locale].MISSING_FIELDS);
      return;
    }

    setStatus("sending");
    setStatusMessage(MESSAGES[locale].SENDING);
    trackEvent("project_form_submit");

    try {
      const response = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          projectType: formState.projectType,
          stage: formState.stage,
          objective: formState.objective,
          timing: formState.timing,
          name: formState.name,
          company: formState.company,
          email: formState.email,
          budget: formState.budget.trim() || undefined,
          companyWebsite: formState.companyWebsite,
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { ok?: boolean; code?: string };

      if (response.ok && body.ok) {
        setStatus("success");
        setStatusMessage(MESSAGES[locale].SUCCESS);
        trackEvent("project_form_success");
        return;
      }

      const code = body.code && MESSAGES[locale][body.code] ? body.code : "SEND_FAILED";
      setStatus("error");
      setStatusMessage(MESSAGES[locale][code]);
      trackEvent("project_form_error", { code });
    } catch {
      setStatus("error");
      setStatusMessage(MESSAGES[locale].NETWORK);
      trackEvent("project_form_error", { code: "NETWORK" });
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] bg-rs-surface px-4 py-3 text-base text-rs-fg outline-none transition-colors duration-150 focus:border-rs-accent";

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl">
      <ProjectStepper currentStep={step} totalSteps={5} label={stepLabel} />

      <h2 ref={headingRef} tabIndex={-1} className="mt-6 outline-none sr-only">
        {STEP_TITLES[locale][step - 1]}
      </h2>

      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="project-company-website">Company website</label>
        <input
          id="project-company-website"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formState.companyWebsite}
          onChange={(event) => update("companyWebsite", event.target.value)}
        />
      </div>

      <div className="mt-6">
        {step === 1 ? (
          <OptionGroup
            legend={STEP_TITLES[locale][0]}
            name="projectType"
            options={PROJECT_TYPES}
            value={formState.projectType}
            onChange={(value) => update("projectType", value)}
            locale={locale}
          />
        ) : null}

        {step === 2 ? (
          <OptionGroup
            legend={STEP_TITLES[locale][1]}
            name="stage"
            options={STAGES}
            value={formState.stage}
            onChange={(value) => update("stage", value)}
            locale={locale}
          />
        ) : null}

        {step === 3 ? (
          <div>
            <label htmlFor="project-objective" className="text-xl font-semibold text-rs-fg">
              {fr ? "Objectif du projet" : "Project objective"}
            </label>
            <p className="mt-1 text-sm text-rs-muted">
              {fr
                ? "Décrivez ce que vous cherchez à construire ou à résoudre."
                : "Describe what you want to build or solve."}
            </p>
            <textarea
              id="project-objective"
              rows={7}
              maxLength={6000}
              value={formState.objective}
              onChange={(event) => update("objective", event.target.value)}
              className={inputClass}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <OptionGroup
            legend={STEP_TITLES[locale][3]}
            name="timing"
            options={TIMINGS}
            value={formState.timing}
            onChange={(value) => update("timing", value)}
            locale={locale}
          />
        ) : null}

        {step === 5 ? (
          <fieldset>
            <legend className="text-xl font-semibold text-rs-fg">{STEP_TITLES[locale][4]}</legend>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="project-name" className="text-sm font-semibold text-rs-fg">
                  {fr ? "Nom" : "Name"}
                </label>
                <input
                  id="project-name"
                  type="text"
                  required
                  maxLength={100}
                  value={formState.name}
                  onChange={(event) => update("name", event.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="project-company" className="text-sm font-semibold text-rs-fg">
                  {fr ? "Entreprise" : "Company"}
                </label>
                <input
                  id="project-company"
                  type="text"
                  required
                  maxLength={160}
                  value={formState.company}
                  onChange={(event) => update("company", event.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="project-email" className="text-sm font-semibold text-rs-fg">
                Email
              </label>
              <input
                id="project-email"
                type="email"
                required
                maxLength={160}
                value={formState.email}
                onChange={(event) => update("email", event.target.value)}
                className={inputClass}
              />
            </div>
            <div className="mt-5">
              <label htmlFor="project-budget" className="text-sm font-semibold text-rs-fg">
                {fr ? "Budget déjà défini ? (facultatif)" : "Budget already defined? (optional)"}
              </label>
              <input
                id="project-budget"
                type="text"
                maxLength={120}
                value={formState.budget}
                onChange={(event) => update("budget", event.target.value)}
                className={inputClass}
              />
            </div>
          </fieldset>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center rounded-full border border-[var(--rs-border-strong)] px-6 py-3 text-base font-medium text-rs-fg transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent"
          >
            {fr ? "Retour" : "Back"}
          </button>
        ) : null}
        {step < 5 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
          >
            {fr ? "Suivant" : "Next"}
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent disabled:opacity-60"
          >
            {fr ? "Envoyer" : "Send"}
          </button>
        )}
        <FormStatus state={status} message={statusMessage} />
      </div>
    </form>
  );
}
