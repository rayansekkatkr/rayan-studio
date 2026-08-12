import type { ProjectRecord } from "./types";

export const pick4me: ProjectRecord = {
  key: "pick4me",
  slug: "pick4me",
  title: "Pick4Me",
  kind: "product",
  liveUrl: "https://pick4me.be/",
  heroImage: "/realisations/pick4me.png",
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
  technologies: [],
  challenge: { fr: [], en: [] },
  solution: { fr: [], en: [] },
  capabilities: [],
  productUx: { fr: [], en: [] },
  engineering: { fr: [], en: [] },
  outcome: { fr: [], en: [] },
  gallery: [],
  next: "pont-facturx",
};
