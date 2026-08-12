import type { Metadata } from "next";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { isEnglish, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  const en = isEnglish(locale);

  return buildLocalizedMetadata({
    locale,
    title: en ? "Contact" : "Contact",
    description: en
      ? "A question about a project, a product or a collaboration? Write to Rayan Studio, first response within 24 business hours."
      : "Une question sur un projet, un produit ou une collaboration ? Écrivez à Rayan Studio, première réponse sous 24h ouvrées.",
    path: `/${locale}/contact`,
    alternatePath: en ? "/fr/contact" : "/en/contact",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  const fr = locale === "fr";

  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {fr ? "Une question ? Parlons-en." : "Have a question? Let's talk."}
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {fr
              ? "Pour les questions générales et les échanges rapides. Première réponse sous 24h ouvrées."
              : "For general questions and quick exchanges. First response within 24 business hours."}
          </p>
        </Container>
      </div>
      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <ContactForm locale={locale} />
        </Container>
      </div>
    </CommercialPageShell>
  );
}
