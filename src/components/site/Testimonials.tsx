"use client";

import { motion } from "motion/react";
import { TestimonialsColumn, type TestimonialsColumnItem } from "@/components/ui/testimonials-columns-1";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const testimonials: TestimonialsColumnItem[] = [
  {
    name: "Claire Dubois",
    role: "Gérante • Café de quartier, Lille",
    text: "Le nouveau site a clarifié notre offre en quelques secondes. On reçoit plus de demandes directes qu'avant.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Hugo Martin",
    role: "Directeur • Hôtel indépendant, Annecy",
    text: "La nouvelle direction visuelle inspire tout de suite plus de confiance. Le taux de contact a progressé dès le premier mois.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Sofia Ribeiro",
    role: "Fondatrice • Pâtisserie, Bordeaux",
    text: "On a gagné en cohérence de marque et en lisibilité. Les clients comprennent mieux notre univers et nos produits.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Jules Tardieu",
    role: "Gérant • Restaurant, Nantes",
    text: "Le parcours mobile est devenu beaucoup plus fluide. Les réservations arrivent sans friction.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Maya Laurent",
    role: "Co-fondatrice • Bar à vins, Paris",
    text: "Tout est plus élégant et plus simple à parcourir. On sent une vraie montée en gamme de l'image.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Nassim Benali",
    role: "Propriétaire • Boulangerie, Lyon",
    text: "Le design traduit enfin la qualité de notre savoir-faire artisanal. Les retours clients sont très positifs.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240&h=240",
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);

export function Testimonials() {
  return (
    <section id="temoignages" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Témoignages"
            title="Des retours qui confirment l'impact"
            description="Des retours clients structurés par métier, pour montrer des bénéfices concrets et lisibles."
            center
          />
        </Reveal>

        <Reveal delay={0.08}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative mt-8 overflow-hidden rounded-[34px] border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.87),rgba(227,240,255,0.68))] p-4 shadow-[0_34px_56px_rgba(122,157,220,0.24)] md:p-6"
          >
            <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-[#9fc4ff]/36 blur-[80px]" />
            <div className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-white/54 blur-[92px]" />

            <div className="[mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
              <div className="flex justify-center gap-4 overflow-hidden py-1 md:gap-5">
                <TestimonialsColumn testimonials={firstColumn} duration={16} />
                <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
