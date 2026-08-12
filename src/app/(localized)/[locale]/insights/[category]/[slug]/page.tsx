import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { InsightArticle } from "@/components/insights/insight-article";
import { buildInsightBreadcrumbItems } from "@/components/insights/insight-breadcrumb";
import { INSIGHTS, resolveInsightSlug } from "@/content/insights";
import { BRAND, getSiteUrl } from "@/lib/brand";
import { SUPPORTED_LOCALES, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, buildLocalizedMetadata } from "@/lib/seo";
import { insightPath, resolveInsightCategorySlug } from "@/lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    INSIGHTS.map((insight) => ({
      locale,
      category: insightPath(locale, insight.category).split("/").pop() as string,
      slug: insight.slug[locale],
    })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; category: string; slug: string };
}): Metadata {
  const locale = normalizeLocale(params.locale) as Locale;
  const category = resolveInsightCategorySlug(locale, params.category);
  if (!category) return {};
  const insight = resolveInsightSlug(locale, category, params.slug);
  if (!insight) return {};
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";

  return buildLocalizedMetadata({
    locale,
    title: insight.title[locale],
    description: insight.description[locale],
    path: insightPath(locale, category, insight.slug[locale]),
    alternatePath: insightPath(otherLocale, category, insight.slug[otherLocale]),
  });
}

export default function Page({
  params,
}: {
  params: { locale: string; category: string; slug: string };
}) {
  const locale = normalizeLocale(params.locale) as Locale;
  const category = resolveInsightCategorySlug(locale, params.category);
  if (!category) notFound();
  const insight = resolveInsightSlug(locale, category, params.slug);
  if (!insight) notFound();
  const siteUrl = getSiteUrl();
  const fr = locale === "fr";
  const articleUrl = `${siteUrl}${insightPath(locale, category, insight.slug[locale])}`;

  const breadcrumb = buildBreadcrumbJsonLd(buildInsightBreadcrumbItems(locale, insight, siteUrl));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title[locale],
    description: insight.description[locale],
    datePublished: insight.publishedAt,
    ...(insight.updatedAt ? { dateModified: insight.updatedAt } : {}),
    url: articleUrl,
    inLanguage: fr ? "fr-FR" : "en-US",
    publisher: { "@type": "Organization", name: BRAND.name, url: siteUrl },
  };

  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <InsightArticle locale={locale} insight={insight} />
    </CommercialPageShell>
  );
}
