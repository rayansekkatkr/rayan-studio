import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";

export function MoreWorkGrid({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const secondary = PROJECTS.filter((project) => !project.featuredOrder);

  return (
    <div className="bg-rs-bg py-[var(--rs-section-space)]">
      <Container>
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">More work</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {secondary.map((project) => (
            <Link
              key={project.key}
              href={workPath(locale, project.slug)}
              className="group overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--rs-border)]">
                <Image
                  src={project.heroImage}
                  alt={fr ? `Interface du projet ${project.title}` : `${project.title} project interface`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6">
                <p className="flex items-center justify-between text-xl font-semibold">
                  {project.title}
                  <ArrowUpRight
                    aria-hidden
                    className="h-5 w-5 text-rs-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </p>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-rs-muted">
                  {project.categories[locale].join(" · ")}
                </p>
                {project.status ? (
                  <p className="mt-3 text-sm font-medium text-rs-muted">{project.status[locale]}</p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
