import { ArrowRight, Clock, Plus } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import type { ServiceRecord } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { contactPath, quotePath, saasLandingPath, smbLandingPath } from "@/lib/site-routes";
import { PageHero } from "@/components/ui/page-hero";
import { TechChips } from "@/components/ui/tech-chips";
import { SERVICE_HERO_PHOTOS } from "@/content/visuals";
import { ClosingCta } from "@/components/ui/closing-cta";
import { ArticleAsideCard, ArticleLayout, AsideLinkLabel } from "@/components/article/article-layout";
import { ArticleBlock, BigSteps, NumberedGrid, NumberedList, PullQuote } from "@/components/article/article-blocks";

export function ServicePage({ locale, service }: { locale: Locale; service: ServiceRecord }) {
  const fr = locale === "fr";
  const isWeb = service.key === "web";
  const quote = quotePath(locale, isWeb ? "site" : "app");

  return (
    <article>
      <section data-service-section="hero">
        <PageHero
          eyebrow={service.eyebrow[locale]}
          title={service.title[locale]}
          lead={<p>{service.description[locale]}</p>}
        >
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <TrackedLink
              href={quote}
              event={{
                ctaId: "service_hero_free_quote",
                source: `service_${service.key}`,
                destination: quote,
                locale,
              }}
              className="inline-flex items-center gap-2 rounded-none bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent hover:text-white"
            >
              {fr ? "Demander un devis gratuit" : "Get a free quote"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </TrackedLink>
            <p className="text-sm text-rs-muted">
              {fr ? "Réponse sous 24 h ouvrées" : "Reply within 24 business hours"}
            </p>
          </div>
        </PageHero>
      </section>

      <ArticleLayout
        locale={locale}
        toc={[
          { id: "besoin", label: fr ? "Le besoin" : "The need" },
          { id: "benefices", label: fr ? "Ce que vous y gagnez" : "What you gain" },
          { id: "realisations-type", label: fr ? "Ce que nous construisons" : "What we build" },
          { id: "approche", label: fr ? "Approche" : "Approach" },
          { id: "engineering", label: "Engineering" },
          { id: "faq", label: "FAQ" },
        ]}
        aside={
          <ArticleAsideCard image={SERVICE_HERO_PHOTOS[service.key]}>
            <TrackedLink
              href={quote}
              event={{ ctaId: "service_aside_free_quote", source: `service_${service.key}`, destination: quote, locale }}
              className="hover:underline"
            >
              <AsideLinkLabel>{fr ? "Décrire votre besoin" : "Describe your need"}</AsideLinkLabel>
            </TrackedLink>
          </ArticleAsideCard>
        }
      >
        <PullQuote
          id="besoin"
          data-service-section="need"
          eyebrow={fr ? "01 · Le besoin" : "01 · The need"}
          text={service.problem[locale]}
          highlight={service.problemHighlight?.[locale]}
        />

        <ArticleBlock id="benefices" index={2} title={fr ? "Ce que vous y gagnez" : "What you gain"}>
          {/* Statements rather than cards: a short claim, then the detail, separated by vertical rules. */}
          <ul className="grid border-y border-[var(--rs-border)] md:grid-cols-3 md:divide-x md:divide-[var(--rs-border)]">
            {service.benefits[locale].map((benefit, index) => (
              <li
                key={benefit.title}
                className={index > 0 ? "border-t border-[var(--rs-border)] py-6 md:border-t-0 md:px-6" : "py-6 md:pr-6"}
              >
                <h3 className="text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                  <span className="text-rs-accent-fg">+</span> {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-rs-muted">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </ArticleBlock>

        <ArticleBlock id="realisations-type" index={3} title={fr ? "Ce que nous construisons" : "What we build"} data-service-section="use-cases">
          <NumberedGrid
            items={service.useCases[locale]}
            trailing={
              <TrackedLink
                href={quote}
                event={{ ctaId: "service_need_free_quote", source: `service_${service.key}`, destination: quote, locale }}
                className="inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
              >
                {fr ? "Décrire votre besoin" : "Describe your need"}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </TrackedLink>
            }
          />
        </ArticleBlock>

        <ArticleBlock id="approche" index={4} title={fr ? "Approche" : "Approach"} data-service-section="approach">
          <BigSteps steps={service.approach[locale]} />
        </ArticleBlock>

        <ArticleBlock id="engineering" index={5} title="Engineering" data-service-section="engineering">
          <NumberedList items={service.engineering[locale]} />
          {service.technologies.length > 0 ? (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">Technologies</p>
              <TechChips items={service.technologies} className="mt-4" />
            </div>
          ) : null}
        </ArticleBlock>

        <ArticleBlock id="faq" index={6} title="FAQ" data-service-section="faq">
          <div className="divide-y divide-[var(--rs-border)] border-y border-[var(--rs-border)]">
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
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-rs-muted">
            <Clock aria-hidden className="h-4 w-4 text-rs-accent-fg" />
            {fr ? "Une autre question ? Réponse sous 24 h ouvrées." : "Another question? Reply within 24 business hours."}
            <TrackedLink
              href={contactPath(locale)}
              event={{ ctaId: "service_faq_contact", source: `service_${service.key}`, destination: contactPath(locale), locale }}
              className="inline-flex items-center gap-1.5 font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Poser une question" : "Ask a question"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </TrackedLink>
          </p>
        </ArticleBlock>
      </ArticleLayout>

      <section data-service-section="cta">
        <ClosingCta
          locale={locale}
          ctaId="service_free_quote"
          source={`service_${service.key}`}
          href={quote}
          label={fr ? "Demander un devis gratuit" : "Get a free quote"}
          secondary={{
            label: isWeb
              ? fr
                ? "Voir l'offre sites web"
                : "See the website offer"
              : fr
                ? "Voir l'offre applications & SaaS"
                : "See the applications & SaaS offer",
            href: isWeb ? smbLandingPath(locale) : saasLandingPath(locale),
            ctaId: isWeb ? "service_to_websites_offer" : "service_to_saas_offer",
          }}
        />
      </section>
    </article>
  );
}
