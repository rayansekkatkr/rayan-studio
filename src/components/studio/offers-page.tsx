import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { ClosingCta } from "@/components/ui/closing-cta";
import { OFFERS_CONTENT } from "@/content/studio";
import { OFFER_PHOTOS } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { quotePath } from "@/lib/site-routes";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";

export function OffersPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const content = OFFERS_CONTENT[locale];

  return (
    <article>
      <PageHero
        eyebrow={fr ? "Offres" : "Offers"}
        image={PAGE_HERO_PHOTOS.offers}
        title={content.title}
        lead={<p>{content.globalStatement}</p>}
      >
        <p className="mt-6 inline-flex items-center gap-2 rounded-none border border-[var(--rs-border)] bg-rs-surface px-4 py-2 text-sm font-semibold">
          <Clock aria-hidden className="h-4 w-4 text-rs-accent-fg" />
          {content.responsePromise}
        </p>
      </PageHero>

      <div className="py-[var(--rs-section-space)]">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {content.offers.map((offer, index) => (
              <div
                key={offer.title}
                data-offer={offer.title}
                className="group flex flex-col overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
              >
                <div className="relative aspect-[16/7] overflow-hidden bg-[var(--rs-dark)]">
                  <Image
                    src={OFFER_PHOTOS[index % OFFER_PHOTOS.length]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[var(--rs-dark)] via-[rgba(9,9,12,0.45)] to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <p className="text-xs font-semibold tracking-[0.18em] text-white/70">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-[1.7rem]">
                      {offer.title}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                    {content.idealForLabel}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-rs-fg">{offer.idealFor}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                    {content.mayIncludeLabel}
                  </p>
                  <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {offer.mayInclude.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-rs-muted">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-none bg-[color-mix(in_srgb,var(--rs-accent)_14%,transparent)]">
                          <Check aria-hidden className="h-3 w-3 text-rs-accent-fg" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={quotePath(locale, index === 1 || index === 0 ? "app" : index === 2 ? "site" : "other")}
                    className="mt-auto inline-flex items-center gap-2 pt-7 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
                  >
                    {content.ctaLabel}
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <ClosingCta
        locale={locale}
        ctaId="offers_start_project"
        source="offers_page"
        href={quotePath(locale)}
        label={fr ? "Demander un devis gratuit" : "Get a free quote"}
      />
    </article>
  );
}
