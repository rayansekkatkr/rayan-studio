"use client";

import { motion } from "framer-motion";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type FeedbackNote = {
  label: string;
  title: string;
  text: string;
};

type ProofNote = {
  metric: string;
  label: string;
  detail: string;
};

const feedbackFr: FeedbackNote[] = [
  {
    label: "Image",
    title: "Le site inspire plus vite confiance",
    text: "Les retours les plus fréquents portent sur une perception plus sérieuse: le lieu paraît plus clair, plus actuel, plus crédible.",
  },
  {
    label: "Parcours",
    title: "Le contact devient plus naturel",
    text: "Les visiteurs comprennent plus vite quoi faire: appeler, réserver, envoyer un message ou demander un devis.",
  },
  {
    label: "Mobile",
    title: "Les informations utiles remontent",
    text: "Horaires, adresse, services, menu, commandes ou formulaire ne sont plus cachés dans une page difficile à parcourir.",
  },
];

const feedbackEn: FeedbackNote[] = [
  {
    label: "Image",
    title: "The website builds trust faster",
    text: "The most common feedback is about perceived quality: the business feels clearer, more current, and more credible.",
  },
  {
    label: "Journey",
    title: "Contact feels more natural",
    text: "Visitors understand the next step faster: call, book, send a message, or request a quote.",
  },
  {
    label: "Mobile",
    title: "Useful information comes forward",
    text: "Opening hours, address, services, menus, orders, or forms are no longer buried in a page that is hard to scan.",
  },
];

const proofFr: ProofNote[] = [
  { metric: "01", label: "Avant / après", detail: "Comparer la lisibilité, le mobile et les CTA." },
  { metric: "02", label: "30 jours", detail: "Observer les demandes entrantes après livraison." },
  { metric: "03", label: "Concret", detail: "Relier chaque choix design à une action client." },
];

const proofEn: ProofNote[] = [
  { metric: "01", label: "Before / after", detail: "Compare clarity, mobile flow, and CTAs." },
  { metric: "02", label: "30 days", detail: "Observe inbound inquiries after delivery." },
  { metric: "03", label: "Concrete", detail: "Connect each design choice to a customer action." },
];

export function Testimonials({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const feedback = en ? feedbackEn : feedbackFr;
  const proof = en ? proofEn : proofFr;

  return (
    <section id="temoignages" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={en ? "Synthesized feedback" : "Retours synthétisés"}
            title={en ? "What becomes clearer after a focused redesign" : "Ce qui devient plus clair après une vraie refonte"}
            description={
              en
                ? "No repeated fake portrait wall: a concise summary of the signals I look for after a redesign."
                : "Pas de mur de faux portraits répétés: une synthèse claire des signaux que je regarde après une refonte."
            }
            center
          />
        </Reveal>

        <Reveal delay={0.08}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative mt-8 overflow-hidden rounded-none border border-[#2a231d]/16 bg-[#fffaf0]/86 shadow-[8px_8px_0_rgba(42,35,29,0.09)]"
          >
            <div className="grid lg:grid-cols-[0.95fr_1.35fr]">
              <aside className="border-b border-[#2a231d]/14 bg-[#17120f] p-5 text-[#fffaf0] lg:border-b-0 lg:border-r lg:p-7">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#f0a064]">
                  {en ? "Evidence rhythm" : "Rythme de preuve"}
                </p>
                <h3 className="font-display mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                  {en ? "Fewer claims. Better signals." : "Moins d'avis inventés. Plus de signaux utiles."}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#f7ead8]/82">
                  {en
                    ? "For a small business website, credibility comes from visible work: clearer hierarchy, easier contact, and proof that the site answers real customer questions."
                    : "Pour un site de petite entreprise, la crédibilité vient du travail visible: hiérarchie plus claire, contact plus simple, et preuves que le site répond aux vraies questions clients."}
                </p>

                <div className="mt-6 grid gap-3">
                  {proof.map((item) => (
                    <div key={item.label} className="border border-[#fffaf0]/18 bg-[#211a16] p-3">
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 text-sm font-black text-[#f0a064]">{item.metric}</span>
                        <div>
                          <p className="text-sm font-black text-[#fffaf0]">{item.label}</p>
                          <p className="mt-1 text-xs leading-5 text-[#f7ead8]/72">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="p-5 md:p-7">
                <div className="grid gap-4 md:grid-cols-3">
                  {feedback.map((item) => (
                    <article
                      key={item.title}
                      className="flex min-h-[250px] flex-col justify-between rounded-none border border-[#2a231d]/14 bg-[#f5f1e8] p-4 shadow-[5px_5px_0_rgba(42,35,29,0.08)]"
                    >
                      <div>
                        <p className="inline-flex border border-[#2a231d]/12 bg-[#fffaf0] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#d94f2b]">
                          {item.label}
                        </p>
                        <h4 className="font-display mt-4 text-xl font-semibold leading-tight text-[#17120f]">{item.title}</h4>
                      </div>
                      <p className="mt-5 text-sm leading-7 text-[#63584d]">{item.text}</p>
                    </article>
                  ))}
                </div>

                <div className="mt-5 border border-[#2a231d]/14 bg-[#fffaf0]/82 p-4 md:flex md:items-center md:justify-between md:gap-6">
                  <p className="text-sm font-semibold leading-7 text-[#342b24]">
                    {en
                      ? "The goal is not to decorate the page with testimonials, but to show what changes in perception, clarity, and contact."
                      : "Le but n'est pas de décorer la page avec des témoignages, mais de montrer ce qui change en perception, en clarté et en contact."}
                  </p>
                  <p className="mt-3 shrink-0 text-[11px] font-black uppercase tracking-[0.14em] text-[#8a7d6f] md:mt-0">
                    {en ? "Post-delivery reading" : "Lecture post-livraison"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
