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
    title: en ? `${BRAND.name} | Premium website creation & redesign` : `${BRAND.name} | Création et refonte de sites premium`,
    description: en
      ? "Freelance web specialist in premium website creation and redesign for local businesses in France."
      : "Freelance web spécialisé en création et refonte de sites vitrines premium pour commerces locaux français.",
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
