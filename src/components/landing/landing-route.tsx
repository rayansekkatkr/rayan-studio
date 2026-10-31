import type { Metadata } from "next";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { LANDINGS, type LandingKey } from "@/content/landings";
import { getSiteUrl } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildLocalizedMetadata, buildServiceJsonLd } from "@/lib/seo";
import { saasLandingPath, smbLandingPath } from "@/lib/site-routes";
import { LandingPage } from "./landing-page";

function pathFor(key: LandingKey) {
  return key === "websites" ? smbLandingPath : saasLandingPath;
}

export function landingMetadata(key: LandingKey, locale: Locale): Metadata {
  const content = LANDINGS[key][locale];
  return buildLocalizedMetadata({
    locale,
    title: content.seo.title,
    description: content.seo.description,
    path: pathFor(key)(locale),
    alternatePath: pathFor(key)(locale === "fr" ? "en" : "fr"),
  });
}

export function LandingRoute({ landingKey, locale }: { landingKey: LandingKey; locale: Locale }) {
  const content = LANDINGS[landingKey][locale];
  const siteUrl = getSiteUrl();
  const path = pathFor(landingKey)(locale);
  const fr = locale === "fr";
  const jsonLd = [
    buildServiceJsonLd({
      siteUrl,
      path,
      name: content.seo.title,
      description: content.seo.description,
      serviceType:
        landingKey === "websites"
          ? fr
            ? "Création de site internet"
            : "Website design and development"
          : fr
            ? "Développement d'applications web et SaaS"
            : "Web application and SaaS development",
      locale,
    }),
    buildFaqJsonLd(content.faq),
    buildBreadcrumbJsonLd([
      { name: fr ? "Accueil" : "Home", path: `${siteUrl}/${locale}` },
      { name: content.eyebrow.split(" · ")[0], path: `${siteUrl}${path}` },
    ]),
  ];

  return (
    <CommercialPageShell locale={locale} headerTopTheme={landingKey === "websites" ? "light" : "dark"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LandingPage locale={locale} content={content} />
    </CommercialPageShell>
  );
}
