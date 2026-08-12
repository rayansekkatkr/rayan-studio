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

export const METHOD_CONTENT: Record<
  Locale,
  {
    title: string;
    intro: string;
    reassurance: string;
    stages: Array<{ number: string; name: string; body: string }>;
  }
> = {
  fr: {
    title: "Une méthode simple, du cadrage à la production.",
    intro: "Cinq étapes, toujours dans le même ordre, adaptées à la taille réelle de chaque projet.",
    reassurance: "Vous n'avez pas besoin d'arriver avec un cahier des charges parfait.",
    stages: [
      { number: "01", name: "Discover", body: "Comprendre le besoin, les utilisateurs, les contraintes et les priorités." },
      { number: "02", name: "Design", body: "Définir le produit, les parcours et l'architecture avant de construire." },
      { number: "03", name: "Build", body: "Développer par itérations, intégrer les services nécessaires et tester." },
      { number: "04", name: "Launch", body: "Préparer l'infrastructure, valider et mettre en production proprement." },
      { number: "05", name: "Improve", body: "Maintenir, observer et faire évoluer le produit selon les besoins réels." },
    ],
  },
  en: {
    title: "A simple method, from framing to production.",
    intro: "Five stages, always in the same order, scaled to the real size of each project.",
    reassurance: "You do not need to arrive with a perfect specification document.",
    stages: [
      { number: "01", name: "Discover", body: "Understand the need, the users, the constraints and the priorities." },
      { number: "02", name: "Design", body: "Define the product, the journeys and the architecture before building." },
      { number: "03", name: "Build", body: "Develop iteratively, integrate the required services and test." },
      { number: "04", name: "Launch", body: "Prepare the infrastructure, validate and ship to production cleanly." },
      { number: "05", name: "Improve", body: "Maintain, observe and evolve the product based on real needs." },
    ],
  },
};

export const OFFERS_CONTENT: Record<
  Locale,
  {
    title: string;
    globalStatement: string;
    responsePromise: string;
    idealForLabel: string;
    mayIncludeLabel: string;
    ctaLabel: string;
    offers: Array<{ title: string; idealFor: string; mayInclude: string[] }>;
  }
> = {
  fr: {
    title: "Des offres construites autour de votre projet, pas d'une grille de prix.",
    globalStatement:
      "Chaque engagement est construit autour du périmètre réel du projet. Après un premier échange, vous recevez une proposition détaillée avec périmètre, planning et budget.",
    responsePromise: "Première réponse sous 24h ouvrées.",
    idealForLabel: "Idéal pour",
    mayIncludeLabel: "Peut inclure",
    ctaLabel: "Parler de votre projet",
    offers: [
      {
        title: "Applications & plateformes",
        idealFor: "Les entreprises qui ont besoin d'un produit web sur mesure : SaaS, plateforme métier, portail client ou marketplace.",
        mayInclude: [
          "Cadrage produit et UX",
          "Développement full-stack",
          "Paiements, comptes et permissions",
          "Mise en production et suivi",
        ],
      },
      {
        title: "MVP & lancement produit",
        idealFor: "Les fondateurs et équipes qui veulent transformer une idée en produit réel, sans six mois de développement.",
        mayInclude: [
          "Atelier de cadrage et priorisation",
          "Périmètre V1 réaliste",
          "Développement et mise en ligne",
          "Itérations après lancement",
        ],
      },
      {
        title: "Sites premium & refonte",
        idealFor: "Les entreprises et commerces dont le site ne reflète plus la qualité réelle de leur travail.",
        mayInclude: [
          "Direction visuelle et UX",
          "Développement sur mesure",
          "SEO, performance et analytics",
          "Migration, domaine et mise en ligne",
        ],
      },
      {
        title: "Accompagnement continu",
        idealFor: "Les produits déjà en ligne qui ont besoin d'évolutions régulières et d'une infrastructure fiable.",
        mayInclude: [
          "Évolutions fonctionnelles",
          "Supervision et fiabilité",
          "Améliorations de performance",
          "Conseil produit et technique",
        ],
      },
    ],
  },
  en: {
    title: "Engagements built around your project, not a price grid.",
    globalStatement:
      "Every engagement is built around the real scope of the project. After a first conversation, you receive a detailed proposal with scope, planning and budget.",
    responsePromise: "First response within 24 business hours.",
    idealForLabel: "Best for",
    mayIncludeLabel: "May include",
    ctaLabel: "Start a project",
    offers: [
      {
        title: "Applications & platforms",
        idealFor: "Companies that need a custom web product: SaaS, business platform, client portal or marketplace.",
        mayInclude: [
          "Product and UX framing",
          "Full-stack development",
          "Payments, accounts and permissions",
          "Production launch and follow-up",
        ],
      },
      {
        title: "MVP & product launch",
        idealFor: "Founders and teams who want to turn an idea into a real product without six months of development.",
        mayInclude: [
          "Framing and prioritization workshop",
          "A realistic V1 scope",
          "Development and launch",
          "Post-launch iterations",
        ],
      },
      {
        title: "Premium websites & redesign",
        idealFor: "Companies and local businesses whose website no longer reflects the real quality of their work.",
        mayInclude: [
          "Visual direction and UX",
          "Custom development",
          "SEO, performance and analytics",
          "Migration, domain and launch",
        ],
      },
      {
        title: "Ongoing partnership",
        idealFor: "Products already live that need regular evolutions and a reliable infrastructure.",
        mayInclude: [
          "Feature evolutions",
          "Monitoring and reliability",
          "Performance improvements",
          "Product and technical advice",
        ],
      },
    ],
  },
};

export const FAQ_CONTENT: Record<Locale, Array<{ question: string; answer: string }>> = {
  fr: [
    {
      question: "Travaillez-vous uniquement avec des entreprises françaises ?",
      answer: "Non. Le studio travaille à distance avec des entreprises en France et à l'international, en français comme en anglais.",
    },
    {
      question: "Pouvez-vous reprendre un projet existant ?",
      answer: "Oui. La reprise commence par un audit honnête de l'existant : code, données, hébergement. Vous recevez ensuite un plan d'action argumenté avant tout engagement.",
    },
    {
      question: "Travaillez-vous avec des équipes internes ?",
      answer: "Oui. Le studio peut intervenir en appui d'une équipe existante : développement, DevOps, cadrage produit, avec une documentation et une passation propres.",
    },
    {
      question: "Qui possède le code à la fin du projet ?",
      answer: "Vous. Le code, les accès et les données vous appartiennent, quel que soit le type d'engagement.",
    },
    {
      question: "Pouvez-vous gérer l'hébergement et le déploiement ?",
      answer: "Oui : domaine, DNS, hébergement, déploiement et supervision peuvent être pris en charge de bout en bout, ou configurés puis transmis à votre équipe.",
    },
    {
      question: "Comment sont établis les devis ?",
      answer: "Après un premier échange de cadrage. Vous recevez une proposition détaillée avec périmètre, planning et budget. Aucun prix n'est affiché publiquement car chaque projet a un périmètre différent.",
    },
    {
      question: "Comment démarrer un projet ?",
      answer: "Décrivez votre besoin via le formulaire de démarrage de projet. Première réponse sous 24h ouvrées, suivie d'un échange pour cadrer le périmètre.",
    },
  ],
  en: [
    {
      question: "Do you only work with French companies?",
      answer: "No. The studio works remotely with companies in France and internationally, in French and in English.",
    },
    {
      question: "Can you take over an existing project?",
      answer: "Yes. A takeover starts with an honest audit of what exists: code, data, hosting. You then receive an argued action plan before any commitment.",
    },
    {
      question: "Do you work with internal teams?",
      answer: "Yes. The studio can support an existing team: development, DevOps, product framing, with clean documentation and handover.",
    },
    {
      question: "Who owns the code at the end of the project?",
      answer: "You do. The code, access and data belong to you, whatever the type of engagement.",
    },
    {
      question: "Can you handle hosting and deployment?",
      answer: "Yes: domain, DNS, hosting, deployment and monitoring can be handled end to end, or configured then handed over to your team.",
    },
    {
      question: "How are quotes established?",
      answer: "After a first framing conversation. You receive a detailed proposal with scope, planning and budget. No prices are shown publicly because every project has a different scope.",
    },
    {
      question: "How do I start a project?",
      answer: "Describe your need through the start-a-project form. First response within 24 business hours, followed by a conversation to frame the scope.",
    },
  ],
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
