import type { ProjectKey } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import type { QuoteType, ServiceKey } from "@/lib/site-routes";

export type LandingKey = "websites" | "applications";

export type LandingContent = {
  key: LandingKey;
  quoteType: QuoteType;
  heroImage: string;
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  promises: string[];
  benefitsTitle: string;
  benefits: Array<{ title: string; body: string }>;
  includedTitle: string;
  included: string[];
  workTitle: string;
  workLead: string;
  /** Projects shown as examples, with an honest label of what each one is. */
  work: Array<{ key: ProjectKey; label: string }>;
  servicesTitle?: string;
  services?: ServiceKey[];
  processTitle: string;
  process: string[];
  /** Websites: what happens from the first message to the mockup. */
  timeline?: { title: string; steps: Array<{ when: string; title: string; body: string }> };
  /** Applications: the layers the studio sets up, with stacks taken from the studio's own projects. */
  architecture?: { title: string; layers: Array<{ label: string; title: string; stack: string[] }> };
  deliverables?: { title: string; items: Array<{ key: string; body: string }> };
  /** Caption shown under the hero visual, so a concept is never mistaken for a client project. */
  heroCaption?: string;
  faq: Array<{ question: string; answer: string }>;
  formTitle: string;
  formLead: string;
};

const WEBSITES: Record<Locale, LandingContent> = {
  fr: {
    key: "websites",
    quoteType: "site",
    heroImage: "/services/web.webp",
    seo: {
      title: "Création de site internet pour commerces et PME",
      description:
        "Site vitrine ou refonte pour commerces, restaurants, indépendants et PME : design sur mesure, mobile, référencement local et mise en ligne. Maquette gratuite sous 24 h ouvrées.",
    },
    eyebrow: "Sites web · Commerces, restaurants, PME",
    title: "Un site internet qui donne envie de vous contacter.",
    lead: "Pour les commerces, restaurants, indépendants et PME : un site clair sur mobile, trouvable sur Google et pensé pour recevoir des demandes. Vous voyez une première maquette avant de vous engager.",
    primaryCta: "Recevoir ma maquette gratuite",
    secondaryCta: "Voir des exemples",
    promises: ["Maquette gratuite sous 24 h ouvrées", "Un seul interlocuteur", "Vous restez propriétaire du site"],
    benefitsTitle: "Ce que votre site doit vous apporter",
    benefits: [
      {
        title: "Être trouvé localement",
        body: "Des pages structurées pour Google et pour votre fiche d'établissement, avec les informations que vos clients cherchent vraiment.",
      },
      {
        title: "Convaincre sur mobile",
        body: "Une grande partie de vos visiteurs arrive depuis un téléphone : le site est conçu d'abord pour cet écran.",
      },
      {
        title: "Recevoir des demandes",
        body: "Appel, WhatsApp, formulaire ou réservation : un chemin court entre l'envie et la prise de contact.",
      },
      {
        title: "Rester simple à faire vivre",
        body: "Une technique propre et rapide, sans plugin fragile : le site reste stable dans le temps.",
      },
    ],
    includedTitle: "Ce qui est compris",
    included: [
      "Design sur mesure, pas un modèle générique",
      "Version mobile soignée en priorité",
      "Textes structurés avec vous à partir de votre activité",
      "Bases du référencement local (titres, descriptions, données structurées)",
      "Formulaire, appel ou WhatsApp en un clic",
      "Nom de domaine, hébergement et mise en ligne",
      "Mesure d'audience respectueuse du consentement",
      "Accompagnement après la mise en ligne",
    ],
    workTitle: "Des sites conçus par le studio",
    workLead: "Les sites des produits du studio et un concept de refonte, présenté comme tel.",
    work: [
      { key: "manteigaria", label: "Site vitrine, avant / après" },
      { key: "pont-facturx", label: "Site du produit" },
      { key: "pick4me", label: "Site du produit" },
      { key: "goodcall", label: "Site du produit" },
    ],
    heroCaption: "Visuel : concept de refonte Manteigaria, non commandé.",
    timeline: {
      title: "De votre message à votre maquette.",
      steps: [
        { when: "Jour 0", title: "Vous décrivez votre activité", body: "Deux minutes, un formulaire court. Pas besoin de cahier des charges." },
        { when: "Sous 24 h", title: "Vous recevez la maquette", body: "La page d'accueil de votre futur site, à votre image, sans engagement." },
        { when: "Ensuite", title: "Vous décidez", body: "Devis écrit si vous souhaitez continuer. Sinon, rien à payer." },
      ],
    },
    processTitle: "Comment ça se passe",
    process: [
      "Vous décrivez votre activité en quelques lignes, sans jargon.",
      "Vous recevez une maquette gratuite de votre page d'accueil sous 24 h ouvrées.",
      "Le site est développé, relu avec vous, puis ajusté.",
      "Mise en ligne sur votre nom de domaine, puis suivi et évolutions.",
    ],
    faq: [
      {
        question: "La maquette est-elle vraiment gratuite ?",
        answer:
          "Oui. Vous décrivez votre activité, vous recevez une proposition visuelle de votre page d'accueil sous 24 h ouvrées. Vous décidez ensuite, sans engagement.",
      },
      {
        question: "Combien coûte un site vitrine ?",
        answer:
          "Le prix dépend du nombre de pages et des fonctions (réservation, menu, galerie). Le devis est gratuit, écrit et détaillé avant tout engagement : vous savez exactement ce qui est inclus.",
      },
      {
        question: "Je n'ai ni textes ni photos, est-ce un problème ?",
        answer:
          "Non. Les textes sont structurés avec vous à partir de votre activité, et les visuels peuvent venir de vos photos ou d'une banque d'images libre de droits.",
      },
      {
        question: "Pouvez-vous refaire mon site actuel ?",
        answer:
          "Oui. La refonte part de ce qui fonctionne déjà, conserve vos adresses utiles pour ne pas perdre votre référencement, et corrige le reste.",
      },
      {
        question: "Qui est propriétaire du site ?",
        answer: "Vous. Le nom de domaine, les accès et le contenu vous appartiennent.",
      },
    ],
    formTitle: "Recevez votre maquette gratuite",
    formLead: "Décrivez votre activité en quelques lignes. Première maquette de votre page d'accueil sous 24 h ouvrées, sans engagement.",
  },
  en: {
    key: "websites",
    quoteType: "site",
    heroImage: "/services/web.webp",
    seo: {
      title: "Website design for small businesses",
      description:
        "New website or redesign for shops, restaurants, freelancers and small businesses: custom design, mobile first, local SEO and launch. Free mockup within 24 business hours.",
    },
    eyebrow: "Websites · Shops, restaurants, small businesses",
    title: "A website that makes people want to contact you.",
    lead: "For shops, restaurants, freelancers and small businesses: a site that is clear on mobile, easy to find on Google and built to receive enquiries. You see a first mockup before committing.",
    primaryCta: "Get my free mockup",
    secondaryCta: "See examples",
    promises: ["Free mockup within 24 business hours", "One point of contact", "You own the website"],
    benefitsTitle: "What your website should bring you",
    benefits: [
      {
        title: "Be found locally",
        body: "Pages structured for Google and for your business profile, with the information your clients actually look for.",
      },
      {
        title: "Convince on mobile",
        body: "Many visitors arrive on a phone: the site is designed for that screen first.",
      },
      {
        title: "Receive enquiries",
        body: "Call, WhatsApp, form or booking: a short path from interest to contact.",
      },
      {
        title: "Stay easy to run",
        body: "Clean, fast technology with no fragile plugins: the site stays stable over time.",
      },
    ],
    includedTitle: "What is included",
    included: [
      "Custom design, not a generic template",
      "Carefully designed mobile version first",
      "Copy structured with you from your business",
      "Local SEO basics (titles, descriptions, structured data)",
      "Form, call or WhatsApp in one click",
      "Domain name, hosting and launch",
      "Consent-friendly audience measurement",
      "Support after launch",
    ],
    workTitle: "Websites designed by the studio",
    workLead: "The websites of the studio's products and a redesign concept, presented as such.",
    work: [
      { key: "manteigaria", label: "Showcase website, before / after" },
      { key: "pont-facturx", label: "Product website" },
      { key: "pick4me", label: "Product website" },
      { key: "goodcall", label: "Product website" },
    ],
    heroCaption: "Visual: Manteigaria redesign concept, not commissioned.",
    timeline: {
      title: "From your message to your mockup.",
      steps: [
        { when: "Day 0", title: "You describe your business", body: "Two minutes, a short form. No specification needed." },
        { when: "Within 24 h", title: "You receive the mockup", body: "The home page of your future website, in your image, with no commitment." },
        { when: "Then", title: "You decide", body: "A written quote if you want to go ahead. Otherwise, nothing to pay." },
      ],
    },
    processTitle: "How it works",
    process: [
      "You describe your business in a few lines, no jargon.",
      "You receive a free mockup of your home page within 24 business hours.",
      "The website is built, reviewed with you, then adjusted.",
      "Launch on your domain name, then follow-up and updates.",
    ],
    faq: [
      {
        question: "Is the mockup really free?",
        answer:
          "Yes. You describe your business and receive a visual proposal of your home page within 24 business hours. Then you decide, with no commitment.",
      },
      {
        question: "How much does a website cost?",
        answer:
          "It depends on the number of pages and features (booking, menu, gallery). The quote is free, written and detailed before any commitment.",
      },
      {
        question: "I have no copy or photos, is that a problem?",
        answer:
          "No. The copy is structured with you from your business, and visuals can come from your photos or a royalty-free image bank.",
      },
      {
        question: "Can you redesign my current website?",
        answer:
          "Yes. The redesign keeps what already works, preserves your useful URLs to protect your rankings, and fixes the rest.",
      },
      {
        question: "Who owns the website?",
        answer: "You do. The domain name, the accounts and the content belong to you.",
      },
    ],
    formTitle: "Get your free mockup",
    formLead: "Describe your business in a few lines. First mockup of your home page within 24 business hours, no commitment.",
  },
};

const APPLICATIONS: Record<Locale, LandingContent> = {
  fr: {
    key: "applications",
    quoteType: "app",
    heroImage: "/images/devices.webp",
    seo: {
      title: "Développement d'application web et SaaS sur mesure",
      description:
        "Conception et développement d'applications web, SaaS, MVP et plateformes métier : cadrage, architecture, développement et mise en production avec un interlocuteur unique. Réponse sous 24 h ouvrées.",
    },
    eyebrow: "Applications & SaaS · Startups et entreprises",
    title: "Votre application ou votre SaaS, du cadrage à la production.",
    lead: "Pour les startups, entreprises et porteurs de projet : un produit construit autour de votre métier, livré par étapes visibles, par la même personne du premier échange à la mise en production.",
    primaryCta: "Parler de mon projet",
    secondaryCta: "Voir les études de cas",
    promises: ["Réponse sous 24 h ouvrées", "Un seul interlocuteur technique", "Code et données à vous"],
    benefitsTitle: "Ce que vous y gagnez",
    benefits: [
      {
        title: "Une V1 en production plus vite",
        body: "Un périmètre tranché dès le cadrage : l'essentiel d'abord, en ligne, puis des évolutions guidées par l'usage réel.",
      },
      {
        title: "Une base qui tient dans le temps",
        body: "Architecture, modèle de données et intégrations pensés pour évoluer sans réécriture complète.",
      },
      {
        title: "Pas de perte d'information",
        body: "La personne qui cadre est celle qui code et déploie : pas de relais entre commercial, chef de projet et développeurs.",
      },
      {
        title: "Aucune dépendance subie",
        body: "Code, accès, comptes et données vous appartiennent, avec une documentation pour reprendre ou internaliser.",
      },
    ],
    includedTitle: "Les compétences mobilisées",
    included: [
      "Cadrage produit et priorisation de la V1",
      "Design d'interface et parcours utilisateurs",
      "Développement front-end et mobile",
      "APIs, backends, paiements et authentification",
      "Intégration de LLM et automatisation",
      "CI/CD, cloud, supervision et sauvegardes",
    ],
    workTitle: "Études de cas",
    workLead: "Des produits conçus, développés et exploités par le studio, et une mission client.",
    work: [
      { key: "pick4me", label: "Marketplace et application mobile" },
      { key: "pont-facturx", label: "SaaS B2B de facturation électronique" },
      { key: "goodcall", label: "Application grand public" },
      { key: "ops-knowledge-agent", label: "Démonstrateur IA (RAG, MCP)" },
      { key: "ci-cd-platform", label: "Mission DevOps, STMicroelectronics" },
      { key: "docextract", label: "SaaS d'extraction de documents" },
    ],
    servicesTitle: "Les services derrière l'offre",
    services: ["applications", "mvp", "backends", "automation", "ai", "devops"],
    heroCaption: "Capture : Pont Factur-X, produit du studio en production.",
    architecture: {
      title: "Ce que le studio met en place, couche par couche.",
      layers: [
        { label: "01 / Interface", title: "Web et mobile", stack: ["Next.js", "React Native", "Flutter"] },
        { label: "02 / API", title: "Backend métier", stack: ["NestJS", "FastAPI", "Stripe"] },
        { label: "03 / Données", title: "Stockage et files", stack: ["PostgreSQL", "Redis", "Celery"] },
        { label: "04 / Infra", title: "Mise en production", stack: ["Docker", "Kubernetes", "Terraform"] },
      ],
    },
    deliverables: {
      title: "Ce que vous recevez.",
      items: [
        { key: "Le code source", body: "Dépôt à votre nom, historique complet" },
        { key: "Les accès", body: "Comptes cloud, domaines et services à vous" },
        { key: "La documentation", body: "Pour reprendre ou internaliser" },
        { key: "La mise en production", body: "CI/CD, supervision et sauvegardes" },
      ],
    },
    processTitle: "Le processus, du cadrage au déploiement",
    process: [
      "Cadrage : utilisateurs, problème, périmètre de la V1 et contraintes.",
      "Architecture et prototype : les choix techniques expliqués, un parcours cliquable à valider.",
      "Développement par livraisons régulières, visibles en production ou en préproduction.",
      "Mise en production, supervision, puis évolutions ou passation documentée.",
    ],
    faq: [
      {
        question: "Faut-il un cahier des charges complet ?",
        answer: "Non. Le cadrage sert justement à transformer votre besoin en périmètre clair. Un premier échange suffit pour démarrer.",
      },
      {
        question: "Comment est établi le devis ?",
        answer:
          "Après un échange de cadrage gratuit, vous recevez une proposition écrite : périmètre, planning et budget. Rien n'est engagé avant votre accord.",
      },
      {
        question: "Pouvez-vous reprendre une application existante ?",
        answer: "Oui, après un audit du code et de l'infrastructure pour savoir ce qui peut être conservé, corrigé ou remplacé.",
      },
      {
        question: "Travaillez-vous avec une équipe déjà en place ?",
        answer: "Oui : en renfort sur un périmètre défini, avec les mêmes outils que l'équipe (Git, CI, tickets).",
      },
      {
        question: "Qui possède le code et les données ?",
        answer: "Vous. Le code, les accès et les données vous appartiennent, avec une passation propre si vous internalisez plus tard.",
      },
    ],
    formTitle: "Parlons de votre projet",
    formLead: "Quelques lignes suffisent : le problème, les utilisateurs, où vous en êtes. Première réponse argumentée sous 24 h ouvrées.",
  },
  en: {
    key: "applications",
    quoteType: "app",
    heroImage: "/images/devices.webp",
    seo: {
      title: "Custom web application and SaaS development",
      description:
        "Design and development of web applications, SaaS, MVPs and business platforms: scoping, architecture, development and production with one point of contact. Reply within 24 business hours.",
    },
    eyebrow: "Applications & SaaS · Startups and companies",
    title: "Your application or SaaS, from scoping to production.",
    lead: "For startups, companies and founders: a product built around your business, delivered in visible steps, by the same person from the first conversation to production.",
    primaryCta: "Talk about my project",
    secondaryCta: "See the case studies",
    promises: ["Reply within 24 business hours", "One technical point of contact", "Your code and data"],
    benefitsTitle: "What you get",
    benefits: [
      {
        title: "A V1 in production sooner",
        body: "A scope decided at the start: the essentials first, live, then changes driven by real usage.",
      },
      {
        title: "A foundation that lasts",
        body: "Architecture, data model and integrations designed to evolve without a full rewrite.",
      },
      {
        title: "No information lost",
        body: "The person who scopes is the one who codes and deploys: no relay between sales, project manager and developers.",
      },
      {
        title: "No lock-in",
        body: "Code, accounts and data belong to you, with documentation to take over or bring in-house.",
      },
    ],
    includedTitle: "The skills involved",
    included: [
      "Product scoping and V1 prioritisation",
      "Interface design and user journeys",
      "Front-end and mobile development",
      "APIs, backends, payments and authentication",
      "LLM integration and automation",
      "CI/CD, cloud, monitoring and backups",
    ],
    workTitle: "Case studies",
    workLead: "Products designed, built and run by the studio, and a client engagement.",
    work: [
      { key: "pick4me", label: "Marketplace and mobile app" },
      { key: "pont-facturx", label: "B2B e-invoicing SaaS" },
      { key: "goodcall", label: "Consumer app" },
      { key: "ops-knowledge-agent", label: "AI demonstrator (RAG, MCP)" },
      { key: "ci-cd-platform", label: "DevOps engagement, STMicroelectronics" },
      { key: "docextract", label: "Document extraction SaaS" },
    ],
    servicesTitle: "The services behind the offer",
    services: ["applications", "mvp", "backends", "automation", "ai", "devops"],
    heroCaption: "Screen: Pont Factur-X, a studio product in production.",
    architecture: {
      title: "What the studio sets up, layer by layer.",
      layers: [
        { label: "01 / Interface", title: "Web and mobile", stack: ["Next.js", "React Native", "Flutter"] },
        { label: "02 / API", title: "Business backend", stack: ["NestJS", "FastAPI", "Stripe"] },
        { label: "03 / Data", title: "Storage and queues", stack: ["PostgreSQL", "Redis", "Celery"] },
        { label: "04 / Infra", title: "Production", stack: ["Docker", "Kubernetes", "Terraform"] },
      ],
    },
    deliverables: {
      title: "What you receive.",
      items: [
        { key: "The source code", body: "A repository in your name, full history" },
        { key: "The access", body: "Cloud accounts, domains and services in your name" },
        { key: "The documentation", body: "To take over or bring in-house" },
        { key: "Production", body: "CI/CD, monitoring and backups" },
      ],
    },
    processTitle: "The process, from scoping to deployment",
    process: [
      "Scoping: users, problem, V1 scope and constraints.",
      "Architecture and prototype: technical choices explained, a clickable journey to approve.",
      "Development in regular releases, visible in production or staging.",
      "Production launch, monitoring, then evolutions or a documented handover.",
    ],
    faq: [
      {
        question: "Do I need a full specification?",
        answer: "No. Scoping turns your need into a clear scope. A first conversation is enough to start.",
      },
      {
        question: "How is the quote prepared?",
        answer:
          "After a free scoping conversation, you receive a written proposal: scope, schedule and budget. Nothing is committed before you agree.",
      },
      {
        question: "Can you take over an existing application?",
        answer: "Yes, after an audit of the code and infrastructure to see what can be kept, fixed or replaced.",
      },
      {
        question: "Do you work with an existing team?",
        answer: "Yes: as reinforcement on a defined scope, with the team's own tools (Git, CI, tickets).",
      },
      {
        question: "Who owns the code and the data?",
        answer: "You do. The code, the accounts and the data belong to you, with a clean handover if you bring it in-house later.",
      },
    ],
    formTitle: "Let's talk about your project",
    formLead: "A few lines are enough: the problem, the users, where you stand. First reasoned reply within 24 business hours.",
  },
};

export const LANDINGS: Record<LandingKey, Record<Locale, LandingContent>> = {
  websites: WEBSITES,
  applications: APPLICATIONS,
};
