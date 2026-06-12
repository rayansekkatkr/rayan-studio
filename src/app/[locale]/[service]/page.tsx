import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ServiceSeoPage } from "@/components/site/ServiceSeoPage";
import { getSiteUrl } from "@/lib/brand";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { getAllServiceSeoPages, getServiceSeoPage } from "@/lib/service-seo";

type Params = {
  locale: string;
  service: string;
};

export function generateStaticParams(): Params[] {
  return getAllServiceSeoPages().map((page) => ({
    locale: page.locale,
    service: page.slug,
  }));
}

function buildLanguageAlternates(page: { locale: Locale; path: string; alternatePath?: string }) {
  const languages: Record<string, string> = {
    [page.locale]: page.path,
  };

  if (page.alternatePath) {
    languages[page.locale === "fr" ? "en" : "fr"] = page.alternatePath;
  }

  return languages;
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const locale = normalizeLocale(params.locale);
  const page = getServiceSeoPage(locale, params.service);

  if (!page) return {};

  const siteUrl = getSiteUrl();

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: {
      canonical: page.path,
      languages: buildLanguageAlternates(page),
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}${page.path}`,
      title: page.metaTitle,
      description: page.description,
      siteName: "Rayan Studio",
      locale: page.locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
    },
  };
}

export default function Page({ params }: { params: Params }) {
  const locale = normalizeLocale(params.locale);

  if (params.locale !== locale) {
    redirect(`/${locale}/${params.service}`);
  }

  const page = getServiceSeoPage(locale, params.service);

  if (!page) {
    notFound();
  }

  return <ServiceSeoPage page={page} />;
}
