import type { ProjectRecord } from "./types";

export const pick4me: ProjectRecord = {
  key: "pick4me",
  slug: "pick4me",
  title: "Pick4Me",
  kind: "product",
  liveUrl: "https://pick4me.be/",
  heroImage: "/realisations/pick4me.webp",
  year: "2026",
  links: [
    { label: { fr: "Voir le site", en: "Visit the website" }, href: "https://pick4me.be/" },
    { label: { fr: "App Store", en: "App Store" }, href: "https://apps.apple.com/us/app/pick4me-faites-vous-livrer/id6759987332" },
    { label: { fr: "Google Play", en: "Google Play" }, href: "https://play.google.com/store/apps/details?id=be.pick4me.app" },
  ],
  featuredOrder: 1,
  tone: "light",
  categories: {
    fr: ["Marketplace", "Mobile", "Backend", "Paiements"],
    en: ["Marketplace", "Mobile", "Backend", "Payments"],
  },
  summary: {
    fr: "Plateforme locale reliant mobilité et commerces de proximité, conçue et exploitée par le studio.",
    en: "Local platform connecting mobility and nearby businesses, designed and operated by the studio.",
  },
  role: {
    fr: "Conception, design et développement par le studio",
    en: "Designed, built and shipped by the studio",
  },
  status: {
    fr: "Produit du studio, en production",
    en: "Studio product, live",
  },
  technologies: ["Flutter", "NestJS", "PostgreSQL", "Socket.IO", "Stripe", "Firebase"],
  challenge: {
    fr: [
      "La plateforme devait permettre à plusieurs types d'utilisateurs de créer, accepter et suivre des missions tout en centralisant communication, paiements et notifications.",
      "Le produit devait garder un parcours compréhensible malgré plusieurs rôles, états de mission et actions métier.",
    ],
    en: [
      "The platform had to let several types of users create, accept and track missions while centralizing communication, payments and notifications.",
      "The product had to keep an understandable journey despite multiple roles, mission states and business actions.",
    ],
  },
  challengeHighlight: {
    fr: "créer, accepter et suivre des missions",
    en: "create, accept and track missions",
  },
  solution: {
    fr: [
      "Structurer les parcours autour du cycle de vie d'une mission.",
      "Centraliser communication, paiements et notifications dans une expérience cohérente.",
      "Séparer clairement les permissions et actions selon les rôles utilisateurs.",
    ],
    en: [
      "Structure the journeys around the life cycle of a mission.",
      "Centralize communication, payments and notifications in one coherent experience.",
      "Clearly separate permissions and actions by user role.",
    ],
  },
  capabilities: [
    {
      title: { fr: "Marketplace", en: "Marketplace" },
      body: {
        fr: "Création, acceptation et suivi de missions entre utilisateurs et commerces.",
        en: "Creation, acceptance and tracking of missions between users and businesses.",
      },
      benefit: { fr: "Chaque demande trouve un Helper sans échange hors de l'application.", en: "Every request finds a Helper without leaving the app." },
    },
    {
      title: { fr: "Communication en temps réel", en: "Real-time communication" },
      body: {
        fr: "Messagerie intégrée entre les parties d'une mission, avec mises à jour instantanées.",
        en: "Built-in messaging between mission parties, with instant updates.",
      },
      benefit: { fr: "Client et Helper suivent la livraison en direct, sans appel.", en: "Client and Helper follow the delivery live, without a call." },
    },
    {
      title: { fr: "Paiements & wallet", en: "Payments & wallet" },
      body: {
        fr: "Encaissements, portefeuille intégré et flux de paiement sécurisés côté serveur.",
        en: "Charging, an integrated wallet and payment flows secured server side.",
      },
      benefit: { fr: "Le paiement et la rémunération se règlent dans l'application.", en: "Payment and earnings are settled inside the app." },
    },
    {
      title: { fr: "Notifications", en: "Notifications" },
      body: {
        fr: "Notifications push qui suivent les étapes clés d'une mission.",
        en: "Push notifications following the key steps of a mission.",
      },
      benefit: { fr: "Personne ne rate une étape de la mission.", en: "Nobody misses a step of the mission." },
    },
    {
      title: { fr: "Administration", en: "Administration" },
      body: {
        fr: "Outils d'administration pour superviser missions, utilisateurs et paiements.",
        en: "Administration tools to supervise missions, users and payments.",
      },
      benefit: { fr: "Les opérations sont supervisées depuis un seul endroit.", en: "Operations are supervised from one place." },
    },
  ],
  productUx: {
    fr: [
      "Chaque rôle voit uniquement les actions qui le concernent : le parcours reste simple alors que la logique métier ne l'est pas.",
      "Le cycle de vie d'une mission structure l'interface : états visibles, prochaine action claire à chaque étape.",
      "L'application mobile privilégie les gestes courts : accepter, suivre, échanger et payer sans quitter le contexte de la mission.",
    ],
    en: [
      "Each role only sees the actions relevant to it: the journey stays simple even though the business logic is not.",
      "The mission life cycle structures the interface: visible states, a clear next action at every step.",
      "The mobile app favors short interactions: accept, track, chat and pay without leaving the mission context.",
    ],
  },
  engineering: {
    fr: [
      {
        title: "Backend NestJS modulaire",
        body: "Missions, chat, paiements, wallet, notifications et administration sont des modules distincts d'une même API, avec PostgreSQL comme source de vérité.",
      },
      {
        title: "Temps réel",
        body: "Messagerie et mises à jour instantanées via Socket.IO, avec un adaptateur Redis pour supporter plusieurs instances.",
      },
      {
        title: "Paiements",
        body: "Intégration Stripe côté serveur : encaissements, portefeuille et écritures comptables internes.",
      },
      {
        title: "Notifications push",
        body: "Envoi via Firebase, déclenché par les événements du cycle de vie des missions.",
      },
    ],
    en: [
      {
        title: "Modular NestJS backend",
        body: "Missions, chat, payments, wallet, notifications and administration are distinct modules of one API, with PostgreSQL as the source of truth.",
      },
      {
        title: "Real time",
        body: "Messaging and instant updates through Socket.IO, with a Redis adapter to support multiple instances.",
      },
      {
        title: "Payments",
        body: "Server-side Stripe integration: charging, wallet and internal ledger entries.",
      },
      {
        title: "Push notifications",
        body: "Delivered through Firebase, triggered by mission life-cycle events.",
      },
    ],
  },
  outcome: {
    fr: [
      "La plateforme réunit dans un même produit la gestion des missions, la communication, les flux de paiement, les notifications et l'administration.",
    ],
    en: [
      "The platform brings mission management, communication, payment flows, notifications and administration together in one product.",
    ],
  },
  heroCompanion: {
    src: "/realisations/pick4me-app.webp",
    alt: {
      fr: "Pick4Me : écran d'accueil client de l'application mobile, avec la livraison suivie en direct",
      en: "Pick4Me: client home screen of the mobile app, with the delivery tracked live",
    },
    width: 510,
    height: 1112,
  },
  screens: [
    {
      title: { fr: "Vue globale : le site et l'application", en: "Overview: the website and the app" },
      items: [
        {
          src: "/realisations/pick4me.webp",
          alt: {
            fr: "Pick4Me : site du produit avec les liens vers les stores",
            en: "Pick4Me: product website with the store links",
          },
          frame: "browser",
          width: 2400,
          height: 1350,
        },
        {
          src: "/realisations/pick4me-app.webp",
          alt: {
            fr: "Pick4Me : écran d'accueil client, mission en cours et suivi en direct",
            en: "Pick4Me: client home screen, mission in progress and live tracking",
          },
          frame: "phone",
          width: 510,
          height: 1112,
        },
      ],
    },
  ],
  gallery: [
    {
      src: "/realisations/pick4me.webp",
      alt: {
        fr: "Pick4Me : site du produit et écran d'accueil de l'application mobile avec suivi de livraison en direct",
        en: "Pick4Me: product website and mobile app home screen with live delivery tracking",
      },
    },
  ],
  next: "pont-facturx",
};
