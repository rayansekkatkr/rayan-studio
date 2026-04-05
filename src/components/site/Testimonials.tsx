"use client";

import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const testimonials = [
  {
    name: "Claire D.",
    role: "Gérante • Café de quartier, Lille",
    text: "Le nouveau site a clarifié notre offre en quelques secondes. On reçoit plus de demandes directes qu'avant.",
    metric: "+27% demandes",
  },
  {
    name: "Hugo M.",
    role: "Directeur • Hôtel indépendant, Annecy",
    text: "La nouvelle direction visuelle inspire tout de suite plus de confiance. Le taux de contact a progressé dès le premier mois.",
    metric: "+19% contacts",
  },
  {
    name: "Sofia R.",
    role: "Fondatrice • Pâtisserie, Bordeaux",
    text: "On a gagné en cohérence de marque et en lisibilité. Les clients comprennent mieux notre univers et nos produits.",
    metric: "Perception + nette",
  },
  {
    name: "Jules T.",
    role: "Gérant • Restaurant, Nantes",
    text: "Le parcours mobile est devenu beaucoup plus fluide. Les réservations arrivent sans friction.",
    metric: "Mobile mieux converti",
  },
  {
    name: "Maya L.",
    role: "Co-fondatrice • Bar à vins, Paris",
    text: "Tout est plus élégant et plus simple à parcourir. On sent une vraie montée en gamme de l'image.",
    metric: "Image renforcée",
  },
  {
    name: "Nassim B.",
    role: "Propriétaire • Boulangerie, Lyon",
    text: "Le design traduit enfin la qualité de notre savoir-faire artisanal. Les retours clients sont très positifs.",
    metric: "Confiance immédiate",
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
            description="Des retours clients structurés par métier, pour montrer des bénéfices concrets et lisibles."
            center
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <article
                key={item.name}
                className="rounded-3xl border border-white/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(229,241,255,0.72))] p-5 shadow-[0_18px_30px_rgba(123,157,217,0.2)] backdrop-blur-xl"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Avis client {index + 1}</span>
                  <span className="inline-flex items-center gap-1 text-[#2f6dff]">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} size={12} fill="currentColor" />
                    ))}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">“{item.text}”</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
                <p className="mt-2 inline-flex rounded-full border border-[#d6e6ff] bg-[#eef5ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">
                  {item.metric}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
