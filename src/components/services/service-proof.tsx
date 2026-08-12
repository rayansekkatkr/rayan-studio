import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProject } from "@/content/projects";
import type { ProjectKey } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";

export function ServiceProof({ locale, projectKeys }: { locale: Locale; projectKeys: ProjectKey[] }) {
  const fr = locale === "fr";
  const projects = projectKeys
    .map((key) => getProject(key))
    .filter((project): project is NonNullable<ReturnType<typeof getProject>> => project !== null);

  if (projects.length === 0) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <Link
          key={project.key}
          href={workPath(locale, project.slug)}
          className="group overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
        >
          <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--rs-border)]">
            <Image
              src={project.heroImage}
              alt={fr ? `Interface du produit ${project.title}` : `${project.title} product interface`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="p-6">
            <p className="text-lg font-semibold">{project.title}</p>
            {project.status ? (
              <p className="mt-1 text-sm text-rs-muted">{project.status[locale]}</p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-rs-muted">{project.summary[locale]}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rs-accent">
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
