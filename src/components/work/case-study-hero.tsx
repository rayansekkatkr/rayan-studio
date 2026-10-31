import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GiantWord } from "@/components/ui/giant-word";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

/** Opening of a case study, direction A: the project name in giant type, the summary and the live links. */
export function CaseStudyHero({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const links = project.links ?? (project.liveUrl ? [{ label: { fr: "Voir le site", en: "Visit the website" }, href: project.liveUrl }] : []);
  const word = project.title.split(" · ")[0];

  return (
    <Container>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rs-muted">
        <Link href={workPath(locale)} className="transition-colors duration-150 hover:text-rs-fg">
          {fr ? "Réalisations" : "Work"}
        </Link>{" "}
        / {project.title}
      </p>
      <h1 className="mt-3 overflow-x-clip">
        <span className="sr-only">{project.title}</span>
        <GiantWord text={word} />
      </h1>
      <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <div>
          <p className="max-w-3xl text-xl font-bold leading-snug tracking-tight md:text-2xl">{project.summary[locale]}</p>
          <p className="mt-2 text-base text-rs-muted">{project.role[locale]}</p>
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
                    "inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold transition-colors duration-150",
                    index === 0 ? "bg-rs-fg text-rs-bg hover:bg-rs-accent hover:text-white" : "border border-rs-fg text-rs-fg hover:bg-rs-fg hover:text-rs-bg",
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
    </Container>
  );
}
