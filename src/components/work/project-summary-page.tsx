import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechChips } from "@/components/ui/tech-chips";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { startProjectPath, workPath } from "@/lib/site-routes";
import { KIND_LABELS, projectImageAlt } from "./project-labels";

export function ProjectSummaryPage({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const links = project.links?.length
    ? project.links
    : project.liveUrl
      ? [
          {
            label:
              project.kind === "concept"
                ? { fr: "Voir le concept", en: "View the concept" }
                : { fr: "Voir le produit", en: "Visit product" },
            href: project.liveUrl,
          },
        ]
      : [];
  const hasStory =
    project.challenge[locale].length > 0 || project.solution[locale].length > 0 || project.outcome[locale].length > 0;

  return (
    <article>
      <div className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg pb-12 pt-28 text-rs-fg md:pt-36">
        <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
        <Container>
          <Eyebrow>{project.categories[locale].join(" · ")}</Eyebrow>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{project.title}</h1>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--rs-border)] px-3.5 py-1 text-sm font-semibold text-rs-accent-fg">
            {KIND_LABELS[project.kind][locale]}
            {project.year ? <span className="font-medium text-rs-muted">· {project.year}</span> : null}
          </p>
          {project.status ? (
            <p className="mt-4 text-base font-medium text-rs-muted">{project.status[locale]}</p>
          ) : null}
          <p className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {project.summary[locale]}
          </p>
          <p className="mt-3 text-sm font-medium text-rs-muted">{project.role[locale]}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
              >
                {link.label[locale]}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            ))}
            {project.beforeUrl ? (
              <a
                href={project.beforeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-medium text-rs-muted transition-colors duration-150 hover:text-rs-fg"
              >
                {fr ? "Site original (avant)" : "Original site (before)"}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            ) : null}
            <Link
              href={workPath(locale)}
              className="inline-flex items-center gap-1.5 text-base font-medium text-rs-muted transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Tous les projets" : "All projects"}
            </Link>
          </div>
          <div className="mt-12 overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)]">
            <Image
              src={project.heroImage}
              alt={projectImageAlt(project, locale)}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      </div>

      {hasStory ? (
        <div className="bg-rs-bg py-[var(--rs-section-space)]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              {project.challenge[locale].length > 0 ? (
                <div>
                  <Eyebrow>{fr ? "Le contexte" : "The context"}</Eyebrow>
                  {project.challenge[locale].map((paragraph) => (
                    <p key={paragraph} className="mt-5 text-xl leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
              {project.solution[locale].length > 0 ? (
                <div>
                  <Eyebrow>{fr ? "Ce qui a été mis en place" : "What was put in place"}</Eyebrow>
                  <ul className="mt-5 space-y-4">
                    {project.solution[locale].map((item) => (
                      <li key={item} className="flex gap-3 text-lg leading-relaxed">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rs-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {project.capabilities.length > 0 || project.engineering[locale].length > 0 ? (
              <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {project.capabilities.map((capability) => (
                  <div key={capability.title[locale]} className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6">
                    <p className="text-lg font-semibold">{capability.title[locale]}</p>
                    <p className="mt-2 text-sm leading-relaxed text-rs-muted">{capability.body[locale]}</p>
                  </div>
                ))}
                {project.engineering[locale].map((item) => (
                  <div key={item.title} className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-rs-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {project.outcome[locale].length > 0 ? (
              <div className="mt-16 max-w-[var(--rs-reading)]">
                <Eyebrow>{fr ? "Résultat" : "Outcome"}</Eyebrow>
                {project.outcome[locale].map((item) => (
                  <p key={item} className="mt-5 text-xl font-medium leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            ) : null}
          </Container>
        </div>
      ) : null}

      <div className="bg-rs-bg pb-[var(--rs-section-space)]">
        <Container>
          {project.technologies.length > 0 ? (
            <div className="border-t border-[var(--rs-border)] pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">Technologies</p>
              <TechChips items={project.technologies} className="mt-4" />
            </div>
          ) : null}

          <div className="mt-16 border-t border-[var(--rs-border)] pt-10 text-center">
            <h2 className="mx-auto max-w-2xl text-xl font-semibold tracking-tight md:text-2xl">
              {fr ? "Vous construisez quelque chose de similaire ?" : "Building something similar?"}
            </h2>
            <p className="mt-3 text-base text-rs-muted">
              {fr ? "Réponse sous 24 h ouvrées." : "Reply within 24 business hours."}
            </p>
            <Link
              href={startProjectPath(locale)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
            >
              {fr ? "Parler de votre projet" : "Start a project"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    </article>
  );
}
