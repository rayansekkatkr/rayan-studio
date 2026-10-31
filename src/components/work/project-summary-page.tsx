import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechChips } from "@/components/ui/tech-chips";
import { ArticleAsideCard, ArticleLayout, AsideLinkLabel } from "@/components/article/article-layout";
import { ArticleBlock, NumberedGrid, NumberedList, PullQuote } from "@/components/article/article-blocks";
import { ClosingCta } from "@/components/ui/closing-cta";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { saasLandingPath, smbLandingPath, workPath } from "@/lib/site-routes";
import { KIND_LABELS, projectImageAlt } from "./project-labels";

export function ProjectSummaryPage({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const links = project.links?.length
    ? project.links
    : project.liveUrl
      ? [
          {
            label:
              project.kind === "concept"
                ? { fr: "Voir le concept", en: "View the concept" }
                : { fr: "Voir le produit", en: "Visit product" },
            href: project.liveUrl,
          },
        ]
      : [];
  const cards = [
    ...project.capabilities.map((capability) => ({ title: capability.title[locale], body: capability.body[locale] })),
    ...project.engineering[locale],
  ];
  const challenge = project.challenge[locale];
  const blocks: Array<{ id: string; label: string; content?: React.ReactNode }> = [];
  if (challenge.length > 0) blocks.push({ id: "contexte", label: fr ? "Le contexte" : "The context" });
  if (project.solution[locale].length > 0)
    blocks.push({
      id: "mis-en-place",
      label: fr ? "Ce qui a été mis en place" : "What was put in place",
      content: <NumberedList items={project.solution[locale]} />,
    });
  if (cards.length > 0)
    blocks.push({ id: "details", label: fr ? "Dans le détail" : "In detail", content: <NumberedGrid items={cards} /> });
  if (project.outcome[locale].length > 0)
    blocks.push({
      id: "resultat",
      label: fr ? "Résultat" : "Outcome",
      content: (
        <div className="space-y-3 rounded-[var(--rs-radius-md)] border border-[color-mix(in_srgb,var(--rs-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--rs-accent)_7%,transparent)] p-6 md:p-8">
          {project.outcome[locale].map((item) => (
            <p key={item} className="text-lg font-medium leading-relaxed md:text-xl">
              {item}
            </p>
          ))}
        </div>
      ),
    });
  if (project.technologies.length > 0)
    blocks.push({ id: "technologies", label: "Technologies", content: <TechChips items={project.technologies} /> });
  const hasStory =
    project.challenge[locale].length > 0 || project.solution[locale].length > 0 || project.outcome[locale].length > 0;

  return (
    <article>
      <div className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg pb-12 pt-28 text-rs-fg md:pt-36">
        <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
        <Container>
          <Eyebrow>{project.categories[locale].join(" · ")}</Eyebrow>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{project.title}</h1>
          <p className="mt-4 inline-flex items-center gap-2 rounded-none border border-[var(--rs-border)] px-3.5 py-1 text-sm font-semibold text-rs-accent-fg">
            {KIND_LABELS[project.kind][locale]}
            {project.year ? <span className="font-medium text-rs-muted">· {project.year}</span> : null}
          </p>
          {project.status ? (
            <p className="mt-4 text-base font-medium text-rs-muted">{project.status[locale]}</p>
          ) : null}
          <p className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {project.summary[locale]}
          </p>
          <p className="mt-3 text-sm font-medium text-rs-muted">{project.role[locale]}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
              >
                {link.label[locale]}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            ))}
            {project.beforeUrl ? (
              <a
                href={project.beforeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-medium text-rs-muted transition-colors duration-150 hover:text-rs-fg"
              >
                {fr ? "Site original (avant)" : "Original site (before)"}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            ) : null}
            <Link
              href={workPath(locale)}
              className="inline-flex items-center gap-1.5 text-base font-medium text-rs-muted transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Tous les projets" : "All projects"}
            </Link>
          </div>
          <div className="mt-12 overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)]">
            <Image
              src={project.heroImage}
              alt={projectImageAlt(project, locale)}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      </div>

      {hasStory ? (
        <ArticleLayout
          locale={locale}
          toc={blocks.map((block) => ({ id: block.id, label: block.label }))}
          aside={
            <ArticleAsideCard image={project.heroImage}>
              {links[0] ? (
                <a href={links[0].href} target="_blank" rel="noreferrer" className="hover:underline">
                  <AsideLinkLabel>{links[0].label[locale]}</AsideLinkLabel>
                </a>
              ) : (
                <span>{project.title}</span>
              )}
            </ArticleAsideCard>
          }
        >
          {blocks.map((block, index) =>
            block.id === "contexte" ? (
              <PullQuote
                key={block.id}
                id={block.id}
                eyebrow={`01 · ${block.label}`}
                text={challenge[0]}
                highlight={project.challengeHighlight?.[locale]}
              >
                {challenge.slice(1).map((paragraph) => (
                  <p key={paragraph} className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
                    {paragraph}
                  </p>
                ))}
              </PullQuote>
            ) : (
              <ArticleBlock key={block.id} id={block.id} index={index + 1} title={block.label}>
                {block.content}
              </ArticleBlock>
            ),
          )}
        </ArticleLayout>
      ) : (
        <div className="py-12">
          <Container>
            {project.technologies.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">Technologies</p>
                <TechChips items={project.technologies} className="mt-4" />
              </div>
            ) : null}
          </Container>
        </div>
      )}
      <ClosingCta
        locale={locale}
        ctaId="project_summary_start_project"
        source={`project_${project.key}`}
        title={fr ? "Vous construisez quelque chose de similaire ?" : "Building something similar?"}
          secondary={
            project.key === "manteigaria"
              ? { label: fr ? "Voir l'offre sites web" : "See the website offer", href: smbLandingPath(locale), ctaId: "project_to_websites_offer" }
              : { label: fr ? "Voir l'offre applications & SaaS" : "See the applications & SaaS offer", href: saasLandingPath(locale), ctaId: "project_to_saas_offer" }
          }
        />
    </article>
  );
}
