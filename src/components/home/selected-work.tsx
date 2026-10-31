import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FEATURED_PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { ProductCarousel } from "@/components/work/product-carousel";

/** Home: the flagship products as a carousel, one product per slide. */
export function SelectedWork({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div className="py-[var(--rs-section-space)]">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>{fr ? "Réalisations" : "Selected work"}</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-[1.75rem] font-semibold leading-tight tracking-tight md:text-4xl">
              {fr ? "Des produits en ligne, conçus et exploités par le studio." : "Live products, designed and run by the studio."}
            </h2>
          </div>
          <Link
            href={workPath(locale)}
            className="inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
          >
            {fr ? "Toutes les réalisations" : "All work"}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8">
          <ProductCarousel
            locale={locale}
            keys={FEATURED_PROJECTS.map((project) => project.key)}
            featuredAttr="data-featured-project"
            ariaLabel={fr ? "Réalisations à la une" : "Featured work"}
          />
        </div>
      </Container>
    </div>
  );
}
