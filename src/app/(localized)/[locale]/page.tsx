import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HomePage } from "@/components/home/home-page";
import { BRAND } from "@/lib/brand";
import { isEnglish, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  const en = isEnglish(locale);

  return buildLocalizedMetadata({
    locale,
    title: en
      ? `Websites, web applications and custom SaaS | ${BRAND.name}`
      : `Création de sites web, applications et SaaS sur mesure | ${BRAND.name}`,
    description: en
      ? "Independent studio building websites for small businesses and custom applications and SaaS for startups and companies, with one point of contact. Free quote, reply within 24 business hours."
      : "Studio indépendant : sites internet pour commerces et PME, applications et SaaS sur mesure pour startups et entreprises, avec un interlocuteur unique. Devis gratuit, réponse sous 24 h ouvrées.",
    path: `/${locale}`,
    alternatePath: en ? "/fr" : "/en",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;

  if (p.locale !== locale) {
    redirect(`/${locale}`);
  }

  return <HomePage locale={locale} />;
}
