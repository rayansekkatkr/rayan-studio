import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

type ClosingCtaProps = {
  locale: Locale;
  /** Analytics id of the button, kept stable per page family. */
  ctaId: string;
  source: string;
  title?: string;
  body?: string;
  label?: string;
  href?: string;
  /** Optional second button, for pages that serve both audiences. */
  secondary?: { label: string; href: string; ctaId: string };
  className?: string;
};

/**
 * End-of-page call to action, direction A: a full-width black band with the
 * invitation set in giant type, then the reply promise and the buttons on one line.
 */
export function ClosingCta({ locale, ctaId, source, title, body, label, href, secondary, className }: ClosingCtaProps) {
  const fr = locale === "fr";
  const target = href ?? startProjectPath(locale);

  return (
    <div data-closing-cta className={cn("mt-[var(--rs-section-space)]", className)}>
      <div className="rs-theme-dark bg-rs-bg text-rs-fg">
        <Container className="py-16 md:py-24">
          <h2 className="text-[clamp(2.75rem,6.5vw,7rem)] font-black leading-[0.88] tracking-[-0.06em]">
            {title ?? (fr ? "Parlons de votre projet" : "Let's talk about your project")}{" "}
            <span aria-hidden className="text-rs-accent-fg">
              →
            </span>
          </h2>
          <div className="mt-12 flex flex-col gap-6 border-t border-[var(--rs-border)] pt-7 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-rs-muted">
              {body ??
                (fr
                  ? "Pas besoin de cahier des charges. Réponse sous 24 h ouvrées, devis gratuit."
                  : "No specification needed. Reply within 24 business hours, free quote.")}
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <TrackedLink
                href={target}
                event={{ ctaId, source, destination: target, locale }}
                className="inline-flex items-center gap-2 bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-white"
              >
                {label ?? (fr ? "Parler de votre projet" : "Start a project")}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </TrackedLink>
              {secondary ? (
                <TrackedLink
                  href={secondary.href}
                  event={{ ctaId: secondary.ctaId, source, destination: secondary.href, locale }}
                  className="inline-flex items-center gap-2 border border-[var(--rs-border-strong)] px-6 py-3.5 text-base font-medium text-rs-fg transition-colors duration-150 hover:border-rs-fg"
                >
                  {secondary.label}
                </TrackedLink>
              ) : null}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
