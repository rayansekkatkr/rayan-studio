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
    title: "Diagnostic",
    description:
      "On regarde votre situation actuelle: image, clarté du message, mobile, SEO, nom de domaine et hébergement.",
    image: "/process/discovery.webp",
  },
  {
    id: "02",
    title: "Structure et maquette",
    description:
      "Je clarifie les sections, les priorités et les appels à l'action avant de construire le site.",
    image: "/process/direction.webp",
  },
  {
    id: "03",
    title: "Design et développement",
    description:
      "Je crée une interface plus crédible, rapide, lisible sur mobile et cohérente avec votre activité.",
    image: "/process/development.webp",
  },
  {
    id: "04",
    title: "SEO, DNS et VPS",
    description:
      "Je pose les bases SEO, configure le domaine, l'hébergement, et le VPS si le projet le nécessite.",
    image: "/process/development.webp",
  },
  {
    id: "05",
    title: "Déploiement et support",
    description:
      "Je mets le site en ligne proprement, vérifie les points clés et reste disponible pour les derniers ajustements.",
    image: "/process/launch.webp",
  },
];

const PROCESS_STEPS_EN: ProcessItem[] = [
  {
    id: "01",
    title: "Diagnosis",
    description:
      "We review your current situation: image, message clarity, mobile, SEO, domain name and hosting.",
    image: "/process/discovery.webp",
  },
  {
    id: "02",
    title: "Structure and mockup",
    description:
      "I clarify the sections, priorities and calls to action before building the site.",
    image: "/process/direction.webp",
  },
  {
    id: "03",
    title: "Design and development",
    description:
      "I create a more credible interface that is fast, mobile-readable and consistent with your business.",
    image: "/process/development.webp",
  },
  {
    id: "04",
    title: "SEO, DNS and VPS",
    description: "I set SEO foundations, configure the domain, hosting, and VPS when the project needs it.",
    image: "/process/development.webp",
  },
  {
    id: "05",
    title: "Deployment and support",
    description: "I publish the site cleanly, check the key points and stay available for final adjustments.",
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

  const activeItem = resolvedItems[activeIndex];

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid items-stretch gap-7 lg:grid-cols-12 lg:gap-10">
        {/* Steps rail */}
        <div className="order-2 flex flex-col lg:order-1 lg:col-span-5">
          <ol className="flex flex-col">
            {resolvedItems.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleTabClick(index)}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "group relative flex w-full items-start gap-4 border-t border-[#2a231d]/12 py-3.5 pl-5 text-left transition-colors duration-300 first:border-0 md:py-4",
                      isActive ? "text-[#17120f]" : "text-[#8a7d6f] hover:text-[#17120f]",
                    )}
                  >
                    {/* accent rail */}
                    <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-[#2a231d]/10">
                      {isActive && (
                        <motion.span
                          key={`progress-${index}-${isPaused}`}
                          className="absolute left-0 top-0 block w-full origin-top bg-[#d94f2b]"
                          initial={{ height: "0%" }}
                          animate={isPaused ? { height: "100%" } : { height: "100%" }}
                          transition={{ duration: isPaused ? 0 : AUTO_PLAY_DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </span>

                    <span
                      className={cn(
                        "mt-0.5 font-display text-sm font-semibold tabular-nums transition-colors duration-300",
                        isActive ? "text-[#d94f2b]" : "text-[#bdb09e]",
                      )}
                    >
                      {item.id}
                    </span>

                    <div className="flex flex-1 flex-col">
                      <span
                        className={cn(
                          "font-display text-lg font-medium leading-snug tracking-tight transition-colors duration-300 md:text-xl",
                          isActive ? "text-[#17120f]" : "",
                        )}
                      >
                        {item.title}
                      </span>

                      <AnimatePresence initial={false} mode="wait">
                        {isActive && (
                          <motion.p
                            key={item.id}
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 6 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="max-w-md overflow-hidden text-sm leading-relaxed text-[#63584d]"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Visual */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div
            className="relative h-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[4/3] h-full min-h-[280px] overflow-hidden rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/70 shadow-[8px_8px_0_rgba(42,35,29,0.08)] lg:aspect-auto">
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
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="block h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Caption */}
              <div className="pointer-events-none absolute inset-x-5 bottom-5 z-20 md:inset-x-7 md:bottom-7">
                <span className="inline-flex items-center gap-2 border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  <span className="text-[#ff9b76]">{activeItem.id}</span>
                  {activeItem.title}
                </span>
              </div>

              {/* Nav */}
              <div className="absolute bottom-5 right-5 z-20 flex gap-2 md:bottom-7 md:right-7">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePrev();
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/90 text-[#17120f] backdrop-blur-md transition-all hover:bg-[#fffaf0] active:scale-90 md:h-11 md:w-11"
                  aria-label={en ? "Previous step" : "Étape précédente"}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNext();
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/90 text-[#17120f] backdrop-blur-md transition-all hover:bg-[#fffaf0] active:scale-90 md:h-11 md:w-11"
                  aria-label={en ? "Next step" : "Étape suivante"}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalTabs;
