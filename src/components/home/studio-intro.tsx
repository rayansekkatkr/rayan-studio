import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Locale } from "@/lib/i18n";
import { studioPath } from "@/lib/site-routes";

export function StudioIntro({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const principles = fr
    ? ["Un interlocuteur", "De l'idée à la production", "Architecture pensée pour durer", "Communication claire"]
    : ["One point of contact", "From idea to production", "Architecture built to last", "Clear communication"];

  return (
    <div className="rs-theme-dark bg-rs-bg py-[var(--rs-section-space)] text-rs-fg lg:flex lg:min-h-[100svh] lg:items-center">
      <Container>
        <Eyebrow>{fr ? "Pourquoi Rayan Studio" : "Why Rayan Studio"}</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {fr
            ? "La souplesse d'un studio indépendant. La rigueur d'une équipe produit."
            : "The flexibility of an independent studio. The rigor of a product team."}
        </h2>
        <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
          {fr
            ? "Vous échangez directement avec la personne qui conçoit et développe votre projet. Moins d'intermédiaires, davantage de continuité entre produit, design, développement et mise en production."
            : "You work directly with the person designing and building your project. Fewer intermediaries, more continuity across product, design, development and production."}
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <li
              key={principle}
              className="rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] px-5 py-4 text-base font-medium"
            >
              {principle}
            </li>
          ))}
        </ul>
        <TrackedLink
          href={studioPath(locale, "studio")}
          event={{
            ctaId: "home_studio",
            source: "home_studio_intro",
            destination: studioPath(locale, "studio"),
            locale,
          }}
          className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
        >
          {fr ? "Découvrir le studio" : "Discover the studio"}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </TrackedLink>
      </Container>
    </div>
  );
}
