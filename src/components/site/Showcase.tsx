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
    scope: ["Message hero", "Preuve visuelle", "Parcours essai"],
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
    id: "stampeo",
    name: "Stampeo",
    designation: "Local SaaS • Customer loyalty",
    quote:
      "Conversion-focused landing with immediate clarity: a clear value proposition, strong visual proof, and a smooth journey toward trial.",
    projectUrl: "https://stampeo.app/",
    src: "/realisations/stampeo.png",
    segment: "Core food & hospitality target",
    scope: ["Hero message", "Visual proof", "Trial journey"],
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
        className="group relative h-20 w-full overflow-hidden rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/78 text-left shadow-[4px_4px_0_rgba(42,35,29,0.08)] md:h-24"
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
          <div className="relative overflow-hidden rounded-none border border-[#2a231d]/14 bg-[linear-gradient(145deg,rgba(255,250,240,0.9),rgba(239,231,217,0.72))] p-4 shadow-[8px_8px_0_rgba(42,35,29,0.08)] md:p-6">
            <div className="absolute left-5 top-5 z-20 hidden rounded-none border border-[#2a231d]/14 bg-[#17120f] px-3 py-1 text-[11px] font-black uppercase tracking-[0.13em] text-[#fffaf0] shadow-[4px_4px_0_rgba(217,79,43,0.28)] backdrop-blur-xl sm:block">
              {en ? "Active project" : "Projet actif"}
            </div>

            <div className="relative grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="overflow-hidden rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/78 p-3 backdrop-blur-2xl">
                <div className="relative h-[260px] overflow-hidden rounded-none border border-[#2a231d]/12 sm:h-[310px] md:h-[390px]">
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
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a7d6f]">
                    {en ? "Project in focus" : "Projet en focus"}
                  </p>
                  <TextRotate
                    ref={textRotateRef}
                    texts={projects.map((project) => project.name)}
                    mainClassName="mt-2 text-xl font-display font-semibold text-[#17120f] sm:text-2xl md:text-3xl"
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
                  <p className="mt-1.5 text-sm font-medium text-[#63584d]">{activeProject.designation}</p>
                  <p className="mt-2 inline-flex w-fit rounded-none border border-[#2a231d]/14 bg-[#f5f1e8] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#d94f2b]">
                    {activeProject.segment}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#63584d]">{activeProject.quote}</p>
                  <div className="mt-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8a7d6f]">
                      {en ? "What was worked on" : "Ce qui a ete travaille"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeProject.scope.map((item) => (
                        <span
                          key={item}
                          className="border border-[#2a231d]/12 bg-[#fffaf0] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#63584d]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
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

              <div className="rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/66 p-3 backdrop-blur-2xl">
                <div className="mb-2 flex items-center justify-between px-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8a7d6f]">
                    {en ? "Visual selection" : "Sélection visuelle"}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#d94f2b]">
                    {en ? "Click to switch" : "Cliquer pour changer"}
                    <ArrowUpRight size={12} />
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-none px-1 md:block md:gap-0">
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

function CaseLine({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-[#2a231d]/10 bg-[#fffaf0]/72 p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#8a7d6f]">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-[#63584d]">{text}</p>
    </div>
  );
}
