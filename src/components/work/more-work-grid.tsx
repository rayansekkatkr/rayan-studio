import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { BALANCED_GRID, balancedSpan } from "@/components/ui/balanced-grid";
import { KIND_LABELS, projectImageAlt } from "./project-labels";

export function MoreWorkGrid({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const secondary = PROJECTS.filter((project) => !project.featuredOrder);

  return (
    <div className="bg-rs-bg py-14 md:py-20">
      <Container>
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
          {fr ? "Autres projets : IA, DevOps et produits" : "More work: AI, DevOps and products"}
        </h2>
        <div className={cn("mt-8 grid gap-6 md:grid-cols-2", BALANCED_GRID)}>
          {secondary.map((project, index) => (
            <Link
              key={project.key}
              href={workPath(locale, project.slug)}
              className={cn(
                "group flex flex-col overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-150 hover:border-[var(--rs-border-strong)]",
                balancedSpan(index, secondary.length),
              )}
            >
              <div
                className={cn(
                  "relative aspect-[16/9] overflow-hidden border-b border-[var(--rs-border)] bg-[var(--rs-dark)]",
                  balancedSpan(index, secondary.length) === "lg:col-span-3" && "lg:aspect-[2/1]",
                )}
              >
                <Image
                  src={project.heroImage}
                  alt={projectImageAlt(project, locale)}
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                  className={cn(
                    "transition-transform duration-500 ease-out group-hover:scale-[1.03]",
                    project.tone === "dark" ? "object-cover object-center" : "object-cover object-top",
                  )}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rs-accent-fg">
                  {KIND_LABELS[project.kind][locale]}
                  {project.year ? ` · ${project.year}` : ""}
                </p>
                <p className="mt-2 flex items-center justify-between gap-3 text-xl font-semibold">
                  {project.title}
                  <ArrowUpRight
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-rs-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-rs-muted">{project.summary[locale]}</p>
                {project.status ? (
                  <p className="mt-3 text-sm font-medium text-rs-fg">{project.status[locale]}</p>
                ) : null}
                <p className="mt-auto pt-4 text-xs font-medium uppercase tracking-[0.14em] text-rs-muted">
                  {project.categories[locale].join(" · ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
