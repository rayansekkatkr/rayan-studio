"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const faqFr = [
  {
    q: "Combien de temps prend un projet ?",
    a: "La plupart des projets sont livrés entre 1 et 3 semaines selon le périmètre. Une première direction visuelle est généralement présentée sous 72h.",
  },
  {
    q: "Puis-je garder certains contenus de mon site actuel ?",
    a: "Oui. Je conserve les contenus pertinents et je retravaille la structure, la hiérarchie et le ton pour améliorer la lisibilité et l'impact.",
  },
  {
    q: "Le site est-il optimisé mobile ?",
    a: "Oui. L'expérience mobile est traitée en priorité: lisibilité, rapidité, boutons d'action visibles et parcours fluide.",
  },
  {
    q: "Travaillez-vous avec quels types de commerces ?",
    a: "Principalement restaurants, cafés, hôtels, boulangeries, pâtisseries, bars et commerces locaux qui veulent renforcer leur image en ligne.",
  },
  {
    q: "Je ne connais rien au web, est-ce un problème ?",
    a: "Pas du tout. Je vous explique chaque étape simplement et je m'occupe de toute la partie technique.",
  },
];

const faqEn = [
  {
    q: "How long does a project take?",
    a: "Most projects are delivered in 1 to 3 weeks depending on scope. A first visual direction is usually shared within 72 hours.",
  },
  {
    q: "Can we keep content from my current site?",
    a: "Yes. I keep relevant content and rework structure, hierarchy, and tone to improve clarity and impact.",
  },
  {
    q: "Is the site mobile-optimized?",
    a: "Yes. Mobile experience is a priority: readability, performance, and clear conversion actions.",
  },
  {
    q: "Which businesses do you work with?",
    a: "Mainly restaurants, cafes, hotels, bakeries, pastry shops, bars, and local businesses looking to upgrade their online image.",
  },
  {
    q: "I do not know anything about websites. Is that a problem?",
    a: "Not at all. I explain each step in simple words and handle all technical parts for you.",
  },
];

export function Faq({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const faq = en ? faqEn : faqFr;

  return (
    <section id="faq" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title={en ? "Frequently asked questions" : "Questions fréquentes"}
            description={
              en
                ? "Clear answers so you understand exactly how collaboration works."
                : "Des réponses concrètes pour savoir exactement comment se déroule la collaboration."
            }
            center
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-8 max-w-4xl space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((item, index) => (
                <AccordionItem key={item.q} value={`item-${index}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
