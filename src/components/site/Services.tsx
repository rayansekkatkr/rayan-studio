"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Layers3, RefreshCw, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const services = [
  {
    icon: Layers3,
    title: "Création de site internet",
    subtitle: "Lancement d'un site premium de zéro",
    description:
      "Un site vitrine haut de gamme conçu pour donner instantanément une image plus crédible et plus désirable.",
    outcomes: ["Direction artistique signature", "Structure UX conversion", "Développement Next.js fluide"],
    cta: "Créer mon site",
  },
  {
    icon: RefreshCw,
    title: "Refonte de site existant",
    subtitle: "Montée en gamme de votre image digitale",
    description:
      "Je transforme votre site actuel en expérience premium: plus claire, plus moderne, plus rassurante dès les premières secondes.",
    outcomes: ["Audit perception & conversion", "Refonte UI premium", "Parcours plus lisible et vendeur"],
    cta: "Refondre mon site",
  },
];

const trustPills = ["+120 commerces accompagnés", "Prototype premium en 72h", "4,9/5 de satisfaction"];

export function Services() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="services" className="section-screen px-4 md:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="pointer-events-none absolute -left-12 top-24 h-56 w-56 rounded-full bg-[#9fc6ff]/35 blur-[88px]" />
        <div className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-white/55 blur-[96px]" />

        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Deux offres, un même objectif: faire monter votre commerce en gamme"
            description="Une section pensée comme une pièce premium: visuelle, claire, et orientée impact concret sur votre perception client."
          />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <motion.div
                whileHover={reducedMotion ? undefined : { y: -9, rotateX: 0.8, rotateY: index === 0 ? -0.8 : 0.8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="[perspective:1400px]"
              >
                <Card className="relative h-full overflow-hidden p-6 md:p-7">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(166,201,255,0.24),transparent_44%),radial-gradient(circle_at_82%_82%,rgba(255,255,255,0.45),transparent_42%)]" />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex rounded-2xl border border-[#d2e3ff] bg-[#ecf3ff] p-2.5 text-[#2f6dff]">
                          <service.icon size={19} />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2f6dff]">Service {index + 1}</p>
                          <h3 className="font-display mt-1 text-2xl font-semibold text-slate-900">{service.title}</h3>
                        </div>
                      </div>
                      <span className="rounded-full border border-white/85 bg-white/80 p-2 text-slate-500">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>

                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">{service.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>

                    <div className="mt-6 space-y-2.5">
                      {service.outcomes.map((outcome, itemIndex) => (
                        <motion.div
                          key={outcome}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.45, delay: itemIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center gap-2.5 rounded-xl border border-white/90 bg-white/78 px-4 py-3 text-sm font-medium text-slate-700"
                        >
                          <CheckCircle2 size={16} className="text-[#2f6dff]" />
                          {outcome}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <Badge variant="neutral" className="border-white/80 bg-white/78 text-slate-700">
                        <Sparkles size={12} className="mr-1 text-[#2f6dff]" />
                        Positionnement premium
                      </Badge>

                      <Button asChild size="sm" className="h-10 px-5">
                        <a href="#contact">{service.cta}</a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {trustPills.map((pill) => (
              <div
                key={pill}
                className="rounded-full border border-white/85 bg-white/74 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 backdrop-blur-xl"
              >
                {pill}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
