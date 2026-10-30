import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, UserRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { TechStack } from "@/components/ui/tech-stack";
import { ClosingCta } from "@/components/ui/closing-cta";
import { STUDIO_CONTENT } from "@/content/studio";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { studioPath, workPath } from "@/lib/site-routes";

export function StudioPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const content = STUDIO_CONTENT[locale];
  const facts = [
    {
      icon: UserRound,
      title: fr ? "Un seul interlocuteur" : "One point of contact",
      body: fr
        ? "La personne qui cadre votre projet est celle qui le développe et le met en production."
        : "The person who scopes your project is the one who builds and ships it.",
    },
    {
      icon: MapPin,
      title: fr ? "Basé à Séoul, à distance" : "Based in Seoul, remote",
      body: fr
        ? "Collaboration à distance avec la France et l'international, sur les horaires de la journée française."
        : "Remote collaboration with France and international teams, on French business hours.",
    },
    {
      icon: Clock,
      title: fr ? "Réponse sous 24 h ouvrées" : "Reply within 24 business hours",
      body: fr
        ? "Chaque demande reçoit une première réponse argumentée, pas un accusé de réception."
        : "Every request gets a first, reasoned answer, not an automatic acknowledgement.",
    },
  ];

  return (
    <article>
      <PageHero
        eyebrow={fr ? "Le studio" : "The studio"}
        title={content.hero.title}
        image={PAGE_HERO_PHOTOS.studio}
        titleClassName="lg:text-[2.75rem]"
      >
        <p className="mt-8 text-xl font-semibold text-rs-accent-fg md:text-2xl">{content.hero.keyIdea}</p>
      </PageHero>

      <div className="py-[var(--rs-section-space)]">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
            <p className="max-w-[var(--rs-reading)] text-xl leading-relaxed text-rs-fg">{content.hero.body}</p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)]">
              <Image src="/images/desk-night.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {content.principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6"
              >
                <h2 className="text-xl font-semibold">{principle.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-rs-muted">{principle.body}</p>
              </div>
            ))}
          </div>

          <ul className="mt-14 grid gap-6 border-t border-[var(--rs-border)] pt-10 md:grid-cols-3">
            {facts.map((fact) => (
              <li key={fact.title} className="flex gap-4">
                <fact.icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-rs-accent-fg" />
                <div>
                  <p className="text-base font-semibold">{fact.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-rs-muted">{fact.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <div className="border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
        <Container>
          <TechStack locale={locale} />
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Link
              href={studioPath(locale, "rayan")}
              className="inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Rencontrer Rayan Sekkat" : "Meet Rayan Sekkat"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href={workPath(locale)}
              className="inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Voir les réalisations" : "See the work"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>

      <ClosingCta locale={locale} ctaId="studio_start_project" source="studio_page" />
    </article>
  );
}
