"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const plansFr = [
  {
    name: "Essentiel",
    price: "500€",
    description: "Pour lancer un site simple, propre et rassurant.",
    forWho: "Idéal si vous démarrez ou si vous n'avez pas encore de vrai site.",
    result: "Vous obtenez une présence en ligne claire qui donne confiance dès la première visite.",
    features: [
      "1 page complète (présentation, services, contact)",
      "Design adapté à votre activité",
      "Version mobile incluse",
      "Mise en ligne prête à l'emploi",
      "Page d'administration facile: non incluse",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "1000€",
    description: "Pour améliorer fortement votre image et obtenir plus de demandes.",
    forWho: "Idéal pour un commerce déjà lancé qui veut passer un cap.",
    result: "Votre site devient plus clair, plus convaincant, et pousse davantage à vous contacter.",
    features: [
      "Structure plus complète et plus persuasive",
      "Sections de preuve (avis, résultats, avant/après)",
      "Boutons d'action visibles pour appeler/écrire",
      "Parcours pensé pour convertir davantage",
      "Aide au lancement",
      "Page d'administration facile: en option",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "Sur devis",
    description: "Pour un projet sur mesure avec besoins spécifiques.",
    forWho: "Idéal si vous voulez une approche très personnalisée.",
    result: "Vous obtenez un site unique, aligné à 100% avec votre positionnement.",
    features: [
      "Accompagnement stratégique complet",
      "Direction créative avancée",
      "Contenus et messages retravaillés",
      "Fonctionnalités spécifiques selon vos besoins",
      "Page d'administration facile: incluse",
    ],
    featured: false,
  },
];

const plansEn = [
  {
    name: "Essential",
    price: "€500",
    description: "Launch a simple, clean, and trust-building website.",
    forWho: "Best if you are just starting or still do not have a solid website.",
    result: "You get a clear online presence that builds trust from the first visit.",
    features: [
      "1 complete page (about, services, contact)",
      "Design adapted to your business",
      "Mobile version included",
      "Go-live setup included",
      "Easy admin page: not included",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "€1000",
    description: "Improve your image significantly and get more inquiries.",
    forWho: "Best for established local businesses that want to level up.",
    result: "Your website becomes clearer, more convincing, and drives more contact requests.",
    features: [
      "Stronger and more persuasive structure",
      "Proof sections (testimonials, results, before/after)",
      "Clear call-to-action buttons",
      "Journey optimized for conversion",
      "Launch support",
      "Easy admin page: optional add-on",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "Custom quote",
    description: "For custom projects with specific requirements.",
    forWho: "Best if you want a highly tailored approach.",
    result: "You get a unique website fully aligned with your positioning.",
    features: [
      "Full strategic support",
      "Advanced creative direction",
      "Messaging and content refinement",
      "Custom features based on your needs",
      "Easy admin page: included",
    ],
    featured: false,
  },
];

const adminOptionFr = {
  title: "Option page d'administration facile (sans coder)",
  subtitle: "Permet de modifier le site en autonomie avec une interface simple.",
  price: "À partir de 300€ + hébergement mensuel si CMS externe",
  includes: [
    "Modifier les textes et rubriques",
    "Ajouter / remplacer / supprimer des images",
    "Créer, modifier et supprimer des événements",
    "Petite formation de prise en main (30 min)",
  ],
  note: "Recommandé pour les commerces qui mettent à jour leur contenu régulièrement.",
};

const adminOptionEn = {
  title: "Easy Admin Panel Add-on (no coding)",
  subtitle: "Lets you edit your website yourself with a simple interface.",
  price: "From €300 + monthly hosting if external CMS is used",
  includes: [
    "Edit text and sections",
    "Add / replace / remove images",
    "Create, edit, and remove events",
    "Quick onboarding session (30 min)",
  ],
  note: "Recommended for businesses that update content regularly.",
};

export function Pricing({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const plans = en ? plansEn : plansFr;
  const adminOption = en ? adminOptionEn : adminOptionFr;

  return (
    <section id="tarifs" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={en ? "Pricing" : "Tarifs"}
            title={en ? "Clear and transparent offers" : "Des offres claires et transparentes"}
            description={
              en
                ? "Simple words, no technical jargon: you quickly understand what is included, who each offer is for, and what result to expect."
                : "Des mots simples, sans jargon technique: vous comprenez rapidement ce qui est inclus, pour qui c'est fait, et le résultat attendu."
            }
            center
          />
        </Reveal>

        <Reveal delay={0.04}>
          <p className="mx-auto mt-4 max-w-4xl rounded-2xl border border-white/85 bg-white/75 px-4 py-3 text-sm text-slate-700">
            {en
              ? "No technical skills needed on your side. I guide you step by step with clear explanations."
              : "Aucune compétence technique n'est nécessaire de votre côté. Je vous guide étape par étape avec des explications claires."}
          </p>
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
                        {en ? "Most chosen" : "Le plus choisi"}
                      </div>
                    )}
                    <CardTitle className="mt-3">{plan.name}</CardTitle>
                    <p className="font-display mt-3 text-4xl font-semibold text-slate-900">{plan.price}</p>
                    <p className="text-sm text-slate-600">{plan.description}</p>
                    <p className="mt-2 rounded-xl border border-white/90 bg-white/70 px-3 py-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">{en ? "For who:" : "Pour qui :"}</span> {plan.forWho}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        {en ? "What is included" : "Ce qui est inclus"}
                      </p>
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="mt-0.5 rounded-full bg-[#eaf2ff] p-1 text-[#2f6dff]">
                            <Check size={11} />
                          </span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-[#d5e5ff] bg-[#edf4ff] px-3 py-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">{en ? "Expected result:" : "Résultat attendu :"}</span> {plan.result}
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto">
                    <Button asChild variant={plan.featured ? "default" : "glass"} className="w-full">
                      <a href={`/${locale}#contact`}>{en ? "Talk about this option" : "Parler de cette option"}</a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <div className="mt-7 rounded-3xl border border-[#d5e5ff] bg-[linear-gradient(145deg,rgba(237,244,255,0.95),rgba(255,255,255,0.92))] p-5 shadow-[0_20px_36px_rgba(121,156,214,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">
              {en ? "Optional add-on" : "Option complémentaire"}
            </p>
            <h3 className="font-display mt-2 text-2xl font-semibold text-slate-900">{adminOption.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{adminOption.subtitle}</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {en ? "Budget:" : "Budget :"} {adminOption.price}
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {adminOption.includes.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-xl border border-white/90 bg-white/80 px-3 py-2 text-sm text-slate-700">
                  <span className="mt-0.5 rounded-full bg-[#eaf2ff] p-1 text-[#2f6dff]">
                    <Check size={11} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-600">{adminOption.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
