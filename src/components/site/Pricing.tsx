"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const plans = [
  {
    name: "Essentiel",
    price: "500€",
    description: "Pour lancer une présence propre et crédible rapidement.",
    features: ["One-page premium", "Design sur-mesure", "Responsive complet", "Mise en ligne"],
    featured: false,
  },
  {
    name: "Pro",
    price: "1000€",
    description: "L'offre idéale pour transformer l'image d'un commerce local.",
    features: [
      "Structure avancée",
      "Animations premium",
      "Avant/Après intégré",
      "Optimisation conversion",
      "Support lancement",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "Sur devis",
    description: "Pour un projet ambitieux avec besoins spécifiques.",
    features: ["Direction créative poussée", "Contenu stratégique", "Intégrations spécifiques", "Accompagnement dédié"],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="tarifs" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Tarifs"
            title="Des offres claires, premium et transparentes"
            description="Pas de formule floue : un cadre net pour obtenir un site qui améliore réellement votre image et vos conversions."
            center
          />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <motion.div whileHover={{ y: -9 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                <Card
                  className={`relative h-full ${
                    plan.featured
                      ? "shine-border border-[#cfe1ff] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(229,241,255,0.86))] shadow-[0_30px_52px_rgba(124,159,221,0.28)]"
                      : ""
                  }`}
                >
                  <CardHeader>
                    {plan.featured && (
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d4e4ff] bg-white/82 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#2f6dff]">
                        <Sparkles size={12} />
                        Le plus choisi
                      </div>
                    )}
                    <CardTitle className="mt-3">{plan.name}</CardTitle>
                    <p className="font-display mt-3 text-4xl font-semibold text-slate-900">{plan.price}</p>
                    <p className="text-sm text-slate-600">{plan.description}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="mt-0.5 rounded-full bg-[#eaf2ff] p-1 text-[#2f6dff]">
                            <Check size={11} />
                          </span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto">
                    <Button asChild variant={plan.featured ? "default" : "glass"} className="w-full">
                      <a href="#contact">Choisir {plan.name}</a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
