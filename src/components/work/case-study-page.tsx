import { ClosingCta } from "@/components/ui/closing-cta";
import { TechChips } from "@/components/ui/tech-chips";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { saasLandingPath, smbLandingPath } from "@/lib/site-routes";
import { ArticleAsideCard, ArticleLayout, AsideLinkLabel } from "@/components/article/article-layout";
import { ArticleBlock, NumberedGrid, NumberedList, PullQuote } from "@/components/article/article-blocks";
import { CaseStudyHero } from "./case-study-hero";
import { CaseStudyOverview } from "./case-study-overview";
import { NextProject } from "./next-project";
import { ProjectGallery } from "./project-gallery";

const SECTION = "py-12 md:py-16";

export function CaseStudyPage({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const gallery = project.gallery.filter((item) => item.src !== project.heroImage);
  const challenge = project.challenge[locale];
  const asideLink = project.links?.[0];

  return (
    <article>
      <section
        data-case-section="hero"
        className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg pb-12 pt-28 text-rs-fg md:pb-16 md:pt-32"
      >
        <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
        <CaseStudyHero locale={locale} project={project} />
      </section>

      <section data-case-section="overview" className="pt-8">
        <CaseStudyOverview locale={locale} project={project} />
      </section>

      <ArticleLayout
        locale={locale}
        className="pb-4"
        toc={[
          { id: "defi", label: fr ? "Le défi" : "The challenge" },
          { id: "reponse", label: fr ? "La réponse" : "The solution" },
          { id: "construit", label: fr ? "Ce que nous avons construit" : "What we built" },
          { id: "product-ux", label: "Product & UX" },
          { id: "engineering", label: "Engineering" },
          { id: "resultat", label: fr ? "Résultat" : "Outcome" },
        ]}
        aside={
          <ArticleAsideCard image={project.heroImage}>
            {asideLink ? (
              <a href={asideLink.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                <AsideLinkLabel>{asideLink.label[locale]}</AsideLinkLabel>
              </a>
            ) : (
              <span>{project.title}</span>
            )}
          </ArticleAsideCard>
        }
      >
        <PullQuote
          id="defi"
          data-case-section="challenge"
          eyebrow={fr ? "01 · Le défi" : "01 · The challenge"}
          text={challenge[0] ?? ""}
          highlight={project.challengeHighlight?.[locale]}
        >
          {challenge.slice(1).map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
              {paragraph}
            </p>
          ))}
        </PullQuote>

        <ArticleBlock id="reponse" index={2} title={fr ? "La réponse" : "The solution"} data-case-section="solution">
          <NumberedList items={project.solution[locale]} />
        </ArticleBlock>

        <ArticleBlock id="construit" index={3} title={fr ? "Ce que nous avons construit" : "What we built"} data-case-section="capabilities">
          <NumberedGrid
            items={project.capabilities.map((capability) => ({ title: capability.title[locale], body: capability.body[locale] }))}
          />
        </ArticleBlock>

        <ArticleBlock id="product-ux" index={4} title="Product & UX" data-case-section="product-ux">
          <ul className="space-y-4">
            {project.productUx[locale].map((item) => (
              <li key={item} className="border-l-2 border-rs-accent pl-5 text-lg leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </ArticleBlock>

        <ArticleBlock id="engineering" index={5} title="Engineering" data-case-section="engineering">
          <NumberedGrid items={project.engineering[locale]} />
        </ArticleBlock>

        <section data-case-section="technologies">
          {project.technologies.length > 0 ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">Technologies</p>
              <TechChips items={project.technologies} className="mt-4" />
            </div>
          ) : null}
        </section>

        <ArticleBlock id="resultat" index={6} title={fr ? "Résultat" : "Outcome"} data-case-section="outcome">
          <div className="space-y-3 rounded-[var(--rs-radius-md)] border border-[color-mix(in_srgb,var(--rs-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--rs-accent)_7%,transparent)] p-6 md:p-8">
            {project.outcome[locale].map((item) => (
              <p key={item} className="text-lg font-medium leading-relaxed md:text-xl">
                {item}
              </p>
            ))}
          </div>
        </ArticleBlock>
      </ArticleLayout>

      <section data-case-section="gallery" className={gallery.length > 0 ? "pt-12 md:pt-16" : undefined}>
        <ProjectGallery locale={locale} items={gallery} />
      </section>

      <section data-case-section="next-project" className={SECTION}>
        <NextProject locale={locale} project={project} />
      </section>

      <section data-case-section="cta">
        <ClosingCta
          locale={locale}
          ctaId="case_study_start_project"
          source={`case_study_${project.key}`}
          title={fr ? "Vous construisez quelque chose de similaire ?" : "Building something similar?"}
          secondary={
            project.key === "manteigaria"
              ? { label: fr ? "Voir l'offre sites web" : "See the website offer", href: smbLandingPath(locale), ctaId: "project_to_websites_offer" }
              : { label: fr ? "Voir l'offre applications & SaaS" : "See the applications & SaaS offer", href: saasLandingPath(locale), ctaId: "project_to_saas_offer" }
          }
        />
      </section>
    </article>
  );
}
