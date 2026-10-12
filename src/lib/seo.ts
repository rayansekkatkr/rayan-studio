import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

type LocalizedMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  /** Equivalent page in the other locale. Omit for a page published in one locale only. */
  alternatePath?: string;
  image?: string;
};

export function buildLocalizedMetadata(input: LocalizedMetadataInput): Metadata {
  const { locale, title, description, path, alternatePath, image } = input;
  const frPath = locale === "fr" ? path : alternatePath;
  const enPath = locale === "en" ? path : alternatePath;
  const ogImage = image ?? "/og-image";
  const languages: Record<string, string> = {};
  if (frPath) languages.fr = frPath;
  if (enPath) languages.en = enPath;
  if (frPath) languages["x-default"] = frPath;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: path,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  };
}
