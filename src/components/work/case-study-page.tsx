import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechChips } from "@/components/ui/tech-chips";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { quotePath, smbLandingPath, workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { NightBand } from "@/components/ui/night-band";
import { CaseStudyGallery } from "./case-study-gallery";
import { CaseStudyHero } from "./case-study-hero";
import { CaseStudyOverview } from "./case-study-overview";

const SECTION = "border-t border-rs-fg py-14 md:py-20";

function Heading({ index, eyebrow, title }: { index: number; eyebrow: string; title?: string }) {
  return (
    <div>
      <Eyebrow>
        <span className="text-rs-accent-fg">{String(index).padStart(2, "0")}</span> · {eyebrow}
      </Eyebrow>
      {title ? <h2 className="mt-3 text-[2rem] font-extrabold leading-[1] tracking-[-0.04em] md:text-5xl">{title}</h2> : null}
    </div>
  );
}

function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <em className="text-rs-accent-fg">{highlight}</em>
      {text.slice(at + highlight.length)}
    </>
  );
}

export function CaseStudyPage({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";
  const challenge = project.challenge[locale];
  const groups =
    project.screens ??
    (project.gallery.length > 0
      ? [{ title: { fr: "Le produit", en: "The product" }, items: project.gallery.map((item) => ({ ...item, frame: "browser" as const, width: 1600, height: 1000 })) }]
      : []);
  const isWeb = project.key === "manteigaria";
  let index = 0;

  return (
    <article>
      <section data-case-section="hero">
        <NightBand image={project.heroImage} dim className="pt-28 md:pt-36">
          <CaseStudyHero locale={locale} project={project} />
        </NightBand>
      </section>

      <section data-case-section="overview" className="mt-8">
        <CaseStudyOverview locale={locale} project={project} />
      </section>

      <Container>
        <div className="grid gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <section data-case-section="challenge">
            <Heading index={++index} eyebrow={fr ? "Problématique" : "The problem"} />
            <p className="mt-5 font-serif text-[2rem] leading-[1.08] md:text-[2.75rem]">
              <Highlighted text={challenge[0] ?? ""} highlight={project.challengeHighlight?.[locale]} />
            </p>
            {challenge.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-5 text-base leading-relaxed text-rs-muted">
                {paragraph}
              </p>
            ))}
          </section>
          <section data-case-section="solution">
            <Eyebrow>{fr ? "Objectifs" : "Objectives"}</Eyebrow>
            <ol className="mt-5 border-t border-[var(--rs-border)]">
              {project.solution[locale].map((item, position) => (
                <li
                  key={item}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] border-b border-[var(--rs-border)] py-5 text-base leading-relaxed md:text-lg"
                >
                  <span className="pt-1 text-sm font-bold text-rs-accent-fg">{String(position + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
        </div>

        {groups.length > 0 ? (
          <section data-case-section="gallery" className={SECTION}>
            <Heading index={++index} eyebrow={fr ? "Galerie" : "Gallery"} title={fr ? "Le produit, écran par écran." : "The product, screen by screen."} />
            <div className="mt-8">
              <CaseStudyGallery locale={locale} groups={groups} />
            </div>
          </section>
        ) : null}

        <section data-case-section="capabilities" className={SECTION}>
          <Heading
            index={++index}
            eyebrow={fr ? "Fonctionnalités & choix techniques" : "Features & technical choices"}
            title={fr ? "Ce que fait le produit, et ce que ça change." : "What the product does, and what it changes."}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {project.capabilities.map((capability, position) => (
              <li
                key={capability.title.en}
                className={cn(
                  "flex flex-col rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6",
                  project.capabilities.length % 3 === 2 && position >= project.capabilities.length - 2 ? "lg:col-span-3" : "lg:col-span-2",
                )}
              >
                <span aria-hidden className="num-outline text-3xl font-bold leading-none tracking-tight">{String(position + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold">{capability.title[locale]}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-rs-muted">{capability.body[locale]}</p>
                {capability.benefit ? (
                  <p className="mt-auto flex gap-2 pt-4 text-sm font-medium text-rs-accent-fg">
                    <ArrowRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                    {capability.benefit[locale]}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section data-case-section="engineering" className="pb-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.engineering[locale].map((item) => (
              <div key={item.title} className="border-t-2 border-rs-fg pt-4">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-rs-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section data-case-section="technologies" className="pb-6 pt-8">
          {project.technologies.length > 0 ? <TechChips items={project.technologies} /> : null}
        </section>

        {project.productUx[locale].length > 0 ? (
          <section data-case-section="product-ux" className="pb-14 pt-8 md:pb-20">
            <Eyebrow>Product & UX</Eyebrow>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {project.productUx[locale].map((item) => (
                <li key={item} className="border-l-2 border-rs-accent pl-4 text-base leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section data-case-section="outcome" className={cn(SECTION, "grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16")}>
          <div>
            <Heading index={++index} eyebrow={fr ? "Livrables" : "Deliverables"} title={fr ? "Ce qui est en ligne aujourd'hui." : "What is live today."} />
            <p className="mt-4 text-base leading-relaxed text-rs-muted">
              {fr
                ? "Uniquement des éléments vérifiables : aucun chiffre d'usage n'est affiché tant qu'il n'est pas mesuré et publiable."
                : "Only verifiable elements: no usage figure is shown until it is measured and publishable."}
            </p>
          </div>
          <div>
            <div className="space-y-3 rounded-[var(--rs-radius-md)] border border-[color-mix(in_srgb,var(--rs-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--rs-accent)_7%,transparent)] p-6 md:p-7">
              {project.outcome[locale].map((item) => (
                <p key={item} className="text-lg font-medium leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
            {project.links?.length ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5 transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
                    >
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#17663a]">{fr ? "En ligne" : "Live"}</span>
                        <span className="mt-1 block font-semibold group-hover:text-rs-accent-fg">{link.label[locale]}</span>
                      </span>
                      <ArrowUpRight aria-hidden className="h-4 w-4 text-rs-muted group-hover:text-rs-accent-fg" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        <section data-case-section="next-project" className="border-t border-rs-fg">
          <Link
            href={workPath(locale)}
            className="group flex items-center justify-between gap-6 py-10 transition-colors duration-200 hover:bg-rs-fg hover:text-rs-bg md:px-4"
          >
            <span className="text-[2.25rem] font-extrabold leading-[0.95] tracking-[-0.045em] md:text-6xl">
              {fr ? "Toutes les réalisations" : "All work"}
            </span>
            <ArrowRight aria-hidden className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:translate-x-2 md:h-12 md:w-12" />
          </Link>
        </section>
      </Container>

      <section data-case-section="cta">
        <ClosingCta
          locale={locale}
          ctaId="case_study_start_project"
          source={`case_study_${project.key}`}
          title={fr ? `Un projet comme ${project.title} ?` : `A project like ${project.title}?`}
          body={
            fr
              ? "Premier échange gratuit, réponse sous 24 h ouvrées, devis écrit avant tout engagement."
              : "Free first conversation, reply within 24 business hours, written quote before any commitment."
          }
          secondary={
            isWeb
              ? { label: fr ? "Voir l'offre sites web" : "See the website offer", href: smbLandingPath(locale), ctaId: "project_to_websites_offer" }
              : { label: fr ? "Devis gratuit" : "Free quote", href: quotePath(locale, "app"), ctaId: "project_free_quote" }
          }
        />
      </section>
    </article>
  );
}
