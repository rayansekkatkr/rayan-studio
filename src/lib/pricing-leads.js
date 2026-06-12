const PRICING_LEAD_OFFERS = {
  express: {
    projectType: "no-site",
    labelFr: "Creation Express",
    labelEn: "Express Creation",
    messageFr:
      "Je suis interesse par l'offre Creation Express. J'aimerais creer un premier site clair pour mon activite.",
    messageEn:
      "I am interested in the Express Creation offer. I would like to create a clear first website for my business.",
  },
  redesign: {
    projectType: "dated-site",
    labelFr: "Refonte Pro",
    labelEn: "Pro Redesign",
    messageFr:
      "Je suis interesse par l'offre Refonte Pro. J'ai deja un site actuel et j'aimerais le rendre plus clair, credible et efficace.",
    messageEn:
      "I am interested in the Pro Redesign offer. I already have a current website and would like to make it clearer, more credible and more effective.",
  },
  custom: {
    projectType: "other",
    labelFr: "Sur mesure",
    labelEn: "Custom",
    messageFr:
      "Je suis interesse par l'offre Sur mesure. J'aimerais discuter d'un projet plus specifique.",
    messageEn:
      "I am interested in the Custom offer. I would like to discuss a more specific project.",
  },
};

function getPricingLeadOffer(offerKey) {
  return PRICING_LEAD_OFFERS[offerKey] || PRICING_LEAD_OFFERS.redesign;
}

function buildPricingLeadDefaults(offerKey, locale = "fr") {
  const offer = getPricingLeadOffer(offerKey);
  const english = locale === "en";

  return {
    offerKey: PRICING_LEAD_OFFERS[offerKey] ? offerKey : "redesign",
    offerLabel: english ? offer.labelEn : offer.labelFr,
    projectType: offer.projectType,
    firstName: "",
    businessType: "",
    email: "",
    siteUrl: "",
    message: english ? offer.messageEn : offer.messageFr,
    companyWebsite: "",
  };
}

module.exports = {
  PRICING_LEAD_OFFERS,
  buildPricingLeadDefaults,
  getPricingLeadOffer,
};
