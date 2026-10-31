import type { ProjectRecord } from "./types";

// Client engagement, 2024. Only public facts from Rayan's CV: no internal detail.
export const ciCdPlatform: ProjectRecord = {
  key: "ci-cd-platform",
  slug: "plateforme-ci-cd",
  title: "STMicroelectronics · CI/CD",
  kind: "mission",
  year: "2024",
  heroImage: "/realisations/ci-cd-platform.webp",
  tone: "dark",
  categories: {
    fr: ["Mission DevOps", "GitLab CI", "Kubernetes", "Infrastructure as code"],
    en: ["DevOps engagement", "GitLab CI", "Kubernetes", "Infrastructure as code"],
  },
  summary: {
    fr: "Mission DevOps chez STMicroelectronics, via Davidson Consulting : administration de la plateforme GitLab CI des équipes logiciel embarqué, automatisation des déploiements et observabilité, sur une infrastructure hybride sur site et AWS.",
    en: "DevOps engagement at STMicroelectronics, through Davidson Consulting: running the GitLab CI platform of the embedded software teams, automating deployments and observability, on hybrid on-premise and AWS infrastructure.",
  },
  role: {
    fr: "Ingénieur DevOps en mission (Davidson Consulting), 2024",
    en: "DevOps engineer on assignment (Davidson Consulting), 2024",
  },
  status: {
    fr: "Mission terminée, logiciel embarqué industriel",
    en: "Completed engagement, industrial embedded software",
  },
  technologies: ["GitLab CI", "Kubernetes", "Ansible", "Terraform", "AWS", "SonarQube", "Artifactory", "Playwright", "Prometheus", "Grafana"],
  challenge: {
    fr: [
      "Faire tourner chaque jour plus de 170 pipelines pour les équipes logiciel embarqué, sur une infrastructure en partie sur site et en partie sur AWS, sans que la CI devienne le goulot d'étranglement des livraisons.",
    ],
    en: [
      "Run more than 170 pipelines a day for the embedded software teams, on infrastructure split between on-premise and AWS, without the CI becoming the bottleneck of every release.",
    ],
  },
  challengeHighlight: {
    fr: "plus de 170 pipelines",
    en: "more than 170 pipelines",
  },
  solution: {
    fr: [
      "Administration de la plateforme GitLab CI : runners, releases, analyse SonarQube, artefacts Artifactory et jobs de tests automatisés.",
      "Automatisation des déploiements avec Kubernetes et Ansible, et des pipelines pour raccourcir le temps de release.",
      "Infrastructure as code avec Terraform, sur site et sur AWS.",
      "Tests end-to-end Playwright ajoutés à la chaîne de release.",
      "Observabilité avec Prometheus, Grafana et Alertmanager, et participation à la gestion des incidents et aux analyses de cause.",
    ],
    en: [
      "Running the GitLab CI platform: runners, releases, SonarQube analysis, Artifactory artifacts and automated test jobs.",
      "Automating deployments with Kubernetes and Ansible, and pipelines to shorten release time.",
      "Infrastructure as code with Terraform, on-premise and on AWS.",
      "Playwright end-to-end tests added to the release pipeline.",
      "Observability with Prometheus, Grafana and Alertmanager, and taking part in incident response and root cause analysis.",
    ],
  },
  capabilities: [
    {
      title: { fr: "CI à grande échelle", en: "CI at scale" },
      body: {
        fr: "Une plateforme partagée par de nombreuses équipes, disponible tous les jours.",
        en: "A platform shared by many teams, available every day.",
      },
    },
    {
      title: { fr: "Déploiements automatisés", en: "Automated deployments" },
      body: {
        fr: "Kubernetes et Ansible plutôt que des opérations manuelles.",
        en: "Kubernetes and Ansible instead of manual operations.",
      },
    },
    {
      title: { fr: "Supervision", en: "Monitoring" },
      body: {
        fr: "Métriques, alertes et analyse des incidents.",
        en: "Metrics, alerts and incident analysis.",
      },
    },
  ],
  productUx: { fr: [], en: [] },
  engineering: {
    fr: [
      { title: "Hybride sur site et AWS", body: "Une même description Terraform pour les deux environnements." },
      { title: "Qualité dans la chaîne", body: "Analyse statique, tests automatisés et artefacts versionnés avant chaque release." },
    ],
    en: [
      { title: "Hybrid on-premise and AWS", body: "One Terraform description for both environments." },
      { title: "Quality in the pipeline", body: "Static analysis, automated tests and versioned artifacts before every release." },
    ],
  },
  outcome: {
    fr: [
      "Une chaîne de livraison outillée de bout en bout pour les équipes logiciel embarqué, de la merge request à la release, avec des déploiements automatisés et une plateforme supervisée.",
    ],
    en: [
      "An end-to-end delivery chain for the embedded software teams, from merge request to release, with automated deployments and a monitored platform.",
    ],
  },
  gallery: [],
};
