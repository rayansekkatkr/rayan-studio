import { Clock, Mail, MessageCircle } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { TechStack } from "@/components/ui/tech-stack";
import { BRAND } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";

/** Side panel of the project and contact pages: response promise, next steps, direct channels. */
export function ContactAside({ locale, source }: { locale: Locale; source: "project" | "contact" }) {
  const fr = locale === "fr";
  const steps = fr
    ? [
        "Je lis votre demande et vous réponds sous 24 h ouvrées, avec mes premières questions.",
        "Un échange de cadrage pour comprendre le besoin, les contraintes et le calendrier.",
        "Une proposition détaillée : périmètre, planning et budget. Le devis est gratuit et sans engagement.",
      ]
    : [
        "I read your request and reply within 24 business hours, with my first questions.",
        "A scoping conversation to understand the need, the constraints and the timeline.",
        "A detailed proposal: scope, schedule and budget. The quote is free and without commitment.",
      ];

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      <div className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border-strong)] bg-rs-surface p-6">
        <p className="flex items-center gap-2 text-lg font-semibold">
          <Clock aria-hidden className="h-5 w-5 text-rs-accent-fg" />
          {fr ? "Réponse sous 24 h ouvrées" : "Reply within 24 business hours"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-rs-muted">
          {fr
            ? "Du lundi au vendredi, sur les horaires de la journée française. Vous échangez directement avec Rayan Sekkat, qui conçoit et développe votre projet."
            : "Monday to Friday, on French business hours. You talk directly with Rayan Sekkat, who designs and builds your project."}
        </p>
      </div>

      <div className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
          {fr ? "Ce qui se passe ensuite" : "What happens next"}
        </p>
        <ol className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rs-accent text-xs font-semibold text-white">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
          {fr ? "Ou écrivez directement" : "Or write directly"}
        </p>
        <div className="mt-4 flex flex-col gap-3 text-sm font-semibold">
          <TrackedLink
            href={`mailto:${BRAND.email}`}
            event={{ ctaId: "email", source: `${source}_aside`, destination: "email", locale }}
            className="inline-flex items-center gap-2 text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
          >
            <Mail aria-hidden className="h-4 w-4" />
            {BRAND.email}
          </TrackedLink>
          <TrackedLink
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            event={{ ctaId: "whatsapp", source: `${source}_aside`, destination: "whatsapp", locale }}
            className="inline-flex items-center gap-2 text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
          >
            <MessageCircle aria-hidden className="h-4 w-4" />
            WhatsApp
          </TrackedLink>
        </div>
      </div>

      <div className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6">
        <TechStack locale={locale} compact />
      </div>
    </aside>
  );
}
