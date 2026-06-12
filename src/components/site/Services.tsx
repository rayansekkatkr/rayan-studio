"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Layers3, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Card } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const servicesFr = [
  {
    icon: RefreshCw,
    tag: "Offre principale",
    title: "Refonte Pro",
    subtitle: "Pour remplacer un site date par une vitrine qui inspire confiance",
    description:
      "Je reprends votre site actuel pour clarifier le message, moderniser l'image, optimiser le parcours et gerer la mise en ligne proprement.",
    outcomes: ["Audit rapide du site actuel", "Nouvelle direction visuelle", "SEO, DNS et deploiement inclus"],
    cta: "Demander un diagnostic",
  },
  {
    icon: Layers3,
    tag: "Premier site",
    title: "Creation Express",
    subtitle: "Pour exister en ligne sans devoir gerer la technique",
    description:
      "Je cree une presence simple, professionnelle et rapide pour les petites entreprises qui n'ont pas encore de vrai site.",
    outcomes: ["Page claire et responsive", "Contact WhatsApp ou formulaire", "Mise en ligne accompagnee"],
    cta: "Creer mon premier site",
  },
];

const servicesEn = [
  {
    icon: RefreshCw,
    tag: "Main offer",
    title: "Pro Redesign",
    subtitle: "Replace a dated website with a storefront that builds trust",
    description:
      "I redesign your current website to clarify the message, modernize the image, improve the journey, and handle a clean launch.",
    outcomes: ["Quick audit of the current site", "New visual direction", "SEO, DNS and launch included"],
    cta: "Request a diagnosis",
  },
  {
    icon: Layers3,
    tag: "First website",
    title: "Express Creation",
    subtitle: "Get online without managing the technical parts",
    description:
      "I create a simple, professional, fast online presence for small businesses that do not yet have a proper website.",
    outcomes: ["Clear responsive page", "WhatsApp or form contact", "Launch guidance included"],
    cta: "Create my first website",
  },
];

const trustPillsFr = ["Interlocuteur unique", "Diagnostic gratuit", "Technique prise en charge"];
const trustPillsEn = ["Single point of contact", "Free diagnosis", "Technical setup handled"];

export function Services({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const services = en ? servicesEn : servicesFr;
  const trustPills = en ? trustPillsEn : trustPillsFr;
  const reducedMotion = useReducedMotion();

  return (
    <section id="services" className="section-screen px-4 md:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="pointer-events-none absolute -left-8 top-24 h-px w-28 bg-[#d94f2b]/28" />

        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title={en ? "Two offers, one objective: make your business look credible online" : "Deux offres, un objectif: rendre votre entreprise credible en ligne"}
            description={
              en
                ? "For dated websites and businesses that still do not have a proper site."
                : "Pour les sites dates et les entreprises qui n'ont pas encore de vraie presence en ligne."
            }
          />
        </Reveal>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08} className="h-full">
              <motion.div
                whileHover={reducedMotion ? undefined : { y: -9, rotateX: 0.8, rotateY: index === 0 ? -0.8 : 0.8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="h-full [perspective:1400px]"
              >
                <Card className="relative h-full overflow-hidden rounded-none border-[#2a231d]/14 ![background:linear-gradient(145deg,rgba(255,250,240,0.98),rgba(241,232,217,0.92))] p-6 shadow-[8px_8px_0_rgba(42,35,29,0.08)] md:p-7">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(217,79,43,0.08),transparent_30%),linear-gradient(180deg,rgba(255,252,246,0.52),rgba(255,252,246,0)_48%)]" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#d94f2b]" />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex rounded-none border border-[#2a231d]/16 bg-[#17120f] p-2.5 text-[#fffaf0]">
                          <service.icon size={19} />
                        </span>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#d94f2b]">
                            {service.tag}
                          </p>
                          <h3 className="font-display mt-1 text-2xl font-semibold text-[#17120f]">{service.title}</h3>
                        </div>
                      </div>
                      <span className="rounded-none border border-[#2a231d]/14 bg-[#f5f1e8] p-2 text-[#63584d]">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>

                    <p className="mt-5 text-sm font-black uppercase tracking-[0.12em] text-[#63584d]">{service.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#63584d]">{service.description}</p>

                    <div className="mt-6 flex-1 space-y-2.5">
                      {service.outcomes.map((outcome, itemIndex) => (
                        <motion.div
                          key={outcome}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.45, delay: itemIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center gap-2.5 rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] px-4 py-3 text-sm font-bold text-[#342b24]"
                        >
                          <CheckCircle2 size={16} className="text-[#d94f2b]" />
                          {outcome}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <Badge variant="neutral" className="rounded-none border-[#2a231d]/14 bg-[#f5f1e8] text-[#63584d]">
                        {en ? "Built for small business" : "Pensé TPE"}
                      </Badge>

                      <Button asChild size="sm" className="h-10 px-5">
                        <a href={`/${locale}#contact`}>{service.cta}</a>
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
                className="rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/74 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#63584d] backdrop-blur-xl"
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
