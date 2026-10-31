import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechStack } from "@/components/ui/tech-stack";
import { getProject, type ProjectKey } from "@/content/projects";
import { RAYAN_CONTENT, STUDIO_CONTENT } from "@/content/studio";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { studioPath, workPath } from "@/lib/site-routes";

const STUDIO_PRODUCTS: ProjectKey[] = ["pick4me", "pont-facturx", "goodcall", "docextract"];

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
    { when: fr ? "2020 à 2023" : "2020 to 2023", title: "UNYC", body: fr ? "Développement logiciel." : "Software development." },
    { when: "2024", title: "STMicroelectronics", body: fr ? "Ingénierie DevOps, plateforme CI/CD." : "DevOps engineering, CI/CD platform." },
    {
      when: fr ? "Aujourd'hui" : "Today",
      title: "Rayan Studio",
      body: fr ? "Produits du studio en production et projets clients." : "Studio products in production and client projects.",
      now: true,
    },
  ];

  return (
    <article data-page-identity="studio">
      <section className="pt-28 md:pt-36">
        <Container>
          <Eyebrow>{fr ? "Le studio" : "The studio"}</Eyebrow>
          <div className="mt-5 grid gap-10 border-t border-rs-fg pt-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-16">
            <dl className="order-2 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:order-1 lg:grid-cols-1 lg:content-start">
              {sheet.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rs-muted">{item.label}</dt>
                  <dd className="mt-1 text-base font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="order-1 lg:order-2">
              <h1 className="font-serif text-[3rem] font-normal leading-[1.02] tracking-[-0.02em] md:text-7xl lg:text-[6rem]">
                {first}.
                <br />
                <em className="text-rs-accent-fg">{second}</em>
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-rs-muted md:text-xl">{content.hero.title}</p>
            </div>
          </div>
        </Container>
        <figure className="relative mt-14 h-64 overflow-hidden md:mt-16 md:h-[22rem]">
          <Image src={PAGE_HERO_PHOTOS.studio} alt="" fill priority sizes="100vw" className="object-cover object-[center_60%]" />
          <figcaption className="absolute bottom-5 left-0 right-0">
            <Container>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                {fr ? "Séoul · collaboration à distance avec la France" : "Seoul · remote collaboration with France"}
              </span>
            </Container>
          </figcaption>
        </figure>
      </section>

      <div className="py-[var(--rs-section-space)]">
        <Container>
          <p className="max-w-4xl text-xl leading-relaxed md:text-2xl">{content.hero.body}</p>

          <section className="mt-16">
            <Eyebrow>{fr ? "Parcours" : "Background"}</Eyebrow>
            <h2 className="mt-4 font-serif text-[2rem] font-semibold md:text-5xl">{fr ? "D'où vient le studio." : "Where the studio comes from."}</h2>
            <ol className="mt-12 grid gap-10 border-t-2 border-rs-fg md:grid-cols-[1fr_1fr_1.6fr] md:gap-0">
              {career.map((step) => (
                <li key={step.title} className="relative pt-8 md:pr-10">
                  <span aria-hidden className={`absolute -top-[8px] left-0 h-3.5 w-3.5 ${step.now ? "bg-rs-accent" : "bg-rs-fg"}`} />
                  <p className="font-serif text-3xl md:text-[2.1rem]">{step.when}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-rs-muted">{step.body}</p>
                  {step.now ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {STUDIO_PRODUCTS.map((key) => {
                        const project = getProject(key);
                        if (!project) return null;
                        return (
                          <li key={key}>
                            <Link
                              href={workPath(locale, project.slug)}
                              className="inline-flex border border-[var(--rs-border)] bg-rs-surface px-3 py-1.5 text-sm font-medium transition-colors duration-150 hover:border-rs-fg"
                            >
                              {project.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
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
