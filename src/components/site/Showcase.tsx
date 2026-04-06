"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { TextRotate, type TextRotateRef } from "@/components/ui/text-rotate";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const projects = [
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

const caseStudies = [
  {
    title: "Hôtel indépendant",
    context: "Refonte d'un site vitrine daté avec peu de demandes directes.",
    action: "Hiérarchie clarifiée, CTA visibles, parcours mobile simplifié.",
    result: "+41% de demandes sur 30 jours",
  },
  {
    title: "Café de quartier",
    context: "Site peu différenciant, informations clés difficiles à trouver.",
    action: "Nouveau storytelling, sections utiles au-dessus de la ligne de flottaison.",
    result: "+24 messages WhatsApp sur 30 jours",
  },
  {
    title: "Boulangerie artisanale",
    context: "Produits et savoir-faire mal mis en valeur.",
    action: "Vitrine produit plus visuelle, navigation orientée conversion.",
    result: "+26% de commandes / demandes traiteur",
  },
];

function ProjectThumb({
  index,
  image,
  title,
  onClick,
}: {
  index: number;
  image: string;
  title: string;
  onClick: (index: number) => void;
}) {
  return (
    <div className="py-3">
      <button
        type="button"
        onClick={() => onClick(index)}
        className="group relative h-24 w-full overflow-hidden rounded-2xl border border-white/85 bg-white/70 text-left shadow-[0_10px_22px_rgba(123,157,217,0.22)]"
        aria-label={`Afficher ${title}`}
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

export function Showcase() {
  const textRotateRef = useRef<TextRotateRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    textRotateRef.current?.jumpTo(index);
  };

  return (
    <section id="realisations" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Réalisations"
            title="Réalisations: transformations concrètes, avant / après visibles"
            description="Un portfolio centré commerces locaux, complété par quelques références B2B pour montrer le niveau d'exécution."
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
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05} y={16} className="mt-6 md:mt-8">
          <div className="relative overflow-hidden rounded-[34px] border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.87),rgba(227,240,255,0.66))] p-4 shadow-[0_36px_64px_rgba(122,157,220,0.28)] md:p-6">
            <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-[#a4c7ff]/34 blur-[78px]" />
            <div className="pointer-events-none absolute -right-14 bottom-5 h-48 w-48 rounded-full bg-white/50 blur-[88px]" />
            <div className="absolute left-5 top-5 z-20 rounded-full border border-white/85 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#2f6dff] shadow-[0_10px_20px_rgba(122,157,220,0.22)] backdrop-blur-xl">
              Projet actif
            </div>

            <div className="relative grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="overflow-hidden rounded-[28px] border border-white/85 bg-white/72 p-3 backdrop-blur-2xl">
                <div className="relative h-[340px] overflow-hidden rounded-2xl border border-white/80 md:h-[390px]">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Projet en focus</p>
                  <TextRotate
                    ref={textRotateRef}
                    texts={projects.map((project) => project.name)}
                    mainClassName="mt-2 text-2xl md:text-3xl font-display font-semibold text-slate-900"
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
                        <a href={activeProject.beforeUrl} target="_blank" rel="noreferrer">
                          Voir avant
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild size="sm" className="h-9">
                      <a href={activeProject.projectUrl} target="_blank" rel="noreferrer">
                        Voir le projet
                        <ExternalLink size={14} className="ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] border border-white/80 bg-white/66 p-3 backdrop-blur-2xl">
                <div className="mb-2 flex items-center justify-between px-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Sélection visuelle</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">
                    Cliquer pour changer
                    <ArrowUpRight size={12} />
                  </span>
                </div>

                <div className="rounded-2xl px-1">
                  {projects.map((project, index) => (
                    <ProjectThumb
                      key={project.id}
                      index={index}
                      image={project.src}
                      title={project.name}
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
