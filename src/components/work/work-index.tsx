import { ConceptGallery } from "@/components/landing/concept-gallery";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { quotePath, saasLandingPath } from "@/lib/site-routes";
import { projectStatusBadge } from "./project-labels";
import { WorkPortfolio } from "./work-portfolio";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";

export function WorkIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const tones = PROJECTS.map((project) => projectStatusBadge(project, locale).tone);
  const live = tones.filter((tone) => tone === "live").length;
  const missions = tones.filter((tone) => tone === "mission").length;
  const concepts = tones.filter((tone) => tone === "concept").length;
  const crumb = fr
    ? `Réalisations · ${live} produits en production · ${missions} mission client · ${concepts} concept`
    : `Work · ${live} products in production · ${missions} client engagement · ${concepts} concept`;

  return (
    <div data-page-identity="work">
      <PageHero
        eyebrow={crumb}
        word={fr ? "Réalisations" : "Work"}
        image={PAGE_HERO_PHOTOS.work}
        title={fr ? "Des produits en ligne, pas des promesses." : "Live products, not promises."}
        lead={
          <p>
            {fr
              ? "Chaque projet dit ce qu'il est : produit en production, mission client, démonstrateur ou concept."
              : "Every project says what it is: product in production, client engagement, demonstrator or concept."}
          </p>
        }
      />

      <div className="pt-8">
        <WorkPortfolio locale={locale} />
      </div>

      <section id="refontes-concept" data-work-concepts className="scroll-mt-24 border-t border-(--rs-border) py-(--rs-section-space)">
        <Container>
          <h2 className="max-w-[18ch] text-[2.25rem] font-extrabold leading-none tracking-[-0.04em] md:text-[3rem]">
            {fr ? "Refontes concept, avant / après." : "Concept redesigns, before / after."}
          </h2>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-rs-muted">
            {fr
              ? "Quatre sites existants de petits commerces, repensés par le studio sans commande : un commerce, un artisan, un restaurant et des chambres d'hôtes."
              : "Four existing small-business websites, redesigned by the studio without a commission: a shop, a craftsman, a restaurant and a guest house."}
          </p>
          <ConceptGallery locale={locale} />
        </Container>
      </section>

      <ClosingCta
        locale={locale}
        ctaId="work_free_quote"
        source="work_index"
        href={quotePath(locale)}
        label={fr ? "Demander un devis gratuit" : "Get a free quote"}
        title={fr ? "Votre projet pourrait être le suivant" : "Your project could be next"}
        body={fr ? "Site ou application : réponse sous 24 h ouvrées, devis gratuit." : "Website or application: reply within 24 business hours, free quote."}
        secondary={{
          label: fr ? "Voir l'offre applications" : "See the applications offer",
          href: saasLandingPath(locale),
          ctaId: "work_to_saas_offer",
        }}
      />
    </div>
  );
}
