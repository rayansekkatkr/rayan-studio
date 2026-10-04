import type { ProjectRecord } from "./types";

export const pontFacturx: ProjectRecord = {
  key: "pont-facturx",
  slug: "pont-facturx",
  title: "Pont Factur-X",
  kind: "product",
  liveUrl: "https://www.pont-facturx.com/",
  heroImage: "/realisations/pont-facturx.webp",
  year: "2025",
  links: [
    { label: { fr: "Voir le produit en ligne", en: "See the live product" }, href: "https://www.pont-facturx.com/" },
  ],
  featuredOrder: 2,
  tone: "dark",
  categories: {
    fr: ["Logiciel B2B", "Facturation électronique", "API", "Automatisation"],
    en: ["B2B Software", "E-invoicing", "API", "Automation"],
  },
  summary: {
    fr: "Logiciel B2B de facturation électronique : conversion de PDF existants en Factur-X, création de factures et API pour les éditeurs.",
    en: "B2B e-invoicing software: converts existing PDFs to Factur-X, creates invoices and offers an API for software vendors.",
  },
  role: {
    fr: "Conception, design et développement par le studio",
    en: "Designed, built and shipped by the studio",
  },
  status: {
    fr: "Produit du studio, en production",
    en: "Studio product, live",
  },
  technologies: ["Next.js", "FastAPI", "Python", "SQLAlchemy", "Celery"],
  challenge: {
    fr: [
      "Rendre un workflow de facturation électronique compréhensible pour des utilisateurs métier tout en gérant les contraintes de génération, de validation et d'échange documentaire.",
    ],
    en: [
      "Make an electronic-invoicing workflow understandable for business users while handling the constraints of document generation, validation and exchange.",
    ],
  },
  solution: {
    fr: [
      "Clarifier les étapes de conversion et de traitement documentaire.",
      "Exposer les capacités d'intégration via API sans transformer l'interface en documentation technique.",
      "Automatiser les étapes répétitives du workflow lorsque le produit les prend réellement en charge.",
    ],
    en: [
      "Clarify the document conversion and processing steps.",
      "Expose integration capabilities through an API without turning the interface into technical documentation.",
      "Automate the repetitive steps of the workflow where the product actually handles them.",
    ],
  },
  capabilities: [
    {
      title: { fr: "Conversion Factur-X", en: "Factur-X conversion" },
      body: {
        fr: "Génération de factures électroniques au format Factur-X à partir de documents existants.",
        en: "Generation of Factur-X electronic invoices from existing documents.",
      },
    },
    {
      title: { fr: "Traitement documentaire", en: "Document processing" },
      body: {
        fr: "Lecture et traitement de documents PDF et de leurs données structurées.",
        en: "Reading and processing PDF documents and their structured data.",
      },
    },
    {
      title: { fr: "API", en: "API" },
      body: {
        fr: "Intégration du workflow de facturation dans les outils existants via API.",
        en: "Integration of the invoicing workflow into existing tools through an API.",
      },
    },
    {
      title: { fr: "Automatisation", en: "Automation" },
      body: {
        fr: "Traitements asynchrones pour les étapes répétitives du workflow.",
        en: "Asynchronous processing for the repetitive steps of the workflow.",
      },
    },
    {
      title: { fr: "Envoi vers Chorus Pro", en: "Chorus Pro submission" },
      body: {
        fr: "Envoi de factures Factur-X vers Chorus Pro via l'API PISTE.",
        en: "Submission of Factur-X invoices to Chorus Pro through the PISTE API.",
      },
    },
  ],
  productUx: {
    fr: [
      "Le workflow est présenté en étapes lisibles : importer, convertir, vérifier, transmettre.",
      "Les détails techniques du format restent en retrait : l'utilisateur manipule des factures, pas du XML.",
      "Les états et erreurs de traitement sont exposés clairement pour que l'utilisateur sache toujours où en est un document.",
    ],
    en: [
      "The workflow is presented as readable steps: import, convert, check, transmit.",
      "The technical details of the format stay in the background: users handle invoices, not XML.",
      "Processing states and errors are exposed clearly so users always know where a document stands.",
    ],
  },
  engineering: {
    fr: [
      {
        title: "API FastAPI",
        body: "Le cœur du produit est une API Python FastAPI qui porte la conversion et le workflow documentaire, consommée par l'interface Next.js.",
      },
      {
        title: "Traitement documentaire",
        body: "Lecture PDF et manipulation des données structurées Factur-X côté serveur.",
      },
      {
        title: "Traitements asynchrones",
        body: "Les étapes longues ou répétitives passent par des tâches Celery, hors du chemin de la requête utilisateur.",
      },
      {
        title: "Intégration Chorus Pro",
        body: "Envoi des factures vers Chorus Pro via l'API PISTE, intégré au workflow du produit.",
      },
    ],
    en: [
      {
        title: "FastAPI backend",
        body: "The core of the product is a Python FastAPI service handling conversion and the document workflow, consumed by the Next.js interface.",
      },
      {
        title: "Document processing",
        body: "Server-side PDF reading and Factur-X structured-data handling.",
      },
      {
        title: "Asynchronous processing",
        body: "Long or repetitive steps run as Celery tasks, off the user request path.",
      },
      {
        title: "Chorus Pro integration",
        body: "Invoice submission to Chorus Pro through the PISTE API, integrated into the product workflow.",
      },
    ],
  },
  outcome: {
    fr: [
      "Le produit couvre le workflow de facturation électronique de bout en bout : import de documents, conversion Factur-X, contrôle et transmission, y compris vers Chorus Pro.",
      "Deux parcours mènent au même fichier : convertir un PDF existant, généralement en moins de 15 secondes, ou créer la facture depuis un formulaire, avec avoirs liés à la facture d'origine. La sortie est un PDF/A-3 avec le XML CII embarqué.",
      "Une API REST documentée en OpenAPI 3.0, avec clé de test et clé de production, permet aux éditeurs et intégrateurs de brancher la conversion sur leurs outils. Hébergement en Europe (France), chiffrement TLS 1.3.",
    ],
    en: [
      "The product covers the electronic-invoicing workflow end to end: document import, Factur-X conversion, checking and transmission, including to Chorus Pro.",
      "Two paths lead to the same file: convert an existing PDF, usually in under 15 seconds, or create the invoice from a form, with credit notes linked to the original invoice. The output is a PDF/A-3 with the CII XML embedded.",
      "A REST API documented in OpenAPI 3.0, with test and production keys, lets software vendors and integrators plug the conversion into their tools. Hosted in Europe (France), TLS 1.3 encryption.",
    ],
  },
  gallery: [
    {
      src: "/realisations/pont-facturx-format.webp",
      alt: {
        fr: "Pont Factur-X : la facture PDF et les données XML CII embarquées, côte à côte",
        en: "Pont Factur-X: the PDF invoice and its embedded CII XML data, side by side",
      },
    },
    {
      src: "/realisations/pont-facturx-conversion.webp",
      alt: {
        fr: "Pont Factur-X : dépôt d'une facture PDF et conversion en trois étapes",
        en: "Pont Factur-X: PDF invoice upload and three-step conversion",
      },
    },
  ],
  next: "goodcall",
};
