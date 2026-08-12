import type { Metadata } from "next";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { WorkIndex } from "@/components/work/work-index";
import { isEnglish, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  const en = isEnglish(locale);

  return buildLocalizedMetadata({
    locale,
    title: en ? "Work and case studies" : "Réalisations et études de cas",
    description: en
      ? "Selected platforms, applications and digital experiences designed and built by Rayan Studio: Pick4Me, Pont Factur-X, GoodCall and more."
      : "Une sélection de plateformes, applications et expériences digitales conçues et développées par Rayan Studio : Pick4Me, Pont Factur-X, GoodCall et plus.",
    path: `/${locale}/work`,
    alternatePath: en ? "/fr/work" : "/en/work",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;

  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <WorkIndex locale={locale} />
    </CommercialPageShell>
  );
}
