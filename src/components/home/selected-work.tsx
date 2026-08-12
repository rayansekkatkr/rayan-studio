import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FEATURED_PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

export function SelectedWork({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div>
      {FEATURED_PROJECTS.map((project, index) => {
        const dark = project.tone === "dark";
        const wide = project.tone === "energy";
        return (
          <div
            key={project.key}
            data-featured-project={project.key}
            className={cn(
              "py-[var(--rs-section-space)] lg:flex lg:min-h-[100svh] lg:items-center",
              dark ? "rs-theme-dark bg-rs-bg text-rs-fg" : "bg-rs-surface text-rs-fg",
            )}
          >
            <Container>
              <Reveal>
                <div
                  className={cn(
                    "grid items-center gap-10",
                    wide ? "md:grid-cols-1" : "md:grid-cols-2",
                  )}
                >
                  <div className={cn(!wide && index % 2 === 1 && "md:order-2")}>
                    <Eyebrow>{`0${index + 1}`}</Eyebrow>
                    <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium uppercase tracking-[0.14em] text-rs-muted">
                      {project.categories[locale].join(" · ")}
                    </p>
                    <p className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
                      {project.summary[locale]}
                    </p>
                    <Link
                      href={workPath(locale, project.slug)}
                      className="mt-7 inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
                    >
                      {fr ? "Voir l'étude de cas" : "View case study"}
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className={cn(!wide && index % 2 === 1 && "md:order-1")}>
                    <div className="overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)]">
                      <Image
                        src={project.heroImage}
                        alt={
                          fr
                            ? `Interface du produit ${project.title}`
                            : `${project.title} product interface`
                        }
                        width={wide ? 1600 : 1080}
                        height={wide ? 900 : 720}
                        sizes={wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </Container>
          </div>
        );
      })}
    </div>
  );
}
