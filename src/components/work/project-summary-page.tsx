import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { startProjectPath, workPath } from "@/lib/site-routes";

export function ProjectSummaryPage({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";

  return (
    <article>
      <div className="pb-12 pt-32 md:pt-40">
        <Container>
          <Eyebrow>{project.categories[locale].join(" · ")}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{project.title}</h1>
          {project.status ? (
            <p className="mt-3 text-base font-semibold text-rs-accent">{project.status[locale]}</p>
          ) : null}
          <p className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {project.summary[locale]}
          </p>
          <p className="mt-3 text-sm font-medium text-rs-muted">{project.role[locale]}</p>
        </Container>
      </div>

      <div className="pb-[var(--rs-section-space)]">
        <Container>
          <div className="overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)]">
            <Image
              src={project.heroImage}
              alt={fr ? `Interface du projet ${project.title}` : `${project.title} project interface`}
              width={1600}
              height={1000}
              priority
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
          </div>

          {project.technologies.length > 0 ? (
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.14em] text-rs-muted">
              {project.technologies.join(" · ")}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-5">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
              >
                {project.kind === "concept"
                  ? fr
                    ? "Voir le concept"
                    : "View the concept"
                  : fr
                    ? "Voir le produit"
                    : "Visit product"}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            ) : null}
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

          <div className="mt-16 border-t border-[var(--rs-border)] pt-10 text-center">
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
              {fr ? "Vous construisez quelque chose de similaire ?" : "Building something similar?"}
            </h2>
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
