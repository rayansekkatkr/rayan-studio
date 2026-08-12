import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ParallaxMedia } from "@/components/motion/parallax-media";
import { Container } from "@/components/ui/container";
import { getProject } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { startProjectPath, workPath } from "@/lib/site-routes";

export function HomeHero({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const pick4me = getProject("pick4me");
  const pontFacturx = getProject("pont-facturx");
  const goodcall = getProject("goodcall");

  return (
    <div className="rs-theme-dark overflow-hidden bg-rs-bg pb-20 pt-32 text-rs-fg md:pb-28 md:pt-44">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">
            {fr
              ? "Des produits digitaux conçus pour faire avancer votre entreprise."
              : "Digital products built to move your business forward."}
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted md:text-xl">
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
              className="inline-flex items-center rounded-full border border-[var(--rs-border-strong)] px-7 py-3.5 text-base font-medium text-rs-fg transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent"
            >
              {fr ? "Voir nos réalisations" : "View our work"}
            </TrackedLink>
          </div>
        </div>

        <div className="relative mt-16 md:mt-24">
          <div className="grid gap-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            {pick4me ? (
              <ParallaxMedia className="relative" strength={24}>
                <div className="overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface">
                  <Image
                    src={pick4me.heroImage}
                    alt={fr ? "Interface du produit Pick4Me" : "Pick4Me product interface"}
                    width={1280}
                    height={800}
                    priority
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </ParallaxMedia>
            ) : null}
            <div className="grid gap-6">
              {pontFacturx ? (
                <ParallaxMedia strength={16}>
                  <div className="overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface">
                    <Image
                      src={pontFacturx.heroImage}
                      alt={fr ? "Interface du produit Pont Factur-X" : "Pont Factur-X product interface"}
                      width={960}
                      height={600}
                      sizes="(min-width: 768px) 38vw, 100vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </ParallaxMedia>
              ) : null}
              {goodcall ? (
                <ParallaxMedia strength={12}>
                  <div className="overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface">
                    <Image
                      src={goodcall.heroImage}
                      alt={fr ? "Interface du produit GoodCall" : "GoodCall product interface"}
                      width={960}
                      height={600}
                      sizes="(min-width: 768px) 38vw, 100vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </ParallaxMedia>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
