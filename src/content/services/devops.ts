import type { ServiceRecord } from "./types";

export const devops: ServiceRecord = {
  key: "devops",
  slug: { fr: "devops-cloud", en: "devops-cloud" },
  eyebrow: { fr: "DevOps, cloud & déploiement", en: "DevOps, cloud & deployment" },
  title: {
    fr: "Mettre un produit en ligne est une étape. Le garder fiable en est une autre.",
    en: "Putting a product online is one step. Keeping it reliable is another.",
  },
  description: {
    fr: "Déploiement, CI/CD, supervision et sécurité de vos applications : une infrastructure claire et documentée, pour le studio comme pour votre équipe de développement existante.",
    en: "Deployment, CI/CD, monitoring and security for your applications: a clear, documented infrastructure, for the studio or for your existing development team.",
  },
  problem: {
    fr: "Des mises en production stressantes, des serveurs que personne n'ose toucher et des incidents découverts par les utilisateurs plutôt que par la supervision.",
    en: "Stressful releases, servers nobody dares to touch and incidents discovered by users rather than by monitoring.",
  },
  useCases: {
    fr: [
      { title: "CI/CD", body: "Des mises en production automatisées, testées et répétables." },
      { title: "Environnements", body: "Développement, préproduction et production proprement séparés." },
      { title: "Docker", body: "Des applications empaquetées pour tourner partout de la même façon." },
      { title: "Cloud et déploiement", body: "Hébergement adapté à votre échelle : du VPS au cloud managé." },
      { title: "Supervision", body: "Alertes et métriques pour détecter les incidents avant vos utilisateurs." },
      { title: "Sauvegardes", body: "Des données sauvegardées, testées et restaurables." },
      { title: "Sécurité", body: "Accès, secrets et mises à jour gérés avec rigueur." },
      { title: "Releases", body: "Un processus de livraison clair, avec retour arrière possible." },
    ],
    en: [
      { title: "CI/CD", body: "Automated, tested, repeatable releases." },
      { title: "Environments", body: "Development, staging and production cleanly separated." },
      { title: "Docker", body: "Applications packaged to run the same way everywhere." },
      { title: "Cloud and deployment", body: "Hosting matched to your scale: from VPS to managed cloud." },
      { title: "Monitoring", body: "Alerts and metrics to detect incidents before your users do." },
      { title: "Backups", body: "Data backed up, tested and restorable." },
      { title: "Security", body: "Access, secrets and updates managed with rigor." },
      { title: "Releases", body: "A clear delivery process, with rollback possible." },
    ],
  },
  approach: {
    fr: [
      "Auditer l'existant avant de changer quoi que ce soit.",
      "Automatiser les gestes répétés : déploiements, sauvegardes, vérifications.",
      "Documenter pour que l'infrastructure ne dépende pas d'une seule personne.",
      "Dimensionner selon vos besoins réels, pas selon la mode.",
    ],
    en: [
      "Audit what exists before changing anything.",
      "Automate repeated actions: deployments, backups, checks.",
      "Document so the infrastructure does not depend on a single person.",
      "Size according to your real needs, not fashion.",
    ],
  },
  engineering: {
    fr: [
      "Pipelines CI/CD avec tests et vérifications avant chaque mise en production.",
      "Infrastructure décrite et reproductible plutôt que configurée à la main.",
      "Supervision avec alertes exploitables, pas du bruit.",
      "Plans de sauvegarde et de restauration réellement testés.",
    ],
    en: [
      "CI/CD pipelines with tests and checks before every release.",
      "Infrastructure described and reproducible rather than hand-configured.",
      "Monitoring with actionable alerts, not noise.",
      "Backup and restore plans that are actually tested.",
    ],
  },
  technologies: ["GitHub Actions", "Docker", "Linux", "Nginx", "PostgreSQL"],
  proofProjects: [],
  faq: {
    fr: [
      {
        question: "Intervenez-vous sur une infrastructure existante ?",
        answer: "Oui. Ce service se vend aussi seul, en appui d'une équipe de développement déjà en place, après un audit de l'existant.",
      },
      {
        question: "Peut-on garder notre hébergeur actuel ?",
        answer: "Dans la plupart des cas oui. Le choix d'hébergement est guidé par vos besoins réels et vos coûts, pas par une préférence imposée.",
      },
      {
        question: "Que couvre exactement la supervision ?",
        answer: "Détection des pannes, suivi des performances, alertes en cas d'anomalie et journaux exploitables pour diagnostiquer. Le périmètre précis est défini avec vous.",
      },
    ],
    en: [
      {
        question: "Do you work on existing infrastructure?",
        answer: "Yes. This service is also sold on its own, supporting an existing development team, after an audit of the current setup.",
      },
      {
        question: "Can we keep our current hosting provider?",
        answer: "In most cases yes. Hosting choices are driven by your real needs and costs, not by an imposed preference.",
      },
      {
        question: "What exactly does monitoring cover?",
        answer: "Outage detection, performance tracking, alerts on anomalies and usable logs for diagnosis. The precise scope is defined with you.",
      },
    ],
  },
};
