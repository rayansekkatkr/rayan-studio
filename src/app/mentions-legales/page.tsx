import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Rayan Studio.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-28 md:px-8">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(228,241,255,0.72))] p-6 shadow-[0_26px_44px_rgba(123,157,217,0.2)] backdrop-blur-xl md:p-8">
        <h1 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">Mentions légales</h1>
        <p className="mt-3 text-sm text-slate-600">Dernière mise à jour : 5 avril 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-base font-semibold text-slate-900">Éditeur du site</h2>
            <p className="mt-2">
              Rayan Studio
              <br />
              Responsable de publication : Rayan Sekkat
              <br />
              Email : rayan.sekkat@gmail.com
              <br />
              Téléphone / WhatsApp : +33 6 36 36 56 96
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Hébergement</h2>
            <p className="mt-2">
              Le site est hébergé par Vercel Inc.
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, USA
              <br />
              Site : https://vercel.com
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Propriété intellectuelle</h2>
            <p className="mt-2">
              L&apos;ensemble du contenu (textes, éléments visuels, structure, code, maquettes) est protégé au titre du
              droit d&apos;auteur. Toute reproduction, représentation, diffusion ou exploitation sans autorisation
              écrite préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Responsabilité</h2>
            <p className="mt-2">
              Les informations publiées sont fournies à titre indicatif. Malgré tout le soin apporté, des erreurs
              peuvent subsister. L&apos;éditeur ne saurait être tenu responsable des dommages directs ou indirects liés à
              l&apos;utilisation du site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">
              Pour toute question juridique ou demande relative au site, contactez :
              <br />
              rayan.sekkat@gmail.com
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
