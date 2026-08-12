import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FEATURED_PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { MoreWorkGrid } from "./more-work-grid";
import { WorkProjectBlock } from "./work-project-block";

export function WorkIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div>
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            {fr ? "Des produits conçus pour être utilisés." : "Products built to be used."}
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {fr
              ? "Une sélection de plateformes, applications et expériences digitales sur lesquelles Rayan Studio est intervenu."
              : "A selection of platforms, applications and digital experiences Rayan Studio has worked on."}
          </p>
        </Container>
      </div>

      {FEATURED_PROJECTS.map((project, index) => (
        <WorkProjectBlock key={project.key} locale={locale} project={project} index={index} />
      ))}

      <MoreWorkGrid locale={locale} />
    </div>
  );
}
