"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const faq = [
  {
    q: "Combien de temps prend un projet ?",
    a: "La plupart des projets sont livrés entre 1 et 3 semaines selon le périmètre. Un prototype visuel est souvent prêt très vite.",
  },
  {
    q: "Puis-je garder certains contenus de mon site actuel ?",
    a: "Oui. On conserve les contenus utiles et on retravaille la structure, la hiérarchie et le ton pour les rendre plus efficaces.",
  },
  {
    q: "Le site est-il optimisé mobile ?",
    a: "Oui. L'expérience mobile est traitée en priorité pour garantir lisibilité, rapidité et interactions fluides.",
  },
  {
    q: "Travaillez-vous avec quels types de commerces ?",
    a: "Restaurants, cafés, hôtels, boulangeries, pâtisseries, bars et commerces locaux qui veulent monter en gamme.",
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
            description="Réponses directes pour savoir comment se déroule la collaboration."
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
