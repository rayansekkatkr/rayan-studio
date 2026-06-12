const CITY_PROFILES = {
  paris: {
    market: "un marché dense où la première impression en ligne pèse vite dans le choix d'un lieu",
    visitorContext: "clients pressés, touristes, actifs de quartier et recherches mobiles très concurrentielles",
    localAngle: "à Paris, le site doit immédiatement clarifier le positionnement et faciliter la réservation ou le contact",
  },
  marseille: {
    market: "une ville très locale, touristique et concurrentielle selon les quartiers",
    visitorContext: "clients de proximité, visiteurs de passage et recherches mobiles autour du littoral ou du centre",
    localAngle: "à Marseille, le site doit rassurer vite et mettre en avant l'accès, l'ambiance et les informations pratiques",
  },
  lyon: {
    market: "un bassin d'activité où la réputation, les avis et la lisibilité de l'offre comptent beaucoup",
    visitorContext: "habitants, professionnels, étudiants et visiteurs qui comparent avant de contacter",
    localAngle: "à Lyon, le site doit donner une image sérieuse tout en rendant le parcours de contact très direct",
  },
  toulouse: {
    market: "une ville dynamique avec beaucoup d'indépendants, de commerces et de recherches locales qualifiées",
    visitorContext: "clients mobiles, familles, étudiants et professionnels qui cherchent une réponse rapide",
    localAngle: "à Toulouse, le site doit aller droit au but et montrer rapidement pourquoi choisir votre adresse",
  },
  nice: {
    market: "un marché très visuel porté par le tourisme, la proximité et l'image de marque",
    visitorContext: "clients locaux, visiteurs internationaux et recherches rapides depuis mobile",
    localAngle: "à Nice, le site doit soigner la perception visuelle et rendre les informations essentielles très accessibles",
  },
  nantes: {
    market: "un écosystème local actif où les commerces doivent être crédibles avant le premier contact",
    visitorContext: "habitants, actifs, familles et prospects qui comparent plusieurs options en ligne",
    localAngle: "à Nantes, le site doit présenter clairement l'activité et créer de la confiance sans discours trop générique",
  },
  montpellier: {
    market: "une ville jeune et commerçante où la recherche locale passe beaucoup par le mobile",
    visitorContext: "étudiants, familles, touristes et clients de quartier qui veulent une information rapide",
    localAngle: "à Montpellier, le site doit être lisible, responsive et orienté vers une action simple",
  },
  strasbourg: {
    market: "un marché local et touristique où la clarté des informations pratiques influence la décision",
    visitorContext: "habitants, frontaliers, visiteurs et recherches locales saisonnières",
    localAngle: "à Strasbourg, le site doit combiner crédibilité, détails pratiques et parcours de contact fluide",
  },
  bordeaux: {
    market: "une ville d'image où la qualité perçue peut fortement influencer le choix d'un commerce",
    visitorContext: "habitants, visiteurs, professionnels et clients qui comparent beaucoup avant de se déplacer",
    localAngle: "à Bordeaux, le site doit traduire le niveau de qualité réel et faciliter la prise de contact",
  },
  lille: {
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
  market: "un marché local où la confiance se joue souvent avant le premier contact",
  visitorContext: "clients de proximité et prospects qui comparent rapidement plusieurs options",
  localAngle: "dans cette ville, le site doit clarifier l'offre et rendre le contact évident",
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

function buildLocalSeoContent({ citySlug, cityLabel, sectorSlug, sectorLabel, kpi }) {
  const city = CITY_PROFILES[citySlug] || DEFAULT_CITY_PROFILE;
  const sector = SECTOR_PROFILES[sectorSlug] || DEFAULT_SECTOR_PROFILE;
  const titleSector = SECTOR_PROFILES[sectorSlug] ? String(sectorLabel || "commerce").toLowerCase() : String(sectorLabel || "commerce");
  const lowerSector = String(sectorLabel || "commerce").toLowerCase();

  return {
    metaTitle: `Création et refonte de site ${titleSector} à ${cityLabel}`,
    metaDescription:
      `Création ou refonte de site ${lowerSector} à ${cityLabel}: une vitrine claire, mobile et crédible pour répondre aux recherches locales, rassurer les clients et faciliter le contact.`,
    title: `Création et refonte de site ${titleSector} à ${cityLabel}`,
    subtitle:
      `Un site vitrine ${lowerSector} pensé pour ${cityLabel}: image plus crédible, message clair, informations pratiques visibles et demandes locales plus qualifiées.`,
    localContext:
      `${cityLabel} est ${city.market}. Pour un ${lowerSector}, les visiteurs sont souvent ${city.visitorContext}; ${city.localAngle}.`,
    sectorIntent:
      `L'intention de recherche principale pour un ${lowerSector}: ${sector.intent}.`,
    painPoints: sector.painPoints,
    checklist: sector.checklist,
    proof: kpi,
    ctaIntro:
      `Je peux vous envoyer une lecture rapide de votre site actuel ou cadrer un premier site pour votre activité à ${cityLabel}.`,
  };
}

module.exports = {
  CITY_PROFILES,
  SECTOR_PROFILES,
  buildLocalSeoContent,
};
