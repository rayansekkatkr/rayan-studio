import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { QuotePage } from "@/components/contact/quote-page";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";
import { quotePath } from "@/lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  // Both locales resolve; the other locale redirects to its own route.
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    locale: "fr",
    title: "Devis gratuit pour site web ou application",
    description: "Demandez un devis gratuit en deux minutes : site vitrine, refonte, application ou SaaS. Maquette gratuite sous 24 h ouvrées pour les sites, réponse sous 24 h ouvrées pour les applications.",
    path: quotePath("fr"),
    alternatePath: quotePath("en"),
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  if (locale !== "fr") {
    redirect(quotePath("en"));
  }

  return (
    <CommercialPageShell locale="fr" headerTopTheme="dark">
      <QuotePage locale="fr" />
    </CommercialPageShell>
  );
}
