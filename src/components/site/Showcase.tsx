"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { TextRotate, type TextRotateRef } from "@/components/ui/text-rotate";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const projectsFr = [
  {
    id: "pick4me",
    name: "Pick4Me",
    designation: "Plateforme locale • Mobilité & commerces",
    quote:
      "Refonte visuelle orientée clarté: positionnement immédiat, sections plus lisibles et storytelling plus convaincant dès les premières secondes.",
    projectUrl: "https://pick4me.be/",
    src: "/realisations/pick4me.png",
    segment: "Cœur de cible local",
    scope: ["Positionnement", "Sections plus lisibles", "CTA clarifiés"],
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
    scope: ["Avant / après", "Storytelling", "Image artisanale"],
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
    scope: ["Hiérarchie B2B", "Crédibilité", "Lecture rapide"],
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
    scope: ["Structure éditoriale", "Signaux de confiance", "Contact facilité"],
  },
];

const projectsEn = [
  {
    id: "pick4me",
    name: "Pick4Me",
    designation: "Local platform • Mobility & businesses",
    quote:
      "Visual redesign focused on clarity: immediate positioning, cleaner sections, and more convincing storytelling from the first seconds.",
    projectUrl: "https://pick4me.be/",
    src: "/realisations/pick4me.png",
    segment: "Core local target",
    scope: ["Positioning", "Cleaner sections", "Clearer CTAs"],
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
    scope: ["Before / after", "Storytelling", "Artisan image"],
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
    scope: ["B2B hierarchy", "Credibility", "Fast reading"],
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
    scope: ["Editorial structure", "Trust signals", "Easier contact"],
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

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function ProjectNavItem({
  index,
  id,
  name,
  designation,
  isActive,
  ariaPrefix,
  onClick,
}: {
  index: number;
  id: string;
  name: string;
  designation: string;
  isActive: boolean;
  ariaPrefix: string;
  onClick: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      aria-pressed={isActive}
      aria-label={`${ariaPrefix} ${name}`}
      data-project-id={id}
      className={cn(
        "group relative flex w-full items-start gap-3 border-t border-[#2a231d]/10 px-3 py-3 text-left transition-colors duration-300 first:border-t-0",
        isActive ? "bg-[#17120f] text-[#fffaf0]" : "text-[#63584d] hover:bg-[#fffaf0]/70",
      )}
    >
      <span
        className={cn(
          "mt-0.5 font-display text-xs font-semibold tabular-nums transition-colors",
          isActive ? "text-[#ff9b76]" : "text-[#bdb09e]",
        )}
      >
        /0{index + 1}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            "truncate font-display text-sm font-semibold leading-snug transition-colors",
            isActive ? "text-[#fffaf0]" : "text-[#17120f]",
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "mt-0.5 truncate text-[11px] leading-snug transition-colors",
            isActive ? "text-[#fffaf0]/65" : "text-[#8a7d6f]",
          )}
        >
          {designation}
        </span>
      </span>
      <ArrowUpRight
        size={14}
        className={cn(
          "mt-0.5 shrink-0 transition-all",
          isActive ? "text-[#ff9b76] opacity-100" : "text-[#bdb09e] opacity-0 group-hover:opacity-100",
        )}
      />
    </button>
  );
}

export function Showcase({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const projects = en ? projectsEn : projectsFr;
  const caseStudies = en ? caseStudiesEn : caseStudiesFr;
  const textRotateRef = useRef<TextRotateRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];
  const caseLabels = en
    ? { file: "Case file", problem: "Problem", intervention: "Intervention", result: "Result", proof: "Proof" }
    : { file: "Dossier client", problem: "Probleme", intervention: "Intervention", result: "Resultat", proof: "Preuve" };

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
            {caseStudies.map((study, index) => (
              <article
                key={study.title}
                className="relative rounded-none border border-[#2a231d]/18 bg-[#fffaf0]/86 p-4 shadow-[5px_5px_0_rgba(42,35,29,0.1)]"
              >
                <div className="mb-4 flex items-start justify-between gap-3 border-b border-[#2a231d]/12 pb-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#d94f2b]">
                      {caseLabels.file} 0{index + 1}
                    </p>
                    <h3 className="font-display mt-1 text-lg font-semibold text-[#17120f]">{study.title}</h3>
                  </div>
                  <span className="border border-[#2a231d]/14 bg-[#17120f] px-2 py-1 text-[10px] font-black text-[#fffaf0]">
                    30j
                  </span>
                </div>
                <div className="space-y-2.5">
                  <CaseLine label={caseLabels.problem} text={study.context} />
                  <CaseLine label={caseLabels.intervention} text={study.action} />
                  <div className="border border-[#2a231d]/12 bg-[#f5f1e8] p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#d94f2b]">{caseLabels.result}</p>
                    <p className="mt-1 text-base font-black text-[#17120f]">{study.result}</p>
                    <p className="mt-1 text-[11px] text-[#8a7d6f]">{study.period}</p>
                  </div>
                  <CaseLine label={caseLabels.proof} text={study.source} />
                </div>
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#8a7d6f]">
            {en
              ? "Examples synthesized from project cases and client feedback over 30 days post-delivery."
              : "Exemples synthétisés à partir de cas projets et retours clients sur 30 jours post-livraison."}
          </p>
        </Reveal>

        <Reveal delay={0.05} y={16} className="mt-6 md:mt-8">
          <div className="relative overflow-hidden rounded-none border border-[#2a231d]/16 bg-[linear-gradient(150deg,rgba(255,250,240,0.94),rgba(239,231,217,0.78))] shadow-[8px_8px_0_rgba(42,35,29,0.1)]">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2a231d]/12 px-4 py-2.5 md:px-6">
              <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#17120f]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d94f2b] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d94f2b]" />
                </span>
                {en ? "Active project" : "Projet actif"}
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.14em] tabular-nums text-[#8a7d6f]">
                0{activeIndex + 1} <span className="text-[#bdb09e]">/ 0{projects.length}</span>
              </span>
            </div>

            {/* Body: nav directory + live browser preview */}
            <div className="grid lg:grid-cols-[0.85fr_1.6fr]">
              {/* Nav directory */}
              <div className="flex flex-col border-b border-[#2a231d]/12 lg:border-b-0 lg:border-r">
                <p className="px-3 pb-2 pt-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#8a7d6f]">
                  {en ? "Select a project" : "Choisir un projet"}
                </p>
                {projects.map((project, index) => (
                  <ProjectNavItem
                    key={project.id}
                    index={index}
                    id={project.id}
                    name={project.name}
                    designation={project.designation}
                    isActive={index === activeIndex}
                    ariaPrefix={en ? "Show" : "Afficher"}
                    onClick={handleSelect}
                  />
                ))}
              </div>

              {/* Browser preview */}
              <div className="flex flex-col p-4 md:p-5">
                <div className="overflow-hidden rounded-none border border-[#2a231d]/16 bg-[#17120f] shadow-[6px_6px_0_rgba(42,35,29,0.12)]">
                  {/* Chrome */}
                  <div className="flex items-center gap-3 border-b border-white/10 bg-[#211a15] px-3 py-2">
                    <span className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    </span>
                    <span className="flex min-w-0 flex-1 items-center gap-2 truncate rounded-none border border-white/10 bg-[#fffaf0]/5 px-3 py-1 text-[11px] font-medium text-[#cbbfae]">
                      <span className="text-[#7fd28a]">●</span>
                      <span className="truncate">{getDomain(activeProject.projectUrl)}</span>
                    </span>
                  </div>
                  {/* Screenshot */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      key={activeProject.src}
                      src={activeProject.src}
                      alt={activeProject.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-4 flex flex-1 flex-col">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <TextRotate
                      ref={textRotateRef}
                      texts={projects.map((project) => project.name)}
                      mainClassName="text-xl font-display font-semibold text-[#17120f] md:text-2xl"
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
                    <span className="inline-flex rounded-none border border-[#2a231d]/14 bg-[#f5f1e8] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#d94f2b]">
                      {activeProject.segment}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#63584d]">{activeProject.quote}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeProject.scope.map((item) => (
                      <span
                        key={item}
                        className="border border-[#2a231d]/12 bg-[#fffaf0] px-2 py-1 text-[10px] font-black uppercase tracking-[0.06em] text-[#63584d]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseLine({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-[#2a231d]/10 bg-[#fffaf0]/72 p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#8a7d6f]">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-[#63584d]">{text}</p>
    </div>
  );
}
