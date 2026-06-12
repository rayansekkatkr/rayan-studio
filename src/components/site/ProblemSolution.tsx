"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const problemsFr = [
  {
    title: "Image perçue trop standard",
    detail: "Le design ne reflète pas la qualité réelle du lieu.",
  },
  {
    title: "Message trop flou",
    detail: "L'offre n'est pas comprise immédiatement.",
  },
  {
    title: "Parcours peu engageant",
    detail: "Réserver, appeler ou demander reste trop difficile.",
  },
];

const problemsEn = [
  {
    title: "Perceived image feels too generic",
    detail: "The design does not reflect the actual quality of the business.",
  },
  {
    title: "Message is too unclear",
    detail: "The offer is not understood immediately.",
  },
  {
    title: "Journey lacks engagement",
    detail: "Booking, calling, or inquiring remains too difficult.",
  },
];

const solutionsFr = [
  {
    title: "Direction visuelle signature",
    detail: "Une identité claire qui élève instantanément la perception.",
  },
  {
    title: "Narration structurée",
    detail: "Chaque section rassure, prouve et déclenche l'action.",
  },
  {
    title: "UX orientée conversion",
    detail: "Les actions clés deviennent naturelles et rapides.",
  },
];

const solutionsEn = [
  {
    title: "Signature visual direction",
    detail: "A clear identity that instantly elevates perception.",
  },
  {
    title: "Structured storytelling",
    detail: "Each section reassures, proves value, and drives action.",
  },
  {
    title: "Conversion-focused UX",
    detail: "Key actions become natural and fast.",
  },
];

const focusItemsFr = [
  "Identité du lieu mieux reflétée",
  "Parcours client plus évident",
  "Action de contact plus naturelle",
];

const focusItemsEn = [
  "Venue identity reflected more clearly",
  "Customer journey made more obvious",
  "Contact action made more natural",
];

export function ProblemSolution({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const problems = en ? problemsEn : problemsFr;
  const solutions = en ? solutionsEn : solutionsFr;
  const focusItems = en ? focusItemsEn : focusItemsFr;
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();
  const shouldAnimate = !reducedMotion && !isMobile;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <section id="probleme-solution" className="section-screen relative px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={en ? "Problem / Solution" : "Problème / Solution"}
            title={en ? "From a decent site to a trust-building website" : "Du site correct au site qui inspire confiance"}
            description={
              en
                ? "A simple visual read: what slows growth today, what changes after redesign, and why it improves perception."
                : "Une lecture visuelle simple: ce qui freine aujourd'hui, ce qui change après refonte, et pourquoi cela agit sur la perception."
            }
          />
        </Reveal>

        <div className="relative mt-8">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[72%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#2a231d]/18 to-transparent lg:block" />

          <div className="grid items-center gap-4 lg:grid-cols-[1fr_0.58fr_1fr]">
            <Reveal>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <Card className="relative overflow-hidden rounded-none border-[#17120f] ![background:#17120f] text-[#fffaf0] shadow-[8px_8px_0_rgba(217,79,43,0.26)]">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-[#fffaf0] md:text-xl">
                      <AlertTriangle size={17} className="text-[#f0a064]" />
                      {en ? "Before: what blocks growth" : "Avant : ce qui freine"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {problems.map((problem, index) => (
                      <div key={problem.title} className="rounded-none border border-white/16 bg-white/6 p-3.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#f0a064]">0{index + 1}</p>
                        <p className="mt-1.5 text-sm font-black text-[#fffaf0]">{problem.title}</p>
                        <p className="mt-1 text-sm text-[#d8cdbf]">{problem.detail}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>

            <Reveal delay={0.06}>
              <motion.div
                className="relative mx-auto w-full max-w-[320px] rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/86 px-5 py-6 shadow-[6px_6px_0_rgba(42,35,29,0.08)] backdrop-blur-xl"
                animate={shouldAnimate ? { y: [0, -5, 0] } : undefined}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#d94f2b]">
                  {en ? "Creative direction" : "Direction créative"}
                </p>
                <p className="font-display mt-2 text-2xl font-semibold leading-tight text-[#17120f]">
                  {en ? "From generic to memorable" : "Du générique au mémorable"}
                </p>
                <div className="mt-5 space-y-3">
                  {focusItems.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-[#63584d]">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#d94f2b]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Reveal>

            <Reveal delay={0.12}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <Card className="relative overflow-hidden rounded-none border-[#2a231d]/14 bg-[linear-gradient(145deg,rgba(255,250,240,0.96),rgba(239,231,217,0.82))] shadow-[8px_8px_0_rgba(42,35,29,0.08)]">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-[#17120f] md:text-xl">
                      <CheckCircle2 size={17} className="text-[#d94f2b]" />
                      {en ? "After: what changes" : "Après : ce qui change"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {solutions.map((solution, index) => (
                      <div key={solution.title} className="rounded-none border border-[#2a231d]/12 bg-[#fffaf0]/78 p-3.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#d94f2b]">0{index + 1}</p>
                        <p className="mt-1.5 text-sm font-black text-[#17120f]">{solution.title}</p>
                        <p className="mt-1 text-sm text-[#63584d]">{solution.detail}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
