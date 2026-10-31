import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BigSteps } from "@/components/article/article-blocks";
import { QuickQuoteForm } from "@/components/forms/quick-quote-form";
import { Reassurance } from "@/components/trust/reassurance";
import { ProductCarousel } from "@/components/work/product-carousel";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechChips } from "@/components/ui/tech-chips";
import type { LandingContent } from "@/content/landings";
import { getService } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { localSeoCities, localSeoSectors } from "@/lib/local-seo";
import { servicePath, startProjectPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

function SectionTitle({ eyebrow, title, lead, serif = false }: { eyebrow: string; title?: string; lead?: string; serif?: boolean }) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      {title ? (
        <h2
          className={cn(
            "mt-4 max-w-3xl text-[1.75rem] leading-tight md:text-4xl",
            serif ? "font-serif font-semibold tracking-[-0.01em] md:text-[2.75rem]" : "font-semibold tracking-tight",
          )}
        >
          {title}
        </h2>
      ) : null}
      {lead ? <p className="mt-4 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{lead}</p> : null}
    </div>
  );
}

function HeroActions({ locale, content, source, warm }: { locale: Locale; content: LandingContent; source: string; warm: boolean }) {
  return (
    <>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <TrackedLink
          href="#devis"
          event={{ ctaId: `${source}_hero_form`, source, destination: "#devis", locale }}
          className={cn(
            "inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold transition-colors duration-150",
            warm ? "bg-[var(--rs-warm-ink)] text-white hover:bg-[var(--rs-terra)]" : "bg-[#f7f7f4] text-[var(--rs-dark)] hover:bg-rs-accent hover:text-white",
          )}
        >
          {content.primaryCta}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </TrackedLink>
        <a
          href="#exemples"
          className={cn(
            "inline-flex items-center border px-7 py-3.5 text-base font-medium transition-colors duration-150",
            warm ? "border-[color-mix(in_srgb,var(--rs-warm-ink)_35%,transparent)] hover:border-[var(--rs-warm-ink)]" : "border-white/30 hover:border-white",
          )}
        >
          {content.secondaryCta}
        </a>
      </div>
      <ul className={cn("mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm", warm ? "text-[var(--rs-warm-muted)]" : "flex-col font-mono text-[13px] text-[#a2a2aa]")}>
        {content.promises.map((promise) => (
          <li key={promise} className="flex items-center gap-2">
            <Check aria-hidden className={cn("h-4 w-4", warm ? "text-[var(--rs-terra)]" : "text-[#7be0a5]")} />
            {promise}
          </li>
        ))}
      </ul>
    </>
  );
}

/** Websites: warm paper, serif title, a real site shown on desktop and phone. */
function WarmHero({ locale, content, source }: { locale: Locale; content: LandingContent; source: string }) {
  const fr = locale === "fr";
  const accent = fr ? "envie" : "want";
  const at = content.title.indexOf(accent);
  const image = "/realisations/manteigaria-before.png";

  return (
    <section className="relative overflow-hidden bg-[var(--rs-warm)] pb-16 pt-28 text-[var(--rs-warm-ink)] md:pb-20 md:pt-36">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div>
            <Eyebrow className="text-[#7c6f62]">{content.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.02em] md:text-6xl lg:text-[4.6rem]">
              {at >= 0 ? (
                <>
                  {content.title.slice(0, at)}
                  <em className="font-normal text-[var(--rs-terra)]">{accent}</em>
                  {content.title.slice(at + accent.length)}
                </>
              ) : (
                content.title
              )}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--rs-warm-muted)] md:text-xl">{content.lead}</p>
            <HeroActions locale={locale} content={content} source={source} warm />
          </div>
          <div className="relative h-[20rem] sm:h-[26rem] lg:h-[32rem]">
            <div className="absolute left-0 top-8 w-[86%] border border-[color-mix(in_srgb,var(--rs-warm-ink)_15%,transparent)] bg-white shadow-[0_40px_80px_-30px_rgba(42,33,24,0.45)]">
              <div aria-hidden className="flex h-7 items-center gap-1.5 border-b border-[color-mix(in_srgb,var(--rs-warm-ink)_12%,transparent)] px-3">
                <span className="h-2 w-2 rounded-full bg-[#d8cfc3]" />
                <span className="h-2 w-2 rounded-full bg-[#d8cfc3]" />
                <span className="h-2 w-2 rounded-full bg-[#d8cfc3]" />
              </div>
              <div className="relative aspect-[16/10]">
                <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 38vw, 86vw" className="object-cover object-left-top" />
              </div>
            </div>
            <div className="absolute bottom-6 right-0 w-[32%] rounded-[1.6rem] bg-[#111] p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-[9/18] overflow-hidden rounded-[1.2rem]">
                <Image src={image} alt="" fill sizes="20vw" className="object-cover object-[30%_top]" />
              </div>
            </div>
            <p className="absolute right-[6%] top-0 rotate-6 bg-[var(--rs-terra)] px-4 py-3 text-sm font-bold leading-tight text-white shadow-[0_18px_30px_-18px_rgba(0,0,0,0.5)] md:px-5 md:text-base">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] opacity-90">{fr ? "Votre maquette" : "Your mockup"}</span>
              {fr ? "offerte, sous 24 h ouvrées" : "free, within 24 business hours"}
            </p>
            {content.heroCaption ? <p className="absolute bottom-0 left-0 text-xs text-[#7c6f62]">{content.heroCaption}</p> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Applications: a blueprint grid, monospace labels and a real product screen annotated with its stack. */
function BlueprintHero({ locale, content, source }: { locale: Locale; content: LandingContent; source: string }) {
  const fr = locale === "fr";
  const callouts = [
    { text: fr ? "Next.js · interface" : "Next.js · interface", className: "-left-4 top-[52%]" },
    { text: "FastAPI · Python", className: "-top-5 right-4" },
    { text: fr ? "Celery · traitements asynchrones" : "Celery · background jobs", className: "-right-3 bottom-[18%]" },
  ];

  return (
    <section className="blueprint-grid relative overflow-hidden pb-16 pt-28 text-[#f7f7f4] md:pb-24 md:pt-36">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-[#9d9cf5]">{`// ${content.eyebrow}`}</p>
            <h1 className="mt-5 text-[2.5rem] font-bold leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-[4rem]">{content.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#a2a2aa]">{content.lead}</p>
            <HeroActions locale={locale} content={content} source={source} warm={false} />
          </div>
          <figure className="relative">
            <div className="border border-white/20 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
              <div className="flex h-7 items-center border-b border-white/10 bg-[#16171f] px-3 font-mono text-[11px] text-[#a2a2aa]">
                pont-facturx · production
              </div>
              <div className="relative aspect-[16/10] bg-white">
                <Image
                  src="/realisations/pont-facturx-conversion.webp"
                  alt={fr ? "Écran de conversion de Pont Factur-X" : "Pont Factur-X conversion screen"}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-left-top"
                />
              </div>
            </div>
            {callouts.map((callout) => (
              <span
                key={callout.text}
                aria-hidden
                className={cn(
                  "absolute hidden whitespace-nowrap border border-rs-accent bg-[#0b0c12] px-2.5 py-1.5 font-mono text-xs text-[#f7f7f4] lg:block",
                  callout.className,
                )}
              >
                {callout.text}
              </span>
            ))}
            {content.heroCaption ? <figcaption className="mt-3 font-mono text-xs text-[#a2a2aa]">{content.heroCaption}</figcaption> : null}
          </figure>
        </div>
      </Container>
    </section>
  );
}

/** Commercial landing for one audience: websites for small businesses, or applications and SaaS. */
export function LandingPage({ locale, content }: { locale: Locale; content: LandingContent }) {
  const fr = locale === "fr";
  const source = `landing_${content.key}`;
  const isWebsites = content.key === "websites";

  return (
    <article data-landing={content.key}>
      {isWebsites ? <WarmHero locale={locale} content={content} source={source} /> : <BlueprintHero locale={locale} content={content} source={source} />}

      {content.timeline ? (
        <section data-landing-signature="timeline" className="py-[var(--rs-section-space)]">
          <Container>
            <SectionTitle eyebrow={content.processTitle} title={content.timeline.title} serif />
            <ol className="mt-12 grid gap-10 border-t-[3px] border-[var(--rs-warm-ink)] md:grid-cols-3 md:gap-0">
              {content.timeline.steps.map((step) => (
                <li key={step.when} className="relative pt-8 md:pr-10">
                  <span aria-hidden className="absolute -top-[10px] left-0 h-4 w-4 bg-[var(--rs-terra)]" />
                  <p className="font-serif text-4xl font-semibold">{step.when}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-rs-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      {content.architecture ? (
        <section data-landing-signature="architecture" className="py-[var(--rs-section-space)]">
          <Container>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-rs-accent-fg">{fr ? "// Architecture type" : "// Typical architecture"}</p>
            <h2 className="mt-4 max-w-3xl text-[1.75rem] font-bold leading-tight tracking-[-0.03em] md:text-[2.75rem]">{content.architecture.title}</h2>
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
                  <span className="font-mono text-xs uppercase tracking-[0.08em] text-rs-accent-fg">{layer.label}</span>
                  <h3 className="mt-3 text-xl font-semibold">{layer.title}</h3>
                  <TechChips items={layer.stack} className="mt-4" />
                </li>
              ))}
            </ol>
            {content.deliverables ? (
              <div className="mt-14 grid gap-8 border-t border-[var(--rs-border)] pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-rs-accent-fg">{fr ? "// Livrables" : "// Deliverables"}</p>
                  <h3 className="mt-3 text-[1.75rem] font-bold tracking-[-0.03em] md:text-[2.1rem]">{content.deliverables.title}</h3>
                </div>
                <dl className="border-t border-[var(--rs-border)]">
                  {content.deliverables.items.map((item) => (
                    <div key={item.key} className="grid gap-1 border-b border-[var(--rs-border)] py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                      <dt className="font-mono text-[13px] text-rs-accent-fg">{item.key}</dt>
                      <dd className="text-base">{item.body}</dd>
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
          <SectionTitle eyebrow={fr ? "Bénéfices" : "Benefits"} title={content.benefitsTitle} serif={isWebsites} />
          {isWebsites ? (
            // Websites: an editorial list, read top to bottom like a short brief.
            <ol data-benefits="list" className="mt-10 border-t border-rs-fg">
              {content.benefits.map((benefit, index) => (
                <li
                  key={benefit.title}
                  className="grid gap-2 border-b border-[var(--rs-border)] py-7 md:grid-cols-[6rem_minmax(0,5fr)_minmax(0,7fr)] md:items-baseline md:gap-8"
                >
                  <span aria-hidden className="num-outline-warm text-5xl font-bold leading-none tracking-tight">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight">{benefit.title}</h3>
                  <p className="text-base leading-relaxed text-rs-muted md:text-lg">{benefit.body}</p>
                </li>
              ))}
            </ol>
          ) : (
            // Applications: four columns under a heavy rule, closer to a technical spec.
            <ol data-benefits="columns" className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {content.benefits.map((benefit, index) => (
                <li key={benefit.title} className="border-t-[3px] border-rs-fg pt-5">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-rs-accent-fg">
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

      <section id="exemples" className="scroll-mt-24 border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
        <Container>
          <SectionTitle eyebrow={fr ? "Réalisations" : "Work"} title={content.workTitle} lead={content.workLead} serif={isWebsites} />
          <div className="mt-10">
            <ProductCarousel
              locale={locale}
              keys={content.work.map((item) => item.key)}
              labels={Object.fromEntries(content.work.map((item) => [item.key, item.label]))}
              ariaLabel={content.workTitle}
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
        <Container>
          <div className={cn("grid gap-10 lg:gap-14", !isWebsites && "lg:grid-cols-2")}>
            <div>
              <SectionTitle eyebrow={content.includedTitle} />
              <ul className={cn("mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2", isWebsites && "lg:grid-cols-4")}>
                {content.included.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed">
                    <Check aria-hidden className={cn("mt-1 h-4 w-4 shrink-0", isWebsites ? "text-[var(--rs-terra)]" : "text-rs-accent-fg")} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {isWebsites ? null : (
              <div>
                <SectionTitle eyebrow={content.processTitle} />
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

          {isWebsites && fr ? (
            <div className="mt-14">
              <Eyebrow>Par activité et par ville</Eyebrow>
              <div className="mt-5 grid gap-6 lg:grid-cols-2">
                <ul className="flex flex-wrap gap-2">
                  {localSeoSectors.map((sector) => (
                    <li key={sector.slug}>
                      <Link
                        href={`/site/${sector.slug}/paris`}
                        className="inline-flex bg-[var(--rs-warm)] px-4 py-2 text-sm font-semibold text-[var(--rs-warm-ink)] transition-colors duration-150 hover:bg-[var(--rs-warm-ink)] hover:text-white"
                      >
                        {sector.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-wrap gap-2">
                  {localSeoCities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/site/commerce-local/${city.slug}`}
                        className="inline-flex bg-[var(--rs-warm)] px-4 py-2 text-sm font-semibold text-[var(--rs-warm-ink)] transition-colors duration-150 hover:bg-[var(--rs-warm-ink)] hover:text-white"
                      >
                        Site internet à {city.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <div className="border-t border-[var(--rs-border)]">
        <Reassurance locale={locale} variant={isWebsites ? "site" : "app"} />
      </div>

      <section className="border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <SectionTitle eyebrow="FAQ" title={fr ? "Les questions qu'on nous pose" : "Questions we are asked"} />
            <div className="divide-y divide-[var(--rs-border)] border-y border-[var(--rs-border)]">
              {content.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-rs-fg">
                    {item.question}
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
          <div className="grid gap-8 overflow-hidden rounded-[var(--rs-radius-lg)] border border-[var(--rs-border)] bg-rs-surface lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div
              className={cn(
                "relative isolate p-8 md:p-10",
                isWebsites ? "bg-[var(--rs-warm)] text-[var(--rs-warm-ink)]" : "rs-theme-dark bg-rs-bg text-rs-fg",
              )}
            >
              {isWebsites ? null : <div aria-hidden className="hero-glow absolute inset-0 -z-10" />}
              <Eyebrow>{fr ? "Devis gratuit" : "Free quote"}</Eyebrow>
              <h2 className={cn("mt-4 text-[1.75rem] font-semibold leading-tight md:text-3xl", isWebsites ? "font-serif" : "tracking-tight")}>{content.formTitle}</h2>
              <p className={cn("mt-4 text-base leading-relaxed", isWebsites ? "text-[var(--rs-warm-muted)]" : "text-rs-muted")}>{content.formLead}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {content.promises.map((promise) => (
                  <li key={promise} className="flex items-center gap-2.5">
                    <Check aria-hidden className={cn("h-4 w-4", isWebsites ? "text-[var(--rs-terra)]" : "text-rs-accent-fg")} />
                    {promise}
                  </li>
                ))}
              </ul>
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
    </article>
  );
}
