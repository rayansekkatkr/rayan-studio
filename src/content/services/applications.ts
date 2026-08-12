import type { ServiceRecord } from "./types";

export const applications: ServiceRecord = {
  key: "applications",
  slug: { fr: "applications-web-saas", en: "web-applications-saas" },
  eyebrow: { fr: "Applications web & SaaS", en: "Web applications & SaaS" },
  title: {
    fr: "Des produits web conçus autour de votre métier, pas autour d'un template.",
    en: "Web products designed around your business, not around a template.",
  },
  description: {
    fr: "Conception et développement d'applications web et de SaaS sur mesure : de la plateforme métier au portail client, avec un interlocuteur unique du cadrage à la mise en production.",
    en: "Design and development of custom web applications and SaaS products: from business platforms to client portals, with a single point of contact from framing to production.",
  },
  problem: {
    fr: "Les outils génériques finissent par contraindre votre fonctionnement : processus tordus pour rentrer dans le logiciel, données éparpillées, fonctionnalités payées mais inutiles.",
    en: "Generic tools end up constraining how you work: processes twisted to fit the software, scattered data, features you pay for but never use.",
  },
  useCases: {
    fr: [
      { title: "Produits SaaS", body: "Un produit par abonnement, de la première version au produit exploité en production." },
      { title: "Plateformes métier", body: "Des outils internes qui suivent vos processus réels au lieu de les contraindre." },
      { title: "Dashboards", body: "Vos données consolidées et lisibles pour décider plus vite." },
      { title: "Marketplaces", body: "Mise en relation, offres, commandes et paiements dans un parcours fluide." },
      { title: "Portails clients", body: "Un espace dédié où vos clients suivent leurs demandes, documents et échanges." },
      { title: "Abonnements et paiements", body: "Facturation récurrente, paiements en ligne et gestion des accès." },
      { title: "Rôles et permissions", body: "Des accès différenciés selon les équipes, les clients et les niveaux de responsabilité." },
      { title: "Temps réel", body: "Notifications, mises à jour instantanées et collaboration quand le métier le justifie." },
    ],
    en: [
      { title: "SaaS products", body: "A subscription product, from first version to a live, operated product." },
      { title: "Business platforms", body: "Internal tools that follow your real processes instead of constraining them." },
      { title: "Dashboards", body: "Your data consolidated and readable so you can decide faster." },
      { title: "Marketplaces", body: "Matching, listings, orders and payments in one smooth journey." },
      { title: "Client portals", body: "A dedicated space where your clients track requests, documents and exchanges." },
      { title: "Subscriptions and payments", body: "Recurring billing, online payments and access management." },
      { title: "Roles and permissions", body: "Differentiated access for teams, clients and responsibility levels." },
      { title: "Real time", body: "Notifications, instant updates and collaboration where the business justifies it." },
    ],
  },
  approach: {
    fr: [
      "Cadrage du besoin métier avant toute ligne de code : utilisateurs, processus, priorités.",
      "Conception UX et design orientés vers l'action, pas vers la démonstration.",
      "Développement itératif avec des versions utilisables tôt.",
      "Mise en production, suivi et évolutions après le lancement.",
    ],
    en: [
      "Business framing before any line of code: users, processes, priorities.",
      "UX and design oriented toward action, not demonstration.",
      "Iterative development with usable versions early.",
      "Production launch, monitoring and evolutions after release.",
    ],
  },
  engineering: {
    fr: [
      "Architecture pensée pour évoluer : le produit peut grandir sans réécriture complète.",
      "Base de données structurée autour de votre métier et de vos volumes réels.",
      "Authentification, rôles et permissions gérés côté serveur.",
      "Intégration de paiements et d'abonnements quand le modèle le demande.",
    ],
    en: [
      "Architecture designed to evolve: the product can grow without a full rewrite.",
      "A database structured around your business and your real volumes.",
      "Authentication, roles and permissions handled server side.",
      "Payments and subscriptions integrated when the model requires it.",
    ],
  },
  technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
  proofProjects: ["pick4me"],
  faq: {
    fr: [
      {
        question: "Faut-il un cahier des charges complet pour démarrer ?",
        answer: "Non. Le cadrage fait partie du travail : on part de votre besoin métier et on définit ensemble le périmètre avant de développer.",
      },
      {
        question: "Qui possède le code et les données ?",
        answer: "Vous. Le code, les accès et les données du produit vous appartiennent, avec une passation propre si vous internalisez plus tard.",
      },
      {
        question: "Le produit pourra-t-il évoluer après le lancement ?",
        answer: "Oui, c'est un critère de conception dès le départ : l'architecture est pensée pour accueillir de nouvelles fonctionnalités sans tout reconstruire.",
      },
    ],
    en: [
      {
        question: "Do I need a complete specification document to start?",
        answer: "No. Framing is part of the work: we start from your business need and define the scope together before building.",
      },
      {
        question: "Who owns the code and the data?",
        answer: "You do. The product's code, access and data belong to you, with a clean handover if you bring it in house later.",
      },
      {
        question: "Can the product evolve after launch?",
        answer: "Yes, that is a design criterion from day one: the architecture is built to accept new features without rebuilding everything.",
      },
    ],
  },
};
