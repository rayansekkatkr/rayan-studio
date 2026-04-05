"use client";

import { TestimonialsV2, type TestimonialItem } from "@/components/ui/testimonials-v2";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const testimonials: TestimonialItem[] = [
  {
    name: "Claire D.",
    role: "Gérante, Café de quartier",
    text: "Le nouveau site a repositionné notre image en quelques jours. On sent enfin un vrai niveau premium.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Hugo M.",
    role: "Directeur, Hôtel indépendant",
    text: "La mise en scène visuelle crée immédiatement de la confiance. Les demandes directes ont nettement augmenté.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Sofia R.",
    role: "Fondatrice, Pâtisserie",
    text: "Process fluide, design remarquable et impact concret sur la perception de notre marque.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Jules T.",
    role: "Gérant, Restaurant",
    text: "On est passés d'un site correct à une vraie vitrine haut de gamme. Les clients nous le disent.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Maya L.",
    role: "Co-fondatrice, Bar à vins",
    text: "Le parcours est beaucoup plus clair. Les réservations depuis mobile sont devenues fluides et régulières.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Nassim B.",
    role: "Propriétaire, Boulangerie",
    text: "Le design transmet enfin la qualité de notre travail artisanal. Notre image locale a pris une autre dimension.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Lina E.",
    role: "Gérante, Concept Store",
    text: "Le site est élégant, rapide et rassurant. On a tout de suite gagné en crédibilité auprès des nouveaux visiteurs.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Paul G.",
    role: "Manager, Hôtel boutique",
    text: "Très belle exécution, beaucoup de soin dans les détails. Le rendu final est clairement au-dessus du marché local.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240&h=240",
  },
  {
    name: "Inès V.",
    role: "Fondatrice, Coffee shop",
    text: "Le site donne envie dès les premières secondes. On a récupéré plus de demandes qualifiées qu'avant.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=240&h=240",
  },
];

export function Testimonials() {
  return (
    <section id="temoignages" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Témoignages"
            title="Des retours qui confirment l'impact"
            description="Inspiré d'un pattern 21st: une section vivante qui fait défiler des retours clients réels, premium et crédibles."
            center
          />
        </Reveal>

        <Reveal delay={0.08}>
          <TestimonialsV2 items={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
