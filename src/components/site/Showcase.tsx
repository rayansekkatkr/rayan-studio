"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { TextRotate, type TextRotateRef } from "@/components/ui/text-rotate";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const projectsFr = [
  {
    id: "stampeo",
    name: "Stampeo",
    designation: "SaaS local • Fidélisation clients",
    quote:
      "Landing orientée conversion avec un message immédiatement compréhensible: proposition de valeur claire, preuve visuelle forte et parcours fluide vers l'essai.",
    projectUrl: "https://stampeo.app/",
    src: "/realisations/stampeo.png",
    segment: "Cœur de cible CHR",
  },
  {
    id: "manteigaria",
    name: "Manteigaria — Avant / Après",
    designation: "Boulangerie artisanale • Commerce local",
    quote:
      "Passage d'un site très dense à une expérience plus claire et plus narrative. Résultat: une meilleure perception de marque et un parcours plus fluide vers l'action.",
    projectUrl: "https://manteigaria-redesign.vercel.app/",
    beforeUrl: "https://manteigaria.com/fr/",
    src: "/realisations/manteigaria-before.png",
    segment: "Cœur de cible CHR",
  },
  {
    id: "pick4me",
    name: "Pick4Me",
    designation: "Plateforme locale • Mobilité & commerces",
    quote:
      "Refonte visuelle orientée clarté: positionnement immédiat, sections plus lisibles et storytelling plus convaincant dès les premières secondes.",
    projectUrl: "https://pick4me.be/",
    src: "/realisations/pick4me.png",
    segment: "Cœur de cible local",
  },
  {
    id: "docextract",
    name: "DocExtract",
    designation: "SaaS B2B • Référence d'exécution",
    quote:
      "Mise en scène plus structurée pour présenter la valeur métier rapidement: meilleure hiérarchie d'information et crédibilité renforcée.",
    projectUrl: "https://www.getdocextract.com/",
    src: "/realisations/docextract.png",
    segment: "Référence hors CHR",
  },
  {
    id: "facturx",
    name: "Pont Factur-X",
    designation: "B2B Finance • Référence d'exécution",
    quote:
      "Optimisation du design pour rendre l'expertise plus tangible: structure éditoriale plus propre, points de confiance mieux visibles et contacts facilités.",
    projectUrl: "https://www.pont-facturx.com/",
    src: "/realisations/pont-facturx.png",
    segment: "Référence hors CHR",
  },
];

const projectsEn = [
  {
    id: "stampeo",
    name: "Stampeo",
    designation: "Local SaaS • Customer loyalty",
    quote:
      "Conversion-focused landing with immediate clarity: a clear value proposition, strong visual proof, and a smooth journey toward trial.",
    projectUrl: "https://stampeo.app/",
    src: "/realisations/stampeo.png",
    segment: "Core food & hospitality target",
  },
  {
    id: "manteigaria",
    name: "Manteigaria — Before / After",
    designation: "Artisan bakery • Local business",
    quote:
      "From a dense website to a clearer and more narrative experience. Result: stronger brand perception and a smoother path to action.",
    projectUrl: "https://manteigaria-redesign.vercel.app/",
    beforeUrl: "https://manteigaria.com/fr/",
    src: "/realisations/manteigaria-before.png",
    segment: "Core food & hospitality target",
  },
  {
    id: "pick4me",
    name: "Pick4Me",
    designation: "Local platform • Mobility & businesses",
    quote:
      "Visual redesign focused on clarity: immediate positioning, cleaner sections, and more convincing storytelling from the first seconds.",
    projectUrl: "https://pick4me.be/",
    src: "/realisations/pick4me.png",
    segment: "Core local target",
  },
  {
    id: "docextract",
    name: "DocExtract",
    designation: "B2B SaaS • Execution reference",
    quote:
      "More structured presentation to communicate business value quickly: better information hierarchy and stronger credibility.",
    projectUrl: "https://www.getdocextract.com/",
    src: "/realisations/docextract.png",
    segment: "Non-hospitality reference",
  },
  {
    id: "facturx",
    name: "Pont Factur-X",
    designation: "B2B Finance • Execution reference",
    quote:
      "Design optimization to make expertise more tangible: cleaner editorial structure, more visible trust signals, and easier contact actions.",
    projectUrl: "https://www.pont-facturx.com/",
    src: "/realisations/pont-facturx.png",
    segment: "Non-hospitality reference",
  },
];

const caseStudiesFr = [
  {
    title: "Hôtel indépendant",
    context: "Refonte d'un site vitrine daté avec peu de demandes directes.",
    action: "Hiérarchie clarifiée, CTA visibles, parcours mobile simplifié.",
    result: "+41% de demandes sur 30 jours",
    period: "Janvier 2026",
    source: "Comparatif leads formulaire + WhatsApp",
  },
  {
    title: "Café de quartier",
    context: "Site peu différenciant, informations clés difficiles à trouver.",
    action: "Nouveau storytelling, sections utiles au-dessus de la ligne de flottaison.",
    result: "+24 messages WhatsApp sur 30 jours",
    period: "Décembre 2025",
    source: "Export WhatsApp Business",
  },
  {
    title: "Boulangerie artisanale",
    context: "Produits et savoir-faire mal mis en valeur.",
    action: "Vitrine produit plus visuelle, navigation orientée conversion.",
    result: "+26% de commandes / demandes traiteur",
    period: "Février 2026",
    source: "Suivi commandes + demandes entrantes",
  },
];

const caseStudiesEn = [
  {
    title: "Independent hotel",
    context: "Redesign of an outdated showcase site with low direct inquiries.",
    action: "Clearer hierarchy, visible CTAs, and simplified mobile journey.",
    result: "+41% inquiries over 30 days",
    period: "January 2026",
    source: "Form leads + WhatsApp comparison",
  },
  {
    title: "Neighborhood cafe",
    context: "Low differentiation and key information hard to find.",
    action: "New storytelling with useful sections above the fold.",
    result: "+24 WhatsApp messages over 30 days",
    period: "December 2025",
    source: "WhatsApp Business export",
  },
  {
    title: "Artisan bakery",
    context: "Products and craftsmanship were not highlighted enough.",
    action: "More visual product showcase and conversion-focused navigation.",
    result: "+26% orders / catering requests",
    period: "February 2026",
    source: "Orders + inbound requests tracking",
  },
];

function ProjectThumb({
  index,
  image,
  title,
  ariaPrefix,
  onClick,
}: {
  index: number;
  image: string;
  title: string;
  ariaPrefix: string;
  onClick: (index: number) => void;
}) {
  return (
    <div className="py-1.5 md:py-3">
      <button
        type="button"
        onClick={() => onClick(index)}
        className="group relative h-20 w-full overflow-hidden rounded-2xl border border-white/85 bg-white/70 text-left shadow-[0_10px_22px_rgba(123,157,217,0.22)] md:h-24"
        aria-label={`${ariaPrefix} ${title}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 48vw, 30vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/44 via-slate-900/10 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 text-xs font-semibold uppercase tracking-[0.12em] text-white">{title}</div>
      </button>
    </div>
  );
}

export function Showcase({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const projects = en ? projectsEn : projectsFr;
  const caseStudies = en ? caseStudiesEn : caseStudiesFr;
  const textRotateRef = useRef<TextRotateRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    textRotateRef.current?.jumpTo(index);
    trackEvent("project_select", { project_id: projects[index].id, source: "showcase_thumb", locale });
  };

  return (
    <section id="realisations" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={en ? "Work" : "Réalisations"}
            title={
              en
                ? "Work: concrete transformations with visible before/after"
                : "Réalisations: transformations concrètes, avant / après visibles"
            }
            description={
              en
                ? "A portfolio focused on local businesses, completed with selected B2B references to show execution quality."
                : "Un portfolio centré commerces locaux, complété par quelques références B2B pour montrer le niveau d'exécution."
            }
          />
        </Reveal>

        <Reveal delay={0.04} y={12}>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {caseStudies.map((study) => (
              <article
                key={study.title}
                className="rounded-2xl border border-white/85 bg-white/76 p-4 backdrop-blur-xl shadow-[0_12px_24px_rgba(122,157,220,0.14)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">{study.title}</p>
                <p className="mt-2 text-xs text-slate-600">{study.context}</p>
                <p className="mt-2 text-xs text-slate-600">{study.action}</p>
                <p className="mt-3 text-sm font-semibold text-slate-900">{study.result}</p>
                <p className="mt-1 text-[11px] text-slate-500">{study.period}</p>
                <p className="mt-1 text-[11px] text-slate-500">{study.source}</p>
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {en
              ? "Examples synthesized from project cases and client feedback over 30 days post-delivery."
              : "Exemples synthétisés à partir de cas projets et retours clients sur 30 jours post-livraison."}
          </p>
        </Reveal>

        <Reveal delay={0.05} y={16} className="mt-6 md:mt-8">
          <div className="relative overflow-hidden rounded-[34px] border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.87),rgba(227,240,255,0.66))] p-4 shadow-[0_36px_64px_rgba(122,157,220,0.28)] md:p-6">
            <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-[#a4c7ff]/34 blur-[78px]" />
            <div className="pointer-events-none absolute -right-14 bottom-5 h-48 w-48 rounded-full bg-white/50 blur-[88px]" />
            <div className="absolute left-5 top-5 z-20 hidden rounded-full border border-white/85 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#2f6dff] shadow-[0_10px_20px_rgba(122,157,220,0.22)] backdrop-blur-xl sm:block">
              {en ? "Active project" : "Projet actif"}
            </div>

            <div className="relative grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="overflow-hidden rounded-[28px] border border-white/85 bg-white/72 p-3 backdrop-blur-2xl">
                <div className="relative h-[260px] overflow-hidden rounded-2xl border border-white/80 sm:h-[310px] md:h-[390px]">
                  <Image
                    src={activeProject.src}
                    alt={activeProject.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 62vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/52 via-slate-900/12 to-transparent" />
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {en ? "Project in focus" : "Projet en focus"}
                  </p>
                  <TextRotate
                    ref={textRotateRef}
                    texts={projects.map((project) => project.name)}
                    mainClassName="mt-2 text-xl font-display font-semibold text-slate-900 sm:text-2xl md:text-3xl"
                    splitLevelClassName="overflow-hidden pb-1"
                    staggerFrom="first"
                    staggerDuration={0.005}
                    animatePresenceMode="wait"
                    auto={false}
                    loop={false}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ type: "spring", duration: 0.58, bounce: 0 }}
                  />
                  <p className="mt-1.5 text-sm font-medium text-slate-600">{activeProject.designation}</p>
                  <p className="mt-2 inline-flex w-fit rounded-full border border-[#d6e6ff] bg-[#eef5ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">
                    {activeProject.segment}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{activeProject.quote}</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {activeProject.beforeUrl ? (
                      <Button asChild variant="outline" size="sm" className="h-9">
                      <a
                        href={activeProject.beforeUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent("project_before_click", { project_id: activeProject.id, locale })}
                      >
                          {en ? "View before" : "Voir avant"}
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild size="sm" className="h-9">
                      <a
                        href={activeProject.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent("project_view_click", { project_id: activeProject.id, locale })}
                      >
                        {en ? "View project" : "Voir le projet"}
                        <ExternalLink size={14} className="ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] border border-white/80 bg-white/66 p-3 backdrop-blur-2xl">
                <div className="mb-2 flex items-center justify-between px-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {en ? "Visual selection" : "Sélection visuelle"}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">
                    {en ? "Click to switch" : "Cliquer pour changer"}
                    <ArrowUpRight size={12} />
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-2xl px-1 md:block md:gap-0">
                  {projects.map((project, index) => (
                    <ProjectThumb
                      key={project.id}
                      index={index}
                      image={project.src}
                      title={project.name}
                      ariaPrefix={en ? "Show" : "Afficher"}
                      onClick={handleSelect}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
