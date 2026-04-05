"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Sparkles,
  Star,
} from "lucide-react";
import { type MouseEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroLiquidShader } from "@/components/ui/hero-liquid-shader";
import { Logos3 } from "@/components/ui/logos3";

const trustSignals = [
  {
    icon: BriefcaseBusiness,
    value: "+120",
    label: "commerces accompagnés",
    note: "Projets livrés entre 2023 et 2026",
  },
  {
    icon: Star,
    value: "4,9/5",
    label: "en satisfaction",
    note: "Moyenne des retours post-livraison",
  },
  {
    icon: Clock3,
    value: "72h",
    label: "première maquette",
    note: "Direction visuelle livrée rapidement",
  },
];

type SectorKey =
  | "restaurant"
  | "cafe"
  | "hotel"
  | "boulangerie"
  | "patisserie"
  | "bar"
  | "commerce";

const sectorOrder: SectorKey[] = ["restaurant", "cafe", "hotel", "boulangerie", "patisserie", "bar", "commerce"];

const sectorScenarios: Record<
  SectorKey,
  {
    label: string;
    subtitle: string;
    proofMain: string;
    proofNote: string;
    before: string;
    after: string;
    actionKpi: string;
  }
> = {
  restaurant: {
    label: "Restaurant",
    subtitle: "Un site qui donne faim, rassure vite, et déclenche la réservation.",
    proofMain: "+28% de réservations",
    proofNote: "Sur 30 jours après refonte",
    before: "Carte peu lisible, réservation cachée",
    after: "Carte claire, réservation visible en 1 clic",
    actionKpi: "+31 appels / mois",
  },
  cafe: {
    label: "Café",
    subtitle: "Un site chaleureux qui met en avant votre ambiance et vos produits.",
    proofMain: "+22% de demandes",
    proofNote: "Sur 30 jours après refonte",
    before: "Concept flou, infos dispersées",
    after: "Concept clair, infos utiles en premier",
    actionKpi: "+24 messages WhatsApp",
  },
  hotel: {
    label: "Hôtel",
    subtitle: "Un site plus premium pour inspirer confiance avant même l'arrivée.",
    proofMain: "+41% de demandes",
    proofNote: "Cas réel sur hôtel indépendant",
    before: "Image standard, faible différenciation",
    after: "Présentation haut de gamme, parcours fluide",
    actionKpi: "+19 contacts qualifiés",
  },
  boulangerie: {
    label: "Boulangerie",
    subtitle: "Un site qui valorise votre savoir-faire artisanal et vos spécialités.",
    proofMain: "+26% de commandes",
    proofNote: "Sur 30 jours après refonte",
    before: "Produits peu mis en valeur",
    after: "Produits hero, navigation simple",
    actionKpi: "+18 demandes traiteur",
  },
  patisserie: {
    label: "Pâtisserie",
    subtitle: "Une vitrine digitale raffinée qui donne envie en quelques secondes.",
    proofMain: "+29% de prises de contact",
    proofNote: "Sur 30 jours après refonte",
    before: "Univers de marque peu lisible",
    after: "Univers visuel cohérent et désirable",
    actionKpi: "+27 demandes événement",
  },
  bar: {
    label: "Bar",
    subtitle: "Un site qui met l'ambiance en avant et facilite les réservations de groupe.",
    proofMain: "+23% de réservations",
    proofNote: "Sur 30 jours après refonte",
    before: "Infos horaires/events noyées",
    after: "Events, horaires et CTA très visibles",
    actionKpi: "+21 réservations groupe",
  },
  commerce: {
    label: "Commerce local",
    subtitle: "Un site clair et crédible pour transformer les visites en demandes.",
    proofMain: "+25% de demandes",
    proofNote: "Moyenne observée après refonte",
    before: "Offre peu claire, message trop neutre",
    after: "Offre explicite, bénéfices immédiats",
    actionKpi: "+30 leads / mois",
  },
};

const intro = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.12,
    },
  },
};

const introItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectorSwap = {
  initial: { opacity: 0, y: 8, filter: "blur(3px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(3px)" },
};

export function Hero() {
  const [activeSector, setActiveSector] = useState<SectorKey>("restaurant");
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const spring = { stiffness: 110, damping: 23, mass: 0.8 };

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), spring);

  const layerFarX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-34, 34]), spring);
  const layerFarY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-18, 18]), spring);

  const base3dStyle: MotionStyle | undefined = reducedMotion ? undefined : { rotateX, rotateY };
  const currentSector = sectorScenarios[activeSector];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSector((previous) => {
        const index = sectorOrder.indexOf(previous);
        const nextIndex = (index + 1) % sectorOrder.length;
        return sectorOrder[nextIndex];
      });
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(x);
    pointerY.set(y);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden px-4 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32"
    >
      <HeroLiquidShader />

      <motion.div
        className="absolute -left-20 top-16 z-0 h-[24rem] w-[24rem] rounded-full bg-[#9dc3ff]/45 blur-[120px]"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 40, 0],
                y: [0, -30, 0],
                scale: [1, 1.14, 1],
              }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-12 z-0 h-[28rem] w-[28rem] rounded-full bg-[#dcecff]/80 blur-[132px]"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -36, 0],
                y: [0, 32, 0],
                scale: [1, 1.18, 1],
              }
        }
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
        <motion.div variants={intro} initial="hidden" animate="show" className="relative max-w-2xl">
          <div className="pointer-events-none absolute -left-8 -top-8 -z-10 h-[28rem] w-[28rem] rounded-[42px] bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.85),rgba(245,250,255,0.55)_42%,rgba(230,241,255,0.06)_75%)] blur-2xl" />

          <motion.div variants={introItem}>
            <Badge className="gap-2 border-white/80 bg-white/82 shadow-[0_12px_24px_rgba(129,160,209,0.18)]">
              <Sparkles size={13} />
              Sites vitrines pour commerces locaux
            </Badge>
          </motion.div>

          <motion.div variants={introItem} className="mt-5 flex flex-wrap gap-2">
            {sectorOrder.map((sector) => {
              const item = sectorScenarios[sector];
              const isActive = sector === activeSector;

              return (
                <button
                  key={sector}
                  type="button"
                  onClick={() => setActiveSector(sector)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.11em] transition ${
                    isActive
                      ? "border-[#b6d0ff] bg-[#eaf2ff] text-[#2f6dff]"
                      : "border-white/85 bg-white/78 text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>

          <motion.div variants={introItem} className="mt-7">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${activeSector}`}
                variants={sectorSwap}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-semibold leading-[1.01] text-slate-900 sm:text-5xl md:text-6xl"
              >
                Votre {currentSector.label.toLowerCase()} mérite un site qui
                <span className="block bg-gradient-to-r from-[#1f58ce] via-[#2f6dff] to-[#74a8ff] bg-clip-text text-transparent">
                  inspire confiance en 3 secondes.
                </span>
              </motion.h1>
            </AnimatePresence>
          </motion.div>

          <motion.div variants={introItem} className="mt-7 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${activeSector}`}
                variants={sectorSwap}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="text-base leading-relaxed text-slate-600 sm:text-lg"
              >
                {currentSector.subtitle}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div variants={introItem} className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="group relative overflow-hidden shimmer-btn">
              <a href="#contact">
                Voir une maquette de mon commerce
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <a href="https://wa.me/33636365696" target="_blank" rel="noreferrer">
                Parler sur WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.div variants={introItem} className="mt-6 grid gap-2.5 sm:grid-cols-3">
            {trustSignals.map((signal) => (
              <div
                key={signal.label}
                className="group relative overflow-hidden rounded-2xl border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(233,243,255,0.64))] px-2.5 py-2.5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_15%_20%,rgba(170,202,255,0.26),transparent_52%)]" />
                <div className="relative flex items-start justify-between gap-2">
                  <p className="font-display text-lg font-semibold leading-none text-slate-900">{signal.value}</p>
                  <span className="rounded-full border border-[#d7e7ff] bg-white/85 p-1.5 text-[#2f6dff]">
                    <signal.icon size={11} />
                  </span>
                </div>
                <p className="relative mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700">
                  {signal.label}
                </p>
                <p className="relative mt-1 text-[10px] text-slate-500">{signal.note}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[660px] [perspective:1900px]"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <motion.div
            className="absolute right-0 top-4 z-40"
            style={reducedMotion ? undefined : { x: layerFarX, y: layerFarY }}
            animate={
              reducedMotion
                ? undefined
                : {
                    y: [0, -12, 0],
                    rotate: [0, 1.8, 0],
                  }
            }
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Card className="w-56 border-[#d4e5ff] bg-white/84 p-4 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2f6dff]">Résultat réel</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`proof-${activeSector}`}
                  variants={sectorSwap}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mt-2 text-lg font-semibold text-slate-900">{currentSector.proofMain}</p>
                  <p className="mt-1 text-xs text-slate-500">{currentSector.proofNote}</p>
                </motion.div>
              </AnimatePresence>
            </Card>
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />

          <motion.div style={base3dStyle} className="relative z-20 origin-center [transform-style:preserve-3d]">
            <Card className="shine-border relative overflow-hidden rounded-[34px] border border-white/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.93),rgba(227,240,255,0.74))] p-4 shadow-[0_34px_80px_rgba(121,156,215,0.32)] sm:p-6">
                <div className="flex items-center justify-between rounded-2xl border border-white/85 bg-white/78 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Avant / Après</p>
                </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-900/10 bg-slate-900 p-5 text-white">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Avant</p>
                  <p className="mt-2 text-lg font-semibold">Site standard</p>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 rounded-full bg-slate-700" />
                    <div className="h-2 w-4/5 rounded-full bg-slate-700" />
                    <div className="h-2 w-3/5 rounded-full bg-slate-700" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`before-${activeSector}`}
                      variants={sectorSwap}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-5 rounded-xl border border-slate-700 bg-slate-800/80 p-3 text-xs text-slate-300"
                    >
                      {currentSector.before}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="rounded-2xl border border-[#d7e6ff] bg-gradient-to-br from-white to-[#e8f2ff] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2f6dff]">Après</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Expérience haut de gamme</p>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 rounded-full bg-[#ccdeff]" />
                    <div className="h-2 w-4/5 rounded-full bg-[#ccdeff]" />
                    <div className="h-2 w-3/5 rounded-full bg-[#ccdeff]" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`after-${activeSector}`}
                      variants={sectorSwap}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-5 rounded-xl border border-[#d5e5ff] bg-white/90 p-3 text-xs text-slate-600"
                    >
                      {currentSector.after}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`kpi-${activeSector}`}
                  variants={sectorSwap}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 rounded-xl border border-white/90 bg-white/80 px-3 py-3 backdrop-blur-sm"
                >
                  <p className="text-[11px] uppercase tracking-[0.13em] text-slate-500">Action mesurée</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{currentSector.actionKpi}</p>
                </motion.div>
              </AnimatePresence>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-7xl border-t border-white/50 pt-5">
        <Logos3 heading="Commerces accompagnés" />
      </div>
    </section>
  );
}
