import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CraPage } from "@/components/cra/cra-page";
import { getCraPage } from "@/content/cra";
import { BRAND, getSiteUrl } from "@/lib/brand";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";
import { craPath } from "@/lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  const content = getCraPage(locale);

  return buildLocalizedMetadata({
    locale,
    title: content.seo.title, // the root layout template appends the brand
    description: content.seo.description,
    path: craPath(locale),
    alternatePath: craPath(otherLocale(locale)),
  });
}

function buildCraJsonLd(siteUrl: string, locale: Locale) {
  const content = getCraPage(locale);
  const url = `${siteUrl}${craPath(locale)}`;
  const fr = locale === "fr";
  const inLanguage = fr ? "fr-FR" : "en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: fr ? "Accompagnement Cyber Resilience Act (CRA)" : "Cyber Resilience Act (CRA) support",
        serviceType: fr ? "Conformité Cyber Resilience Act" : "Cyber Resilience Act compliance",
        description: content.seo.description,
        url,
        inLanguage,
        areaServed: { "@type": "Place", name: fr ? "Union européenne" : "European Union" },
        audience: { "@type": "BusinessAudience", name: fr ? "Fabricants d'objets connectés" : "Connected-device manufacturers" },
        provider: { "@type": "ProfessionalService", name: BRAND.name, url: siteUrl },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage,
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  if (p.locale !== locale) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCraJsonLd(getSiteUrl(), locale)) }}
      />
      <CraPage locale={locale} />
    </>
  );
}
