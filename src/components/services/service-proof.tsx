import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProject } from "@/content/projects";
import type { ProjectKey } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { projectImageAlt } from "@/components/work/project-labels";
import { cn } from "@/lib/utils";

export function ServiceProof({ locale, projectKeys }: { locale: Locale; projectKeys: ProjectKey[] }) {
  const fr = locale === "fr";
  const projects = projectKeys
    .map((key) => getProject(key))
    .filter((project): project is NonNullable<ReturnType<typeof getProject>> => project !== null);

  if (projects.length === 0) return null;
  // A single project spans the row (image beside the text) instead of half a grid with an empty column.
  const single = projects.length === 1;

  return (
    <div className={cn("grid gap-6", projects.length === 2 && "md:grid-cols-2", projects.length >= 3 && "md:grid-cols-2 lg:grid-cols-3")}>
      {projects.map((project) => (
        <Link
          key={project.key}
          href={workPath(locale, project.slug)}
          className={cn(
            "group flex flex-col overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-150 hover:border-[var(--rs-border-strong)]",
            single && "md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
          )}
        >
          <div
            className={cn(
              "relative aspect-[16/9] overflow-hidden border-b border-[var(--rs-border)]",
              single && "md:border-b-0 md:border-r",
            )}
          >
            <Image
              src={project.heroImage}
              alt={projectImageAlt(project, locale)}
              fill
              sizes={single ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <div className={cn("flex flex-1 flex-col p-6", single && "md:justify-center md:p-10")}>
            <p className={cn("font-semibold", single ? "text-2xl" : "text-lg")}>{project.title}</p>
            {project.status ? (
              <p className="mt-1 text-sm text-rs-muted">{project.status[locale]}</p>
            ) : null}
            <p className={cn("mt-3 leading-relaxed text-rs-muted", single ? "text-base" : "text-sm")}>{project.summary[locale]}</p>
            <span className={cn("inline-flex items-center gap-1 text-sm font-medium text-rs-accent-fg", single ? "mt-6" : "mt-auto pt-4")}>
              {fr ? "Voir le projet" : "View project"}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
