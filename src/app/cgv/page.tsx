import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGV",
  description: "Conditions générales de vente de Rayan Studio.",
};

export default function CgvPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-28 md:px-8">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(228,241,255,0.72))] p-6 shadow-[0_26px_44px_rgba(123,157,217,0.2)] backdrop-blur-xl md:p-8">
        <h1 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">Conditions générales de vente (CGV)</h1>
        <p className="mt-3 text-sm text-slate-600">Dernière mise à jour : 5 avril 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-base font-semibold text-slate-900">1. Objet</h2>
            <p className="mt-2">
              Les présentes CGV encadrent les prestations de création et refonte de sites internet proposées par
              Rayan Studio.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">2. Prestations</h2>
            <p className="mt-2">
              Les prestations peuvent inclure : direction artistique, UX/UI, développement web, intégration de
              contenus, optimisation de conversion et mise en ligne.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">3. Devis et commande</h2>
            <p className="mt-2">
              Toute mission débute après validation d&apos;un devis. La signature du devis (ou confirmation écrite)
              vaut acceptation des présentes CGV.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">4. Prix et paiement</h2>
            <p className="mt-2">
              Les prix sont indiqués en euros. Sauf mention contraire, le règlement s&apos;effectue en plusieurs étapes
              (acompte puis solde). Les modalités exactes sont précisées dans le devis.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">5. Délais</h2>
            <p className="mt-2">
              Les délais sont estimatifs et dépendent notamment de la réactivité du client dans la fourniture des
              contenus et validations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">6. Obligations du client</h2>
            <p className="mt-2">
              Le client s&apos;engage à fournir des informations exactes, les contenus nécessaires (textes, images, logos)
              et à valider les livrables dans des délais raisonnables.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">7. Propriété intellectuelle</h2>
            <p className="mt-2">
              Sauf mention contraire, la propriété des créations est transférée au client après paiement intégral des
              sommes dues. Rayan Studio conserve le droit de présenter les réalisations dans son portfolio.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">8. Responsabilité</h2>
            <p className="mt-2">
              Rayan Studio est tenu à une obligation de moyens. La responsabilité ne pourra être engagée en cas de
              dommages indirects, d&apos;indisponibilité tiers ou de mauvaise utilisation du site livré.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">9. Résiliation</h2>
            <p className="mt-2">
              En cas d&apos;arrêt du projet à l&apos;initiative du client, les travaux réalisés restent dus au prorata de
              l&apos;avancement.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">10. Droit applicable</h2>
            <p className="mt-2">
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties rechercheront une
              solution amiable avant toute action judiciaire.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
