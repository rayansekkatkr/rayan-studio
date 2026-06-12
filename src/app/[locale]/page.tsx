import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HomePage } from "@/components/site/HomePage";
import { BRAND } from "@/lib/brand";
import { isEnglish, normalizeLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = normalizeLocale(params.locale) as Locale;
  const en = isEnglish(locale);

  return {
    title: en
      ? `${BRAND.name} | Website redesign for small businesses`
      : `${BRAND.name} | Refonte de sites pour petites entreprises`,
    description: en
      ? "Independent studio for redesigning dated websites or creating a first proper website: design, local SEO, DNS, hosting, VPS and launch."
      : "Studio indépendant pour refondre un site daté ou créer le premier vrai site d'une petite entreprise: design, SEO local, DNS, hébergement, VPS et mise en ligne.",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = normalizeLocale(params.locale) as Locale;

  if (params.locale !== locale) {
    redirect(`/${locale}`);
  }

  return <HomePage locale={locale} />;
}
