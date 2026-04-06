"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { isEnglish, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ProcessItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const PROCESS_STEPS_FR: ProcessItem[] = [
  {
    id: "01",
    title: "Découverte",
    description:
      "On aligne vos objectifs business, votre cible locale et la perception haut de gamme que votre site doit transmettre.",
    image: "/process/discovery.webp",
  },
  {
    id: "02",
    title: "Direction visuelle",
    description:
      "Je crée une direction art claire, des maquettes premium et une hiérarchie visuelle pensée pour convaincre vite.",
    image: "/process/direction.webp",
  },
  {
    id: "03",
    title: "Développement",
    description:
      "Intégration Next.js avec animations raffinées, performances solides et expérience fluide sur desktop et mobile.",
    image: "/process/development.webp",
  },
  {
    id: "04",
    title: "Mise en ligne",
    description:
      "Déploiement propre, vérifications finales et suivi pour transformer le lancement en vrai levier commercial.",
    image: "/process/launch.webp",
  },
];

const PROCESS_STEPS_EN: ProcessItem[] = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We align your business goals, local audience, and the premium perception your website must communicate.",
    image: "/process/discovery.webp",
  },
  {
    id: "02",
    title: "Visual direction",
    description:
      "I build a clear art direction, premium mockups, and a visual hierarchy designed to convince fast.",
    image: "/process/direction.webp",
  },
  {
    id: "03",
    title: "Development",
    description:
      "Next.js integration with refined animations, strong performance, and a smooth experience on desktop and mobile.",
    image: "/process/development.webp",
  },
  {
    id: "04",
    title: "Launch",
    description: "Clean deployment, final checks, and follow-up so launch becomes a real business lever.",
    image: "/process/launch.webp",
  },
];

const AUTO_PLAY_DURATION = 5000;

export function VerticalTabs({ locale = "fr", items }: { locale?: Locale; items?: ProcessItem[] }) {
  const en = isEnglish(locale);
  const resolvedItems = items || (en ? PROCESS_STEPS_EN : PROCESS_STEPS_FR);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.45 });

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % resolvedItems.length);
  }, [resolvedItems.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + resolvedItems.length) % resolvedItems.length);
  }, [resolvedItems.length]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused || reducedMotion || !isInView) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext, isInView, reducedMotion]);

  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      y: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div ref={containerRef} className="w-full py-1 md:py-3">
      <div className="mx-auto w-full max-w-7xl px-0">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 flex flex-col justify-center pt-2 lg:order-1 lg:col-span-5">
            <div className="mb-6 space-y-1">
              <h3 className="font-display text-balance text-2xl font-medium tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
                {en ? "How I support your business" : "Comment je vous accompagne"}
              </h3>
              <span className="ml-0.5 block text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
                (PROCESS)
              </span>
            </div>

            <div className="flex flex-col">
              {resolvedItems.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-4 border-t border-slate-300/40 py-4 text-left transition-all duration-500 first:border-0 md:py-5",
                      isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900",
                    )}
                  >
                    <div className="absolute -left-4 bottom-0 top-0 w-[2px] bg-slate-300/50 md:-left-6">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute left-0 top-0 w-full origin-top bg-[#2f6dff]"
                          initial={{ height: "0%" }}
                          animate={isPaused ? { height: "0%" } : { height: "100%" }}
                          transition={{ duration: AUTO_PLAY_DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </div>

                    <span className="mt-1 text-[10px] font-medium tabular-nums opacity-55">/{item.id}</span>

                    <div className="flex flex-1 flex-col gap-2">
                      <span
                        className={cn(
                          "text-xl font-normal tracking-tight transition-colors duration-500 md:text-2xl lg:text-3xl",
                          isActive ? "text-slate-900" : "",
                        )}
                      >
                        {item.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-sm pb-2 text-sm font-normal leading-relaxed text-slate-600 md:text-base">
                              {item.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="order-1 flex h-full flex-col justify-end lg:order-2 lg:col-span-7">
            <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/70 bg-white/40 shadow-[0_24px_44px_rgba(123,156,206,0.2)] md:aspect-[4/3] md:rounded-[2.5rem] lg:aspect-[16/11]">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 h-full w-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <Image
                      src={resolvedItems[activeIndex].image}
                      alt={resolvedItems[activeIndex].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="block h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 z-20 flex gap-2 md:bottom-8 md:right-8 md:gap-3">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePrev();
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/75 bg-white/80 text-slate-900 backdrop-blur-md transition-all hover:bg-white active:scale-90 md:h-12 md:w-12"
                    aria-label={en ? "Previous step" : "Étape précédente"}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleNext();
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/75 bg-white/80 text-slate-900 backdrop-blur-md transition-all hover:bg-white active:scale-90 md:h-12 md:w-12"
                    aria-label={en ? "Next step" : "Étape suivante"}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalTabs;

