import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { FunnelTracking } from "@/components/site/FunnelTracking";
import { BRAND, getSiteUrl } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";
import { ClosingCta } from "@/components/ui/closing-cta";
import { quotePath } from "@/lib/site-routes";
import { HomeHeroA, HomeProofA, HomeServicesA, HomeStatementA } from "./home-sections";

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
  const fr = locale === "fr";
  return (
    <CommercialPageShell locale={locale} headerTopTheme="light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd(locale)) }}
      />
      <FunnelTracking />
      <section id="hero" data-home-section>
        <HomeHeroA locale={locale} />
      </section>
      <section id="statement" data-home-section>
        <HomeStatementA locale={locale} />
      </section>
      <section id="services" data-home-section>
        <HomeServicesA locale={locale} />
      </section>
      <section id="trust" data-home-section>
        <HomeProofA locale={locale} />
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
