import type { ReactNode } from "react";
import { BRAND } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";
import { legalPath, type LegalDocKey } from "@/lib/site-routes";

export type LegalDoc = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: Array<{ heading: string; body: ReactNode }>;
};

// Every statement below mirrors the implementation: form fields come from
// src/lib/forms/validation.ts, trackers from AnalyticsLoader/CookieConsent,
// prospection from scripts/outreach.js and scripts/prospection/. Keep them in sync.

const UPDATED = { fr: "Dernière mise à jour : 22 septembre 2026", en: "Last updated: 22 September 2026" };
const LEGAL_NOTICE_UPDATED = UPDATED;

// Identity details copied from the founder's other site (pont-facturx.com/legal/mentions).
const LEGAL_IDENTITY = {
  status: "Micro-entrepreneur",
  siret: "980 099 766 00019",
  vat: { fr: "Non assujetti", en: "Not subject to VAT" },
  address: "8 allée du pré, 72190 Saint-Pavace, France",
};

function terms(locale: Locale): LegalDoc {
  if (locale === "en") {
    return {
      eyebrow: "Terms",
      title: "Terms of sale",
      description: `Terms of sale for ${BRAND.name} software, product and web engineering services.`,
      updated: UPDATED.en,
      sections: [
        {
          heading: "1. Purpose",
          body: (
            <p>
              These terms govern the software and web engineering services provided by {BRAND.name}: web
              applications and SaaS platforms, MVPs and digital products, APIs and backends, automation and AI
              integration, DevOps and cloud, premium websites and redesigns. They apply to every order placed
              with {BRAND.name}, unless specific terms are agreed in writing.
            </p>
          ),
        },
        {
          heading: "2. Services",
          body: (
            <p>
              The exact scope of each engagement (features, deliverables, environments, technical stack, hosting,
              exclusions) is defined in the quote or proposal. It may include product framing, interface design,
              development, third-party integrations, deployment to production, documentation and knowledge
              transfer. Any request outside that scope is handled through an amendment or a new quote.
            </p>
          ),
        },
        {
          heading: "3. Quote and order",
          body: (
            <p>
              Every engagement starts after written acceptance of a quote (signature or email confirmation).
              Accepting the quote means accepting these terms.
            </p>
          ),
        },
        {
          heading: "4. Prices and payment",
          body: (
            <p>
              Prices are stated in euros. Unless stated otherwise, payment is made in several instalments (deposit
              on order, then milestones or balance on delivery) as detailed in the quote. Third-party costs
              (hosting, domain names, APIs, licences, external services) are borne by the client unless the quote
              says otherwise.
            </p>
          ),
        },
        {
          heading: "5. Timelines",
          body: (
            <p>
              Timelines are estimates. They depend in particular on how quickly the client provides content,
              access and approvals, and on the availability of third-party services.
            </p>
          ),
        },
        {
          heading: "6. Client obligations",
          body: (
            <p>
              The client agrees to provide accurate information, the content and access needed for the engagement
              (accounts, environments, third-party APIs), to review deliverables within a reasonable time, and to
              hold the rights on any material supplied.
            </p>
          ),
        },
        {
          heading: "7. Acceptance",
          body: (
            <p>
              Deliverables are reviewed by the client at each milestone agreed in the quote. Reservations must be
              sent in writing; deliverables with no reservations within the agreed review period are deemed
              accepted.
            </p>
          ),
        },
        {
          heading: "8. Intellectual property",
          body: (
            <p>
              Unless stated otherwise, the rights on the specific deliverables (source code, design, documentation)
              are transferred to the client once all sums due have been paid. Open source components and
              third-party services remain subject to their own licences. {BRAND.name} keeps ownership of its
              generic tools, methods and reusable components, and may present the work in its portfolio unless a
              confidentiality agreement states otherwise.
            </p>
          ),
        },
        {
          heading: "9. Hosting, data and third-party services",
          body: (
            <p>
              The client remains the holder of its accounts (hosting, domain names, third-party services) and the
              owner of its data. {BRAND.name} may configure these services on the client&apos;s behalf but is not
              responsible for their availability, pricing or terms.
            </p>
          ),
        },
        {
          heading: "10. Maintenance and evolutions",
          body: (
            <p>
              Maintenance, support and evolutions after delivery are outside the scope of the engagement unless the
              quote includes them. They can be covered by a separate agreement.
            </p>
          ),
        },
        {
          heading: "11. Liability",
          body: (
            <p>
              {BRAND.name} is bound by an obligation of means. It cannot be held liable for indirect damages (loss
              of revenue, data or business), for the unavailability of third-party services, or for misuse or
              modification of the deliverables by the client or a third party.
            </p>
          ),
        },
        {
          heading: "12. Confidentiality",
          body: (
            <p>
              Each party keeps confidential the non-public information of the other party that it becomes aware of
              during the engagement.
            </p>
          ),
        },
        {
          heading: "13. Termination",
          body: (
            <p>
              If the client stops the project, the work completed remains due in proportion to its progress.
            </p>
          ),
        },
        {
          heading: "14. Governing law",
          body: (
            <p>
              These terms are governed by French law. In case of dispute, the parties will seek an amicable
              solution before any legal action.
            </p>
          ),
        },
      ],
    };
  }

  return {
    eyebrow: "CGV",
    title: "Conditions générales de vente",
    description: `Conditions générales de vente des prestations de conception et de développement logiciel et web de ${BRAND.name}.`,
    updated: UPDATED.fr,
    sections: [
      {
        heading: "1. Objet",
        body: (
          <p>
            Les présentes CGV encadrent les prestations de conception et de développement logiciel et web
            proposées par {BRAND.name} : applications web et plateformes SaaS, MVP et produits digitaux, APIs et
            backends, automatisation et intégration d&apos;IA, DevOps et cloud, sites web premium et refontes.
            Elles s&apos;appliquent à toute commande passée auprès de {BRAND.name}, sauf conditions particulières
            convenues par écrit.
          </p>
        ),
      },
      {
        heading: "2. Prestations",
        body: (
          <p>
            Le périmètre exact de chaque mission (fonctionnalités, livrables, environnements, stack technique,
            hébergement, exclusions) est défini dans le devis ou la proposition. Il peut inclure : cadrage produit,
            design d&apos;interface, développement, intégrations tierces, mise en production, documentation et
            transfert de connaissances. Toute demande hors périmètre fait l&apos;objet d&apos;un avenant ou
            d&apos;un nouveau devis.
          </p>
        ),
      },
      {
        heading: "3. Devis et commande",
        body: (
          <p>
            Toute mission débute après acceptation écrite d&apos;un devis (signature ou confirmation par email).
            Cette acceptation vaut adhésion aux présentes CGV.
          </p>
        ),
      },
      {
        heading: "4. Prix et paiement",
        body: (
          <p>
            Les prix sont indiqués en euros. Sauf mention contraire, le règlement s&apos;effectue en plusieurs
            étapes (acompte à la commande, puis échéances ou solde à la livraison) selon les modalités précisées
            dans le devis. Les coûts des services tiers (hébergement, noms de domaine, APIs, licences, services
            externes) sont à la charge du client, sauf mention contraire au devis.
          </p>
        ),
      },
      {
        heading: "5. Délais",
        body: (
          <p>
            Les délais sont estimatifs. Ils dépendent notamment de la réactivité du client dans la fourniture des
            contenus, des accès et des validations, ainsi que de la disponibilité des services tiers.
          </p>
        ),
      },
      {
        heading: "6. Obligations du client",
        body: (
          <p>
            Le client s&apos;engage à fournir des informations exactes, les contenus et accès nécessaires à la
            mission (comptes, environnements, APIs tierces), à valider les livrables dans un délai raisonnable et
            à détenir les droits sur les éléments qu&apos;il fournit.
          </p>
        ),
      },
      {
        heading: "7. Recette",
        body: (
          <p>
            Les livrables sont vérifiés par le client à chaque jalon prévu au devis. Les réserves sont formulées
            par écrit ; à défaut de réserves dans le délai de vérification convenu, le livrable est réputé
            accepté.
          </p>
        ),
      },
      {
        heading: "8. Propriété intellectuelle",
        body: (
          <p>
            Sauf mention contraire, les droits sur les livrables spécifiques (code source, design, documentation)
            sont transférés au client après paiement intégral des sommes dues. Les composants open source et les
            services tiers restent soumis à leurs licences respectives. {BRAND.name} conserve la propriété de ses
            outils, méthodes et composants génériques réutilisables, ainsi que le droit de présenter la
            réalisation dans son portfolio, sauf accord de confidentialité contraire.
          </p>
        ),
      },
      {
        heading: "9. Hébergement, données et services tiers",
        body: (
          <p>
            Le client reste titulaire de ses comptes (hébergement, noms de domaine, services tiers) et
            propriétaire de ses données. {BRAND.name} peut configurer ces services pour le compte du client mais
            n&apos;est pas responsable de leur disponibilité, de leur tarification ni de leurs conditions.
          </p>
        ),
      },
      {
        heading: "10. Maintenance et évolutions",
        body: (
          <p>
            La maintenance, le support et les évolutions après livraison sont hors périmètre de la mission, sauf
            si le devis les inclut. Ils peuvent faire l&apos;objet d&apos;un accord séparé.
          </p>
        ),
      },
      {
        heading: "11. Responsabilité",
        body: (
          <p>
            {BRAND.name} est tenu à une obligation de moyens. Sa responsabilité ne peut être engagée en cas de
            dommages indirects (perte de chiffre d&apos;affaires, de données ou d&apos;exploitation),
            d&apos;indisponibilité de services tiers, ou de mauvaise utilisation ou modification des livrables
            par le client ou un tiers.
          </p>
        ),
      },
      {
        heading: "12. Confidentialité",
        body: (
          <p>
            Chaque partie garde confidentielles les informations non publiques de l&apos;autre partie dont elle a
            connaissance dans le cadre de la mission.
          </p>
        ),
      },
      {
        heading: "13. Résiliation",
        body: (
          <p>
            En cas d&apos;arrêt du projet à l&apos;initiative du client, les travaux réalisés restent dus au
            prorata de l&apos;avancement.
          </p>
        ),
      },
      {
        heading: "14. Droit applicable",
        body: (
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, les parties rechercheront une
            solution amiable avant toute action judiciaire.
          </p>
        ),
      },
    ],
  };
}

function privacy(locale: Locale): LegalDoc {
  const mail = <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>;

  if (locale === "en") {
    return {
      eyebrow: "Privacy",
      title: "Privacy policy",
      description: `How ${BRAND.name} collects and uses personal data: forms, analytics, B2B prospecting, retention periods and your rights.`,
      updated: UPDATED.en,
      sections: [
        {
          heading: "Data controller",
          body: (
            <p>
              {BRAND.name}, represented by {BRAND.founder}. Contact for any question about your data: {mail}.
            </p>
          ),
        },
        {
          heading: "Contact form",
          body: (
            <>
              <p>
                When you use the contact form, we collect: name, email address, subject, message and the language
                of the site you used. Purpose: answering your request and, if relevant, following up on it.
              </p>
              <p>
                Legal basis: steps taken at your request before entering into a contract, and our legitimate
                interest in handling requests sent to us.
              </p>
            </>
          ),
        },
        {
          heading: "Project form (start a project)",
          body: (
            <>
              <p>
                When you use the project qualification form, we collect: project type, current stage, objective,
                desired timing, name, company, email address, an optional budget indication and the language of
                the site you used. Purpose: understanding your project and preparing a first exchange and a
                proposal.
              </p>
              <p>
                Legal basis: steps taken at your request before entering into a contract, and our legitimate
                interest in following up on business requests.
              </p>
            </>
          ),
        },
        {
          heading: "Abuse protection",
          body: (
            <p>
              To limit spam and automated submissions, the form endpoints apply a rate limit per IP address (5
              submissions per 10 minutes). The IP address is only kept in the server&apos;s memory for those 10
              minutes and is never stored. The forms also contain a hidden field that is invisible to visitors;
              a submission that fills it is silently ignored. Legal basis: our legitimate interest in protecting
              the site.
            </p>
          ),
        },
        {
          heading: "Audience measurement",
          body: (
            <>
              <p>
                With your consent, the site uses Google Analytics to measure audience (pages viewed, sections
                reached, clicks on calls to action, web performance metrics). IP anonymisation is enabled and
                advertising features are disabled.
              </p>
              <p>
                No analytics script is loaded, and no analytics cookie is set, before you click &quot;Accept&quot;
                in the cookie banner. Legal basis: your consent, which you can withdraw at any time (see
                &quot;Cookies and trackers&quot;).
              </p>
            </>
          ),
        },
        {
          heading: "B2B prospecting",
          body: (
            <>
              <p>
                {BRAND.name} sends a limited number of prospecting emails to businesses whose website looks like it
                could benefit from a redesign or a custom application. This only concerns professional contact
                details of businesses, never private individuals.
              </p>
              <p>
                Data used: company name, website domain, city and country, the professional email address
                published on the company&apos;s website or in a public directory, the page it was found on, the
                technical signals observed on the website (technologies, mobile display, security, freshness)
                and the history of messages sent.
              </p>
              <p>
                Sources: the INSEE SIRENE public register, a search engine to find the official website, and
                the company&apos;s own public website. Website signals
                may be scored by a third-party AI service (OpenAI); that step receives structured technical
                signals only, never an email address, a name or an address.
              </p>
              <p>
                Legal basis: our legitimate interest in proposing our services to businesses, in connection with
                their professional activity. Every email contains an unsubscribe link. When you unsubscribe, we
                keep a non-reversible fingerprint (hash) of the email address and of the domain, never the value
                itself, so that we never contact you again. You can also object at any time by writing to {mail}.
              </p>
            </>
          ),
        },
        {
          heading: "Retention periods",
          body: (
            <ul>
              <li>Contact or project request without follow-up: 3 years from the last exchange.</li>
              <li>
                Client relationship: for the duration of the contract, then archived to meet legal obligations
                (contractual and accounting documents: 10 years).
              </li>
              <li>IP address used for rate limiting: 10 minutes, in server memory only.</li>
              <li>
                Cookie choice: stored in your browser for 6 months, after which the banner is shown again. You
                can change it earlier via &quot;Manage cookies&quot; or by clearing your site data.
              </li>
              <li>
                Audience measurement: analytics cookies expire after 13 months at most; the associated data is kept
                by Google Analytics for 14 months at most.
              </li>
              <li>
                B2B prospecting: 3 years at most from collection or from the last exchange without a reply.
                Unsubscribe fingerprints are kept as long as needed to honour your objection.
              </li>
              <li>
                Hosting logs: kept by the hosting provider for security purposes, for a limited period set by the
                provider.
              </li>
            </ul>
          ),
        },
        {
          heading: "Recipients and processors",
          body: (
            <>
              <p>
                Your data is never sold. It is only accessed by {BRAND.founder} and by the processors needed to
                run the site and the services described above:
              </p>
              <ul>
                <li>Vercel (site hosting and technical logs);</li>
                <li>Brevo (delivery of form submissions to the studio mailbox);</li>
                <li>Google (Google Analytics, with your consent);</li>
                <li>Resend (delivery of prospecting emails and delivery events);</li>
                <li>Neon (database of the prospecting pipeline);</li>
                <li>OpenAI (scoring of website technical signals, without personal data).</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Transfers outside the European Union",
          body: (
            <p>
              Some processors are located in the United States. Transfers rely on the safeguards provided by the
              GDPR (adequacy decision or standard contractual clauses).
            </p>
          ),
        },
        {
          heading: "Cookies and trackers",
          body: (
            <>
              <p>
                The site itself sets no cookie. Your cookie choice is stored in your browser&apos;s local storage
                (key <code>rayan_cookie_consent_v1</code>), which is required to remember your decision and needs
                no consent.
              </p>
              <p>
                If you accept audience measurement, Google Analytics sets its cookies (<code>_ga</code> and{" "}
                <code>_ga_*</code>). If you decline or make no choice, nothing is loaded. You can change your
                choice at any time with the &quot;Manage cookies&quot; link in the footer.
              </p>
            </>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <>
              <p>
                Under the GDPR you have the right to access, rectify and erase your data, to restrict or object to
                its processing, and to data portability. To exercise these rights, write to {mail}.
              </p>
              <p>
                If you believe your rights are not respected, you can lodge a complaint with the French data
                protection authority (CNIL), <a href="https://www.cnil.fr">www.cnil.fr</a>.
              </p>
            </>
          ),
        },
        {
          heading: "Updates",
          body: (
            <p>
              This policy may be updated when the site or the services evolve. The date at the top of the page
              indicates the current version.
            </p>
          ),
        },
      ],
    };
  }

  return {
    eyebrow: "Confidentialité",
    title: "Politique de confidentialité",
    description: `Comment ${BRAND.name} collecte et utilise vos données : formulaires, mesure d'audience, prospection B2B, durées de conservation et droits.`,
    updated: UPDATED.fr,
    sections: [
      {
        heading: "Responsable du traitement",
        body: (
          <p>
            {BRAND.name}, représenté par {BRAND.founder}. Contact pour toute question relative à vos données :{" "}
            {mail}.
          </p>
        ),
      },
      {
        heading: "Formulaire de contact",
        body: (
          <>
            <p>
              Lorsque vous utilisez le formulaire de contact, nous collectons : nom, adresse email, sujet, message
              et langue du site utilisée. Finalité : répondre à votre demande et, le cas échéant, en assurer le
              suivi.
            </p>
            <p>
              Base légale : mesures précontractuelles prises à votre demande, et intérêt légitime à traiter les
              demandes qui nous sont adressées.
            </p>
          </>
        ),
      },
      {
        heading: "Formulaire projet (démarrer un projet)",
        body: (
          <>
            <p>
              Lorsque vous utilisez le formulaire de qualification de projet, nous collectons : type de projet,
              état d&apos;avancement, objectif, délai souhaité, nom, entreprise, adresse email, une indication de
              budget facultative et la langue du site utilisée. Finalité : comprendre votre projet et préparer un
              premier échange puis une proposition.
            </p>
            <p>
              Base légale : mesures précontractuelles prises à votre demande, et intérêt légitime à assurer le
              suivi des demandes commerciales.
            </p>
          </>
        ),
      },
      {
        heading: "Protection contre les abus",
        body: (
          <p>
            Pour limiter le spam et les envois automatisés, les formulaires appliquent une limitation par adresse
            IP (5 envois par 10 minutes). L&apos;adresse IP n&apos;est conservée qu&apos;en mémoire du serveur
            pendant ces 10 minutes et n&apos;est jamais stockée. Les formulaires contiennent aussi un champ caché,
            invisible pour les visiteurs ; un envoi qui le remplit est ignoré silencieusement. Base légale :
            intérêt légitime à protéger le site.
          </p>
        ),
      },
      {
        heading: "Mesure d'audience",
        body: (
          <>
            <p>
              Avec votre consentement, le site utilise Google Analytics pour mesurer l&apos;audience (pages vues,
              sections atteintes, clics sur les appels à l&apos;action, métriques de performance web).
              L&apos;anonymisation des adresses IP est activée et les fonctionnalités publicitaires sont
              désactivées.
            </p>
            <p>
              Aucun script de mesure n&apos;est chargé, et aucun cookie de mesure n&apos;est déposé, avant que
              vous ayez cliqué sur « Accepter » dans le bandeau cookies. Base légale : votre consentement, que
              vous pouvez retirer à tout moment (voir « Cookies et traceurs »).
            </p>
          </>
        ),
      },
      {
        heading: "Prospection commerciale B2B",
        body: (
          <>
            <p>
              {BRAND.name} envoie un nombre limité d&apos;emails de prospection à des entreprises dont le site web
              semble pouvoir bénéficier d&apos;une refonte ou d&apos;une application sur mesure. Cela concerne
              uniquement des coordonnées professionnelles d&apos;entreprises, jamais de particuliers.
            </p>
            <p>
              Données utilisées : nom de l&apos;entreprise, domaine du site, ville et pays, adresse email
              professionnelle publiée sur le site de l&apos;entreprise ou dans un annuaire public, page où elle
              a été trouvée, signaux techniques observés sur le site (technologies, affichage mobile, sécurité,
              fraîcheur) et historique des messages envoyés.
            </p>
            <p>
              Sources : le répertoire public SIRENE de l&apos;INSEE, un moteur de recherche pour identifier le
              site officiel, et le site web public de l&apos;entreprise.
              Les signaux du site peuvent être notés par un service d&apos;IA tiers (OpenAI) ; cette étape ne
              reçoit que des signaux techniques structurés, jamais d&apos;adresse email, de nom ni
              d&apos;adresse.
            </p>
            <p>
              Base légale : intérêt légitime à proposer nos services à des entreprises, en lien avec leur activité
              professionnelle. Chaque email contient un lien de désinscription. Lorsque vous vous désinscrivez,
              nous conservons une empreinte non réversible (hachage) de l&apos;adresse email et du domaine,
              jamais la valeur elle-même, afin de ne plus jamais vous contacter. Vous pouvez aussi vous opposer à
              tout moment en écrivant à {mail}.
            </p>
          </>
        ),
      },
      {
        heading: "Durées de conservation",
        body: (
          <ul>
            <li>Demande de contact ou de projet sans suite : 3 ans à compter du dernier échange.</li>
            <li>
              Relation client : pendant la durée du contrat, puis archivage pour répondre aux obligations légales
              (documents contractuels et comptables : 10 ans).
            </li>
            <li>Adresse IP utilisée pour la limitation anti-abus : 10 minutes, en mémoire du serveur uniquement.</li>
            <li>
              Choix cookies : dans votre navigateur pendant 6 mois, puis le bandeau est de nouveau affiché. Vous
              pouvez le modifier avant via « Gérer les cookies » ou en supprimant vos données de site.
            </li>
            <li>
              Mesure d&apos;audience : les cookies de mesure expirent au plus tard après 13 mois ; les données
              associées sont conservées par Google Analytics 14 mois au maximum.
            </li>
            <li>
              Prospection B2B : 3 ans au maximum à compter de la collecte ou du dernier échange resté sans
              réponse. Les empreintes de désinscription sont conservées aussi longtemps que nécessaire pour
              respecter votre opposition.
            </li>
            <li>
              Journaux techniques d&apos;hébergement : conservés par l&apos;hébergeur à des fins de sécurité,
              pendant une durée limitée fixée par celui-ci.
            </li>
          </ul>
        ),
      },
      {
        heading: "Destinataires et sous-traitants",
        body: (
          <>
            <p>
              Vos données ne sont jamais revendues. Elles ne sont accessibles qu&apos;à {BRAND.founder} et aux
              sous-traitants nécessaires au fonctionnement du site et des services décrits ci-dessus :
            </p>
            <ul>
              <li>Vercel (hébergement du site et journaux techniques) ;</li>
              <li>Brevo (acheminement des envois de formulaires vers la boîte email du studio) ;</li>
              <li>Google (Google Analytics, avec votre consentement) ;</li>
              <li>Resend (envoi des emails de prospection et événements de délivrabilité) ;</li>
              <li>Neon (base de données du pipeline de prospection) ;</li>
              <li>OpenAI (notation des signaux techniques d&apos;un site, sans donnée personnelle).</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Transferts hors Union européenne",
        body: (
          <p>
            Certains sous-traitants sont situés aux États-Unis. Les transferts s&apos;appuient sur les garanties
            prévues par le RGPD (décision d&apos;adéquation ou clauses contractuelles types).
          </p>
        ),
      },
      {
        heading: "Cookies et traceurs",
        body: (
          <>
            <p>
              Le site ne dépose lui-même aucun cookie. Votre choix en matière de cookies est enregistré dans le
              stockage local de votre navigateur (clé <code>rayan_cookie_consent_v1</code>), ce qui est nécessaire
              pour mémoriser votre décision et ne requiert pas de consentement.
            </p>
            <p>
              Si vous acceptez la mesure d&apos;audience, Google Analytics dépose ses cookies (<code>_ga</code> et{" "}
              <code>_ga_*</code>). Si vous refusez ou ne faites aucun choix, rien n&apos;est chargé. Vous pouvez
              modifier votre choix à tout moment via le lien « Gérer les cookies » en pied de page.
            </p>
          </>
        ),
      },
      {
        heading: "Vos droits",
        body: (
          <>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
              d&apos;effacement de vos données, d&apos;un droit à la limitation et à l&apos;opposition au
              traitement, et d&apos;un droit à la portabilité. Pour exercer ces droits, écrivez à {mail}.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès
              de la CNIL, <a href="https://www.cnil.fr">www.cnil.fr</a>.
            </p>
          </>
        ),
      },
      {
        heading: "Mise à jour",
        body: (
          <p>
            Cette politique peut être mise à jour lorsque le site ou les services évoluent. La date en haut de
            page indique la version en vigueur.
          </p>
        ),
      },
    ],
  };
}

function legalNotice(locale: Locale): LegalDoc {
  const mail = <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>;

  if (locale === "en") {
    return {
      eyebrow: "Legal",
      title: "Legal notice",
      description: `Legal notice of the ${BRAND.name} website: publisher, hosting provider and contact.`,
      updated: LEGAL_NOTICE_UPDATED.en,
      sections: [
        {
          heading: "Website publisher",
          body: (
            <p>
              {BRAND.name}
              <br />
              Publication director: {BRAND.founder}
              <br />
              Legal form: {LEGAL_IDENTITY.status}
              <br />
              SIRET: {LEGAL_IDENTITY.siret}
              <br />
              VAT: {LEGAL_IDENTITY.vat.en}
              <br />
              Registered address: {LEGAL_IDENTITY.address}
              <br />
              Email: {mail}
              <br />
              Phone / WhatsApp: {BRAND.phoneDisplay}
            </p>
          ),
        },
        {
          heading: "Hosting",
          body: (
            <p>
              The website is hosted by Vercel Inc.
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, USA
              <br />
              Website: <a href="https://vercel.com">https://vercel.com</a>
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              All content (texts, visual elements, structure, code, mockups) is protected by copyright. Any
              reproduction, representation, distribution or use without prior written authorisation is prohibited.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              The information published is provided for guidance only. Despite the care taken, errors may remain.
              The publisher cannot be held liable for direct or indirect damages related to the use of the site.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: <p>For any legal question or request relating to the site, contact: {mail}</p>,
        },
      ],
    };
  }

  return {
    eyebrow: "Mentions légales",
    title: "Mentions légales",
    description: `Mentions légales du site ${BRAND.name} : éditeur, hébergeur et contact.`,
    updated: LEGAL_NOTICE_UPDATED.fr,
    sections: [
      {
        heading: "Éditeur du site",
        body: (
          <p>
            {BRAND.name}
            <br />
            Responsable de publication : {BRAND.founder}
            <br />
            Forme juridique : {LEGAL_IDENTITY.status}
            <br />
            SIRET : {LEGAL_IDENTITY.siret}
            <br />
            TVA : {LEGAL_IDENTITY.vat.fr}
            <br />
            Siège social : {LEGAL_IDENTITY.address}
            <br />
            Email : {mail}
            <br />
            Téléphone / WhatsApp : {BRAND.phoneDisplay}
          </p>
        ),
      },
      {
        heading: "Hébergement",
        body: (
          <p>
            Le site est hébergé par Vercel Inc.
            <br />
            340 S Lemon Ave #4133, Walnut, CA 91789, USA
            <br />
            Site : <a href="https://vercel.com">https://vercel.com</a>
          </p>
        ),
      },
      {
        heading: "Propriété intellectuelle",
        body: (
          <p>
            L&apos;ensemble du contenu (textes, éléments visuels, structure, code, maquettes) est protégé au titre
            du droit d&apos;auteur. Toute reproduction, représentation, diffusion ou exploitation sans
            autorisation écrite préalable est interdite.
          </p>
        ),
      },
      {
        heading: "Responsabilité",
        body: (
          <p>
            Les informations publiées sont fournies à titre indicatif. Malgré tout le soin apporté, des erreurs
            peuvent subsister. L&apos;éditeur ne saurait être tenu responsable des dommages directs ou indirects
            liés à l&apos;utilisation du site.
          </p>
        ),
      },
      {
        heading: "Contact",
        body: <p>Pour toute question juridique ou demande relative au site, contactez : {mail}</p>,
      },
    ],
  };
}

const DOCS: Record<LegalDocKey, (locale: Locale) => LegalDoc> = {
  terms,
  privacy,
  legal: legalNotice,
};

export function getLegalDocument(doc: LegalDocKey, locale: Locale): LegalDoc {
  return DOCS[doc](locale);
}

export function legalAlternatePath(doc: LegalDocKey, locale: Locale) {
  return legalPath(locale === "fr" ? "en" : "fr", doc);
}
