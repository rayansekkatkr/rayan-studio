import Image from "next/image";
import { ArrowRight, Clock, Plus } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ServiceRecord } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { contactPath, startProjectPath } from "@/lib/site-routes";
import { PageHero } from "@/components/ui/page-hero";
import { TechChips } from "@/components/ui/tech-chips";
import { SERVICE_HERO_PHOTOS } from "@/content/visuals";
import { ClosingCta } from "@/components/ui/closing-cta";
import { ServiceProof } from "./service-proof";

export function ServicePage({ locale, service }: { locale: Locale; service: ServiceRecord }) {
  const fr = locale === "fr";

  return (
    <article>
      <section data-service-section="hero">
        <PageHero
          eyebrow={service.eyebrow[locale]}
          title={service.title[locale]}
          lead={<p>{service.description[locale]}</p>}
          image={SERVICE_HERO_PHOTOS[service.key]}
          titleClassName="lg:text-[2.75rem]"
        >
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <TrackedLink
              href={startProjectPath(locale)}
              event={{
                ctaId: "service_hero_start_project",
                source: `service_${service.key}`,
                destination: startProjectPath(locale),
                locale,
              }}
              className="inline-flex items-center gap-2 rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
            >
              {fr ? "Demander un devis" : "Request a quote"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </TrackedLink>
            <p className="text-sm text-rs-muted">
              {fr ? "Réponse sous 24 h ouvrées" : "Reply within 24 business hours"}
            </p>
          </div>
        </PageHero>
      </section>

      <div className="bg-rs-bg py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
            <section data-service-section="need">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>{fr ? "Le besoin" : "The need"}</Eyebrow>
                <p className="mt-5 text-xl font-medium leading-relaxed text-rs-fg md:text-2xl md:leading-snug">
                  {service.problem[locale]}
                </p>
                <TrackedLink
                  href={startProjectPath(locale)}
                  event={{
                    ctaId: "service_need_start_project",
                    source: `service_${service.key}`,
                    destination: startProjectPath(locale),
                    locale,
                  }}
                  className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
                >
                  {fr ? "Décrire votre besoin" : "Describe your need"}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </TrackedLink>
              </div>
            </section>

            <section data-service-section="use-cases">
              <Eyebrow>{fr ? "Ce que nous construisons" : "What we build"}</Eyebrow>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {service.useCases[locale].map((useCase) => (
                  <div
                    key={useCase.title}
                    className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5"
                  >
                    <h3 className="text-base font-semibold">{useCase.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-rs-muted">{useCase.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section data-service-section="approach" className="mt-14 border-t border-[var(--rs-border)] pt-10">
            <Eyebrow>{fr ? "Approche" : "Approach"}</Eyebrow>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.approach[locale].map((step, index) => (
                <li key={step} className="relative rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rs-accent text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-rs-fg">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </Container>
      </div>

      <section data-service-section="engineering" className="border-t border-[var(--rs-border)] py-14 md:py-20">
        <Container>
          <Eyebrow>Engineering</Eyebrow>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {service.engineering[locale].map((item) => (
              <li key={item} className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface px-5 py-4 text-base leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          {service.technologies.length > 0 ? (
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                {fr ? "Technologies" : "Technologies"}
              </p>
              <TechChips items={service.technologies} className="mt-4" />
            </div>
          ) : null}
        </Container>
      </section>

      <section data-service-section="proof" className="border-t border-[var(--rs-border)] py-14 md:py-20">
        <Container>
          <Eyebrow>{fr ? "Projets" : "Work"}</Eyebrow>
          <div className="mt-8">
            <ServiceProof locale={locale} projectKeys={service.proofProjects} />
          </div>
        </Container>
      </section>

      <section data-service-section="faq" className="border-t border-[var(--rs-border)] py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <div className="mt-4 divide-y divide-[var(--rs-border)]">
                {service.faq[locale].map((item) => (
                  <details key={item.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-rs-fg">
                      {item.question}
                      <Plus
                        aria-hidden
                        className="h-5 w-5 shrink-0 text-rs-muted transition-transform duration-200 group-open:rotate-45"
                      />
                    </summary>
                    <p className="mt-3 text-base leading-relaxed text-rs-muted">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="self-start overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface">
              <div className="relative aspect-[16/7] bg-[var(--rs-dark)]">
                <Image
                  src={SERVICE_HERO_PHOTOS[service.key]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="object-cover opacity-80"
                />
              </div>
              <div className="p-6 md:p-7">
                <p className="flex items-center gap-2 text-sm font-semibold text-rs-accent-fg">
                  <Clock aria-hidden className="h-4 w-4" />
                  {fr ? "Réponse sous 24 h ouvrées" : "Reply within 24 business hours"}
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight">
                  {fr ? "Une question qui n'est pas dans la liste ?" : "A question that isn't listed?"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-rs-muted">
                  {fr
                    ? "Décrivez votre situation en quelques lignes : vous échangez directement avec Rayan Sekkat."
                    : "Describe your situation in a few lines: you talk directly with Rayan Sekkat."}
                </p>
                <TrackedLink
                  href={contactPath(locale)}
                  event={{ ctaId: "service_faq_contact", source: `service_${service.key}`, destination: contactPath(locale), locale }}
                  className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
                >
                  {fr ? "Poser une question" : "Ask a question"}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section data-service-section="cta">
        <ClosingCta
          locale={locale}
          ctaId="service_start_project"
          source={`service_${service.key}`}
          label={fr ? "Demander un devis" : "Request a quote"}
        />
      </section>
    </article>
  );
}
