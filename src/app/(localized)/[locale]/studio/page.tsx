import { redirect } from "next/navigation";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { studioPath } from "@/lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  redirect(studioPath(locale, "studio"));
}
