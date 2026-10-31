import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { ProjectRecord } from "@/content/projects";
import { WORK_PLATFORMS } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./status-badge";

/** Opening of a case study: identity, links, and a composition of real screens. */
export function CaseStudyHero({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const links = project.links ?? (project.liveUrl ? [{ label: { fr: "Voir le site", en: "Visit the website" }, href: project.liveUrl }] : []);

  return (
    <Container>
      <p className="text-sm text-rs-muted">
        <Link href={workPath(locale)} className="transition-colors duration-150 hover:text-rs-fg">
          {fr ? "Réalisations" : "Work"}
        </Link>{" "}
        / {project.title}
      </p>
      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge project={project} locale={locale} />
            {WORK_PLATFORMS[project.key] ? (
              <span className="rounded-full border border-[var(--rs-border)] px-3 py-1 text-xs font-medium text-rs-fg">
                {WORK_PLATFORMS[project.key][locale]}
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 text-[2.5rem] font-semibold leading-none tracking-tight md:text-6xl lg:text-7xl">{project.title}</h1>
          <p className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{project.summary[locale]}</p>
        </div>
        {links.length > 0 ? (
          <ul className="flex flex-wrap gap-3 lg:justify-end">
            {links.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-150",
                    index === 0
                      ? "bg-rs-fg text-[var(--rs-dark)] hover:bg-rs-accent hover:text-rs-fg"
                      : "border border-[var(--rs-border-strong)] text-rs-fg hover:border-rs-fg",
                  )}
                >
                  {link.label[locale]}
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="relative mt-12">
        <div className={cn("overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)]", project.heroCompanion && "lg:w-[80%]")}>
          <Image
            src={project.heroImage}
            alt={fr ? `Interface du produit ${project.title}` : `${project.title} product interface`}
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
        {project.heroCompanion ? (
          <div className="absolute bottom-[-2.5rem] right-0 hidden w-[22%] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] lg:block">
            <Image
              src={project.heroCompanion.src}
              alt={project.heroCompanion.alt[locale]}
              width={project.heroCompanion.width}
              height={project.heroCompanion.height}
              sizes="22vw"
              className="block h-auto w-full"
            />
          </div>
        ) : null}
      </div>
    </Container>
  );
}
