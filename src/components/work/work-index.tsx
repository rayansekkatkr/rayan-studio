import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { HeroScreenRow } from "@/components/home/hero-screen-wall";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Locale } from "@/lib/i18n";
import { quotePath, saasLandingPath } from "@/lib/site-routes";
import { WorkPortfolio } from "./work-portfolio";

export function WorkIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div>
      <div className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg text-rs-fg">
        <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
        <Container className="pb-12 pt-28 md:pt-36">
          <Eyebrow>{fr ? "Réalisations" : "Work"}</Eyebrow>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
            <h1 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
              {fr ? "Des produits en ligne, pas des promesses." : "Live products, not promises."}
            </h1>
            <div>
              <p className="text-lg leading-relaxed text-rs-muted">
                {fr
                  ? "Des applications utilisées, des sites, et les chaînes techniques qui les font tourner. Chaque projet indique clairement ce qu'il est : produit en ligne, concept ou projet technique."
                  : "Applications in use, websites, and the technical pipelines that run them. Every project states clearly what it is: live product, concept or technical project."}
              </p>
              <TrackedLink
                href={quotePath(locale)}
                event={{ ctaId: "work_hero_free_quote", source: "work_index", destination: quotePath(locale), locale }}
                className="mt-6 inline-flex items-center gap-2 rounded-none bg-rs-fg px-6 py-3 text-sm font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
              >
                {fr ? "Demander un devis gratuit" : "Get a free quote"}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </TrackedLink>
            </div>
          </div>
        </Container>
        <HeroScreenRow locale={locale} className="pb-14" />
      </div>

      <div className="py-12 md:py-16">
        <Container>
          <WorkPortfolio locale={locale} />
        </Container>
      </div>

      <ClosingCta
        locale={locale}
        ctaId="work_free_quote"
        source="work_index"
        href={quotePath(locale)}
        label={fr ? "Demander un devis gratuit" : "Get a free quote"}
        title={fr ? "Votre projet pourrait être le suivant." : "Your project could be next."}
        body={
          fr
            ? "Site ou application : réponse sous 24 h ouvrées, devis gratuit."
            : "Website or application: reply within 24 business hours, free quote."
        }
        secondary={{
          label: fr ? "Voir l'offre applications" : "See the applications offer",
          href: saasLandingPath(locale),
          ctaId: "work_to_saas_offer",
        }}
      />
    </div>
  );
}
