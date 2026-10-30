import { ArrowRight, Check } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechChips } from "@/components/ui/tech-chips";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { CapabilitiesGrid } from "./capabilities-grid";
import { CaseStudyHero } from "./case-study-hero";
import { CaseStudyOverview } from "./case-study-overview";
import { EngineeringSection } from "./engineering-section";
import { NextProject } from "./next-project";
import { ProjectGallery } from "./project-gallery";

// One rhythm for the whole page: sections are compact and grouped side by side
// on desktop, instead of a long column of full-height blocks.
const SECTION = "py-12 md:py-16";

export function CaseStudyPage({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const dark = project.tone === "dark";
  const gallery = project.gallery.filter((item) => item.src !== project.heroImage);

  return (
    <article className={cn(dark && "rs-theme-dark bg-rs-bg text-rs-fg")}>
      <section data-case-section="hero" className="pb-8 pt-28 md:pt-32">
        <CaseStudyHero locale={locale} project={project} />
      </section>

      <section data-case-section="overview" className="pb-4">
        <CaseStudyOverview locale={locale} project={project} />
      </section>

      <div className={SECTION}>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <section
              data-case-section="challenge"
              className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6 md:p-8"
            >
              <Eyebrow>{fr ? "Le défi" : "The challenge"}</Eyebrow>
              <div className="mt-5 space-y-4">
                {project.challenge[locale].map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section
              data-case-section="solution"
              className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6 md:p-8"
            >
              <Eyebrow>{fr ? "La réponse" : "The solution"}</Eyebrow>
              <ul className="mt-5 space-y-3.5">
                {project.solution[locale].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--rs-accent)_16%,transparent)]">
                      <Check aria-hidden className="h-3 w-3 text-rs-accent-fg" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </Container>
      </div>

      <section data-case-section="capabilities" className="pb-12 md:pb-16">
        <CapabilitiesGrid locale={locale} project={project} />
      </section>

      <div className="border-y border-[var(--rs-border)] bg-[color-mix(in_srgb,var(--rs-surface-subtle)_45%,transparent)] py-12 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <section data-case-section="product-ux">
              <Eyebrow>Product & UX</Eyebrow>
              <ul className="mt-5 space-y-4">
                {project.productUx[locale].map((item) => (
                  <li key={item} className="border-l-2 border-rs-accent pl-4 text-base leading-relaxed text-rs-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section data-case-section="engineering">
              <EngineeringSection locale={locale} project={project} />
            </section>
          </div>
        </Container>
      </div>

      <section data-case-section="technologies" className="pt-12 md:pt-16">
        <Container>
          {project.technologies.length > 0 ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">Technologies</p>
              <TechChips items={project.technologies} className="mt-4" />
            </div>
          ) : null}
        </Container>
      </section>

      <section data-case-section="outcome" className="pt-8">
        <Container>
          {project.outcome[locale].length > 0 ? (
            <div className="rounded-[var(--rs-radius-md)] border border-[color-mix(in_srgb,var(--rs-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--rs-accent)_7%,transparent)] p-6 md:p-8">
              <Eyebrow>{fr ? "Résultat" : "Outcome"}</Eyebrow>
              <div className="mt-4 space-y-3">
                {project.outcome[locale].map((item) => (
                  <p key={item} className="text-lg font-medium leading-relaxed md:text-xl">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <section data-case-section="gallery" className={gallery.length > 0 ? "pt-12 md:pt-16" : undefined}>
        <ProjectGallery locale={locale} items={gallery} />
      </section>

      <section data-case-section="next-project" className={SECTION}>
        <NextProject locale={locale} project={project} />
      </section>

      <section data-case-section="cta" className="pb-16 md:pb-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 border-t border-[var(--rs-border)] pt-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {fr ? "Vous construisez quelque chose de similaire ?" : "Building something similar?"}
              </h2>
              <p className="mt-2 text-base text-rs-muted">
                {fr
                  ? "Réponse sous 24 h ouvrées, devis gratuit après un premier échange."
                  : "Reply within 24 business hours, free quote after a first conversation."}
              </p>
            </div>
            <TrackedLink
              href={startProjectPath(locale)}
              event={{
                ctaId: "case_study_start_project",
                source: `case_study_${project.key}`,
                destination: startProjectPath(locale),
                locale,
              }}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-colors duration-150",
                dark
                  ? "bg-rs-fg text-[var(--rs-dark)] hover:bg-rs-accent hover:text-rs-fg"
                  : "bg-rs-fg text-rs-bg hover:bg-rs-accent",
              )}
            >
              {fr ? "Parler de votre projet" : "Start a project"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </TrackedLink>
          </div>
        </Container>
      </section>
    </article>
  );
}
