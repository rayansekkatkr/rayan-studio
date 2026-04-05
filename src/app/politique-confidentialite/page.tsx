import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Rayan Studio.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-28 md:px-8">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(228,241,255,0.72))] p-6 shadow-[0_26px_44px_rgba(123,157,217,0.2)] backdrop-blur-xl md:p-8">
        <h1 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">Politique de confidentialité</h1>
        <p className="mt-3 text-sm text-slate-600">Dernière mise à jour : 5 avril 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-base font-semibold text-slate-900">Données collectées</h2>
            <p className="mt-2">
              Lorsque vous utilisez le formulaire de contact, les données suivantes peuvent être collectées :
              prénom, type de commerce, adresse email et contenu du message.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Finalités du traitement</h2>
            <p className="mt-2">
              Les données sont utilisées uniquement pour :
              <br />- répondre à vos demandes de contact
              <br />- échanger sur un projet de création/refonte de site
              <br />- assurer le suivi commercial et client
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Base légale</h2>
            <p className="mt-2">
              Le traitement repose sur votre consentement (envoi volontaire du formulaire) et/ou l&apos;intérêt légitime
              lié à la gestion de la relation client.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Durée de conservation</h2>
            <p className="mt-2">
              Les données sont conservées pendant la durée nécessaire au traitement de votre demande, puis archivées
              selon les obligations légales applicables.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Partage des données</h2>
            <p className="mt-2">
              Les données ne sont pas revendues. Elles peuvent être traitées par des prestataires techniques
              strictement nécessaires au fonctionnement du site (hébergement, outils techniques).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Vos droits</h2>
            <p className="mt-2">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation,
              d&apos;opposition et de portabilité.
              <br />
              Pour exercer vos droits : rayan.sekkat@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Cookies</h2>
            <p className="mt-2">
              Le site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Si des cookies de
              mesure d&apos;audience ou marketing sont ajoutés, un bandeau de consentement adapté sera mis en place.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
