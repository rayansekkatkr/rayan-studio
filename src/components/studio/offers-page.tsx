import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { OFFERS_CONTENT } from "@/content/studio";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";

export function OffersPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const content = OFFERS_CONTENT[locale];

  return (
    <article>
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>{fr ? "Offres" : "Offers"}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {content.globalStatement}
          </p>
          <p className="mt-4 text-base font-semibold">{content.responsePromise}</p>
        </Container>
      </div>

      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {content.offers.map((offer) => (
              <div
                key={offer.title}
                data-offer={offer.title}
                className="flex flex-col rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-7"
              >
                <h2 className="text-2xl font-semibold tracking-tight">{offer.title}</h2>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                  {content.idealForLabel}
                </p>
                <p className="mt-2 text-base leading-relaxed text-rs-fg">{offer.idealFor}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                  {content.mayIncludeLabel}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {offer.mayInclude.map((item) => (
                    <li key={item} className="text-base text-rs-muted">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={startProjectPath(locale)}
                  className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
                >
                  {content.ctaLabel}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </article>
  );
}
