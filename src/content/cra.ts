// Cyber Resilience Act offer page (FR only while demand is being tested).
// Regulatory statements are checked against Regulation (EU) 2024/2847:
// art. 14 (reporting steps and deadlines), art. 64 §10 (the small-enterprise
// exemption covers only the 24 h early warning), art. 69 §3 (reporting also
// applies to products placed on the market before 11 December 2027).
// Never promise compliance or certification: the manufacturer signs its own
// EU declaration of conformity.

export const CRA_PAGE = {
  seo: {
    title: "Conformité Cyber Resilience Act (CRA) pour les PME d'objets connectés",
    description:
      "Inventaire SBOM de votre firmware, veille des vulnérabilités et déclarations ENISA préparées. Un accompagnement CRA en français pour les petits fabricants d'objets connectés.",
  },
  hero: {
    eyebrow: "Cyber Resilience Act",
    title: "La conformité CRA pour les petits fabricants d'objets connectés.",
    lead: "L'inventaire de votre firmware, la veille des failles, et un expert qui vous dit quoi faire. En français, sans contrat grand compte.",
    primaryCta: "Réserver un diagnostic",
    secondaryCta: "Lire la check-list « Prêt à déclarer en 24 h ? »",
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
} as const;
