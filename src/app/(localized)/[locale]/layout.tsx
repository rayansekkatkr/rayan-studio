import { RootBody, sharedMetadata, sharedViewport } from "@/app/_shared/root";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";
import "../../globals.css";

export const metadata = sharedMetadata;
export const viewport = sharedViewport;

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const p = await params;
  const lang = SUPPORTED_LOCALES.includes(p.locale as Locale) ? (p.locale as Locale) : "fr";

  return (
    <html lang={lang}>
      <RootBody locale={lang}>{children}</RootBody>
    </html>
  );
}
