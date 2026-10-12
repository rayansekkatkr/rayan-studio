import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CraPage } from "@/components/cra/cra-page";
import { CRA_PAGE } from "@/content/cra";
import { BRAND, getSiteUrl } from "@/lib/brand";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";
import { craPath, hasCraPage } from "@/lib/site-routes";

// FR only while the offer is being tested: /en/cyber-resilience-act is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  if (!hasCraPage(locale)) return {};

  return buildLocalizedMetadata({
    locale,
    title: `${CRA_PAGE.seo.title} | ${BRAND.name}`,
    description: CRA_PAGE.seo.description,
    path: craPath(locale),
  });
}

function buildCraJsonLd(siteUrl: string) {
  const url = `${siteUrl}${craPath("fr")}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Accompagnement Cyber Resilience Act (CRA)",
        serviceType: "Conformité Cyber Resilience Act",
        description: CRA_PAGE.seo.description,
        url,
        inLanguage: "fr-FR",
        areaServed: { "@type": "Place", name: "Union européenne" },
        audience: { "@type": "BusinessAudience", name: "Fabricants d'objets connectés" },
        provider: { "@type": "ProfessionalService", name: BRAND.name, url: siteUrl },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: "fr-FR",
        mainEntity: CRA_PAGE.faq.map((item) => ({
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
  if (p.locale !== locale || !hasCraPage(locale)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCraJsonLd(getSiteUrl())) }}
      />
      <CraPage />
    </>
  );
}
