import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { projectStatusBadge } from "@/components/work/project-labels";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { quotePath, saasLandingPath, studioPath, websitesLandingPath } from "@/lib/site-routes";
import { HeroMotionToggle } from "./hero-motion-toggle";
import { HeroScreenRow, HeroScreenWall } from "./hero-screen-wall";

export function HomeHero({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  // Live product sites the studio designed and shipped (shown in the founder block).
  const liveSites = PROJECTS.filter((project) => project.liveUrl && projectStatusBadge(project, locale).tone === "live").length;
  const paths = [
    {
      id: "websites",
      href: websitesLandingPath(locale),
      title: fr ? "Sites web & refonte" : "Websites & redesign",
      body: fr
        ? `Un site qui inspire confiance, comme mes ${liveSites} sites en ligne. Maquette gratuite sous 24 h ouvrées.`
        : `A website that builds trust, like my ${liveSites} live sites. Free mockup within 24 business hours.`,
    },
    {
      id: "applications",
      href: saasLandingPath(locale),
      title: fr ? "Applications & SaaS" : "Applications & SaaS",
      body: fr
        ? "Un produit construit autour de votre métier, du cadrage à la mise en production."
        : "A product built around your business, from scoping to production.",
    },
  ];

  return (
    <div className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg text-rs-fg" data-hero-motion>
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <HeroScreenWall
        className="absolute inset-y-0 right-0 -z-10 hidden w-[44%] lg:block xl:w-[50%]"
      />
      {/* Melts the glow and the screen wall into the night, so the statement below follows without a seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[-5] h-14 bg-gradient-to-b from-transparent to-[var(--rs-dark)] lg:h-48"
      />
      <Container className="pointer-events-none">
        <div className="flex min-h-0 items-center pb-10 pt-20 md:pb-16 md:pt-32 lg:min-h-[min(50rem,100svh)] lg:pb-16">
          <div className="pointer-events-auto max-w-3xl lg:max-w-[32rem] xl:max-w-[40rem]">
            <h1 className="text-[2.25rem] font-extrabold leading-[0.98] tracking-[-0.045em] md:text-5xl xl:text-[3.75rem]">
              {fr
                ? "Je conçois et mets en ligne vos sites et applications, sans intermédiaire."
                : "I design and launch your websites and applications, with no middleman."}
            </h1>
            <p className="mt-4 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted md:mt-6">
              {/* Founder-led, visible above the paths on every screen (it used to sit under the
                  CTA, where the cookie bar covered it on phones). */}
              <Link
                href={studioPath(locale, "rayan")}
                className="font-semibold text-rs-fg underline underline-offset-4 transition-colors duration-150 hover:text-rs-accent-fg"
              >
                Rayan Sekkat
              </Link>
              {fr
                ? ", ingénieur logiciel à Séoul. Je réponds moi-même à chaque demande, du premier échange au lancement."
                : ", software engineer in Seoul. I answer every request myself, from the first conversation to launch."}
            </p>
            {/* The visitor picks a path first; the quote stays one click away for anyone undecided. */}
            <ul role="list" aria-label={fr ? "Choisissez votre projet" : "Choose your project"} className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-8" data-hero-paths>
              {paths.map((path) => (
                <li key={path.id}>
                  <TrackedLink
                    href={path.href}
                    event={{ ctaId: `hero_path_${path.id}`, source: "home_hero", destination: path.href, locale }}
                    className="group flex h-full flex-col border border-[var(--rs-border)] bg-rs-surface p-4 transition-colors duration-150 hover:border-rs-accent sm:p-5"
                  >
                    <span className="flex items-center justify-between gap-3 text-xl font-bold tracking-[-0.025em]">
                      {path.title}
                      <ArrowRight
                        aria-hidden
                        className="h-5 w-5 shrink-0 text-rs-muted transition-colors duration-150 group-hover:text-rs-accent-fg"
                      />
                    </span>
                    <span className="mt-2 text-base leading-relaxed text-rs-muted">{path.body}</span>
                  </TrackedLink>
                </li>
              ))}
            </ul>

            <TrackedLink
              href={quotePath(locale)}
              event={{
                ctaId: "hero_free_quote",
                source: "home_hero",
                destination: quotePath(locale),
                locale,
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-none bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
            >
              {fr ? "Demander un devis gratuit" : "Get a free quote"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </TrackedLink>

          </div>
        </div>
      </Container>
      <HeroScreenRow className="pb-14 lg:hidden" />
      <HeroMotionToggle locale={locale} className="absolute bottom-3 right-5 z-10 md:right-8" />
    </div>
  );
}
