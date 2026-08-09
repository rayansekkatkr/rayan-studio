const CITY_PROFILES = {
  paris: {
    districts: ["Le Marais", "Montmartre", "Bastille", "Batignolles"],
    market: "un marché dense où la première impression en ligne pèse vite dans le choix d'un lieu",
    visitorContext: "clients pressés, touristes, actifs de quartier et recherches mobiles très concurrentielles",
    localAngle: "à Paris, le site doit immédiatement clarifier le positionnement et faciliter la réservation ou le contact",
  },
  marseille: {
    districts: ["le Vieux-Port", "Le Panier", "La Joliette", "Castellane"],
    market: "une ville très locale, touristique et concurrentielle selon les quartiers",
    visitorContext: "clients de proximité, visiteurs de passage et recherches mobiles autour du littoral ou du centre",
    localAngle: "à Marseille, le site doit rassurer vite et mettre en avant l'accès, l'ambiance et les informations pratiques",
  },
  lyon: {
    districts: ["la Presqu'île", "la Croix-Rousse", "le Vieux Lyon", "la Part-Dieu"],
    market: "un bassin d'activité où la réputation, les avis et la lisibilité de l'offre comptent beaucoup",
    visitorContext: "habitants, professionnels, étudiants et visiteurs qui comparent avant de contacter",
    localAngle: "à Lyon, le site doit donner une image sérieuse tout en rendant le parcours de contact très direct",
  },
  toulouse: {
    districts: ["le Capitole", "Saint-Cyprien", "les Carmes", "Saint-Aubin"],
    market: "une ville dynamique avec beaucoup d'indépendants, de commerces et de recherches locales qualifiées",
    visitorContext: "clients mobiles, familles, étudiants et professionnels qui cherchent une réponse rapide",
    localAngle: "à Toulouse, le site doit aller droit au but et montrer rapidement pourquoi choisir votre adresse",
  },
  nice: {
    districts: ["le Vieux-Nice", "le quartier du Port", "Libération", "la Promenade des Anglais"],
    market: "un marché très visuel porté par le tourisme, la proximité et l'image de marque",
    visitorContext: "clients locaux, visiteurs internationaux et recherches rapides depuis mobile",
    localAngle: "à Nice, le site doit soigner la perception visuelle et rendre les informations essentielles très accessibles",
  },
  nantes: {
    districts: ["le Bouffay", "Graslin", "l'île de Nantes", "Talensac"],
    market: "un écosystème local actif où les commerces doivent être crédibles avant le premier contact",
    visitorContext: "habitants, actifs, familles et prospects qui comparent plusieurs options en ligne",
    localAngle: "à Nantes, le site doit présenter clairement l'activité et créer de la confiance sans discours trop générique",
  },
  montpellier: {
    districts: ["l'Écusson", "Antigone", "Port Marianne", "les Beaux-Arts"],
    market: "une ville jeune et commerçante où la recherche locale passe beaucoup par le mobile",
    visitorContext: "étudiants, familles, touristes et clients de quartier qui veulent une information rapide",
    localAngle: "à Montpellier, le site doit être lisible, responsive et orienté vers une action simple",
  },
  strasbourg: {
    districts: ["la Petite France", "la Krutenau", "Neudorf", "l'Orangerie"],
    market: "un marché local et touristique où la clarté des informations pratiques influence la décision",
    visitorContext: "habitants, frontaliers, visiteurs et recherches locales saisonnières",
    localAngle: "à Strasbourg, le site doit combiner crédibilité, détails pratiques et parcours de contact fluide",
  },
  bordeaux: {
    districts: ["les Chartrons", "Saint-Pierre", "Saint-Michel", "la Bastide"],
    market: "une ville d'image où la qualité perçue peut fortement influencer le choix d'un commerce",
    visitorContext: "habitants, visiteurs, professionnels et clients qui comparent beaucoup avant de se déplacer",
    localAngle: "à Bordeaux, le site doit traduire le niveau de qualité réel et faciliter la prise de contact",
  },
  lille: {
    districts: ["le Vieux-Lille", "Wazemmes", "le centre", "Euralille"],
    market: "un marché urbain dense avec une forte logique de proximité et de recommandations",
    visitorContext: "clients de quartier, étudiants, familles et actifs qui cherchent rapidement une option fiable",
    localAngle: "à Lille, le site doit être clair, chaleureux et immédiatement utile sur mobile",
  },
};

const SECTOR_PROFILES = {
  restaurant: {
    intent: "réservations, menu, horaires, accès et crédibilité avant le déplacement",
    painPoints: [
      "menu difficile à trouver ou pas adapté au mobile",
      "réservation ou téléphone trop peu visibles",
      "photos, avis et ambiance qui ne rassurent pas assez vite",
    ],
    checklist: ["Menu lisible", "Réservation visible", "Horaires à jour", "Preuves visuelles"],
  },
  cafe: {
    intent: "ambiance, horaires, localisation, événements et contact rapide",
    painPoints: [
      "identité du lieu trop peu différenciante",
      "informations pratiques éparpillées entre réseaux sociaux et fiche Google",
      "parcours mobile insuffisant pour appeler ou trouver l'adresse",
    ],
    checklist: ["Ambiance claire", "Adresse évidente", "Horaires visibles", "Contact rapide"],
  },
  hotel: {
    intent: "confiance, chambres, accès, réservation directe et perception haut de gamme",
    painPoints: [
      "site moins rassurant que les plateformes de réservation",
      "chambres, services ou localisation mal hiérarchisés",
      "réservation directe trop peu encouragée",
    ],
    checklist: ["Chambres valorisées", "Réservation directe", "Accès clair", "Signaux de confiance"],
  },
  boulangerie: {
    intent: "produits, horaires, commandes, traiteur et image artisanale",
    painPoints: [
      "savoir-faire artisanal peu visible",
      "commandes spéciales ou demandes traiteur difficiles à comprendre",
      "horaires et produits phares pas assez accessibles",
    ],
    checklist: ["Produits phares", "Commandes visibles", "Horaires simples", "Image artisanale"],
  },
  patisserie: {
    intent: "gammes, commandes, événements, photos produits et contact",
    painPoints: [
      "visuels produits trop faibles pour déclencher l'envie",
      "commandes d'événements ou gâteaux spéciaux mal expliquées",
      "contact et délais peu visibles sur mobile",
    ],
    checklist: ["Photos produits", "Commandes événement", "Délais clairs", "Contact visible"],
  },
  bar: {
    intent: "ambiance, horaires, événements, privatisation et réservations de groupe",
    painPoints: [
      "programmation ou événements difficiles à trouver",
      "privatisation et groupes pas assez mis en avant",
      "ambiance réelle du lieu peu perceptible avant la visite",
    ],
    checklist: ["Ambiance visible", "Événements clairs", "Groupes/privatisation", "Contact rapide"],
  },
  "commerce-local": {
    intent: "offre, horaires, confiance, itinéraire et prise de contact locale",
    painPoints: [
      "offre trop floue pour comprendre rapidement ce qui est vendu",
      "informations pratiques dispersées",
      "image moins professionnelle que la qualité réelle du commerce",
    ],
    checklist: ["Offre claire", "Infos pratiques", "Contact simple", "Image crédible"],
  },
};

const DEFAULT_CITY_PROFILE = {
  districts: [],
  market: "un marché local où la confiance se joue souvent avant le premier contact",
  visitorContext: "clients de proximité et prospects qui comparent rapidement plusieurs options",
  localAngle: "dans cette ville, le site doit clarifier l'offre et rendre le contact évident",
};

// Questions type par secteur. La ville et les quartiers réels sont injectés
// dans les réponses pour produire un contenu distinct par combinaison.
const SECTOR_FAQ_BUILDERS = {
  restaurant: (cityLabel, districtsText) => [
    {
      question: `Que doit contenir le site d'un restaurant à ${cityLabel} ?`,
      answer: `Le menu lisible sur mobile, les horaires à jour, l'adresse avec l'itinéraire et un moyen de réserver en un geste. À ${cityLabel}, beaucoup de clients choisissent depuis leur téléphone${districtsText ? `, souvent depuis un quartier comme ${districtsText}` : ""} : chaque information doit être accessible en quelques secondes.`,
    },
    {
      question: `Faut-il un module de réservation en ligne ?`,
      answer: `Pas forcément. Un bouton d'appel direct et un lien WhatsApp bien placés suffisent souvent pour un restaurant indépendant. Un module de réservation devient utile quand le volume le justifie — c'est un point que je cadre avec vous au diagnostic.`,
    },
    {
      question: `Le site peut-il aider face aux plateformes d'avis et de livraison ?`,
      answer: `Oui : un site propre est le seul endroit où vous contrôlez entièrement votre image, vos photos et vos prix. Il sert de destination fiable depuis votre fiche Google et vos réseaux, sans commission.`,
    },
  ],
  cafe: (cityLabel, districtsText) => [
    {
      question: `Un café de quartier a-t-il vraiment besoin d'un site à ${cityLabel} ?`,
      answer: `Une simple page claire suffit souvent : ambiance, horaires, adresse et lien vers votre fiche Google. ${districtsText ? `Dans des quartiers comme ${districtsText}, la ` : "La "}recherche « café près de moi » se joue sur la première impression : un site propre fait la différence face à une fiche seule.`,
    },
    {
      question: `Que mettre en avant en priorité ?`,
      answer: `Ce qui vous différencie : torréfaction, brunch, terrasse, événements. Puis les informations pratiques — horaires, adresse, contact — visibles sans défilement sur mobile.`,
    },
    {
      question: `Le site remplace-t-il les réseaux sociaux ?`,
      answer: `Non, il les complète : les réseaux créent l'envie, le site centralise les informations fiables et reste trouvable sur Google quand quelqu'un cherche votre nom ou votre quartier.`,
    },
  ],
  hotel: (cityLabel, districtsText) => [
    {
      question: `Comment un hôtel à ${cityLabel} peut-il encourager la réservation directe ?`,
      answer: `En rendant le site plus rassurant que les plateformes : photos honnêtes des chambres, localisation claire${districtsText ? ` (quartiers recherchés : ${districtsText})` : ""}, avantages de la réservation directe affichés et un parcours de contact sans friction.`,
    },
    {
      question: `Que doit montrer la page d'accueil ?`,
      answer: `En un écran : le type d'établissement, l'emplacement, une photo forte et le bouton de réservation ou de contact. Les détails (chambres, services, accès) viennent ensuite, bien hiérarchisés.`,
    },
    {
      question: `Le site doit-il être multilingue ?`,
      answer: `Si votre clientèle est en partie internationale, une version anglaise soignée est un vrai levier. Je peux la prévoir dès la structure pour éviter de refaire le site plus tard.`,
    },
  ],
  boulangerie: (cityLabel, districtsText) => [
    {
      question: `Qu'est-ce qu'un bon site pour une boulangerie à ${cityLabel} ?`,
      answer: `Un site qui montre le savoir-faire (photos réelles des produits), affiche les horaires sans ambiguïté et explique comment commander — notamment pour les demandes traiteur ou les gâteaux sur commande. ${districtsText ? `C'est ce qui fait revenir la clientèle de quartier, que vous soyez installé dans un secteur comme ${districtsText} ou ailleurs.` : ""}`,
    },
    {
      question: `Faut-il vendre en ligne ?`,
      answer: `Rarement nécessaire au départ. Un formulaire de commande ou un lien WhatsApp couvre la plupart des besoins (commandes spéciales, traiteur) sans la complexité d'une boutique en ligne.`,
    },
    {
      question: `Combien de pages faut-il ?`,
      answer: `Une à trois : l'essentiel (produits, horaires, adresse, contact), éventuellement une page commandes et une page à propos. Mieux vaut peu de pages très claires qu'un site dense jamais mis à jour.`,
    },
  ],
  patisserie: (cityLabel, districtsText) => [
    {
      question: `Comment présenter une pâtisserie en ligne à ${cityLabel} ?`,
      answer: `Par l'image avant tout : des photos produits soignées déclenchent l'envie et justifient le positionnement. Ensuite, un parcours simple pour les commandes d'événements — gâteaux personnalisés, mariages, entreprises${districtsText ? ` — pour des clients venus de quartiers comme ${districtsText} ou d'ailleurs` : ""}.`,
    },
    {
      question: `Comment gérer les commandes spéciales ?`,
      answer: `Avec une page dédiée qui précise les délais, les fourchettes de prix et un formulaire court. Cela filtre les demandes floues et fait gagner du temps en boutique.`,
    },
    {
      question: `Le site peut-il montrer les créations récentes ?`,
      answer: `Oui, soit par une galerie simple à mettre à jour, soit en intégrant votre flux Instagram — je recommande la solution que vous tiendrez réellement à jour.`,
    },
  ],
  bar: (cityLabel, districtsText) => [
    {
      question: `Que doit afficher le site d'un bar à ${cityLabel} ?`,
      answer: `L'ambiance réelle (photos du lieu), les horaires, la programmation et un contact direct pour les groupes. ${districtsText ? `Dans une ville où l'on sort dans des quartiers comme ${districtsText}, le ` : "Le "}site sert surtout à confirmer le choix avant de se déplacer.`,
    },
    {
      question: `Comment mettre en avant la privatisation ?`,
      answer: `Avec une section dédiée : capacité, formules, créneaux et un formulaire court. Les demandes de privatisation sont souvent les plus rentables et méritent un vrai parcours.`,
    },
    {
      question: `Faut-il publier les événements sur le site ?`,
      answer: `Seulement si vous pouvez les tenir à jour. Sinon, un lien clair vers le réseau social où vous publiez déjà vaut mieux qu'un agenda obsolète.`,
    },
  ],
  "commerce-local": (cityLabel, districtsText) => [
    {
      question: `Pourquoi un commerce local à ${cityLabel} a-t-il besoin d'un site ?`,
      answer: `Parce que la recherche commence en ligne, même pour un achat en boutique. Un site clair — offre, horaires, adresse, contact — capte ces recherches${districtsText ? `, que le client vienne d'un quartier comme ${districtsText} ou d'ailleurs dans la ville` : ""}, et renvoie une image à la hauteur de votre travail.`,
    },
    {
      question: `Que faut-il montrer en premier ?`,
      answer: `Ce que vous vendez, pour qui, et comment vous joindre — le tout lisible en un écran mobile. Les détails (histoire, équipe, services) viennent après.`,
    },
    {
      question: `Un site vitrine peut-il évoluer vers la vente en ligne ?`,
      answer: `Oui : je construis une base propre qui peut accueillir une boutique plus tard, sans repartir de zéro. On commence par ce qui rapporte : être trouvé et contacté.`,
    },
  ],
};

const DEFAULT_SECTOR_PROFILE = {
  intent: "présentation claire de l'offre, confiance, informations pratiques et contact rapide",
  painPoints: [
    "message trop flou pour comprendre l'offre rapidement",
    "contact ou informations pratiques difficiles à trouver",
    "image en ligne moins crédible que la qualité réelle de l'activité",
  ],
  checklist: ["Offre claire", "Contact visible", "Mobile lisible", "Confiance renforcée"],
};

function formatDistricts(districts) {
  if (!districts || districts.length < 2) return "";
  const shown = districts.slice(0, 3);
  return `${shown.slice(0, -1).join(", ")} ou ${shown[shown.length - 1]}`;
}

function buildLocalSeoContent({ citySlug, cityLabel, sectorSlug, sectorLabel, objective }) {
  const city = CITY_PROFILES[citySlug] || DEFAULT_CITY_PROFILE;
  const sector = SECTOR_PROFILES[sectorSlug] || DEFAULT_SECTOR_PROFILE;
  const titleSector = SECTOR_PROFILES[sectorSlug] ? String(sectorLabel || "commerce").toLowerCase() : String(sectorLabel || "commerce");
  const lowerSector = String(sectorLabel || "commerce").toLowerCase();
  const districtsText = formatDistricts(city.districts);
  const faqBuilder = SECTOR_FAQ_BUILDERS[sectorSlug];
  const faq = faqBuilder ? faqBuilder(cityLabel, districtsText) : [];

  return {
    metaTitle: `Création et refonte de site ${titleSector} à ${cityLabel}`,
    metaDescription:
      `Création ou refonte de site ${lowerSector} à ${cityLabel}${districtsText ? ` (${city.districts.slice(0, 2).join(", ")}…)` : ""}: une vitrine claire, mobile et crédible pour répondre aux recherches locales et faciliter le contact.`,
    title: `Création et refonte de site ${titleSector} à ${cityLabel}`,
    subtitle:
      `Un site vitrine ${lowerSector} pensé pour ${cityLabel}: image plus crédible, message clair, informations pratiques visibles et demandes locales plus qualifiées.`,
    localContext:
      `${cityLabel} est ${city.market}. Pour un ${lowerSector}, les visiteurs sont souvent ${city.visitorContext}; ${city.localAngle}.`,
    districtsLine: districtsText
      ? `Que votre ${lowerSector} se trouve dans un quartier comme ${districtsText}, ou ailleurs à ${cityLabel}, l'enjeu est le même : être trouvé sur les recherches locales et convaincre en quelques secondes sur mobile.`
      : "",
    sectorIntent:
      `L'intention de recherche principale pour un ${lowerSector}: ${sector.intent}.`,
    painPoints: sector.painPoints,
    checklist: sector.checklist,
    objective,
    faq,
    ctaIntro:
      `Je peux vous envoyer une lecture rapide de votre site actuel ou cadrer un premier site pour votre activité à ${cityLabel}.`,
  };
}

module.exports = {
  CITY_PROFILES,
  SECTOR_PROFILES,
  buildLocalSeoContent,
};
