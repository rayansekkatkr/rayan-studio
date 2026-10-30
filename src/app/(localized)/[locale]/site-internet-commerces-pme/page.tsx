import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LandingRoute, landingMetadata } from "@/components/landing/landing-route";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { smbLandingPath } from "@/lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  // Both locales resolve; the other locale redirects to its own route.
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  return landingMetadata("websites", "fr");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  if (locale !== "fr") {
    redirect(smbLandingPath("en"));
  }
  return <LandingRoute landingKey="websites" locale="fr" />;
}
