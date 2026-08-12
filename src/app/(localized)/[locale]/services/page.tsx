import type { Metadata } from "next";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { ServicesIndex } from "@/components/services/services-index";
import { isEnglish, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = normalizeLocale(params.locale) as Locale;
  const en = isEnglish(locale);

  return buildLocalizedMetadata({
    locale,
    title: en ? "Software, web and cloud services" : "Services software, web et cloud",
    description: en
      ? "Web applications, SaaS, MVPs, APIs, automation, premium websites and DevOps: services designed around real business needs."
      : "Applications web, SaaS, MVP, APIs, automatisation, sites premium et DevOps : des services conçus autour de vrais besoins métier.",
    path: `/${locale}/services`,
    alternatePath: en ? "/fr/services" : "/en/services",
  });
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = normalizeLocale(params.locale) as Locale;

  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <ServicesIndex locale={locale} />
    </CommercialPageShell>
  );
}
