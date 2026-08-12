import type { Locale } from "@/lib/i18n";

export const STUDIO_CONTENT: Record<
  Locale,
  {
    hero: { title: string; keyIdea: string; body: string };
    principles: Array<{ title: string; body: string }>;
  }
> = {
  fr: {
    hero: {
      title: "Un studio indépendant pour concevoir, construire et faire évoluer des produits digitaux.",
      keyIdea: "Moins d'intermédiaires. Plus de continuité.",
      body: "Rayan Studio est un studio indépendant : vous travaillez directement avec la personne qui conçoit, développe et met en production votre produit. Pas de couches commerciales, pas de transferts de dossier, pas de perte d'information entre les étapes.",
    },
    principles: [
      { title: "Produit avant technologie", body: "Les choix techniques servent le produit et le métier, jamais l'inverse." },
      { title: "Un interlocuteur", body: "La même personne du premier échange à la mise en production, et après." },
      { title: "Construit pour durer", body: "Des architectures pensées pour évoluer sans réécriture complète." },
      { title: "Communication claire", body: "Des explications compréhensibles, des décisions argumentées, pas de jargon défensif." },
    ],
  },
  en: {
    hero: {
      title: "An independent studio to design, build and evolve digital products.",
      keyIdea: "Fewer intermediaries. More continuity.",
      body: "Rayan Studio is an independent studio: you work directly with the person who designs, builds and ships your product. No sales layers, no handovers, no information lost between stages.",
    },
    principles: [
      { title: "Product before technology", body: "Technical choices serve the product and the business, never the other way around." },
      { title: "One point of contact", body: "The same person from the first conversation to production, and beyond." },
      { title: "Built to last", body: "Architectures designed to evolve without a full rewrite." },
      { title: "Clear communication", body: "Understandable explanations, argued decisions, no defensive jargon." },
    ],
  },
};

export const RAYAN_CONTENT: Record<
  Locale,
  {
    name: string;
    role: string;
    overview: string[];
    focusTitle: string;
    focusAreas: string[];
    experienceTitle: string;
    experience: Array<{ title: string; body: string }>;
    contextTitle: string;
    context: string[];
  }
> = {
  fr: {
    name: "Rayan Sekkat",
    role: "Software Engineer & Founder",
    overview: [
      "Ingénieur logiciel full-stack, fondateur de Rayan Studio. Conçoit et développe des applications web, des plateformes SaaS et des sites premium de bout en bout : produit, design, développement, déploiement.",
      "Les produits du studio (Pick4Me, Pont Factur-X, GoodCall, DocExtract) sont conçus, développés et exploités en production par le studio.",
    ],
    focusTitle: "Domaines",
    focusAreas: [
      "Développement full-stack (web, APIs, données)",
      "Produits SaaS et plateformes métier",
      "DevOps, cloud et mise en production",
      "Direction visuelle et UX orientée conversion",
    ],
    experienceTitle: "Parcours",
    experience: [
      { title: "Rayan Studio", body: "Studio indépendant : produits propres et projets clients." },
      { title: "STMicroelectronics", body: "Ingénierie DevOps, 2024." },
      { title: "UNYC", body: "Développement logiciel, 2020 à 2023." },
    ],
    contextTitle: "Langues et contexte",
    context: [
      "Français et anglais comme langues de travail.",
      "Basé à Séoul, collaboration à distance avec la France et l'international.",
    ],
  },
  en: {
    name: "Rayan Sekkat",
    role: "Software Engineer & Founder",
    overview: [
      "Full-stack software engineer, founder of Rayan Studio. Designs and builds web applications, SaaS platforms and premium websites end to end: product, design, development, deployment.",
      "The studio's products (Pick4Me, Pont Factur-X, GoodCall, DocExtract) are designed, built and operated in production by the studio.",
    ],
    focusTitle: "Focus areas",
    focusAreas: [
      "Full-stack development (web, APIs, data)",
      "SaaS products and business platforms",
      "DevOps, cloud and production launches",
      "Visual direction and conversion-oriented UX",
    ],
    experienceTitle: "Background",
    experience: [
      { title: "Rayan Studio", body: "Independent studio: own products and client projects." },
      { title: "STMicroelectronics", body: "DevOps engineering, 2024." },
      { title: "UNYC", body: "Software development, 2020 to 2023." },
    ],
    contextTitle: "Languages and context",
    context: [
      "French and English as working languages.",
      "Based in Seoul, remote collaboration with France and international clients.",
    ],
  },
};
