import { ArrowRight, Clock, Plus } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import type { ServiceRecord } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { contactPath, startProjectPath } from "@/lib/site-routes";
import { PageHero } from "@/components/ui/page-hero";
import { TechChips } from "@/components/ui/tech-chips";
import { SERVICE_HERO_PHOTOS } from "@/content/visuals";
import { ClosingCta } from "@/components/ui/closing-cta";
import { ArticleAsideCard, ArticleLayout, AsideLinkLabel } from "@/components/article/article-layout";
import { ArticleBlock, BigSteps, NumberedGrid, NumberedList, PullQuote } from "@/components/article/article-blocks";
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

      <ArticleLayout
        locale={locale}
        toc={[
          { id: "besoin", label: fr ? "Le besoin" : "The need" },
          { id: "realisations-type", label: fr ? "Ce que nous construisons" : "What we build" },
          { id: "approche", label: fr ? "Approche" : "Approach" },
          { id: "engineering", label: "Engineering" },
          { id: "projets", label: fr ? "Projets" : "Work" },
          { id: "faq", label: "FAQ" },
        ]}
        aside={
          <ArticleAsideCard image={SERVICE_HERO_PHOTOS[service.key]}>
            <TrackedLink
              href={startProjectPath(locale)}
              event={{ ctaId: "service_aside_start_project", source: `service_${service.key}`, destination: startProjectPath(locale), locale }}
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

        <ArticleBlock id="realisations-type" index={2} title={fr ? "Ce que nous construisons" : "What we build"} data-service-section="use-cases">
          <NumberedGrid
            items={service.useCases[locale]}
            trailing={
              <TrackedLink
                href={startProjectPath(locale)}
                event={{ ctaId: "service_need_start_project", source: `service_${service.key}`, destination: startProjectPath(locale), locale }}
                className="inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
              >
                {fr ? "Décrire votre besoin" : "Describe your need"}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </TrackedLink>
            }
          />
        </ArticleBlock>

        <ArticleBlock id="approche" index={3} title={fr ? "Approche" : "Approach"} data-service-section="approach">
          <BigSteps steps={service.approach[locale]} />
        </ArticleBlock>

        <ArticleBlock id="engineering" index={4} title="Engineering" data-service-section="engineering">
          <NumberedList items={service.engineering[locale]} />
          {service.technologies.length > 0 ? (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">Technologies</p>
              <TechChips items={service.technologies} className="mt-4" />
            </div>
          ) : null}
        </ArticleBlock>

        <ArticleBlock id="projets" index={5} title={fr ? "Projets" : "Work"} data-service-section="proof">
          <ServiceProof locale={locale} projectKeys={service.proofProjects} />
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
          ctaId="service_start_project"
          source={`service_${service.key}`}
          label={fr ? "Demander un devis" : "Request a quote"}
        />
      </section>
    </article>
  );
}
