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
    locale: "en",
    title: "Free quote for a website or an application",
    description: "Request a free quote in two minutes: website, redesign, application or SaaS. Free mockup within 24 business hours for websites, reply within 24 business hours for applications.",
    path: quotePath("en"),
    alternatePath: quotePath("fr"),
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  if (locale !== "en") {
    redirect(quotePath("fr"));
  }

  return (
    <CommercialPageShell locale="en">
      <QuotePage locale="en" />
    </CommercialPageShell>
  );
}
