import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { FunnelTracking } from "@/components/site/FunnelTracking";
import { BRAND, getSiteUrl } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";
import { ClosingCta } from "@/components/ui/closing-cta";
import { quotePath, studioPath } from "@/lib/site-routes";
import { HomeHero } from "./home-hero";
import { HomeFounderA, HomeNextStepsA, HomeServicesA, HomeStatementA } from "./home-sections";

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
        url: `${siteUrl}${studioPath(locale, "rayan")}`,
        worksFor: { "@id": `${siteUrl}/#studio` },
        homeLocation: { "@type": "City", name: "Seoul" },
        knowsLanguage: ["fr", "en"],
        sameAs: [BRAND.linkedinUrl, BRAND.portfolioUrl],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#studio`,
        name: BRAND.name,
        url: `${siteUrl}/${locale}`,
        image: `${siteUrl}/opengraph-image`,
        logo: `${siteUrl}/icon.svg`,
        founder: { "@id": `${siteUrl}/#founder` },
        description: fr
          ? "Studio indépendant : création et refonte de sites web, applications et SaaS sur mesure, du cadrage à la mise en production."
          : "Independent studio: website design and redesign, custom applications and SaaS, from scoping to production.",
        email: BRAND.email,
        areaServed: ["France", "Europe"],
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
        about: { "@id": `${siteUrl}/#studio` },
        url: `${siteUrl}/${locale}`,
        name: fr
          ? "Sites web, applications et SaaS sur mesure | Rayan Studio"
          : "Websites, web applications and custom SaaS | Rayan Studio",
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: fr ? "fr-FR" : "en-US",
      },
    ],
  };
}

export function HomePage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd(locale)) }}
      />
      <FunnelTracking />
      <section id="hero" data-home-section>
        <HomeHero locale={locale} />
      </section>
      <section id="statement" data-home-section>
        <HomeStatementA locale={locale} />
      </section>
      <section id="founder" data-home-section>
        <HomeFounderA locale={locale} />
      </section>
      <section id="services" data-home-section>
        <HomeServicesA locale={locale} />
      </section>
      <section id="next-steps" data-home-section>
        <HomeNextStepsA locale={locale} />
      </section>
      <section id="final-cta" data-home-section>
        <ClosingCta
          locale={locale}
          ctaId="home_final_cta"
          source="home_final_cta"
          href={quotePath(locale)}
          label={fr ? "Demander un devis gratuit" : "Get a free quote"}
        />
      </section>
    </CommercialPageShell>
  );
}
