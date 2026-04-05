"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, BrainCircuit, ShieldCheck, TrendingUp, WandSparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const problems = [
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

const solutions = [
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

const miniObjects = [
  { label: "Clarté", value: "x2", icon: BrainCircuit, position: "left-2 top-3" },
  { label: "Confiance", value: "+64%", icon: ShieldCheck, position: "right-0 top-16" },
  { label: "Conversion", value: "+41%", icon: TrendingUp, position: "left-5 bottom-4" },
];

export function ProblemSolution() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="probleme-solution" className="section-screen relative px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Problème / Solution"
            title="Du site correct au site qui inspire confiance"
            description="Une lecture visuelle simple: ce qui freine aujourd'hui, ce qui change après refonte, et pourquoi cela agit sur la perception."
          />
        </Reveal>

        <div className="relative mt-8">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[2px] w-[72%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#b7d4ff]/70 to-transparent lg:block" />

          <div className="grid items-center gap-4 lg:grid-cols-[1fr_0.58fr_1fr]">
            <Reveal>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <Card className="relative overflow-hidden border-slate-700/35 bg-[linear-gradient(150deg,rgba(23,30,45,0.96),rgba(35,48,73,0.9))] text-white shadow-[0_24px_44px_rgba(18,28,49,0.45)]">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-white md:text-xl">
                      <AlertTriangle size={17} className="text-rose-300" />
                      Avant : ce qui freine
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {problems.map((problem, index) => (
                      <div key={problem.title} className="rounded-xl border border-white/12 bg-white/6 p-3.5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-200/80">0{index + 1}</p>
                        <p className="mt-1.5 text-sm font-semibold text-white">{problem.title}</p>
                        <p className="mt-1 text-sm text-slate-300">{problem.detail}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="relative mx-auto h-[280px] w-full max-w-[320px]">
                <motion.div
                  className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cce1ff]"
                  animate={reducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dceaff]"
                  animate={reducedMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
                />

                {miniObjects.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={`absolute ${item.position} z-10 rounded-2xl border border-white/80 bg-white/82 px-3 py-2 backdrop-blur-xl`}
                    animate={
                      reducedMotion
                        ? undefined
                        : {
                            y: [0, index % 2 === 0 ? -7 : 7, 0],
                            x: [0, index === 1 ? 3 : -3, 0],
                          }
                    }
                    transition={{ duration: 4.2 + index * 0.7, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">
                      <item.icon size={11} />
                      {item.label}
                    </p>
                    <p className="font-display mt-1 text-base font-semibold text-slate-900">{item.value}</p>
                  </motion.div>
                ))}

                <motion.div
                  className="glass-panel-strong relative z-20 mt-16 rounded-[26px] px-6 py-7 text-center shadow-[0_24px_40px_rgba(119,154,217,0.3)]"
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          y: [0, -7, 0],
                          scale: [1, 1.01, 1],
                        }
                  }
                  transition={{ duration: 5.3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2f6dff]">AI Design Uplift</p>
                  <p className="font-display mt-2 text-2xl font-semibold text-slate-900">Transformation</p>
                  <p className="mt-2 text-sm text-slate-600">Design + stratégie + conversion</p>
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <Card className="relative overflow-hidden border-[#cfe1ff] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(228,240,255,0.85))] shadow-[0_24px_44px_rgba(120,156,220,0.25)]">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-slate-900 md:text-xl">
                      <WandSparkles size={17} className="text-[#2f6dff]" />
                      Après : ce qui change
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {solutions.map((solution, index) => (
                      <div key={solution.title} className="rounded-xl border border-white/90 bg-white/84 p-3.5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2f6dff]">0{index + 1}</p>
                        <p className="mt-1.5 text-sm font-semibold text-slate-900">{solution.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{solution.detail}</p>
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
