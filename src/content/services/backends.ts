import type { ServiceRecord } from "./types";

export const backends: ServiceRecord = {
  key: "backends",
  slug: { fr: "apis-backends", en: "apis-backends" },
  eyebrow: { fr: "APIs & backends", en: "APIs & backends" },
  title: {
    fr: "Le produit que vos utilisateurs ne voient pas, mais sur lequel tout repose.",
    en: "The part your users do not see, but everything else depends on.",
  },
  description: {
    fr: "Conception et développement d'APIs et de backends fiables : authentification, paiements, intégrations, données et temps réel, au service de vos applications web et mobiles.",
    en: "Design and development of reliable APIs and backends: authentication, payments, integrations, data and real time, powering your web and mobile applications.",
  },
  problem: {
    fr: "Un backend fragile se paie longtemps : pannes difficiles à diagnostiquer, données incohérentes, intégrations qui cassent et fonctionnalités impossibles à ajouter proprement.",
    en: "A fragile backend is paid for over a long time: outages hard to diagnose, inconsistent data, breaking integrations and features impossible to add cleanly.",
  },
  useCases: {
    fr: [
      { title: "APIs", body: "Des interfaces claires et documentées pour vos applications et vos partenaires." },
      { title: "Backends mobiles", body: "Le socle serveur de vos applications iOS et Android." },
      { title: "Authentification et permissions", body: "Comptes, sessions, rôles et accès gérés côté serveur." },
      { title: "Paiements", body: "Encaissements, abonnements et webhooks de paiement fiables." },
      { title: "Webhooks et intégrations", body: "Vos outils connectés entre eux, sans ressaisie manuelle." },
      { title: "Données", body: "Modèles de données structurés, migrations maîtrisées, sauvegardes." },
      { title: "Temps réel", body: "Notifications et mises à jour instantanées quand l'usage le justifie." },
    ],
    en: [
      { title: "APIs", body: "Clear, documented interfaces for your applications and partners." },
      { title: "Mobile backends", body: "The server foundation of your iOS and Android applications." },
      { title: "Authentication and permissions", body: "Accounts, sessions, roles and access handled server side." },
      { title: "Payments", body: "Reliable charging, subscriptions and payment webhooks." },
      { title: "Webhooks and integrations", body: "Your tools connected together, without manual re-entry." },
      { title: "Data", body: "Structured data models, controlled migrations, backups." },
      { title: "Real time", body: "Notifications and instant updates where usage justifies it." },
    ],
  },
  approach: {
    fr: [
      "Comprendre les flux métier avant de dessiner les endpoints.",
      "Concevoir le modèle de données comme un actif durable de l'entreprise.",
      "Sécuriser les cas d'erreur : un backend se juge sur ses mauvais jours.",
      "Documenter pour que d'autres développeurs puissent reprendre sans friction.",
    ],
    en: [
      "Understand business flows before drawing endpoints.",
      "Design the data model as a durable company asset.",
      "Secure the failure cases: a backend is judged on its bad days.",
      "Document so other developers can take over without friction.",
    ],
  },
  engineering: {
    fr: [
      "Validation et contrôle des entrées côté serveur, jamais uniquement côté client.",
      "Gestion des erreurs et des reprises pensée pour les intégrations externes.",
      "Migrations de base de données versionnées et réversibles.",
      "Journalisation et supervision pour diagnostiquer vite en production.",
    ],
    en: [
      "Server-side input validation and control, never client side only.",
      "Error handling and retries designed for external integrations.",
      "Versioned, reversible database migrations.",
      "Logging and monitoring to diagnose quickly in production.",
    ],
  },
  technologies: ["Node.js", "TypeScript", "PostgreSQL", "REST", "Webhooks"],
  proofProjects: ["pick4me", "pont-facturx"],
  faq: {
    fr: [
      {
        question: "Pouvez-vous reprendre un backend existant ?",
        answer: "Oui, après un audit du code et des données pour établir un état des lieux honnête avant de proposer un plan d'action.",
      },
      {
        question: "Travaillez-vous avec une équipe déjà en place ?",
        answer: "Oui. Le backend peut être conçu et documenté pour être exploité par vos développeurs, avec une passation claire.",
      },
      {
        question: "Comment la fiabilité est-elle assurée ?",
        answer: "Par la conception : validation serveur, gestion des erreurs, migrations maîtrisées et supervision en production. La fiabilité n'est pas une option ajoutée à la fin.",
      },
    ],
    en: [
      {
        question: "Can you take over an existing backend?",
        answer: "Yes, after an audit of the code and data to establish an honest assessment before proposing an action plan.",
      },
      {
        question: "Do you work with an existing team?",
        answer: "Yes. The backend can be designed and documented to be operated by your developers, with a clear handover.",
      },
      {
        question: "How is reliability ensured?",
        answer: "By design: server validation, error handling, controlled migrations and production monitoring. Reliability is not an option added at the end.",
      },
    ],
  },
};
