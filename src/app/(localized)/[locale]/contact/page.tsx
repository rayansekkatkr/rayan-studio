import type { Metadata } from "next";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { ContactForm } from "@/components/forms/contact-form";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactLayout } from "@/components/contact/contact-layout";
import { PageHero } from "@/components/ui/page-hero";
import { quotePath } from "@/lib/site-routes";
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
    <CommercialPageShell locale={locale} headerTopTheme="light">
      <PageHero
        eyebrow="Contact"
        title={fr ? "Une question ? Parlons-en." : "Have a question? Let's talk."}
        lead={
          <p>
            {fr
              ? "Pour les questions générales et les échanges rapides. Première réponse sous 24 h ouvrées. Pour un projet ou un devis, le formulaire projet va plus vite."
              : "For general questions and quick exchanges. First response within 24 business hours. For a project or a quote, the project form is faster."}
          </p>
        }
      >
        <Link
          href={quotePath(locale)}
          className="mt-8 inline-flex items-center gap-2 rounded-none border border-[var(--rs-border-strong)] px-6 py-3 text-sm font-semibold text-rs-fg transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent-fg"
        >
          {fr ? "Demander un devis gratuit" : "Get a free quote"}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </PageHero>
      <ContactLayout locale={locale} source="contact">
        <ContactForm locale={locale} />
      </ContactLayout>
    </CommercialPageShell>
  );
}
