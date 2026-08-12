import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HomePage } from "@/components/home/home-page";
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
      ? "Software studio for SaaS, web applications and digital products"
      : "Studio software, SaaS et expériences web sur mesure",
    description: en
      ? "Independent studio designing and building custom applications, SaaS platforms and premium websites, with one point of contact from framing to production."
      : "Studio indépendant qui conçoit et développe applications, plateformes SaaS et sites web premium, avec un interlocuteur unique du cadrage à la mise en production.",
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
