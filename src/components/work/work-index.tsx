import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { quotePath, saasLandingPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { projectStatusBadge } from "./project-labels";
import { WorkPortfolio } from "./work-portfolio";

// Real captures only. `tall` tiles span two rows; `desktop` tiles are hidden on small screens.
const WALL: Array<{ src: string; tall?: boolean; desktop?: boolean }> = [
  { src: "/realisations/pick4me-app.webp", tall: true },
  { src: "/realisations/pont-facturx.webp" },
  { src: "/realisations/goodcall.webp" },
  { src: "/realisations/goodcall-classements.webp", tall: true, desktop: true },
  { src: "/realisations/docextract.png" },
  { src: "/realisations/pont-facturx-conversion.webp", desktop: true },
  { src: "/realisations/pick4me.webp" },
  { src: "/realisations/ops-agent.webp", desktop: true },
  { src: "/realisations/ci-cd-platform.webp", desktop: true },
  { src: "/realisations/manteigaria-before.png", desktop: true },
];

export function WorkIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const tones = PROJECTS.map((project) => projectStatusBadge(project, locale).tone);
  const counters = [
    { value: tones.filter((tone) => tone === "live").length, label: fr ? "produits en production" : "products in production" },
    { value: tones.filter((tone) => tone === "mission").length, label: fr ? "mission client (ST)" : "client engagement (ST)" },
    { value: tones.filter((tone) => tone === "concept").length, label: fr ? "concept, présenté comme tel" : "concept, labelled as such" },
  ];

  return (
    <div data-page-identity="work">
      <section className="relative isolate h-[44rem] overflow-hidden bg-[var(--rs-dark)] text-[#f7f7f4] md:h-[52rem]">
        <div aria-hidden className="absolute inset-0 -z-20 grid auto-rows-[13rem] grid-cols-2 gap-1.5 pt-20 md:auto-rows-[16rem] lg:grid-cols-4">
          {WALL.map((tile) => (
            <div key={tile.src} className={cn("relative overflow-hidden", tile.tall && "row-span-2", tile.desktop && "hidden lg:block")}>
              <Image src={tile.src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-left-top" />
            </div>
          ))}
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(9,9,12,0.98)_32%,rgba(9,9,12,0.6)_64%,rgba(9,9,12,0.4))]" />
        <Container className="flex h-full flex-col justify-end pb-12 md:pb-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <div>
              <Eyebrow className="text-[#a2a2aa]">{fr ? "Réalisations" : "Work"}</Eyebrow>
              <h1 className="mt-4 text-[2.75rem] font-bold leading-[0.98] tracking-[-0.04em] md:text-6xl lg:text-[4.5rem]">
                {fr ? "Des produits en ligne, pas des promesses." : "Live products, not promises."}
              </h1>
              <TrackedLink
                href={quotePath(locale)}
                event={{ ctaId: "work_hero_free_quote", source: "work_index", destination: quotePath(locale), locale }}
                className="mt-7 inline-flex items-center gap-2 bg-[#f7f7f4] px-6 py-3 text-sm font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-white"
              >
                {fr ? "Demander un devis gratuit" : "Get a free quote"}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </TrackedLink>
            </div>
            <ul className="grid grid-cols-3 border border-white/20">
              {counters.map((counter, index) => (
                <li key={counter.label} className={cn("px-4 py-4 md:px-6", index > 0 && "border-l border-white/20")}>
                  <span className="block text-3xl font-bold tracking-tight md:text-4xl">{counter.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-[#a2a2aa] md:text-sm">{counter.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <div className="py-12 md:py-16">
        <Container>
          <WorkPortfolio locale={locale} />
        </Container>
      </div>

      <ClosingCta
        locale={locale}
        ctaId="work_free_quote"
        source="work_index"
        href={quotePath(locale)}
        label={fr ? "Demander un devis gratuit" : "Get a free quote"}
        title={fr ? "Votre projet pourrait être le suivant." : "Your project could be next."}
        body={
          fr
            ? "Site ou application : réponse sous 24 h ouvrées, devis gratuit."
            : "Website or application: reply within 24 business hours, free quote."
        }
        secondary={{
          label: fr ? "Voir l'offre applications" : "See the applications offer",
          href: saasLandingPath(locale),
          ctaId: "work_to_saas_offer",
        }}
      />
    </div>
  );
}
