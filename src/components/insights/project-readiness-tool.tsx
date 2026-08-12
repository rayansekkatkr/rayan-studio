"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

const QUESTIONS: Record<Locale, string[]> = {
  fr: [
    "Savez-vous qui est l'utilisateur principal ?",
    "Pouvez-vous décrire le workflow principal en un paragraphe ?",
    "Avez-vous identifié les fonctionnalités indispensables de la V1 ?",
    "Connaissez-vous les intégrations et sources de données nécessaires ?",
    "Savez-vous qui exploitera et supportera le produit après le lancement ?",
  ],
  en: [
    "Do you know the primary user?",
    "Can you describe the main workflow in one paragraph?",
    "Have you identified must-have V1 features?",
    "Do you know the required integrations and data sources?",
    "Do you know who operates and supports the product after launch?",
  ],
};

const RESULTS: Record<Locale, { low: string; mid: string; high: string }> = {
  fr: {
    low: "Clarifiez d'abord le problème et le workflow avant d'estimer le développement. Les guides ci-dessous peuvent aider.",
    mid: "Il y a assez de contexte pour une conversation de cadrage utile. Les points encore flous seront précisés ensemble.",
    high: "Le projet est bien préparé pour une discussion produit et technique.",
  },
  en: {
    low: "Clarify the problem and workflow before estimating build work. The guides below can help.",
    mid: "There is enough context for a useful discovery conversation. The remaining unknowns can be framed together.",
    high: "The project is well prepared for a technical and product discussion.",
  },
};

export function ProjectReadinessTool({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [answers, setAnswers] = useState<Array<boolean | null>>(Array(5).fill(null));
  const [result, setResult] = useState<string | null>(null);

  const allAnswered = answers.every((answer) => answer !== null);

  function computeResult() {
    const score = answers.filter(Boolean).length;
    const bucket = score <= 2 ? "low" : score <= 4 ? "mid" : "high";
    setResult(RESULTS[locale][bucket]);
    trackEvent("insight_tool_complete", { score });
  }

  return (
    <div className="max-w-2xl">
      <ol className="space-y-6">
        {QUESTIONS[locale].map((question, index) => (
          <li key={question}>
            <fieldset>
              <legend className="text-lg font-semibold text-rs-fg">{question}</legend>
              <div className="mt-3 flex gap-3">
                {[true, false].map((value) => {
                  const label = value ? (fr ? "Oui" : "Yes") : fr ? "Non" : "No";
                  const checked = answers[index] === value;
                  return (
                    <label
                      key={label}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-base font-medium transition-colors duration-150",
                        checked
                          ? "border-rs-accent bg-rs-surface text-rs-fg"
                          : "border-[var(--rs-border)] bg-rs-surface text-rs-muted hover:border-[var(--rs-border-strong)]",
                      )}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={checked}
                        onChange={() =>
                          setAnswers((current) => {
                            const next = [...current];
                            next[index] = value;
                            return next;
                          })
                        }
                        className="h-4 w-4 accent-[var(--rs-accent)]"
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <button
        type="button"
        disabled={!allAnswered}
        onClick={computeResult}
        className="mt-8 inline-flex items-center rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent disabled:opacity-50"
      >
        {fr ? "Voir le résultat" : "See the result"}
      </button>

      <div role="status" aria-live="polite" className="mt-6 min-h-[2rem]">
        {result ? (
          <div className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border-strong)] bg-rs-subtle p-6">
            <p className="text-base leading-relaxed text-rs-fg">{result}</p>
            <Link
              href={startProjectPath(locale)}
              className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Parler de votre projet" : "Start a project"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
