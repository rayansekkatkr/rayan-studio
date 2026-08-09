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

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function ProjectThumb({
  index,
  image,
  title,
  designation,
  isActive,
  ariaPrefix,
  onClick,
}: {
  index: number;
  image: string;
  title: string;
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
      aria-label={`${ariaPrefix} ${title}`}
      className={cn(
        "group relative flex w-full items-center gap-3 overflow-hidden rounded-none border p-2 text-left transition-all duration-300",
        isActive
          ? "border-[#2a231d]/22 bg-[#17120f] shadow-[4px_4px_0_rgba(42,35,29,0.16)]"
          : "border-[#2a231d]/14 bg-[#fffaf0]/70 hover:border-[#2a231d]/22 hover:bg-[#fffaf0]",
      )}
    >
      <span className="relative h-[clamp(40px,5.4vh,52px)] w-[78px] shrink-0 overflow-hidden rounded-none border border-[#2a231d]/12">
        <Image
          src={image}
          alt={title}
          fill
          sizes="78px"
          className="object-cover object-top transition duration-500 group-hover:scale-105"
        />
        {!isActive && <span className="absolute inset-0 bg-[#fffaf0]/24" />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            "truncate font-display text-[13px] font-semibold leading-tight transition-colors",
            isActive ? "text-[#fffaf0]" : "text-[#17120f]",
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "mt-0.5 truncate text-[10px] uppercase tracking-[0.08em] transition-colors",
            isActive ? "text-[#fffaf0]/60" : "text-[#6f6355]",
          )}
        >
          {designation}
        </span>
      </span>
      <span
        className={cn(
          "shrink-0 font-display text-[11px] font-semibold tabular-nums transition-colors",
          isActive ? "text-[#ff9b76]" : "text-[#bdb09e]",
        )}
      >
        /0{index + 1}
      </span>
    </button>
  );
}

export function Showcase({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const projects = en ? projectsEn : projectsFr;
  const textRotateRef = useRef<TextRotateRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    textRotateRef.current?.jumpTo(index);
    trackEvent("project_select", { project_id: projects[index].id, source: "showcase_thumb", locale });
  };

  return (
    <section id="realisations" className="section-screen section-fit px-4 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={en ? "Work" : "Réalisations"}
            title={
              en
                ? "Work: concrete transformations, before / after"
                : "Réalisations: des transformations concrètes, avant / après"
            }
            description={
              en
                ? "A portfolio focused on local businesses, completed with selected B2B references to show execution quality."
                : "Un portfolio centré commerces locaux, complété par quelques références B2B pour montrer le niveau d'exécution."
            }
          />
        </Reveal>

        <Reveal delay={0.05} y={16} className="mt-5 md:mt-7">
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
              <span className="text-[11px] font-black uppercase tracking-[0.14em] tabular-nums text-[#6f6355]">
                0{activeIndex + 1} <span className="text-[#bdb09e]">/ 0{projects.length}</span>
              </span>
            </div>

            {/* Body: focus preview + visual selector */}
            <div className="grid lg:grid-cols-[1.5fr_0.85fr]">
              {/* Focus preview */}
              <div className="flex flex-col gap-4 border-b border-[#2a231d]/12 p-4 md:p-5 lg:border-b-0 lg:border-r">
                {/* Browser-style screenshot */}
                <div className="overflow-hidden rounded-none border border-[#2a231d]/16 bg-[#17120f] shadow-[6px_6px_0_rgba(42,35,29,0.12)]">
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
                  <div className="relative h-[clamp(170px,26vh,300px)] overflow-hidden">
                    <Image
                      key={activeProject.src}
                      src={activeProject.src}
                      alt={activeProject.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6f6355]">
                    {en ? "Project in focus" : "Projet en focus"}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <TextRotate
                      ref={textRotateRef}
                      texts={projects.map((project) => project.name)}
                      mainClassName="font-display text-xl font-semibold text-[#17120f] md:text-2xl"
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
                    <span className="inline-flex rounded-none border border-[#2a231d]/14 bg-[#f5f1e8] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#c2461f]">
                      {activeProject.segment}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-[#6f6355]">{activeProject.designation}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#63584d]">{activeProject.quote}</p>

                  <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#6f6355]">
                    {en ? "What was worked on" : "Ce qui a été travaillé"}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
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

              {/* Visual selector */}
              <div className="flex flex-col p-4 md:p-5">
                <div className="mb-2.5 flex items-center justify-between px-0.5">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#6f6355]">
                    {en ? "Visual selection" : "Sélection visuelle"}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.1em] text-[#c2461f]">
                    {en ? "Click to switch" : "Cliquer pour changer"}
                    <ArrowUpRight size={12} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  {projects.map((project, index) => (
                    <ProjectThumb
                      key={project.id}
                      index={index}
                      image={project.src}
                      title={project.name}
                      designation={project.designation}
                      isActive={index === activeIndex}
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
