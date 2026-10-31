import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GiantWord } from "@/components/ui/giant-word";
import { NightBand } from "@/components/ui/night-band";
import { TechStack } from "@/components/ui/tech-stack";
import { RAYAN_CONTENT, STUDIO_CONTENT } from "@/content/studio";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { studioPath, workPath } from "@/lib/site-routes";

/** Studio page as a magazine spread: serif statement, identity sheet, city band, career line. */
export function StudioPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const content = STUDIO_CONTENT[locale];
  const rayan = RAYAN_CONTENT[locale];
  const [first, ...rest] = content.hero.keyIdea.split(". ");
  const second = rest.join(". ");
  const sheet = [
    { label: fr ? "Fondateur" : "Founder", value: rayan.name },
    { label: fr ? "Rôle" : "Role", value: rayan.role },
    { label: fr ? "Basé à" : "Based in", value: fr ? "Séoul, à distance" : "Seoul, remote" },
    { label: fr ? "Langues" : "Languages", value: fr ? "Français, anglais" : "French, English" },
    { label: fr ? "Réponse" : "Reply", value: fr ? "Sous 24 h ouvrées" : "Within 24 business hours" },
  ];
  const career = [
    { when: "2020", title: "UNYC", body: fr ? "Développement logiciel, 2020 à 2023." : "Software development, 2020 to 2023." },
    { when: "2024", title: "STMicroelectronics", body: fr ? "Ingénierie DevOps, plateforme CI/CD." : "DevOps engineering, CI/CD platform." },
    {
      when: fr ? "Aujourd'hui" : "Today",
      title: "Rayan Studio",
      body: fr ? "Produits du studio en production et projets clients." : "Studio products in production and client projects.",
    },
  ];

  return (
    <article data-page-identity="studio">
      <section>
        <NightBand image={PAGE_HERO_PHOTOS.studio} imagePosition="center 60%" className="pt-28 md:pt-36">
        <Container>
          <Eyebrow>{fr ? "Le studio" : "The studio"}</Eyebrow>
          <div className="mt-3 overflow-x-clip">
            <GiantWord text="Studio" />
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
            <h1 className="text-xl font-bold leading-snug tracking-tight md:text-2xl">{content.hero.title}</h1>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
              {sheet.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rs-muted">{item.label}</dt>
                  <dd className="mt-1 text-sm font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
        </NightBand>
        <Container>
          <p className="mx-auto max-w-5xl py-16 text-center font-serif text-[2.75rem] leading-[1.02] md:py-24 md:text-[4.5rem]">
            {first}. <em className="text-rs-accent-fg">{second}</em>
          </p>
        </Container>
      </section>

      <div className="py-[var(--rs-section-space)]">
        <Container>
          <p className="max-w-4xl text-xl leading-relaxed md:text-2xl">{content.hero.body}</p>

          <section className="mt-16">
            <Eyebrow>{fr ? "Parcours" : "Background"}</Eyebrow>
            <h2 className="mt-4 text-[2.25rem] font-extrabold leading-[1] tracking-[-0.045em] md:text-6xl">{fr ? "D'où vient le studio." : "Where the studio comes from."}</h2>
            <ol className="mt-10 grid gap-10 border-t border-rs-fg md:grid-cols-[1fr_1fr_1.6fr] md:gap-0">
              {career.map((step) => (
                <li key={step.title} className="pt-8 md:border-r md:border-[var(--rs-border)] md:px-8 md:first:pl-0 md:last:border-r-0">
                  <p className="text-4xl font-black tracking-[-0.05em] md:text-6xl">{step.when}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-rs-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <blockquote className="mt-20 max-w-4xl border-l-[3px] border-rs-accent pl-7 font-serif text-2xl italic leading-snug md:text-4xl">
            « {content.principles[0]?.body} »
          </blockquote>

          <section className="mt-16">
            <Eyebrow>{fr ? "Principes" : "Principles"}</Eyebrow>
            <ol className="mt-6 grid gap-x-12 sm:grid-cols-2">
              {content.principles.map((principle, index) => (
                <li key={principle.title} className="flex gap-5 border-t border-rs-fg py-7">
                  <span aria-hidden className="w-8 shrink-0 pt-1 text-sm font-bold text-rs-accent-fg">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{principle.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-rs-muted">{principle.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
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
