import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

export function CaseStudyHero({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";

  return (
    <Container>
      <Eyebrow>{project.categories[locale].join(" · ")}</Eyebrow>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{project.title}</h1>
      <p className="mt-4 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
        {project.summary[locale]}
      </p>
      {project.links?.length ? (
        <ul className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--rs-border-strong)] px-4 py-2 text-sm font-medium text-rs-fg transition-colors duration-150 hover:border-rs-fg"
              >
                {link.label[locale]}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-12 overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)]">
        <Image
          src={project.heroImage}
          alt={fr ? `Interface du produit ${project.title}` : `${project.title} product interface`}
          width={1600}
          height={1000}
          priority
          sizes="100vw"
          className="h-auto w-full object-cover"
        />
      </div>
    </Container>
  );
}
