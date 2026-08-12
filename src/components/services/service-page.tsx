import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ServiceRecord } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";
import { ServiceProof } from "./service-proof";

export function ServicePage({ locale, service }: { locale: Locale; service: ServiceRecord }) {
  const fr = locale === "fr";

  return (
    <article>
      <section data-service-section="hero" className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>{service.eyebrow[locale]}</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {service.title[locale]}
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {service.description[locale]}
          </p>
        </Container>
      </section>

      <section data-service-section="need" className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <Eyebrow>{fr ? "Le besoin" : "The need"}</Eyebrow>
          <p className="mt-5 max-w-[var(--rs-reading)] text-xl leading-relaxed text-rs-fg md:text-2xl">
            {service.problem[locale]}
          </p>
        </Container>
      </section>

      <section data-service-section="use-cases" className="bg-rs-surface py-[var(--rs-section-space)]">
        <Container>
          <Eyebrow>{fr ? "Ce que nous construisons" : "What we build"}</Eyebrow>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {service.useCases[locale].map((useCase) => (
              <div key={useCase.title} className="border-t border-[var(--rs-border)] pt-4">
                <h3 className="text-lg font-semibold">{useCase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-rs-muted">{useCase.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section data-service-section="approach" className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <Eyebrow>{fr ? "Approche" : "Approach"}</Eyebrow>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {service.approach[locale].map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="text-sm font-semibold text-rs-accent">{`0${index + 1}`}</span>
                <p className="text-base leading-relaxed text-rs-fg">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section data-service-section="engineering" className="rs-theme-dark bg-rs-bg py-[var(--rs-section-space)] text-rs-fg">
        <Container>
          <Eyebrow>Engineering</Eyebrow>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {service.engineering[locale].map((item) => (
              <li key={item} className="rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] px-5 py-4 text-base leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          {service.technologies.length > 0 ? (
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.14em] text-rs-muted">
              {service.technologies.join(" · ")}
            </p>
          ) : null}
        </Container>
      </section>

      <section data-service-section="proof" className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <Eyebrow>{fr ? "Projets" : "Work"}</Eyebrow>
          <div className="mt-8">
            <ServiceProof locale={locale} projectKeys={service.proofProjects} />
          </div>
        </Container>
      </section>

      <section data-service-section="faq" className="bg-rs-surface py-[var(--rs-section-space)]">
        <Container>
          <Eyebrow>FAQ</Eyebrow>
          <div className="mt-8 max-w-3xl divide-y divide-[var(--rs-border)]">
            {service.faq[locale].map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none text-lg font-semibold text-rs-fg">
                  {item.question}
                </summary>
                <p className="mt-3 text-base leading-relaxed text-rs-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section data-service-section="cta" className="rs-theme-dark bg-rs-bg py-[var(--rs-section-space)] text-rs-fg">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            {fr ? "Parlons de ce que vous cherchez à construire." : "Let's talk about what you want to build."}
          </h2>
          <p className="mt-4 text-base text-rs-muted">
            {fr ? "Pas besoin d'avoir déjà un cahier des charges." : "No specification document needed to start."}
          </p>
          <Link
            href={startProjectPath(locale)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
          >
            {fr ? "Parler de votre projet" : "Start a project"}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Container>
      </section>
    </article>
  );
}
