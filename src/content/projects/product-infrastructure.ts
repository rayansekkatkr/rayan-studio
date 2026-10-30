import type { ProjectRecord } from "./types";

// The delivery setup of the studio's own products (facts from Rayan's CV and this repository).
export const productInfrastructure: ProjectRecord = {
  key: "product-infrastructure",
  slug: "infrastructure-produits",
  title: "Rayan Studio · Infrastructure",
  kind: "product",
  heroImage: "/realisations/product-infra.webp",
  tone: "dark",
  categories: {
    fr: ["DevOps", "CI/CD", "Docker", "Cloud"],
    en: ["DevOps", "CI/CD", "Docker", "Cloud"],
  },
  summary: {
    fr: "La chaîne de livraison des produits du studio : intégration continue GitHub Actions, images Docker, Pont Factur-X sur VPS derrière Caddy, monorepo Turborepo pour GoodCall et Vercel pour ce site.",
    en: "The delivery chain of the studio's products: GitHub Actions CI, Docker images, Pont Factur-X on a VPS behind Caddy, a Turborepo monorepo for GoodCall and Vercel for this website.",
  },
  role: {
    fr: "Conçue, mise en place et exploitée par le studio",
    en: "Designed, set up and run by the studio",
  },
  status: {
    fr: "Infrastructure des produits du studio, en production",
    en: "Infrastructure of the studio's products, live",
  },
  technologies: ["GitHub Actions", "Docker", "Caddy", "Vercel", "Turborepo", "PostgreSQL", "Redis", "MinIO", "Playwright"],
  challenge: {
    fr: [
      "Livrer et exploiter plusieurs produits en production avec des déploiements sûrs et répétables, sans équipe d'exploitation dédiée.",
    ],
    en: [
      "Ship and run several products in production with safe, repeatable deployments, without a dedicated operations team.",
    ],
  },
  challengeHighlight: {
    fr: "sans équipe d'exploitation dédiée",
    en: "without a dedicated operations team",
  },
  solution: {
    fr: [
      "Intégration continue GitHub Actions sur chaque changement : lint, vérification des types, tests et build.",
      "Images Docker pour les services, déployées sur VPS derrière Caddy, qui gère automatiquement les certificats TLS (Pont Factur-X : FastAPI, Celery, Redis, PostgreSQL, MinIO).",
      "Monorepo Turborepo et workflows de déploiement Docker pour GoodCall.",
      "Ce site : Next.js sur Vercel, avec tests end-to-end Playwright et vérification automatique du contenu public avant chaque mise en ligne.",
    ],
    en: [
      "GitHub Actions CI on every change: lint, type checks, tests and build.",
      "Docker images for the services, deployed on a VPS behind Caddy, which handles TLS certificates automatically (Pont Factur-X: FastAPI, Celery, Redis, PostgreSQL, MinIO).",
      "A Turborepo monorepo and Docker deployment workflows for GoodCall.",
      "This website: Next.js on Vercel, with Playwright end-to-end tests and an automatic check of public content before every release.",
    ],
  },
  capabilities: [
    {
      title: { fr: "Livraison continue", en: "Continuous delivery" },
      body: {
        fr: "Chaque changement est vérifié avant d'être mis en ligne.",
        en: "Every change is checked before it goes live.",
      },
    },
    {
      title: { fr: "Conteneurs", en: "Containers" },
      body: {
        fr: "Le même environnement en local et en production.",
        en: "The same environment locally and in production.",
      },
    },
    {
      title: { fr: "Exploitation", en: "Operations" },
      body: {
        fr: "Supervision et support en production sur chaque produit.",
        en: "Monitoring and production support on every product.",
      },
    },
  ],
  productUx: { fr: [], en: [] },
  engineering: {
    fr: [
      { title: "TLS sans intervention", body: "Caddy obtient et renouvelle les certificats tout seul." },
      { title: "Tests avant mise en ligne", body: "Tests unitaires et end-to-end exécutés dans la CI, pas après coup." },
    ],
    en: [
      { title: "Hands-off TLS", body: "Caddy obtains and renews certificates on its own." },
      { title: "Tests before release", body: "Unit and end-to-end tests run in the CI, not after the fact." },
    ],
  },
  outcome: {
    fr: [
      "Chaque produit du studio se déploie de la même façon, vérifié avant chaque mise en ligne, et reste supervisé en production.",
    ],
    en: [
      "Every studio product deploys the same way, checked before each release, and stays monitored in production.",
    ],
  },
  gallery: [],
};
