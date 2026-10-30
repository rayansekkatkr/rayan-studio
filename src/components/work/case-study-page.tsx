import { Check } from "lucide-react";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechChips } from "@/components/ui/tech-chips";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
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
  const gallery = project.gallery.filter((item) => item.src !== project.heroImage);

  return (
    <article>
      <section
        data-case-section="hero"
        className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg pb-12 pt-28 text-rs-fg md:pb-16 md:pt-32"
      >
        <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
        <CaseStudyHero locale={locale} project={project} />
      </section>

      <section data-case-section="overview" className="pt-8">
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

      <div className="border-t border-[var(--rs-border)] py-12 md:py-16">
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

      <section data-case-section="cta">
        <ClosingCta
          locale={locale}
          ctaId="case_study_start_project"
          source={`case_study_${project.key}`}
          title={fr ? "Vous construisez quelque chose de similaire ?" : "Building something similar?"}
        />
      </section>
    </article>
  );
}
