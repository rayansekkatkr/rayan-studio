import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { ProjectRecord } from "@/content/projects";
import { WORK_PLATFORMS } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { StatusDot } from "./work-card";

/** Identity line of a case study (status, type, platforms, year, stack), then the main screens. */
export function CaseStudyOverview({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const entries: Array<{ label: string; value: React.ReactNode }> = [
    { label: fr ? "Statut" : "Status", value: <StatusDot project={project} locale={locale} long className="text-base" /> },
    { label: "Type", value: project.categories[locale].slice(0, 2).join(" · ") },
  ];
  if (WORK_PLATFORMS[project.key]) entries.push({ label: fr ? "Plateformes" : "Platforms", value: WORK_PLATFORMS[project.key][locale] });
  if (project.year) entries.push({ label: fr ? "Année" : "Year", value: project.year });
  if (project.technologies.length > 0) entries.push({ label: "Stack", value: project.technologies.slice(0, 3).join(" · ") });

  return (
    <Container>
      <dl className="grid grid-cols-2 gap-6 border-y border-rs-fg py-6 md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        {entries.map((entry) => (
          <div key={entry.label}>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-rs-muted">{entry.label}</dt>
            <dd className="mt-2 text-base font-medium text-rs-fg">{entry.value}</dd>
          </div>
        ))}
      </dl>
      <div className={project.heroCompanion ? "mt-8 grid gap-6 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]" : "mt-8"}>
        <div className="relative aspect-[16/10] overflow-hidden bg-rs-subtle lg:aspect-auto lg:h-[38rem]">
          <Image
            src={project.heroImage}
            alt={fr ? `Interface du produit ${project.title}` : `${project.title} product interface`}
            fill
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover object-left-top"
          />
        </div>
        {project.heroCompanion ? (
          <div className="relative hidden bg-rs-subtle lg:block lg:h-[38rem]">
            <Image
              src={project.heroCompanion.src}
              alt={project.heroCompanion.alt[locale]}
              fill
              sizes="25vw"
              className="object-contain p-8"
            />
          </div>
        ) : null}
      </div>
    </Container>
  );
}
