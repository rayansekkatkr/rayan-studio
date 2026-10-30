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
  className?: string;
};

/**
 * End-of-page call to action. A dark card on the light page background, not a
 * full-width dark band: the page keeps one background from the hero to the footer.
 */
export function ClosingCta({ locale, ctaId, source, title, body, label, href, className }: ClosingCtaProps) {
  const fr = locale === "fr";
  const target = href ?? startProjectPath(locale);

  return (
    <div className={cn("pb-[var(--rs-section-space)]", className)}>
      <Container>
        <div className="rs-theme-dark relative isolate overflow-hidden rounded-[var(--rs-radius-lg)] bg-rs-bg px-6 py-10 text-rs-fg md:px-12 md:py-14">
          <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {title ?? (fr ? "Parlons de ce que vous cherchez à construire." : "Let's talk about what you want to build.")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-rs-muted">
                {body ??
                  (fr
                    ? "Pas besoin d'avoir déjà un cahier des charges. Réponse sous 24 h ouvrées, devis gratuit après un premier échange."
                    : "No specification document needed to start. Reply within 24 business hours, free quote after a first conversation.")}
              </p>
            </div>
            <TrackedLink
              href={target}
              event={{ ctaId, source, destination: target, locale }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
            >
              {label ?? (fr ? "Parler de votre projet" : "Start a project")}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
