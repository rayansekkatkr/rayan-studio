import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getProject } from "@/content/projects";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";

export function NextProject({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const next = project.next ? getProject(project.next) : null;
  if (!next) return null;

  return (
    <Container>
      <Link
        href={workPath(locale, next.slug)}
        className="group grid items-center gap-8 rounded-[var(--rs-radius-lg)] border border-[var(--rs-border)] bg-rs-surface p-8 transition-colors duration-150 hover:border-[var(--rs-border-strong)] md:grid-cols-2"
      >
        <div>
          <Eyebrow>{fr ? "Projet suivant" : "Next project"}</Eyebrow>
          <p className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{next.title}</p>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-rs-muted">
            {next.categories[locale].join(" · ")}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-rs-accent">
            {fr ? "Découvrir" : "Discover"}
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </span>
        </div>
        <div className="overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)]">
          <Image
            src={next.heroImage}
            alt={fr ? `Interface du produit ${next.title}` : `${next.title} product interface`}
            width={960}
            height={600}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      </Link>
    </Container>
  );
}
