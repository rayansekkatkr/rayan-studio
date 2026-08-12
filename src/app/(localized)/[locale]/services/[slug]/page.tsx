import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { ServicePage } from "@/components/services/service-page";
import { SERVICES, getService } from "@/content/services";
import { getSiteUrl } from "@/lib/brand";
import { SUPPORTED_LOCALES, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, buildLocalizedMetadata } from "@/lib/seo";
import { resolveServiceSlug, servicePath } from "@/lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    SERVICES.map((service) => ({ locale, slug: service.slug[locale] })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = normalizeLocale(params.locale) as Locale;
  const key = resolveServiceSlug(locale, params.slug);
  if (!key) return {};
  const service = getService(key);
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";

  return buildLocalizedMetadata({
    locale,
    title: service.eyebrow[locale],
    description: service.description[locale],
    path: servicePath(locale, key),
    alternatePath: servicePath(otherLocale, key),
  });
}

export default function Page({ params }: { params: { locale: string; slug: string } }) {
  const locale = normalizeLocale(params.locale) as Locale;
  const key = resolveServiceSlug(locale, params.slug);
  if (!key) notFound();
  const service = getService(key);
  const siteUrl = getSiteUrl();
  const fr = locale === "fr";

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: fr ? "Accueil" : "Home", path: `${siteUrl}/${locale}` },
    { name: "Services", path: `${siteUrl}/${locale}/services` },
    { name: service.eyebrow[locale], path: `${siteUrl}${servicePath(locale, key)}` },
  ]);

  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ServicePage locale={locale} service={service} />
    </CommercialPageShell>
  );
}
