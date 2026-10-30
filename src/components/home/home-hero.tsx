import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";
import { startProjectPath, workPath } from "@/lib/site-routes";
import { HeroScreenRow, HeroScreenWall } from "./hero-screen-wall";

export function HomeHero({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg text-rs-fg">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <HeroScreenWall
        locale={locale}
        className="absolute inset-y-0 right-0 -z-10 hidden w-[54%] lg:block"
      />
      <Container className="pointer-events-none">
        <div className="flex min-h-0 items-center pb-12 pt-28 md:pb-16 md:pt-32 lg:min-h-[min(54rem,100svh)] lg:pb-24">
          <div className="pointer-events-auto max-w-3xl lg:max-w-[36rem] xl:max-w-[40rem]">
            <h1 className="text-[2rem] font-semibold leading-[1.06] tracking-tight md:text-5xl lg:text-[3.5rem]">
              {fr
                ? "Des produits digitaux conçus pour faire avancer votre entreprise."
                : "Digital products built to move your business forward."}
            </h1>
            <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
              {fr
                ? "Applications, plateformes et expériences web conçues pour résoudre de vrais problèmes, simplifier vos opérations et soutenir votre croissance."
                : "Applications, platforms and web experiences designed to solve real problems, simplify operations and support growth."}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <TrackedLink
                href={startProjectPath(locale)}
                event={{
                  ctaId: "hero_start_project",
                  source: "home_hero",
                  destination: startProjectPath(locale),
                  locale,
                }}
                className="inline-flex items-center gap-2 rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
              >
                {fr ? "Parler de votre projet" : "Start a project"}
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
                className="inline-flex items-center rounded-full border border-[var(--rs-border-strong)] bg-rs-bg/40 px-7 py-3.5 text-base font-medium text-rs-fg backdrop-blur-sm transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent-fg"
              >
                {fr ? "Voir nos réalisations" : "View our work"}
              </TrackedLink>
            </div>
          </div>
        </div>
      </Container>
      <HeroScreenRow locale={locale} className="pb-14 lg:hidden" />
    </div>
  );
}
