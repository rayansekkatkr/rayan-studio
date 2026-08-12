import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";

export function FinalCta({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div className="rs-theme-dark bg-rs-bg py-[var(--rs-section-space)] text-rs-fg">
      <Container className="text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {fr ? "Vous avez quelque chose à construire ?" : "Do you have something to build?"}
        </h2>
        <p className="mx-auto mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
          {fr
            ? "Parlons de votre projet, de votre idée ou du problème que vous cherchez à résoudre."
            : "Let's talk about your project, your idea or the problem you are trying to solve."}
        </p>
        <TrackedLink
          href={startProjectPath(locale)}
          event={{
            ctaId: "final_start_project",
            source: "home_final_cta",
            destination: startProjectPath(locale),
            locale,
          }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-rs-fg px-8 py-4 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
        >
          {fr ? "Parler de votre projet" : "Start a project"}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </TrackedLink>
      </Container>
    </div>
  );
}
