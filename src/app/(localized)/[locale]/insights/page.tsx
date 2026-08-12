import type { Metadata } from "next";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { InsightsIndex } from "@/components/insights/insights-index";
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
    title: "Insights",
    description: en
      ? "Guides, checklists, templates and tools for preparing and building digital products: SaaS, MVP, websites and launches."
      : "Guides, checklists, templates et outils pour préparer et construire vos produits digitaux : SaaS, MVP, sites web et lancements.",
    path: `/${locale}/insights`,
    alternatePath: en ? "/fr/insights" : "/en/insights",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;

  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <InsightsIndex locale={locale} />
    </CommercialPageShell>
  );
}
