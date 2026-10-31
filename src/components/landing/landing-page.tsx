import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Gauge,
  Handshake,
  Inbox,
  Layers,
  Plus,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BigSteps } from "@/components/article/article-blocks";
import { QuickQuoteForm } from "@/components/forms/quick-quote-form";
import { Reassurance } from "@/components/trust/reassurance";
import { ProductCarousel } from "@/components/work/product-carousel";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/ui/page-hero";
import type { BenefitIcon, LandingContent } from "@/content/landings";
import { getService } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { localSeoCities, localSeoSectors } from "@/lib/local-seo";
import { servicePath, startProjectPath } from "@/lib/site-routes";

const ICONS: Record<BenefitIcon, LucideIcon> = {
  search: Search,
  smartphone: Smartphone,
  inbox: Inbox,
  gauge: Gauge,
  layers: Layers,
  shield: ShieldCheck,
  rocket: Rocket,
  handshake: Handshake,
};

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title?: string; lead?: string }) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      {title ? (
        <h2 className="mt-4 max-w-3xl text-[1.75rem] font-semibold leading-tight tracking-tight md:text-4xl">{title}</h2>
      ) : null}
      {lead ? <p className="mt-4 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{lead}</p> : null}
    </div>
  );
}

/** Commercial landing for one audience: websites for small businesses, or applications and SaaS. */
export function LandingPage({ locale, content }: { locale: Locale; content: LandingContent }) {
  const fr = locale === "fr";
  const source = `landing_${content.key}`;
  const isWebsites = content.key === "websites";

  return (
    <article data-landing={content.key}>
      <PageHero eyebrow={content.eyebrow} title={content.title} lead={<p>{content.lead}</p>} image={content.heroImage}>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <TrackedLink
            href="#devis"
            event={{ ctaId: `${source}_hero_form`, source, destination: "#devis", locale }}
            className="inline-flex items-center gap-2 rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
          >
            {content.primaryCta}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </TrackedLink>
          <a
            href="#exemples"
            className="inline-flex items-center rounded-full border border-[var(--rs-border-strong)] px-7 py-3.5 text-base font-medium text-rs-fg transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent-fg"
          >
            {content.secondaryCta}
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-rs-muted">
          {content.promises.map((promise) => (
            <li key={promise} className="flex items-center gap-2">
              <Check aria-hidden className="h-4 w-4 text-rs-accent-fg" />
              {promise}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="py-[var(--rs-section-space)]">
        <Container>
          <SectionTitle eyebrow={fr ? "Bénéfices" : "Benefits"} title={content.benefitsTitle} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.benefits.map((benefit) => {
              const Icon = ICONS[benefit.icon];
              return (
                <li
                  key={benefit.title}
                  className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--rs-accent)_10%,transparent)] text-rs-accent-fg">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-rs-muted">{benefit.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section id="exemples" className="scroll-mt-24 border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
        <Container>
          <SectionTitle eyebrow={fr ? "Réalisations" : "Work"} title={content.workTitle} lead={content.workLead} />
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
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionTitle eyebrow={content.includedTitle} />
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {content.included.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--rs-accent)_14%,transparent)]">
                      <Check aria-hidden className="h-3 w-3 text-rs-accent-fg" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionTitle eyebrow={content.processTitle} />
              <div className="mt-6">
                <BigSteps steps={content.process} />
              </div>
            </div>
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
                        className="inline-flex rounded-full border border-[var(--rs-border)] bg-rs-surface px-4 py-2 text-sm font-medium transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent-fg"
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
                        className="inline-flex rounded-full border border-[var(--rs-border)] bg-rs-surface px-4 py-2 text-sm font-medium transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent-fg"
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
            <div className="rs-theme-dark relative isolate bg-rs-bg p-8 text-rs-fg md:p-10">
              <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
              <Eyebrow>{fr ? "Devis gratuit" : "Free quote"}</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-tight md:text-3xl">{content.formTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-rs-muted">{content.formLead}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {content.promises.map((promise) => (
                  <li key={promise} className="flex items-center gap-2.5">
                    <Check aria-hidden className="h-4 w-4 text-rs-accent-fg" />
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
