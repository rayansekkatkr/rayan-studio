import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { projectStatusBadge } from "@/components/work/project-labels";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { saasLandingPath, servicePath, websitesLandingPath, studioPath, workPath } from "@/lib/site-routes";
// Real home-page captures of the live product sites (public/realisations/sites), keyed by project slug.
const SITE_SHOTS: Record<string, string> = {
  pick4me: "/realisations/sites/pick4me-site.webp",
  "pont-facturx": "/realisations/sites/pont-facturx-site.webp",
  goodcall: "/realisations/sites/goodcall-site.webp",
  docextract: "/realisations/sites/docextract-site.webp",
};


/**
 * Studio statement in the night: the desk photo is blended into the dark background
 * (continuing the hero), the serif sentence sits over it, then a single door to the
 * work page (projects live there only).
 */
export function HomeStatementA({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <div className="rs-theme-dark relative isolate overflow-hidden bg-rs-bg text-rs-fg">
      <Image
        src="/images/desk-night.webp"
        alt={fr ? "Poste de travail du studio, le soir" : "Studio workstation in the evening"}
        fill
        sizes="100vw"
        className="statement-image -z-20 object-cover object-[70%_center]"
      />
      <div aria-hidden className="statement-shade pointer-events-none absolute inset-0 -z-10" />
      <Container className="flex min-h-[36rem] flex-col justify-end pb-16 pt-16 md:min-h-[38rem] md:pb-20 md:pt-20">
        <h2 className="max-w-4xl font-serif text-[2.6rem] font-normal leading-[1.02] md:text-[4.75rem]">
          {fr ? "Vous dormez, " : "You sleep, "}
          <em className="text-rs-accent-fg">{fr ? "j'avance" : "I build"}</em>
          {fr ? ". Vous vous réveillez avec la suite." : ". You wake up to the next step."}
        </h2>

        <Link
          href={workPath(locale)}
          className="group mt-14 flex items-center justify-between gap-6 border-y border-[var(--rs-border-strong)] py-7 transition-colors duration-200 hover:border-rs-fg hover:bg-rs-fg hover:text-rs-bg focus-visible:bg-rs-fg focus-visible:text-rs-bg md:mt-20 md:px-4"
        >
          <span className="text-[2.5rem] font-extrabold leading-[0.95] tracking-[-0.045em] md:text-6xl">
            {fr ? "Voir les réalisations" : "See the work"}
          </span>
          <ArrowRight aria-hidden className="h-8 w-8 shrink-0 md:h-12 md:w-12" />
        </Link>
      </Container>
    </div>
  );
}

/**
 * Who builds: the founder in his own words, and the studio's own live products,
 * each named once and linked to its case study (the only place they are listed on the home).
 */
export function HomeFounderA({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const products = PROJECTS.filter((project) => projectStatusBadge(project, locale).tone === "live");
  return (
    <div className="pt-[var(--rs-section-space)]">
      <Container>
        <div className="grid gap-12 border-t border-rs-fg pt-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <h2 className="text-[2.25rem] font-extrabold leading-none tracking-[-0.045em] md:text-6xl">Rayan Sekkat</h2>
            <p className="mt-3 text-lg font-semibold">
              {fr ? "Ingénieur logiciel, fondateur de Rayan Studio" : "Software engineer, founder of Rayan Studio"}
            </p>
            <div className="mt-8 max-w-[65ch] space-y-5 text-lg leading-relaxed text-rs-muted">
              <p>
                {fr
                  ? "Je cadre, conçois, développe et mets en production chaque projet du studio moi-même. Vous parlez toujours à la personne qui écrit le code, du premier échange au lancement."
                  : "I scope, design, build and ship every studio project myself. You always talk to the person who writes the code, from the first conversation to launch."}
              </p>
              <p>
                {fr
                  ? "Je suis basé à Séoul et je travaille à distance avec des clients en France et en Europe, en français ou en anglais. Les délais annoncés sur ce site comptent en jours ouvrés français."
                  : "I am based in Seoul and work remotely with clients in France and Europe, in French or English. The response times on this site count French business days."}
              </p>
            </div>
            <Link
              href={studioPath(locale, "rayan")}
              className="mt-8 inline-flex items-center gap-2 text-base font-semibold underline underline-offset-4 transition-colors duration-150 hover:text-rs-accent-fg"
            >
              {fr ? "Mon parcours" : "My background"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
              {fr ? "Sites conçus et mis en ligne par le studio" : "Websites designed and launched by the studio"}
            </h3>
            {/* Each live product's website is itself a site the studio designed and shipped: the visible
                proof for the websites path. Screens are real home-page captures of the live sites. */}
            <ul role="list" className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6" data-home-products>
              {products.map((project) => {
                const shot = SITE_SHOTS[project.slug];
                const host = project.liveUrl ? new URL(project.liveUrl).hostname.replace(/^www\./, "") : null;
                return (
                  <li key={project.key}>
                    <Link
                      href={workPath(locale, project.slug)}
                      className="group block transition-colors duration-150 hover:text-rs-accent-fg"
                    >
                      {shot ? (
                        <span className="block overflow-hidden border border-[var(--rs-border)] transition-colors duration-150 group-hover:border-rs-accent">
                          <Image
                            src={shot}
                            alt=""
                            width={1440}
                            height={900}
                            sizes="(min-width: 1024px) 17rem, 45vw"
                            className="h-auto w-full"
                          />
                        </span>
                      ) : null}
                      <span className="mt-3 flex items-center justify-between gap-2 text-lg font-bold tracking-[-0.025em]">
                        <span className="min-w-0 [overflow-wrap:anywhere]">{project.title}</span>
                        <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />
                      </span>
                      {host ? <span className="mt-0.5 block text-sm text-rs-muted">{host}</span> : null}
                      {/* What the product is, from the project record: real scope, nothing added. */}
                      <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-rs-muted">{project.summary[locale]}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function HomeServicesA({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const rows = [
    {
      title: fr ? "Sites web & refonte" : "Websites & redesign",
      body: fr
        ? "Site vitrine ou sur mesure, comme ceux de mes produits : design, référencement, mise en ligne et suivi."
        : "Showcase or custom website, like my own products' sites: design, SEO, launch and follow-up.",
      href: websitesLandingPath(locale),
    },
    {
      title: fr ? "Applications & SaaS" : "Applications & SaaS",
      body: fr
        ? "MVP, plateforme SaaS, outil interne ou API, livrés par étapes visibles."
        : "MVP, SaaS platform, internal tool or API, delivered in visible steps.",
      href: saasLandingPath(locale),
    },
    {
      title: fr ? "Automatisation & IA" : "Automation & AI",
      body: fr ? "Automatiser les tâches répétitives, puis ajouter l'IA là où elle sert vraiment." : "Automate repetitive tasks, then add AI where it really helps.",
      href: servicePath(locale, "automation"),
    },
    {
      title: fr ? "DevOps & cloud" : "DevOps & cloud",
      body: fr ? "Mise en ligne, hébergement et suivi, pour que tout reste disponible." : "Launch, hosting and monitoring, so everything stays available.",
      href: servicePath(locale, "devops"),
    },
  ];
  return (
    <div className="pt-[var(--rs-section-space)]">
      <Container>
        <h2 className="border-b border-rs-fg pb-5 text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.045em] md:text-6xl">
          {fr ? "Ce que je construis" : "What I build"}
        </h2>
        <ul>
          {rows.map((row) => (
            <li key={row.href} className="border-b border-[var(--rs-border)]">
              <Link
                href={row.href}
                className="group grid grid-cols-[minmax(0,1fr)_1.5rem] items-center gap-x-4 gap-y-1 py-6 transition-colors duration-200 hover:bg-rs-fg hover:text-rs-bg focus-visible:bg-rs-fg focus-visible:text-rs-bg md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_2.5rem] md:px-4"
              >
                <span className="text-[1.75rem] font-bold leading-tight tracking-[-0.035em] md:text-[2.6rem]">{row.title}</span>
                <span className="text-base text-rs-muted group-hover:text-current group-focus-visible:text-current">{row.body}</span>
                <ArrowRight aria-hidden className="col-start-2 row-start-1 h-6 w-6 md:col-start-3" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

/**
 * What happens after a request, right before the closing CTA: answers "what will this cost me
 * in effort?" and reconciles the two 24 h promises (reply for any project, mockup for a website).
 * The order carries meaning, so the steps are numbered.
 */
export function HomeNextStepsA({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const steps = [
    {
      title: fr ? "Vous décrivez votre projet" : "You describe your project",
      body: fr ? "Deux minutes, un formulaire court. Pas besoin de cahier des charges." : "Two minutes, a short form. No specification needed.",
    },
    {
      title: fr ? "Je vous réponds sous 24 h ouvrées" : "I reply within 24 business hours",
      body: fr
        ? "Une réponse argumentée, en jours ouvrés français. Pour un site : une maquette gratuite de votre page d'accueil."
        : "A reasoned reply, in French business days. For a website: a free mockup of your home page.",
    },
    {
      title: fr ? "Vous recevez un devis écrit" : "You receive a written quote",
      body: fr ? "Gratuit, détaillé, sans engagement. Vous décidez ensuite." : "Free, detailed, no commitment. Then you decide.",
    },
  ];
  return (
    <div className="pt-[var(--rs-section-space)]">
      <Container>
        <h2 className="border-b border-rs-fg pb-5 text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.045em] md:text-6xl">
          {fr ? "Après votre demande" : "After your request"}
        </h2>
        <ol role="list" className="grid gap-y-8 pt-8 md:grid-cols-3 md:gap-x-10">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="num-outline block text-4xl font-extrabold tracking-[-0.05em]">{index + 1}</span>
              <span className="mt-3 block text-xl font-bold tracking-[-0.025em]">{step.title}</span>
              <span className="mt-2 block max-w-[22rem] text-base leading-relaxed text-rs-muted">{step.body}</span>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
