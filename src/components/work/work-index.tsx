import { ClosingCta } from "@/components/ui/closing-cta";
import { PageHero } from "@/components/ui/page-hero";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { quotePath, saasLandingPath } from "@/lib/site-routes";
import { projectStatusBadge } from "./project-labels";
import { WorkPortfolio } from "./work-portfolio";

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
