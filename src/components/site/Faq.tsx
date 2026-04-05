"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const faq = [
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
];

export function Faq() {
  return (
    <section id="faq" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions fréquentes"
            description="Des réponses concrètes pour savoir exactement comment se déroule la collaboration."
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
