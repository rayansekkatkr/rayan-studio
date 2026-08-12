import { redirect } from "next/navigation";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { studioPath } from "@/lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = normalizeLocale(params.locale) as Locale;
  redirect(studioPath(locale, "studio"));
}
