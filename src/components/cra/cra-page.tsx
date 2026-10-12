import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ContactForm } from "@/components/forms/contact-form";
import { ManageCookiesButton } from "@/components/site/ManageCookiesButton";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CRA_PAGE } from "@/content/cra";
import { getInsight } from "@/content/insights";
import { BRAND } from "@/lib/brand";
import { insightPath, legalPath } from "@/lib/site-routes";

const SECTIONS = [
  { id: "obligations", label: "Obligations" },
  { id: "offres", label: "Offres" },
  { id: "methode", label: "Méthode" },
  { id: "faq", label: "FAQ" },
] as const;

const FORM_ANCHOR = "#diagnostic";

// Standalone offer page: its own header and footer, no link to the studio's
// web offers, every call to action leads to the diagnostic form below.
export function CraPage() {
  const checklist = getInsight("cra-reporting-checklist");
  const checklistHref = insightPath("fr", checklist.category, checklist.slug.fr);
  const { hero, reporting, firmware, offers, notDone, method, about, faq, finalCta } = CRA_PAGE;

  return (
    <>
      <CraHeader />
      <main id="main-content" className="bg-rs-bg text-rs-fg">
        <section id="hero" className="rs-theme-dark bg-rs-bg pb-16 pt-14 text-rs-fg md:pb-24 md:pt-20">
          <Container>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.06] tracking-tight md:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{hero.lead}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TrackedLink
                href={FORM_ANCHOR}
                event={{ ctaId: "cra_hero_diagnostic", source: "cra_hero", destination: FORM_ANCHOR, locale: "fr" }}
                className="inline-flex items-center gap-2 rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
              >
                {hero.primaryCta}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href={checklistHref}
                event={{ ctaId: "cra_hero_checklist", source: "cra_hero", destination: checklistHref, locale: "fr" }}
                className="inline-flex items-center rounded-full border border-[var(--rs-border-strong)] px-7 py-3.5 text-base font-medium text-rs-fg transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent-fg"
              >
                {hero.secondaryCta}
              </TrackedLink>
            </div>
            <p className="mt-8 max-w-[var(--rs-reading)] text-sm leading-relaxed text-rs-muted">{hero.note}</p>
          </Container>
        </section>

        <section id="obligations" className="py-[var(--rs-section-space)]">
          <Container>
            <Eyebrow>{reporting.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[1.75rem] font-semibold tracking-tight md:text-3xl">
              {reporting.title}
            </h2>
            <p className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{reporting.lead}</p>
            <div className="mt-10">
              <table className="w-full border-collapse text-left text-sm md:text-base">
                <caption className="sr-only">{"Les trois étapes de déclaration d'une vulnérabilité activement exploitée"}</caption>
                <thead>
                  <tr className="border-b border-[var(--rs-border-strong)] text-xs font-semibold uppercase tracking-[0.14em] text-rs-muted">
                    <th scope="col" className="py-3 pr-3 md:pr-6">Étape</th>
                    <th scope="col" className="py-3 pr-3 md:pr-6">Délai</th>
                    <th scope="col" className="py-3">{"Ce qu'elle contient"}</th>
                  </tr>
                </thead>
                <tbody>
                  {reporting.steps.map((row) => (
                    <tr key={row.step} className="border-b border-[var(--rs-border)] align-top">
                      <th scope="row" className="py-4 pr-3 font-semibold md:pr-6">{row.step}</th>
                      <td className="py-4 pr-3 md:pr-6">{row.deadline}</td>
                      <td className="py-4 text-rs-muted">{row.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 max-w-[var(--rs-reading)] text-base leading-relaxed text-rs-muted">{reporting.incidentNote}</p>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {reporting.facts.map((fact) => (
                <li key={fact.title} className="border-t border-[var(--rs-border)] pt-4 text-base leading-relaxed">
                  <strong className="font-semibold">{fact.title}</strong> <span className="text-rs-muted">{fact.body}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section id="firmware" className="rs-theme-dark bg-rs-bg py-[var(--rs-section-space)] text-rs-fg">
          <Container>
            <Eyebrow>{firmware.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[1.75rem] font-semibold tracking-tight md:text-3xl">{firmware.title}</h2>
            <p className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{firmware.lead}</p>
            <ul className="mt-10 grid gap-8 md:grid-cols-2">
              {firmware.points.map((point) => (
                <li key={point.title} className="border-t border-[var(--rs-border)] pt-4">
                  <p className="text-lg font-semibold">{point.title}</p>
                  <p className="mt-2 text-base leading-relaxed text-rs-muted">{point.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-[var(--rs-reading)] text-lg leading-relaxed">{firmware.conclusion}</p>
          </Container>
        </section>

        <section id="offres" className="py-[var(--rs-section-space)]">
          <Container>
            <Eyebrow>Offres</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[1.75rem] font-semibold tracking-tight md:text-3xl">
              Deux façons de travailler ensemble.
            </h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {offers.map((offer) => {
                const ListTag = offer.ordered ? "ol" : "ul";
                return (
                  <article
                    key={offer.id}
                    data-cra-offer={offer.id}
                    className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6 md:p-8"
                  >
                    <h3 className="text-xl font-semibold tracking-tight">{offer.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-rs-muted">{offer.terms}</p>
                    <ListTag className={offer.ordered ? "mt-6 list-decimal space-y-3 pl-5" : "mt-6 space-y-3"}>
                      {offer.items.map((item) => (
                        <li key={item} className={offer.ordered ? "pl-1 text-base leading-relaxed" : "flex gap-3 text-base leading-relaxed"}>
                          {offer.ordered ? null : <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-rs-accent-fg" />}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ListTag>
                  </article>
                );
              })}
            </div>

            <h3 className="mt-16 text-xl font-semibold tracking-tight">Ce que je ne fais pas</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-5 md:grid-cols-2">
              {notDone.map((item) => (
                <li key={item.title} className="border-t border-[var(--rs-border)] pt-4 text-base leading-relaxed">
                  <strong className="font-semibold">{item.title}</strong> <span className="text-rs-muted">{item.body}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section id="methode" className="bg-rs-surface py-[var(--rs-section-space)]">
          <Container>
            <Eyebrow>Méthode</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-[1.75rem] font-semibold tracking-tight md:text-3xl">
              Quatre étapes, du premier échange à la restitution.
            </h2>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {method.map((step, index) => (
                <li key={step.title} className="border-t border-[var(--rs-border)] pt-4">
                  <p className="text-sm font-semibold text-rs-accent-fg">{`0${index + 1}`}</p>
                  <p className="mt-2 text-lg font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-rs-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section id="intervenant" className="py-[var(--rs-section-space)]">
          <Container>
            <Eyebrow>Intervenant</Eyebrow>
            <h2 className="mt-4 text-[1.75rem] font-semibold tracking-tight md:text-3xl">{about.title}</h2>
            <p className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{about.lead}</p>
            <ul className="mt-8 max-w-[var(--rs-reading)] space-y-4">
              {about.items.map((item) => (
                <li key={item.title} className="border-t border-[var(--rs-border)] pt-4 text-base leading-relaxed">
                  <strong className="font-semibold">{item.title}</strong> <span className="text-rs-muted">{item.body}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section id="faq" className="bg-rs-surface py-[var(--rs-section-space)]">
          <Container>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 text-[1.75rem] font-semibold tracking-tight md:text-3xl">Questions fréquentes</h2>
            <div className="mt-8 max-w-3xl divide-y divide-[var(--rs-border)] border-y border-[var(--rs-border)]">
              {faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">
                    <span className="flex items-start justify-between gap-6">
                      {item.question}
                      <span aria-hidden className="text-rs-muted transition-transform duration-150 group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-rs-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section id="diagnostic" className="rs-theme-dark scroll-mt-6 bg-rs-bg py-[var(--rs-section-space)] text-rs-fg">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow>Diagnostic</Eyebrow>
                <h2 className="mt-4 max-w-xl text-[1.75rem] font-semibold tracking-tight md:text-3xl">{finalCta.title}</h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-rs-muted">{finalCta.body}</p>
                <div className="mt-10 max-w-xl rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] p-6">
                  <p className="text-base font-semibold">{CRA_PAGE.checklist.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-rs-muted">{CRA_PAGE.checklist.body}</p>
                  <TrackedLink
                    href={checklistHref}
                    event={{ ctaId: "cra_footer_checklist", source: "cra_diagnostic", destination: checklistHref, locale: "fr" }}
                    className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
                  >
                    {CRA_PAGE.checklist.link}
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </TrackedLink>
                </div>
              </div>
              <ContactForm locale="fr" initialSubject={finalCta.formSubject} />
            </div>
          </Container>
        </section>
      </main>
      <CraFooter />
    </>
  );
}

function CraHeader() {
  return (
    <header className="rs-theme-dark border-b border-[var(--rs-border)] bg-rs-bg text-rs-fg">
      <div className="mx-auto flex h-16 w-full max-w-[var(--rs-container)] items-center justify-between gap-6 px-5 md:px-8">
        <a href="#hero" className="text-sm font-bold uppercase tracking-[0.22em] text-rs-fg">
          {BRAND.name}
        </a>
        <nav aria-label="Sections de la page" className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-rs-fg transition-colors duration-150 hover:text-rs-accent-fg"
            >
              {section.label}
            </a>
          ))}
        </nav>
        <TrackedLink
          href={FORM_ANCHOR}
          event={{ ctaId: "cra_header_diagnostic", source: "cra_header", destination: FORM_ANCHOR, locale: "fr" }}
          className="inline-flex items-center rounded-full bg-rs-fg px-5 py-2.5 text-sm font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
        >
          Réserver un diagnostic
        </TrackedLink>
      </div>
    </header>
  );
}

function CraFooter() {
  const year = new Date().getFullYear();
  const links = [
    { label: "Mentions légales", href: legalPath("fr", "legal") },
    { label: "Politique de confidentialité", href: legalPath("fr", "privacy") },
    { label: "CGV", href: legalPath("fr", "terms") },
  ];

  return (
    <footer className="border-t border-[var(--rs-border)] bg-rs-bg">
      <div className="mx-auto flex w-full max-w-[var(--rs-container)] flex-col gap-4 px-5 py-8 text-sm text-rs-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>{`© ${year} ${BRAND.name}`}</p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors duration-150 hover:text-rs-fg">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ManageCookiesButton label="Gérer les cookies" />
          </li>
        </ul>
      </div>
    </footer>
  );
}
