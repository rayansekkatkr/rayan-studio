import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { LandingStickyCta } from "@/components/landing/landing-sticky-cta";
import { BigSteps } from "@/components/article/article-blocks";
import { QuickQuoteForm } from "@/components/forms/quick-quote-form";
import { Reassurance } from "@/components/trust/reassurance";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GiantWord } from "@/components/ui/giant-word";
import { NightBand } from "@/components/ui/night-band";
import { TechChips } from "@/components/ui/tech-chips";
import type { LandingContent } from "@/content/landings";
import { PROJECTS } from "@/content/projects";
import { projectStatusBadge } from "@/components/work/project-labels";
import { getService } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { servicePath, startProjectPath, studioPath, workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

// Section headings carry their own weight: no kicker above them (only the night-band header keeps
// its label, which reads as a breadcrumb).
function SectionTitle({ title, lead, serif = false }: { title: string; lead?: string; serif?: boolean }) {
  return (
    <div>
      <h2
        className={cn(
          "max-w-4xl text-[2.25rem] font-extrabold leading-[0.98] tracking-[-0.045em] md:text-6xl",
          serif && "font-serif font-normal tracking-[-0.01em]",
        )}
      >
        {title}
      </h2>
      {lead ? <p className="mt-4 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{lead}</p> : null}
    </div>
  );
}

// Real home-page captures of the studio's live product sites, keyed by project slug.
const SITE_SHOTS: Record<string, string> = {
  pick4me: "/realisations/sites/pick4me-site.webp",
  "pont-facturx": "/realisations/sites/pont-facturx-site.webp",
  goodcall: "/realisations/sites/goodcall-site.webp",
  docextract: "/realisations/sites/docextract-site.webp",
};

/**
 * Websites landing: the proof is the studio's own live sites, shown, with their real domains.
 * Replaces the generic trust block (stack grid, product count) on this page.
 */
function LandingSitesProof({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const sites = PROJECTS.filter(
    (project) => project.liveUrl && SITE_SHOTS[project.slug] && projectStatusBadge(project, locale).tone === "live",
  );
  return (
    <section id="exemples" data-landing-proof className="scroll-mt-24 border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
      <Container>
        <SectionTitle
          title={fr ? "Des preuves que vous pouvez vérifier." : "Proof you can check for yourself."}
          lead={
            fr
              ? "Le type de site que vous recevez, puis les sites que je mets en ligne pour mes propres produits."
              : "The kind of website you get, then the websites I ship for my own products."
          }
        />
        {/* The kind of site a business gets: the same concept home page on desktop and mobile, exactly what the 24-hour mockup covers. */}
        <figure className="mt-10 border-t border-rs-fg pt-8">
          <figcaption className="max-w-[60ch]">
            <h3 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl">
              {fr ? "À quoi ressemble votre maquette" : "What your mockup looks like"}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-rs-muted">
              {fr
                ? "La maquette des 24 h : la page d'accueil de votre futur site, en version bureau et mobile, à vos couleurs et avec vos textes."
                : "The 24-hour mockup: the home page of your future website, desktop and mobile, in your colours and with your copy."}
            </p>
            <p className="mt-2 text-base leading-relaxed text-rs-muted">
              {fr
                ? "Exemple : refonte concept du site de la pâtisserie Manteigaria, réalisée par le studio et non commandée."
                : "Example: a concept redesign of the Manteigaria bakery website, made by the studio and not commissioned."}{" "}
              <Link
                href={workPath(locale, "manteigaria")}
                className="font-semibold text-rs-fg underline underline-offset-4 transition-colors duration-150 hover:text-rs-accent-fg"
              >
                {fr ? "Voir l'étude de cas" : "See the case study"}
              </Link>
            </p>
          </figcaption>
          <div className="mt-8 grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:gap-10">
            <div>
              <p className="text-sm font-semibold text-rs-muted">{fr ? "Version bureau" : "Desktop view"}</p>
              <div className="mt-2 overflow-hidden border border-[var(--rs-border)]">
                <Image
                  src="/realisations/manteigaria-before.png"
                  alt={
                    fr
                      ? "Maquette bureau de la page d'accueil Manteigaria : photo plein écran, titre « L'Art du Goût » et bouton « Découvrir notre histoire »"
                      : "Desktop mockup of the Manteigaria home page: full-screen photo, the title \u201cL'Art du Go\u00fbt\u201d and a \u201cDiscover our story\u201d button"
                  }
                  width={1600}
                  height={827}
                  sizes="(min-width: 768px) 46rem, 92vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="mx-auto w-full max-w-[16rem]">
              <p className="text-sm font-semibold text-rs-muted">{fr ? "Version mobile" : "Mobile view"}</p>
              <div className="mt-2 overflow-hidden border border-[var(--rs-border)]">
                <Image
                  src="/realisations/manteigaria-mobile.webp"
                  alt={
                    fr
                      ? "Maquette mobile de la page d'accueil Manteigaria : photo plein écran, titre « L'Art du Goût » et bouton « Découvrir notre histoire »"
                      : "Mobile mockup of the Manteigaria home page: full-screen photo, the title \u201cL'Art du Go\u00fbt\u201d and a \u201cDiscover our story\u201d button"
                  }
                  width={780}
                  height={1688}
                  sizes="16rem"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </figure>
        <h3 className="mt-16 text-2xl font-bold tracking-[-0.03em] md:text-3xl">
          {fr ? "Et les sites de mes propres produits" : "And the websites of my own products"}
        </h3>
        <ul role="list" className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {sites.map((project) => {
            const host = new URL(project.liveUrl as string).hostname.replace(/^www\./, "");
            return (
              <li key={project.key}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-colors duration-150 hover:text-rs-accent-fg"
                >
                  <span className="block overflow-hidden border border-[var(--rs-border)] transition-colors duration-150 group-hover:border-rs-accent">
                    <Image
                      src={SITE_SHOTS[project.slug]}
                      alt=""
                      width={1440}
                      height={900}
                      sizes="(min-width: 1280px) 38rem, (min-width: 640px) 46vw, 92vw"
                      className="h-auto w-full"
                    />
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-3 text-2xl font-bold tracking-[-0.03em]">
                    <span className="min-w-0 [overflow-wrap:anywhere]">{project.title}</span>
                    <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0" />
                  </span>
                  <span className="mt-1 block text-base text-rs-muted">
                    {host}
                    <span className="sr-only">{fr ? " (s'ouvre dans un nouvel onglet)" : " (opens in a new tab)"}</span>
                  </span>
                  <span className="mt-2 block text-base leading-relaxed text-rs-muted">{project.summary[locale]}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
          {fr ? "Votre site sera conçu par la même personne : " : "Your website will be built by the same person: "}
          <Link
            href={studioPath(locale, "rayan")}
            className="font-semibold text-rs-fg underline underline-offset-4 transition-colors duration-150 hover:text-rs-accent-fg"
          >
            Rayan Sekkat
          </Link>
          {fr ? ", du cadrage à la mise en ligne." : ", from scoping to launch."}
        </p>
      </Container>
    </section>
  );
}

/** Landing header: night band with a theme photo faded in, giant page name, a real h1 and the offer. */
function LandingHeroA({ locale, content, source }: { locale: Locale; content: LandingContent; source: string }) {
  const fr = locale === "fr";
  const isWebsites = content.key === "websites";
  const word = isWebsites ? (fr ? "Sites web" : "Websites") : "Applications";

  return (
    <NightBand image={content.heroImage} className="pt-28 md:pt-36">
      <Container>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <div className="mt-3 overflow-x-clip">
          <GiantWord text={word} />
        </div>
        {/* 5/7 like every night header with a giant word (DESIGN.md): promise left, lead and action right. */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h1 className="text-xl font-bold leading-snug tracking-tight md:text-2xl">{content.title}</h1>
          <div>
          <p className="max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{content.lead}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <TrackedLink
              href="#devis"
              event={{ ctaId: `${source}_hero_form`, source, destination: "#devis", locale }}
              className="inline-flex items-center gap-2 bg-rs-fg px-6 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent active:bg-rs-accent-hover active:text-[var(--rs-dark-fg)] active:duration-0 hover:text-rs-fg"
            >
              {content.primaryCta}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </TrackedLink>
            <Link
              href={isWebsites ? "#exemples" : workPath(locale)}
              className="text-base font-semibold underline underline-offset-4 hover:text-rs-accent-fg"
            >
              {content.secondaryCta}
            </Link>
          </div>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-rs-muted">
              {content.promises.map((promise) => (
                <li key={promise} className="flex items-start gap-2">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rs-accent-fg" />
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </NightBand>
  );
}

/** Commercial landing for one path: website creation and redesign, or applications and SaaS. */
export function LandingPage({ locale, content }: { locale: Locale; content: LandingContent }) {
  const fr = locale === "fr";
  const source = `landing_${content.key}`;
  const isWebsites = content.key === "websites";

  return (
    <article data-landing={content.key}>
      <LandingHeroA locale={locale} content={content} source={source} />

      {content.timeline ? (
        <section data-landing-signature="timeline" className="py-[var(--rs-section-space)]">
          <Container>
            <SectionTitle title={content.timeline.title} />
            <ol className="mt-10 grid gap-10 border-t border-rs-fg md:grid-cols-3 md:gap-0">
              {content.timeline.steps.map((step) => (
                <li key={step.when} className="pt-8 md:border-r md:border-[var(--rs-border)] md:px-8 md:first:pl-0 md:last:border-r-0">
                  <p className="text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-6xl">{step.when}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-rs-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      {isWebsites ? <LandingSitesProof locale={locale} /> : null}

      {content.architecture ? (
        <section data-landing-signature="architecture" className="py-[var(--rs-section-space)]">
          <Container>
            <SectionTitle title={content.architecture.title} />
            <ol className="mt-10 grid border border-rs-fg sm:grid-cols-2 lg:grid-cols-4">
              {content.architecture.layers.map((layer, index) => (
                <li
                  key={layer.label}
                  className={cn(
                    "p-6",
                    index > 0 && "border-t border-rs-fg sm:border-t-0",
                    index % 2 === 1 && "sm:border-l",
                    index >= 2 && "sm:border-t lg:border-t-0",
                    index === 2 && "lg:border-l",
                  )}
                >
                  <span className="text-sm text-rs-muted">{layer.label}</span>
                  <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.04em]">{layer.title}</h3>
                  <TechChips items={layer.stack} className="mt-4" />
                </li>
              ))}
            </ol>
            {content.deliverables ? (
              <div className="mt-14 grid gap-8 border-t border-[var(--rs-border)] pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rs-muted">{fr ? "Livrables" : "Deliverables"}</p>
                  <h3 className="mt-3 text-[2rem] font-extrabold tracking-[-0.04em] md:text-[2.6rem]">{content.deliverables.title}</h3>
                </div>
                <dl className="border-t border-rs-fg">
                  {content.deliverables.items.map((item) => (
                    <div key={item.key} className="grid gap-1 border-b border-[var(--rs-border)] py-5 sm:grid-cols-2 sm:items-baseline sm:gap-6">
                      <dt className="text-xl font-semibold tracking-tight">{item.key}</dt>
                      <dd className="text-base text-rs-muted sm:text-right">{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      <section className="border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
        <Container>
          <SectionTitle title={content.benefitsTitle} />
          {isWebsites ? (
            // Websites: an editorial list, read top to bottom like a short brief.
            <ol data-benefits="list" className="mt-10 border-t border-rs-fg">
              {content.benefits.map((benefit, index) => (
                <li
                  key={benefit.title}
                  className="grid gap-2 border-b border-[var(--rs-border)] py-7 md:grid-cols-[6rem_minmax(0,5fr)_minmax(0,7fr)] md:items-baseline md:gap-8"
                >
                  <span aria-hidden className="num-outline text-5xl font-bold leading-none tracking-tight">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl">{benefit.title}</h3>
                  <p className="text-base leading-relaxed text-rs-muted md:text-lg">{benefit.body}</p>
                </li>
              ))}
            </ol>
          ) : (
            // Applications: four columns under a heavy rule, closer to a technical spec.
            <ol data-benefits="columns" className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {content.benefits.map((benefit, index) => (
                <li key={benefit.title} className="border-t-[3px] border-rs-fg pt-5">
                  <span className="text-sm text-rs-muted">
                    {String(index + 1).padStart(2, "0")} / {String(content.benefits.length).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-rs-muted">{benefit.body}</p>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </section>

      <section className="border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
        <Container>
          <div className={cn("grid gap-10 lg:gap-14", !isWebsites && "lg:grid-cols-2")}>
            <div>
              <SectionTitle title={content.includedTitle} />
              <ul className={cn("mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2", isWebsites && "lg:grid-cols-2")}>
                {content.included.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed">
                    <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-rs-accent-fg" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {isWebsites ? null : (
              <div>
                <SectionTitle title={content.processTitle} />
                <div className="mt-6">
                  <BigSteps steps={content.process} />
                </div>
              </div>
            )}
          </div>

          {content.services?.length ? (
            <div className="mt-14">
              <Eyebrow>{content.servicesTitle}</Eyebrow>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {content.services.map((key) => {
                  const service = getService(key);
                  return (
                    <li key={key}>
                      <Link
                        href={servicePath(locale, key)}
                        className="group flex h-full items-start justify-between gap-4 rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5 transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
                      >
                        <span>
                          <span className="block text-base font-semibold group-hover:text-rs-accent-fg">{service.eyebrow[locale]}</span>
                          <span className="mt-1 block line-clamp-2 text-sm leading-relaxed text-rs-muted">{service.description[locale]}</span>
                        </span>
                        <ArrowUpRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rs-muted group-hover:text-rs-accent-fg" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

        </Container>
      </section>

      {isWebsites ? null : (
        <div className="border-t border-[var(--rs-border)]">
          <Reassurance locale={locale} variant="app" />
        </div>
      )}

      <section className="border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <SectionTitle title={fr ? "Les questions qu'on nous pose" : "Questions we are asked"} />
            <div className="divide-y divide-[var(--rs-border)] border-y border-[var(--rs-border)]">
              {content.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-rs-fg">
                    <span className="min-w-0 [overflow-wrap:anywhere]">{item.question}</span>
                    <Plus aria-hidden className="h-5 w-5 shrink-0 text-rs-muted transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-rs-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="devis" className="scroll-mt-24 pb-[var(--rs-section-space)]">
        <Container>
          <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-[var(--rs-radius-lg)] border border-[var(--rs-border)] bg-rs-surface lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div
              className="rs-theme-dark relative isolate bg-rs-bg p-8 text-rs-fg md:p-10"
            >
              <h2 className="text-[2.25rem] font-extrabold leading-[1] tracking-[-0.04em] md:text-[2.6rem]">{content.formTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-rs-muted">{content.formLead}</p>
              <p className="mt-5 text-sm leading-relaxed text-rs-muted">
                {fr
                  ? "Je suis basé à Séoul et je travaille avec des clients en France et en Europe : les 24 h comptent en jours ouvrés français."
                  : "I am based in Seoul and work with clients in France and Europe: the 24 hours count French business days."}
              </p>
            </div>
            <div className="p-6 md:p-10 lg:pl-2">
              <QuickQuoteForm locale={locale} defaultType={content.quoteType} source={source} />
              {!isWebsites ? (
                <p className="mt-6 border-t border-[var(--rs-border)] pt-5 text-sm text-rs-muted">
                  {fr ? "Cahier des charges déjà prêt ?" : "Specification already written?"}{" "}
                  <Link
                    href={startProjectPath(locale)}
                    className="inline-flex items-center gap-1 font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
                  >
                    {fr ? "Parcours détaillé en 5 étapes" : "Detailed 5-step brief"}
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
      {isWebsites ? <LandingStickyCta label={content.primaryCta} source={source} locale={locale} /> : null}
    </article>
  );
}
