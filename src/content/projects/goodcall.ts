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
  technologies: [],
  challenge: { fr: [], en: [] },
  solution: { fr: [], en: [] },
  capabilities: [],
  productUx: { fr: [], en: [] },
  engineering: { fr: [], en: [] },
  outcome: { fr: [], en: [] },
  gallery: [],
  next: "pick4me",
};
