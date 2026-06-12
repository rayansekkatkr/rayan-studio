"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const plansFr = [
  {
    name: "Creation Express",
    price: "A partir de 700 EUR",
    description: "Pour creer un premier site simple, propre et rassurant.",
    forWho: "Ideal si votre entreprise n'a pas encore de vraie presence en ligne.",
    result: "Vous obtenez une vitrine claire, mobile et prete a etre partagee a vos clients.",
    features: [
      "Page principale ou petit site simple",
      "Design responsive adapte a votre activite",
      "SEO de base pour etre trouvable",
      "Formulaire ou WhatsApp visible",
      "Domaine, DNS, hebergement et mise en ligne accompagnes",
    ],
    featured: false,
  },
  {
    name: "Refonte Pro",
    price: "A partir de 1200 EUR",
    description: "Pour remplacer un site date par une vitrine plus credible.",
    forWho: "Ideal si votre site existe deja mais ne reflete plus la qualite de votre entreprise.",
    result: "Votre site devient plus clair, plus moderne, et donne davantage envie de vous contacter.",
    features: [
      "Diagnostic rapide du site actuel",
      "Nouvelle direction visuelle",
      "Structure et messages retravailles",
      "SEO local ou SEO de base",
      "DNS, hebergement, VPS si besoin et deploiement inclus",
      "Suivi court apres livraison",
    ],
    featured: true,
  },
  {
    name: "Sur mesure",
    price: "Devis",
    description: "Pour un projet plus complet avec besoins specifiques.",
    forWho: "Ideal si vous avez plusieurs pages, une administration, ou des fonctionnalites precises.",
    result: "Vous obtenez une solution plus complete, alignee avec votre activite et votre organisation.",
    features: [
      "Audit et cadrage plus approfondis",
      "Direction creative avancee",
      "Pages ou parcours supplementaires",
      "Administration simple si necessaire",
      "Fonctionnalites specifiques selon besoin",
      "Architecture, deploiement et VPS cadres selon le projet",
    ],
    featured: false,
  },
];

const plansEn = [
  {
    name: "Express Creation",
    price: "From EUR 700",
    description: "Create a simple, clean, trust-building first website.",
    forWho: "Best if your business does not yet have a proper online presence.",
    result: "You get a clear mobile storefront ready to share with customers.",
    features: [
      "Main page or small simple website",
      "Responsive design adapted to your activity",
      "Basic SEO to be findable",
      "Visible form or WhatsApp contact",
      "Domain, DNS, hosting and launch guidance",
    ],
    featured: false,
  },
  {
    name: "Pro Redesign",
    price: "From EUR 1200",
    description: "Replace a dated website with a more credible storefront.",
    forWho: "Best if your website exists but no longer reflects the quality of your business.",
    result: "Your website becomes clearer, more modern, and makes people more likely to contact you.",
    features: [
      "Quick diagnosis of the current website",
      "New visual direction",
      "Structure and messaging refinement",
      "Local or basic SEO",
      "DNS, hosting, VPS if needed and deployment included",
      "Short post-delivery follow-up",
    ],
    featured: true,
  },
  {
    name: "Custom",
    price: "Quote",
    description: "For a more complete project with specific requirements.",
    forWho: "Best if you need several pages, admin editing, or precise functionality.",
    result: "You get a more complete solution aligned with your business and workflow.",
    features: [
      "Deeper audit and scoping",
      "Advanced creative direction",
      "Additional pages or journeys",
      "Simple admin if needed",
      "Custom features based on needs",
      "Architecture, deployment and VPS scoped around the project",
    ],
    featured: false,
  },
];

const maintenanceFr = {
  title: "Maintenance legere apres livraison",
  subtitle: "Pour garder le site propre sans devoir reprendre la technique vous-meme.",
  price: "49 a 99 EUR/mois selon le besoin",
  includes: [
    "Petites modifications de textes",
    "Remplacement ponctuel d'images",
    "Surveillance basique et sauvegardes",
    "Support simple par message",
  ],
  note: "Propose apres livraison pour construire un revenu recurrent sans alourdir le projet initial.",
};

const maintenanceEn = {
  title: "Light maintenance after launch",
  subtitle: "Keep the website clean without handling the technical side yourself.",
  price: "EUR 49 to 99/month depending on needs",
  includes: ["Small text updates", "Occasional image replacement", "Basic monitoring and backups", "Simple message support"],
  note: "Offered after delivery to build recurring revenue without making the initial project heavier.",
};

export function Pricing({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const plans = en ? plansEn : plansFr;
  const maintenance = en ? maintenanceEn : maintenanceFr;

  return (
    <section id="tarifs" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={en ? "Pricing" : "Tarifs"}
            title={en ? "Simple offers built for a one-person studio" : "Des offres simples, pensees pour vendre sans se disperser"}
            description={
              en
                ? "The goal is not to sell cheap websites. It is to sell clear transformations that a small business can understand."
                : "Le but n'est pas de vendre des sites au rabais. Le but est de vendre une transformation claire, comprehensible par une TPE."
            }
            center
          />
        </Reveal>

        <Reveal delay={0.04}>
          <p className="mx-auto mt-4 max-w-4xl rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/82 px-4 py-3 text-sm font-semibold text-[#63584d]">
            {en
              ? "No technical skills needed on your side: design, SEO, DNS, hosting and launch can be handled in one place."
              : "Aucune competence technique necessaire de votre cote: design, SEO, DNS, hebergement et mise en ligne peuvent etre geres au meme endroit."}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <motion.div whileHover={{ y: -9 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                <Card
                  className={`relative h-full rounded-none ${
                    plan.featured
                      ? "shine-border border-[#17120f] bg-[linear-gradient(145deg,rgba(255,250,240,0.98),rgba(245,241,232,0.9))] shadow-[10px_10px_0_rgba(217,79,43,0.38)]"
                      : "border-[#2a231d]/14 bg-[#fffaf0]/82"
                  }`}
                >
                  <CardHeader>
                    {plan.featured ? (
                      <div className="inline-flex w-fit items-center gap-2 rounded-none border border-[#2a231d]/14 bg-[#17120f] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#fffaf0]">
                        <Sparkles size={12} />
                        {en ? "Main offer" : "Offre principale"}
                      </div>
                    ) : null}
                    <CardTitle className="mt-3">{plan.name}</CardTitle>
                    <p className="font-display mt-3 text-3xl font-semibold text-[#17120f] sm:text-4xl">{plan.price}</p>
                    <p className="text-sm text-[#63584d]">{plan.description}</p>
                    <p className="mt-2 rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] px-3 py-2 text-sm text-[#63584d]">
                      <span className="font-black text-[#17120f]">{en ? "For who:" : "Pour qui :"}</span> {plan.forWho}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#63584d]">
                        {en ? "What is included" : "Ce qui est inclus"}
                      </p>
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2 text-sm text-[#63584d]">
                          <span className="mt-0.5 rounded-none bg-[#17120f] p-1 text-[#fffaf0]">
                            <Check size={11} />
                          </span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] px-3 py-2 text-sm text-[#63584d]">
                      <span className="font-black text-[#17120f]">{en ? "Expected result:" : "Resultat attendu :"}</span>{" "}
                      {plan.result}
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
          <div className="mt-7 rounded-none border border-[#2a231d]/14 bg-[linear-gradient(145deg,rgba(255,250,240,0.95),rgba(232,224,210,0.78))] p-4 shadow-[8px_8px_0_rgba(42,35,29,0.09)] sm:p-5">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#d94f2b]">
              {en ? "Optional recurring support" : "Support recurrent optionnel"}
            </p>
            <h3 className="font-display mt-2 text-xl font-semibold text-[#17120f] sm:text-2xl">{maintenance.title}</h3>
            <p className="mt-2 text-sm text-[#63584d]">{maintenance.subtitle}</p>
            <p className="mt-3 text-sm font-black text-[#17120f]">
              {en ? "Budget:" : "Budget :"} {maintenance.price}
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {maintenance.includes.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-none border border-[#2a231d]/12 bg-[#fffaf0]/78 px-3 py-2 text-sm text-[#63584d]">
                  <span className="mt-0.5 rounded-none bg-[#17120f] p-1 text-[#fffaf0]">
                    <Check size={11} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#63584d]">{maintenance.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
