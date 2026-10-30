import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FEATURED_PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { HeroScreenRow } from "@/components/home/hero-screen-wall";
import { MoreWorkGrid } from "./more-work-grid";
import { WorkProjectBlock } from "./work-project-block";

export function WorkIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div>
      <div className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg text-rs-fg">
        <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
        <Container className="pb-12 pt-28 md:pt-36">
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            {fr ? "Des produits conçus pour être utilisés." : "Products built to be used."}
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {fr
              ? "Une sélection de plateformes, applications et expériences digitales sur lesquelles Rayan Studio est intervenu, avec des projets IA et DevOps : agent documentaire, plateforme CI/CD, infrastructure de production."
              : "A selection of platforms, applications and digital experiences Rayan Studio has worked on, plus AI and DevOps work: a documentation agent, a CI/CD platform, production infrastructure."}
          </p>
        </Container>
        <HeroScreenRow locale={locale} className="pb-16" />
      </div>

      {FEATURED_PROJECTS.map((project, index) => (
        <WorkProjectBlock key={project.key} locale={locale} project={project} index={index} />
      ))}

      <MoreWorkGrid locale={locale} />
    </div>
  );
}
