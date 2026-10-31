import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";
import { quotePath, saasLandingPath, smbLandingPath, workPath } from "@/lib/site-routes";
import { HeroScreenRow, HeroScreenWall } from "./hero-screen-wall";

export function HomeHero({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const paths = [
    {
      id: "websites",
      href: smbLandingPath(locale),
      kicker: fr ? "Commerces, restaurants, PME" : "Shops, restaurants, small businesses",
      title: fr ? "Sites web & refonte" : "Websites & redesign",
      body: fr
        ? "Un site qui inspire confiance et vous apporte des demandes. Maquette gratuite sous 24 h ouvrées."
        : "A website that builds trust and brings you enquiries. Free mockup within 24 business hours.",
    },
    {
      id: "applications",
      href: saasLandingPath(locale),
      kicker: fr ? "Startups, entreprises" : "Startups, companies",
      title: fr ? "Applications & SaaS" : "Applications & SaaS",
      body: fr
        ? "Un produit construit autour de votre métier, du cadrage à la mise en production."
        : "A product built around your business, from scoping to production.",
    },
  ];

  return (
    <div className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg text-rs-fg">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <HeroScreenWall
        locale={locale}
        className="absolute inset-y-0 right-0 -z-10 hidden w-[50%] lg:block"
      />
      <Container className="pointer-events-none">
        <div className="flex min-h-0 items-center pb-12 pt-28 md:pb-16 md:pt-32 lg:min-h-[min(54rem,100svh)] lg:pb-24">
          <div className="pointer-events-auto max-w-3xl lg:max-w-[36rem] xl:max-w-[40rem]">
            <h1 className="text-[2rem] font-semibold leading-[1.06] tracking-tight md:text-5xl lg:text-[3.5rem]">
              {fr
                ? "Sites web, applications et logiciels sur mesure."
                : "Websites, applications and custom software."}
            </h1>
            <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
              {fr
                ? "Un studio indépendant qui conçoit, développe et met en ligne votre projet, avec un interlocuteur unique du premier échange au lancement."
                : "An independent studio that designs, builds and launches your project, with one point of contact from the first conversation to launch."}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TrackedLink
                href={quotePath(locale)}
                event={{
                  ctaId: "hero_free_quote",
                  source: "home_hero",
                  destination: quotePath(locale),
                  locale,
                }}
                className="inline-flex items-center gap-2 rounded-none bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
              >
                {fr ? "Demander un devis gratuit" : "Get a free quote"}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href={workPath(locale)}
                event={{
                  ctaId: "hero_view_work",
                  source: "home_hero",
                  destination: workPath(locale),
                  locale,
                }}
                className="inline-flex items-center rounded-none border border-[var(--rs-border-strong)] bg-rs-bg/40 px-7 py-3.5 text-base font-medium text-rs-fg backdrop-blur-sm transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent-fg"
              >
                {fr ? "Voir nos réalisations" : "View our work"}
              </TrackedLink>
            </div>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                {fr ? "Choisissez votre parcours" : "Choose your path"}
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {paths.map((path) => (
                  <li key={path.id}>
                    <TrackedLink
                      href={path.href}
                      event={{ ctaId: `hero_path_${path.id}`, source: "home_hero", destination: path.href, locale }}
                      className="group flex h-full flex-col rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-150 hover:border-rs-accent hover:bg-white/[0.07]"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rs-muted">{path.kicker}</span>
                      <span className="mt-2 flex items-center justify-between gap-3 text-lg font-semibold tracking-tight">
                        {path.title}
                        <ArrowUpRight
                          aria-hidden
                          className="h-4 w-4 shrink-0 text-rs-muted transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rs-accent-fg"
                        />
                      </span>
                      <span className="mt-1.5 text-sm leading-relaxed text-rs-muted">{path.body}</span>
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <HeroScreenRow locale={locale} className="pb-14 lg:hidden" />
    </div>
  );
}
