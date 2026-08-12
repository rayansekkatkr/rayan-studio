import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { BRAND, getSiteUrl } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";
import { ExpertiseStrip } from "./expertise-strip";
import { FinalCta } from "./final-cta";
import { HomeHero } from "./home-hero";
import { InsightsPreview } from "./insights-preview";
import { MethodPreview } from "./method-preview";
import { OffersPreview } from "./offers-preview";
import { SelectedWork } from "./selected-work";
import { ServicesOverview } from "./services-overview";
import { StudioIntro } from "./studio-intro";

function buildHomeJsonLd(locale: Locale) {
  const siteUrl = getSiteUrl();
  const fr = locale === "fr";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#founder`,
        name: BRAND.founder,
        jobTitle: "Software Engineer & Founder",
        url: siteUrl,
        sameAs: [BRAND.linkedinUrl, BRAND.portfolioUrl],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#studio`,
        name: BRAND.name,
        url: siteUrl,
        founder: { "@id": `${siteUrl}/#founder` },
        description: fr
          ? "Studio indépendant de conception et développement d'applications, de plateformes SaaS et de sites web premium."
          : "Independent studio designing and building applications, SaaS platforms and premium websites.",
        email: BRAND.email,
        knowsLanguage: ["fr", "en"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: BRAND.name,
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#studio` },
        inLanguage: ["fr", "en"],
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/${locale}#webpage`,
        url: `${siteUrl}/${locale}`,
        name: fr
          ? "Rayan Studio, studio software, SaaS et expériences web sur mesure"
          : "Rayan Studio, software studio for SaaS, web applications and digital products",
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: fr ? "fr-FR" : "en-US",
      },
    ],
  };
}

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd(locale)) }}
      />
      <section id="hero" data-home-section>
        <HomeHero locale={locale} />
      </section>
      <section id="expertise" data-home-section>
        <ExpertiseStrip />
      </section>
      <section id="selected-work" data-home-section>
        <SelectedWork locale={locale} />
      </section>
      <section id="services" data-home-section>
        <ServicesOverview locale={locale} />
      </section>
      <section id="studio" data-home-section>
        <StudioIntro locale={locale} />
      </section>
      <section id="method" data-home-section>
        <MethodPreview locale={locale} />
      </section>
      <section id="offers" data-home-section>
        <OffersPreview locale={locale} />
      </section>
      <section id="insights" data-home-section>
        <InsightsPreview locale={locale} />
      </section>
      <section id="final-cta" data-home-section>
        <FinalCta locale={locale} />
      </section>
    </CommercialPageShell>
  );
}
