import type { ProjectRecord } from "./types";

export const goodcall: ProjectRecord = {
  key: "goodcall",
  slug: "goodcall",
  title: "GoodCall",
  kind: "product",
  liveUrl: "https://goodcall.gg/en/",
  heroImage: "/realisations/goodcall.png",
  featuredOrder: 3,
  tone: "energy",
  categories: {
    fr: ["Esport", "Pronostics", "Social", "Classements"],
    en: ["Esports", "Predictions", "Social", "Rankings"],
  },
  summary: {
    fr: "Plateforme gratuite de pronostics esport couvrant LoL, Valorant et CS2.",
    en: "Free esports prediction platform covering LoL, Valorant and CS2.",
  },
  role: {
    fr: "Conception, design et développement par le studio",
    en: "Designed, built and shipped by the studio",
  },
  status: {
    fr: "Produit du studio, en production",
    en: "Studio product, live",
  },
  technologies: ["NestJS", "Prisma", "PostgreSQL", "Redis", "Turborepo", "React Native"],
  challenge: {
    fr: [
      "Présenter beaucoup d'informations liées aux compétitions, pronostics et classements sans rendre l'expérience difficile à lire ou à utiliser sur mobile.",
    ],
    en: [
      "Present a large amount of information about competitions, predictions and rankings without making the experience hard to read or use on mobile.",
    ],
  },
  solution: {
    fr: [
      "Hiérarchiser les informations autour des matchs et pronostics.",
      "Créer des classements et mécaniques sociales lisibles malgré la densité de données.",
      "Conserver une identité esport forte sans sacrifier la clarté produit.",
    ],
    en: [
      "Prioritize information around matches and predictions.",
      "Build rankings and social mechanics that stay readable despite the data density.",
      "Keep a strong esports identity without sacrificing product clarity.",
    ],
  },
  capabilities: [
    {
      title: { fr: "Pronostics", en: "Predictions" },
      body: {
        fr: "Pronostics gratuits sur les matchs de LoL, Valorant et CS2.",
        en: "Free predictions on LoL, Valorant and CS2 matches.",
      },
    },
    {
      title: { fr: "Classements", en: "Leaderboards" },
      body: {
        fr: "Classements construits sur la justesse des pronostics.",
        en: "Rankings built on prediction accuracy.",
      },
    },
    {
      title: { fr: "Ligues privées", en: "Private leagues" },
      body: {
        fr: "Compétitions entre amis dans des ligues privées.",
        en: "Competitions between friends in private leagues.",
      },
    },
    {
      title: { fr: "Points sociaux", en: "Social points" },
      body: {
        fr: "Mécanique de points sans argent réel : la compétition reste sociale et gratuite.",
        en: "A points mechanic with no real money: the competition stays social and free.",
      },
    },
    {
      title: { fr: "Expérience multi-jeux", en: "Multi-game experience" },
      body: {
        fr: "Une même expérience de pronostic à travers plusieurs jeux esport.",
        en: "One prediction experience across several esports titles.",
      },
    },
  ],
  productUx: {
    fr: [
      "Les matchs et pronostics forment l'unité de base de l'interface : chaque écran répond à « sur quoi je peux parier mon pronostic maintenant ».",
      "La densité de données des classements est maîtrisée par une hiérarchie typographique stricte plutôt que par la suppression d'information.",
      "L'expérience est conçue mobile d'abord, avec une application native et des interactions courtes.",
    ],
    en: [
      "Matches and predictions are the basic unit of the interface: every screen answers what can be predicted right now.",
      "The data density of rankings is controlled through strict typographic hierarchy rather than removing information.",
      "The experience is designed mobile first, with a native app and short interactions.",
    ],
  },
  engineering: {
    fr: [
      {
        title: "Monorepo Turborepo",
        body: "API, application mobile et back-office partagent un monorepo avec des packages communs typés.",
      },
      {
        title: "API NestJS + Prisma",
        body: "L'API NestJS s'appuie sur Prisma et PostgreSQL pour les matchs, pronostics, points et classements.",
      },
      {
        title: "Redis",
        body: "Utilisé côté API pour les besoins de cache et de coordination.",
      },
      {
        title: "Application mobile React Native",
        body: "Application native construite avec React Native et Expo, sur la même API que le web.",
      },
    ],
    en: [
      {
        title: "Turborepo monorepo",
        body: "API, mobile app and back office share one monorepo with typed common packages.",
      },
      {
        title: "NestJS + Prisma API",
        body: "The NestJS API relies on Prisma and PostgreSQL for matches, predictions, points and rankings.",
      },
      {
        title: "Redis",
        body: "Used on the API side for caching and coordination needs.",
      },
      {
        title: "React Native mobile app",
        body: "Native app built with React Native and Expo, on the same API as the web.",
      },
    ],
  },
  outcome: {
    fr: [
      "Le produit livre une expérience de pronostic esport complète et gratuite : matchs, pronostics, points, classements et ligues privées, sur web et mobile.",
    ],
    en: [
      "The product delivers a complete, free esports prediction experience: matches, predictions, points, rankings and private leagues, on web and mobile.",
    ],
  },
  gallery: [
    {
      src: "/realisations/goodcall.png",
      alt: {
        fr: "Interface complète du produit GoodCall",
        en: "Full GoodCall product interface",
      },
    },
    {
      src: "/realisations/goodcall.png",
      alt: {
        fr: "Détail de l'interface GoodCall (recadrage)",
        en: "GoodCall interface detail (crop)",
      },
    },
  ],
  next: "pick4me",
};
