import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Locale } from "@/lib/i18n";
import { studioPath } from "@/lib/site-routes";

const STAGES = [
  {
    number: "01",
    name: "Discover",
    description: {
      fr: "Comprendre le besoin, les utilisateurs et les contraintes.",
      en: "Understand the problem, users and constraints.",
    },
  },
  {
    number: "02",
    name: "Design",
    description: {
      fr: "Structurer l'expérience, les parcours et les interfaces.",
      en: "Structure the experience, flows and interfaces.",
    },
  },
  {
    number: "03",
    name: "Build",
    description: {
      fr: "Développer le produit et connecter les services nécessaires.",
      en: "Develop the product and connect the required services.",
    },
  },
  {
    number: "04",
    name: "Launch",
    description: {
      fr: "Tester, déployer et préparer une mise en production fiable.",
      en: "Test, deploy and prepare a reliable production release.",
    },
  },
  {
    number: "05",
    name: "Improve",
    description: {
      fr: "Mesurer, corriger et faire évoluer le produit dans le temps.",
      en: "Measure, refine and evolve the product over time.",
    },
  },
];

export function MethodPreview({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div className="bg-rs-surface py-[var(--rs-section-space)]">
      <Container>
        <Eyebrow>{fr ? "Méthode" : "Method"}</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {fr ? "Une méthode simple, du cadrage à la production." : "A simple method, from framing to production."}
        </h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((stage) => (
            <li key={stage.number} className="border-t border-[var(--rs-border)] pt-4">
              <p className="text-sm font-semibold text-rs-accent">{stage.number}</p>
              <p className="mt-2 text-xl font-semibold">{stage.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-rs-muted">
                {stage.description[locale]}
              </p>
            </li>
          ))}
        </ol>
        <TrackedLink
          href={studioPath(locale, "method")}
          event={{
            ctaId: "home_method",
            source: "home_method_preview",
            destination: studioPath(locale, "method"),
            locale,
          }}
          className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
        >
          {fr ? "Voir la méthode en détail" : "See the method in detail"}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </TrackedLink>
      </Container>
    </div>
  );
}
