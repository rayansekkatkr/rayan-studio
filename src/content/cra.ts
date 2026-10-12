// Cyber Resilience Act offer page, in French and English.
// Regulatory statements are checked against Regulation (EU) 2024/2847:
// art. 14 (reporting steps and deadlines), art. 64 §10 (the small-enterprise
// exemption covers only the 24 h early warning), art. 69 §3 (reporting also
// applies to products placed on the market before 11 December 2027).
// Never promise compliance or certification: the manufacturer signs its own
// EU declaration of conformity.

import type { Locale } from "@/lib/i18n";

type TitledText = { title: string; body: string };

export type CraOffer = {
  id: "diagnostic" | "veille";
  name: string;
  terms: string;
  ordered: boolean;
  items: string[];
};

export type CraPageContent = {
  seo: { title: string; description: string };
  ui: {
    navLabel: string;
    sections: { id: "obligations" | "offres" | "methode" | "faq"; label: string }[];
    headerCta: string;
    languageSwitch: { label: string; ariaLabel: string };
    tableCaption: string;
    tableHeaders: [string, string, string];
    offersEyebrow: string;
    offersTitle: string;
    notDoneTitle: string;
    methodEyebrow: string;
    methodTitle: string;
    aboutEyebrow: string;
    faqTitle: string;
    diagnosticEyebrow: string;
    footer: { legal: string; privacy: string; terms: string; cookies: string };
  };
  hero: { eyebrow: string; title: string; lead: string; primaryCta: string; secondaryCta: string; note: string };
  reporting: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: { step: string; deadline: string; content: string }[];
    incidentNote: string;
    facts: TitledText[];
  };
  firmware: { eyebrow: string; title: string; lead: string; points: TitledText[]; conclusion: string };
  offers: CraOffer[];
  notDone: TitledText[];
  method: TitledText[];
  about: { title: string; lead: string; items: TitledText[] };
  faq: { question: string; answer: string }[];
  finalCta: { title: string; body: string; formSubject: string };
  serviceCard: { title: string; description: string };
  checklist: { title: string; body: string; link: string };
};

const FR: CraPageContent = {
  seo: {
    title: "Conformité Cyber Resilience Act (CRA) pour les PME d'objets connectés",
    description:
      "Inventaire SBOM de votre firmware, veille des vulnérabilités et déclarations ENISA préparées. Un accompagnement CRA en français pour les petits fabricants d'objets connectés.",
  },
  ui: {
    navLabel: "Sections de la page",
    sections: [
      { id: "obligations", label: "Obligations" },
      { id: "offres", label: "Offres" },
      { id: "methode", label: "Méthode" },
      { id: "faq", label: "FAQ" },
    ],
    headerCta: "Réserver un diagnostic",
    languageSwitch: { label: "EN", ariaLabel: "English version" },
    tableCaption: "Les trois étapes de déclaration d'une vulnérabilité activement exploitée",
    tableHeaders: ["Étape", "Délai", "Ce qu'elle contient"],
    offersEyebrow: "Offres",
    offersTitle: "Deux façons de travailler ensemble.",
    notDoneTitle: "Ce que je ne fais pas",
    methodEyebrow: "Méthode",
    methodTitle: "Quatre étapes, du premier échange à la restitution.",
    aboutEyebrow: "Intervenant",
    faqTitle: "Questions fréquentes",
    diagnosticEyebrow: "Diagnostic",
    footer: {
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      terms: "CGV",
      cookies: "Gérer les cookies",
    },
  },
  hero: {
    eyebrow: "Cyber Resilience Act",
    title: "La conformité CRA pour les petits fabricants d'objets connectés.",
    lead: "L'inventaire de votre firmware, la veille des failles, et un expert qui vous dit quoi faire. En français, sans contrat grand compte.",
    primaryCta: "Réserver un diagnostic",
    secondaryCta: "Lire la check-list « Prêt à déclarer en 24\u00a0h\u00a0? »",
    note: "J'accompagne vers la conformité. Vous restez responsable de votre déclaration UE de conformité.",
  },
  reporting: {
    eyebrow: "Ce qui s'applique déjà",
    title: "Depuis le 11 septembre 2026, une faille exploitée se déclare en trois temps.",
    lead: "Un fabricant qui vend dans l'Union un produit avec du logiciel embarqué ou téléchargeable doit déclarer toute vulnérabilité activement exploitée. La déclaration passe par la plateforme unique de l'ENISA et arrive à l'ANSSI, le CSIRT coordinateur en France.",
    steps: [
      {
        step: "Alerte précoce",
        deadline: "24 h après avoir eu connaissance de l'exploitation",
        content: "Le signalement et les États membres où le produit est vendu",
      },
      {
        step: "Notification",
        deadline: "72 h",
        content:
          "Le produit, la nature de l'exploitation, les mesures prises et celles que les utilisateurs peuvent appliquer",
      },
      {
        step: "Rapport final",
        deadline: "14 jours après la mise à disposition d'un correctif",
        content: "La gravité, l'impact et le correctif publié",
      },
    ],
    incidentNote:
      "Un incident grave suit les mêmes délais de 24 h et 72 h, avec un rapport final un mois après la notification.",
    facts: [
      {
        title: "Vos produits déjà vendus sont concernés.",
        body: "L'obligation de déclaration couvre aussi les produits mis sur le marché avant décembre 2027.",
      },
      {
        title: "Vos utilisateurs doivent être informés",
        body: "de la vulnérabilité et des mesures à prendre.",
      },
      {
        title: "Le 11 décembre 2027,",
        body: "toutes les exigences essentielles s'appliquent et les nouveaux produits portent le marquage CE au titre du CRA.",
      },
    ],
  },
  firmware: {
    eyebrow: "Firmware embarqué",
    title: "Pourquoi c'est plus difficile pour un firmware C/C++",
    lead: "Un SBOM se génère en une commande sur une application web. Sur un firmware embarqué, l'inventaire est souvent la partie la plus longue.",
    points: [
      {
        title: "Pas de gestionnaire de paquets.",
        body: "HAL du fondeur, RTOS, pile réseau, bibliothèque TLS : le code est copié dans le dépôt, et sa version est rarement tracée.",
      },
      {
        title: "Du code modifié localement.",
        body: "Un composant corrigé en interne n'est plus la version amont. Savoir si une CVE vous touche demande de lire le code.",
      },
      {
        title: "Des références de vulnérabilités mal adaptées.",
        body: "Les identifiants des bases publiques couvrent mal les composants embarqués : faux positifs d'un côté, failles manquées de l'autre.",
      },
      {
        title: "Plusieurs variantes de firmware.",
        body: "Chaque cible ou configuration de build a son propre inventaire.",
      },
    ],
    conclusion:
      "La réponse : un SBOM produit par votre CI à chaque build, à partir des sources réelles, plutôt qu'une liste tenue à la main.",
  },
  offers: [
    {
      id: "diagnostic",
      name: "Diagnostic CRA",
      terms:
        "Prix fixe, communiqué après un premier échange de 30 minutes, avec la durée selon le nombre de produits.",
      ordered: true,
      items: [
        "Classification de chaque produit (par défaut, classe importante I ou II, critique) et voie d'évaluation de conformité qui en découle.",
        "SBOM généré dans votre CI (CycloneDX ou SPDX) pour un firmware de référence.",
        "Écarts par rapport aux exigences essentielles et aux obligations de déclaration.",
        "Plan d'action priorisé, en distinguant ce que votre équipe peut faire seule.",
        "Procédure de déclaration prête à l'emploi : qui détecte, qui décide, qui déclare, et des modèles pour l'alerte, la notification et le rapport final.",
      ],
    },
    {
      id: "veille",
      name: "Veille des vulnérabilités gérée",
      terms: "Abonnement mensuel, sur devis selon le nombre de produits suivis.",
      ordered: false,
      items: [
        "Suivi des SBOM de vos firmwares, mis à jour à chaque release.",
        "Tri de chaque nouvelle vulnérabilité : touche-t-elle votre build, est-elle exploitable, est-elle exploitée ?",
        "Recommandation écrite : corriger, atténuer, surveiller ou écarter avec justification.",
        "Déclarations préparées pour la plateforme de l'ENISA quand une vulnérabilité exploitée vous concerne, prêtes à relire et à déposer.",
        "Point mensuel et rapport écrit.",
        "Prise en compte d'une alerte sous 4 h ouvrées, du lundi au vendredi, de 9 h à 18 h heure de Paris. Les absences sont annoncées à l'avance, avec la marche à suivre en attendant.",
      ],
    },
  ],
  notDone: [
    {
      title: "Pas de certification ni de conformité garantie.",
      body: "La déclaration UE de conformité est la vôtre.",
    },
    {
      title: "Pas de dépôt à votre place.",
      body: "Je prépare les déclarations, vous les déposez.",
    },
    {
      title: "Pas de conseil juridique.",
      body: "Pour l'interprétation du texte et vos contrats, votre juriste reste l'interlocuteur.",
    },
    {
      title: "Pas d'évaluation en tant qu'organisme notifié.",
      body: "Si votre produit en exige un, je vous aide à préparer le dossier technique.",
    },
    {
      title: "Pas d'astreinte 24 h/24.",
      body: "Le délai de 24 h court quand vous avez connaissance de l'exploitation : mon rôle est que vous soyez prêts à ce moment-là.",
    },
  ],
  method: [
    {
      title: "Échange de 30 minutes",
      body: "Vos produits, votre chaîne de build, votre calendrier. Le prix fixe est annoncé à la fin.",
    },
    {
      title: "Accès en lecture",
      body: "Au dépôt et à la CI, puis intégration de la génération du SBOM.",
    },
    {
      title: "Analyse",
      body: "Classification, écarts, vulnérabilités connues dans vos composants.",
    },
    {
      title: "Restitution",
      body: "Rapport, plan d'action et procédure de déclaration. La veille peut prendre le relais.",
    },
  ],
  about: {
    title: "Qui intervient",
    lead: "Rayan Sekkat, ingénieur DevOps basé à Séoul, travaille en français pour des clients français et belges.",
    items: [
      {
        title: "2024, consultant DevOps pour STMicroelectronics :",
        body: "mise en production des outils STM32Cube, sur une plateforme GitLab CI/CD de plus de 170 pipelines par jour, avec livraison Windows, Linux et macOS.",
      },
      {
        title: "Missions freelance DevOps et sécurité",
        body: "pour des clients français et belges.",
      },
      {
        title: "Outils pratiqués :",
        body: "Syft, Trivy, Dependency-Track, OSV-Scanner.",
      },
    ],
  },
  faq: [
    {
      question: "Mon produit est-il concerné ?",
      answer:
        "Oui s'il contient du logiciel et peut se connecter à un appareil ou à un réseau, et s'il est vendu dans l'Union. Les dispositifs médicaux, les véhicules et l'aéronautique relèvent de leurs propres règles.",
    },
    {
      question: "Je suis une petite entreprise : suis-je sanctionnable ?",
      answer:
        "Oui, sauf sur un point. Les micro et petites entreprises ne sont pas sanctionnées pour un retard sur l'alerte de 24 h. La notification à 72 h, le rapport final et toutes les autres obligations s'appliquent.",
    },
    {
      question: "Mes produits déjà vendus sont-ils concernés ?",
      answer:
        "Pour la déclaration des vulnérabilités exploitées, oui, quelle que soit leur date de mise sur le marché. Les exigences essentielles visent les produits mis sur le marché à partir du 11 décembre 2027.",
    },
    {
      question: "Faut-il passer par un organisme notifié ?",
      answer:
        "Par défaut, non : l'auto-évaluation suffit. Les produits de classe importante I (serrures connectées, caméras de sécurité, babyphones, alarmes, routeurs, jouets connectés, wearables de suivi de santé) peuvent s'auto-évaluer s'ils appliquent les normes harmonisées. Sinon, et pour la classe II, un tiers est nécessaire.",
    },
    {
      question: "Qu'est-ce qu'une vulnérabilité activement exploitée ?",
      answer:
        "Une vulnérabilité pour laquelle il existe une preuve fiable qu'un acteur malveillant l'a exploitée sans autorisation. Une CVE publiée sans exploitation connue ne déclenche pas la déclaration.",
    },
    {
      question: "Et les composants open source que j'intègre ?",
      answer:
        "Vous répondez des composants tiers intégrés dans votre produit. Si vous trouvez une faille dans l'un d'eux, vous la signalez aussi à son mainteneur.",
    },
    {
      question: "Quel est le montant des amendes ?",
      answer:
        "Jusqu'à 15 M€ ou 2,5 % du chiffre d'affaires mondial pour les exigences essentielles et les obligations de déclaration. Ce sont des plafonds, fixés au cas par cas par l'autorité de surveillance.",
    },
    {
      question: "Travaillez-vous avec des bureaux d'études ?",
      answer:
        "Oui : en sous-traitance sur la partie CRA de vos projets clients, ou en binôme sur un diagnostic.",
    },
  ],
  finalCta: {
    title: "Faites le point sur vos produits en 30 minutes.",
    body: "Vous repartez avec la classification probable de vos produits et le prix fixe du diagnostic. Décrivez en quelques lignes vos produits et votre chaîne de build.",
    formSubject: "Diagnostic CRA",
  },
  serviceCard: {
    title: "Sécurité & conformité CRA",
    description:
      "Inventaire SBOM de vos firmwares, veille des vulnérabilités et déclarations ENISA préparées, pour les fabricants d'objets connectés soumis au Cyber Resilience Act.",
  },
  checklist: {
    title: "CRA : êtes-vous prêt à déclarer une faille en 24 h ?",
    body: "La check-list des vérifications à faire avant qu'une faille exploitée touche votre produit : inventaire, veille, rôles, modèles de déclaration.",
    link: "Lire la check-list",
  },
};

const EN: CraPageContent = {
  seo: {
    title: "Cyber Resilience Act (CRA) compliance for connected-device SMEs",
    description:
      "Firmware SBOM inventory, vulnerability monitoring and prepared ENISA reports. CRA support for small connected-device manufacturers, in English or French.",
  },
  ui: {
    navLabel: "Page sections",
    sections: [
      { id: "obligations", label: "Obligations" },
      { id: "offres", label: "Offers" },
      { id: "methode", label: "Method" },
      { id: "faq", label: "FAQ" },
    ],
    headerCta: "Book an assessment",
    languageSwitch: { label: "FR", ariaLabel: "Version française" },
    tableCaption: "The three steps for reporting an actively exploited vulnerability",
    tableHeaders: ["Step", "Deadline", "What it contains"],
    offersEyebrow: "Offers",
    offersTitle: "Two ways to work together.",
    notDoneTitle: "What I do not do",
    methodEyebrow: "Method",
    methodTitle: "Four steps, from the first call to the handover.",
    aboutEyebrow: "About",
    faqTitle: "Frequently asked questions",
    diagnosticEyebrow: "Assessment",
    footer: {
      legal: "Legal notice",
      privacy: "Privacy policy",
      terms: "Terms of sale",
      cookies: "Manage cookies",
    },
  },
  hero: {
    eyebrow: "Cyber Resilience Act",
    title: "CRA compliance for small connected-device manufacturers.",
    lead: "Your firmware inventory, vulnerability monitoring, and an expert who tells you what to do. In English or French, without an enterprise contract.",
    primaryCta: "Book an assessment",
    secondaryCta: "Read the checklist “Ready to report within 24 hours?”",
    note: "I guide you towards compliance. You remain responsible for your EU declaration of conformity.",
  },
  reporting: {
    eyebrow: "Already in force",
    title: "Since 11 September 2026, an exploited vulnerability is reported in three steps.",
    lead: "A manufacturer selling a product with embedded or downloadable software in the EU must report every actively exploited vulnerability. Reports go through ENISA's single reporting platform to the coordinator CSIRT of the Member State where the manufacturer is established (ANSSI in France).",
    steps: [
      {
        step: "Early warning",
        deadline: "24 hours after becoming aware of the exploitation",
        content: "The alert and the Member States where the product is sold",
      },
      {
        step: "Notification",
        deadline: "72 hours",
        content: "The product, the nature of the exploitation, the measures taken and those users can apply",
      },
      {
        step: "Final report",
        deadline: "14 days after a fix is available",
        content: "Severity, impact and the published fix",
      },
    ],
    incidentNote:
      "A severe incident follows the same 24-hour and 72-hour deadlines, with a final report one month after the notification.",
    facts: [
      {
        title: "Products already sold are covered.",
        body: "The reporting obligation also applies to products placed on the market before December 2027.",
      },
      {
        title: "Your users must be informed",
        body: "of the vulnerability and the measures to take.",
      },
      {
        title: "On 11 December 2027,",
        body: "all essential requirements apply and new products carry the CE marking under the CRA.",
      },
    ],
  },
  firmware: {
    eyebrow: "Embedded firmware",
    title: "Why it is harder for C/C++ firmware",
    lead: "On a web application, an SBOM takes one command. On embedded firmware, the inventory is often the longest part.",
    points: [
      {
        title: "No package manager.",
        body: "Vendor HAL, RTOS, network stack, TLS library: the code is copied into the repository and its version is rarely tracked.",
      },
      {
        title: "Locally modified code.",
        body: "A component patched in-house is no longer the upstream version. Knowing whether a CVE affects you means reading the code.",
      },
      {
        title: "Vulnerability identifiers that fit poorly.",
        body: "Public database identifiers cover embedded components poorly: false positives on one side, missed vulnerabilities on the other.",
      },
      {
        title: "Several firmware variants.",
        body: "Each target or build configuration has its own inventory.",
      },
    ],
    conclusion:
      "The answer: an SBOM produced by your CI on every build, from the actual sources, rather than a hand-maintained list.",
  },
  offers: [
    {
      id: "diagnostic",
      name: "CRA assessment",
      terms: "Fixed price, given after a first 30-minute call, with the duration based on the number of products.",
      ordered: true,
      items: [
        "Classification of each product (default, important class I or II, critical) and the conformity assessment route that follows.",
        "SBOM generated in your CI (CycloneDX or SPDX) for one reference firmware.",
        "Gaps against the essential requirements and the reporting obligations.",
        "Prioritised action plan, separating what your team can do on its own.",
        "Ready-to-use reporting procedure: who detects, who decides, who reports, with templates for the early warning, the notification and the final report.",
      ],
    },
    {
      id: "veille",
      name: "Managed vulnerability monitoring",
      terms: "Monthly subscription, quoted on the number of products monitored.",
      ordered: false,
      items: [
        "Tracking of your firmware SBOMs, updated with every release.",
        "Triage of each new vulnerability: does it affect your build, is it exploitable, is it exploited?",
        "Written recommendation: fix, mitigate, monitor or dismiss with a justification.",
        "Reports prepared for the ENISA platform when an exploited vulnerability affects you, ready to review and submit.",
        "Monthly review and written report.",
        "Alerts picked up within 4 business hours, Monday to Friday, 9 am to 6 pm Paris time. Absences are announced in advance, with the steps to follow in the meantime.",
      ],
    },
  ],
  notDone: [
    {
      title: "No certification and no guaranteed compliance.",
      body: "The EU declaration of conformity is yours.",
    },
    {
      title: "No submission on your behalf.",
      body: "I prepare the reports, you submit them.",
    },
    {
      title: "No legal advice.",
      body: "For interpreting the text and your contracts, your lawyer remains the contact.",
    },
    {
      title: "No notified-body assessment.",
      body: "If your product requires one, I help you prepare the technical file.",
    },
    {
      title: "No 24/7 on-call.",
      body: "The 24-hour clock starts when you become aware of the exploitation: my job is to make sure you are ready at that moment.",
    },
  ],
  method: [
    {
      title: "30-minute call",
      body: "Your products, your build chain, your timeline. The fixed price is given at the end.",
    },
    {
      title: "Read access",
      body: "To the repository and the CI, then integration of SBOM generation.",
    },
    {
      title: "Analysis",
      body: "Classification, gaps, known vulnerabilities in your components.",
    },
    {
      title: "Handover",
      body: "Report, action plan and reporting procedure. Monitoring can take over.",
    },
  ],
  about: {
    title: "Who does the work",
    lead: "Rayan Sekkat, DevOps engineer based in Seoul, works remotely for clients in France and Belgium, in French or English.",
    items: [
      {
        title: "2024, DevOps consultant for STMicroelectronics:",
        body: "releasing the STM32Cube tools on a GitLab CI/CD platform running more than 170 pipelines a day, with Windows, Linux and macOS delivery.",
      },
      {
        title: "Freelance DevOps and security work",
        body: "for clients in France and Belgium.",
      },
      {
        title: "Tools used:",
        body: "Syft, Trivy, Dependency-Track, OSV-Scanner.",
      },
    ],
  },
  faq: [
    {
      question: "Is my product covered?",
      answer:
        "Yes if it contains software, can connect to a device or a network, and is sold in the EU. Medical devices, vehicles and aviation fall under their own rules.",
    },
    {
      question: "I am a small company: can I be fined?",
      answer:
        "Yes, except on one point. Micro and small enterprises are not fined for missing the 24-hour early warning deadline. The 72-hour notification, the final report and all other obligations apply.",
    },
    {
      question: "Are products I have already sold covered?",
      answer:
        "For reporting exploited vulnerabilities, yes, whatever their date of placing on the market. The essential requirements apply to products placed on the market from 11 December 2027.",
    },
    {
      question: "Do I need a notified body?",
      answer:
        "By default, no: self-assessment is enough. Important class I products (smart locks, security cameras, baby monitors, alarm systems, routers, connected toys, health-monitoring wearables) can self-assess if they apply harmonised standards. Otherwise, and for class II, a third party is required.",
    },
    {
      question: "What is an actively exploited vulnerability?",
      answer:
        "A vulnerability for which there is reliable evidence that a malicious actor has exploited it without permission. A published CVE with no known exploitation does not trigger a report.",
    },
    {
      question: "What about the open-source components I integrate?",
      answer:
        "You are responsible for the third-party components integrated in your product. If you find a vulnerability in one of them, you also report it to its maintainer.",
    },
    {
      question: "How large are the fines?",
      answer:
        "Up to €15 million or 2.5% of worldwide annual turnover for the essential requirements and the reporting obligations. These are ceilings, set case by case by the market surveillance authority.",
    },
    {
      question: "Do you work with engineering consultancies?",
      answer: "Yes: as a subcontractor on the CRA part of your client projects, or as a pair on an assessment.",
    },
  ],
  finalCta: {
    title: "Review your products in 30 minutes.",
    body: "You leave with the likely classification of your products and the fixed price of the assessment. Describe your products and your build chain in a few lines.",
    formSubject: "CRA assessment",
  },
  serviceCard: {
    title: "Security & CRA compliance",
    description:
      "Firmware SBOM inventory, vulnerability monitoring and prepared ENISA reports, for connected-device manufacturers subject to the Cyber Resilience Act.",
  },
  checklist: {
    title: "CRA: are you ready to report a vulnerability within 24 hours?",
    body: "The checklist of what to prepare before an exploited vulnerability hits your product: inventory, monitoring, roles, reporting templates.",
    link: "Read the checklist",
  },
};

export const CRA_CONTENT: Record<Locale, CraPageContent> = { fr: FR, en: EN };

export function getCraPage(locale: Locale): CraPageContent {
  return CRA_CONTENT[locale];
}
