import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
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

export function CaseStudyPage({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const dark = project.tone === "dark";

  return (
    <article className={cn(dark && "rs-theme-dark bg-rs-bg text-rs-fg")}>
      <section data-case-section="hero" className="pb-12 pt-32 md:pt-40">
        <CaseStudyHero locale={locale} project={project} />
      </section>

      <section data-case-section="overview" className="py-10">
        <CaseStudyOverview locale={locale} project={project} />
      </section>

      <section data-case-section="challenge" className="py-[var(--rs-section-space)]">
        <Container>
          <Eyebrow>{fr ? "Le défi" : "The challenge"}</Eyebrow>
          <div className="mt-6 max-w-[var(--rs-reading)] space-y-4">
            {project.challenge[locale].map((paragraph) => (
              <p key={paragraph} className="text-xl leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section data-case-section="solution" className="py-[var(--rs-section-space)]">
        <Container>
          <Eyebrow>{fr ? "La réponse" : "The solution"}</Eyebrow>
          <ul className="mt-6 max-w-[var(--rs-reading)] space-y-4">
            {project.solution[locale].map((item) => (
              <li key={item} className="flex gap-3 text-lg leading-relaxed">
                <span aria-hidden className="mt-1 text-rs-accent">
                  ·
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section data-case-section="capabilities" className="py-[var(--rs-section-space)]">
        <CapabilitiesGrid locale={locale} project={project} />
      </section>

      <section data-case-section="product-ux" className="py-[var(--rs-section-space)]">
        <Container>
          <Eyebrow>Product & UX</Eyebrow>
          <ul className="mt-6 max-w-[var(--rs-reading)] space-y-4">
            {project.productUx[locale].map((item) => (
              <li key={item} className="text-lg leading-relaxed text-rs-muted">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section data-case-section="engineering" className="py-[var(--rs-section-space)]">
        <EngineeringSection locale={locale} project={project} />
      </section>

      <section data-case-section="technologies" className="py-10">
        <Container>
          {project.technologies.length > 0 ? (
            <p className="border-t border-[var(--rs-border)] pt-6 text-sm font-medium uppercase tracking-[0.14em] text-rs-muted">
              {project.technologies.join(" · ")}
            </p>
          ) : null}
        </Container>
      </section>

      <section data-case-section="outcome" className="py-[var(--rs-section-space)]">
        <Container>
          <Eyebrow>{fr ? "Résultat" : "Outcome"}</Eyebrow>
          <div className="mt-6 max-w-[var(--rs-reading)] space-y-4">
            {project.outcome[locale].map((item) => (
              <p key={item} className="text-xl font-medium leading-relaxed">
                {item}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section data-case-section="gallery" className="py-[var(--rs-section-space)]">
        <ProjectGallery locale={locale} project={project} />
      </section>

      <section data-case-section="next-project" className="py-[var(--rs-section-space)]">
        <NextProject locale={locale} project={project} />
      </section>

      <section data-case-section="cta" className="pb-[var(--rs-section-space)]">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            {fr ? "Vous construisez quelque chose de similaire ?" : "Building something similar?"}
          </h2>
          <Link
            href={startProjectPath(locale)}
            className={cn(
              "mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-colors duration-150",
              dark
                ? "bg-rs-fg text-[var(--rs-dark)] hover:bg-rs-accent hover:text-rs-fg"
                : "bg-rs-fg text-rs-bg hover:bg-rs-accent",
            )}
          >
            {fr ? "Parler de votre projet" : "Start a project"}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Container>
      </section>
    </article>
  );
}
