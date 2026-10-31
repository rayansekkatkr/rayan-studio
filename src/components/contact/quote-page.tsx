import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QuickQuoteForm } from "@/components/forms/quick-quote-form";
import { PageHero } from "@/components/ui/page-hero";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";
import { ContactLayout } from "./contact-layout";

/** Short free-quote page, the destination of every "Demander un devis gratuit" button. */
export function QuotePage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <>
      <PageHero
        eyebrow={fr ? "Devis gratuit" : "Free quote"}
        title={fr ? "Demander un devis gratuit" : "Get a free quote"}
        lead={
          <p>
            {fr
              ? "Quelques lignes suffisent. Pour un site vitrine, vous recevez une première maquette gratuite sous 24 h ouvrées ; pour une application, une première réponse argumentée dans le même délai."
              : "A few lines are enough. For a website, you receive a first free mockup within 24 business hours; for an application, a first reasoned answer within the same time."}
          </p>
        }
        image={PAGE_HERO_PHOTOS.contact}
      />
      <ContactLayout locale={locale} source="project">
        <QuickQuoteForm locale={locale} source="quote_page" readTypeFromUrl />
        <p className="mt-8 border-t border-[var(--rs-border)] pt-6 text-sm text-rs-muted">
          {fr ? "Projet complexe ou cahier des charges déjà prêt ?" : "Complex project or specification already written?"}{" "}
          <Link
            href={startProjectPath(locale)}
            className="inline-flex items-center gap-1 font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
          >
            {fr ? "Parcours détaillé en 5 étapes" : "Detailed 5-step brief"}
            <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </p>
      </ContactLayout>
    </>
  );
}
