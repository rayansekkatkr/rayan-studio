import { craPath } from "@/lib/site-routes";
import type { InsightRecord } from "./types";

// Published in French only while the Cyber Resilience Act offer is tested.
// The English text is ready but stays unrouted until "en" joins availableLocales
// (and the EN slug replaces null in slugs.ts).
export const craReportingChecklist: InsightRecord = {
  key: "cra-reporting-checklist",
  category: "checklists",
  slug: { fr: "cra-declarer-faille-24h", en: "cra-24-hour-vulnerability-reporting-checklist" },
  title: {
    fr: "CRA : êtes-vous prêt à déclarer une faille en 24 h ?",
    en: "CRA: are you ready to report a vulnerability within 24 hours?",
  },
  description: {
    fr: "Les vérifications à faire avant qu'une faille exploitée touche votre produit : inventaire, veille, rôles, modèles de déclaration.",
    en: "The checks to run before an exploited vulnerability hits your product: inventory, monitoring, roles, reporting templates.",
  },
  publishedAt: "2026-10-12",
  relatedService: "devops",
  availableLocales: ["fr"],
  cta: {
    fr: {
      serviceLabel: "Accompagnement Cyber Resilience Act",
      serviceHref: craPath("fr"),
      primaryLabel: "Réserver un diagnostic",
      primaryHref: `${craPath("fr")}#diagnostic`,
    },
  },
  blocks: {
    fr: [
      {
        type: "paragraph",
        text: "Depuis le 11 septembre 2026, un fabricant doit signaler une vulnérabilité activement exploitée dans son produit sous 24 h, via la plateforme unique de l'ENISA. Le délai commence au moment où vous avez connaissance de l'exploitation, pas quand vous avez fini d'analyser. Ce qui se prépare avant ce moment-là tient dans cette liste.",
      },
      { type: "heading", level: 2, text: "Avant : savoir ce que vous vendez" },
      {
        type: "checklist",
        items: [
          "La liste de vos produits vendus dans l'Union, y compris ceux mis sur le marché avant décembre 2027, avec les pays où chacun est vendu (l'alerte précoce les demande).",
          "Un SBOM par version de firmware en circulation, et pas seulement pour la dernière.",
          "La correspondance entre numéro de série ou modèle et version de firmware installée.",
          "Les composants modifiés en interne identifiés comme tels dans le SBOM.",
        ],
      },
      { type: "heading", level: 2, text: "Avant : savoir qu'une faille est exploitée" },
      {
        type: "checklist",
        items: [
          "Une adresse ou un formulaire pour recevoir les signalements de vulnérabilités, publié et surveillé.",
          "Une politique de divulgation coordonnée des vulnérabilités, même courte.",
          "Une veille sur vos composants : avis de sécurité de vos fondeurs et éditeurs, bulletins du CERT-FR, catalogue des vulnérabilités exploitées de la CISA (KEV).",
          "Une personne nommée qui lit ces alertes, et un suppléant.",
          "Une définition partagée en interne : « activement exploitée » signifie qu'il existe une preuve fiable d'exploitation, pas seulement une CVE publiée.",
        ],
      },
      { type: "heading", level: 2, text: "Avant : savoir qui fait quoi" },
      {
        type: "checklist",
        items: [
          "Qui décide qu'un cas doit être déclaré, et qui tranche en son absence.",
          "Qui dépose sur la plateforme de l'ENISA, avec un accès vérifié avant d'en avoir besoin.",
          "Qui prévient la direction, le service client et, si besoin, votre juriste.",
          "Des modèles préremplis pour l'alerte de 24 h, la notification de 72 h et le rapport final.",
        ],
      },
      { type: "heading", level: 2, text: "Le jour J : les trois échéances" },
      {
        type: "checklist",
        items: [
          "Sous 24 h : alerte précoce, avec les États membres où le produit est vendu.",
          "Sous 72 h : notification avec le produit concerné, la nature de l'exploitation, les mesures prises et celles que les utilisateurs peuvent appliquer.",
          "Information des utilisateurs concernés : la vulnérabilité et ce qu'ils doivent faire.",
          "Au plus tard 14 jours après la mise à disposition d'un correctif : rapport final, avec la gravité, l'impact et le correctif.",
        ],
      },
      { type: "heading", level: 2, text: "Après : corriger et livrer" },
      {
        type: "checklist",
        items: [
          "Un moyen de livrer le correctif aux appareils déjà vendus : mise à jour à distance ou procédure documentée.",
          "Le SBOM et le registre des vulnérabilités mis à jour avec la nouvelle version.",
          "Un retour d'expérience : combien de temps a pris chaque étape, et ce qui a manqué.",
        ],
      },
      { type: "heading", level: 2, text: "Et si vous êtes une petite entreprise ?" },
      {
        type: "paragraph",
        text: "Les micro et petites entreprises ne sont pas sanctionnées pour un retard sur l'alerte de 24 h. La notification à 72 h, le rapport final et les autres obligations du CRA s'appliquent, quelle que soit la taille de l'entreprise.",
      },
      {
        type: "callout",
        title: "Plusieurs cases restent vides ?",
        body: "Le diagnostic CRA les traite une par une : inventaire SBOM généré dans votre CI, écarts identifiés, procédure de déclaration prête. J'accompagne vers la conformité, vous restez responsable de votre déclaration.",
      },
    ],
    en: [
      {
        type: "paragraph",
        text: "Since 11 September 2026, a manufacturer must report an actively exploited vulnerability in its product within 24 hours, through ENISA's single reporting platform. The clock starts when you become aware of the exploitation, not when you have finished analysing it. What needs to be ready before that moment fits in this list.",
      },
      { type: "heading", level: 2, text: "Before: know what you sell" },
      {
        type: "checklist",
        items: [
          "The list of your products sold in the EU, including those placed on the market before December 2027, with the countries where each one is sold (the early warning asks for them).",
          "One SBOM per firmware version in the field, not only for the latest one.",
          "The mapping between serial number or model and installed firmware version.",
          "Components modified in-house flagged as such in the SBOM.",
        ],
      },
      { type: "heading", level: 2, text: "Before: know that a vulnerability is exploited" },
      {
        type: "checklist",
        items: [
          "A published, monitored address or form to receive vulnerability reports.",
          "A coordinated vulnerability disclosure policy, even a short one.",
          "Monitoring of your components: security advisories from your chip vendors and software suppliers, CERT-FR bulletins, the CISA Known Exploited Vulnerabilities catalog (KEV).",
          "A named person who reads these alerts, and a backup.",
          "A shared internal definition: \"actively exploited\" means there is reliable evidence of exploitation, not just a published CVE.",
        ],
      },
      { type: "heading", level: 2, text: "Before: know who does what" },
      {
        type: "checklist",
        items: [
          "Who decides that a case must be reported, and who decides when that person is away.",
          "Who submits on the ENISA platform, with access checked before it is needed.",
          "Who informs management, customer support and, if needed, your legal counsel.",
          "Prefilled templates for the 24-hour early warning, the 72-hour notification and the final report.",
        ],
      },
      { type: "heading", level: 2, text: "On the day: the three deadlines" },
      {
        type: "checklist",
        items: [
          "Within 24 hours: early warning, with the Member States where the product is sold.",
          "Within 72 hours: notification with the affected product, the nature of the exploitation, the measures taken and those users can apply.",
          "Inform the affected users: the vulnerability and what they need to do.",
          "No later than 14 days after a fix is available: final report, with severity, impact and the fix.",
        ],
      },
      { type: "heading", level: 2, text: "After: fix and ship" },
      {
        type: "checklist",
        items: [
          "A way to deliver the fix to devices already sold: over-the-air update or a documented procedure.",
          "The SBOM and the vulnerability register updated with the new version.",
          "A post-mortem: how long each step took, and what was missing.",
        ],
      },
      { type: "heading", level: 2, text: "What if you are a small company?" },
      {
        type: "paragraph",
        text: "Micro and small enterprises are not fined for missing the 24-hour early warning deadline. The 72-hour notification, the final report and the other CRA obligations apply whatever the size of the company.",
      },
      {
        type: "callout",
        title: "Several boxes still empty?",
        body: "The CRA assessment works through them one by one: an SBOM generated in your CI, gaps identified, a reporting procedure ready to use. I guide you towards compliance; you remain responsible for your declaration.",
      },
    ],
  },
};
