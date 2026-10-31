import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { projectStatusBadge } from "@/components/work/project-labels";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { saasLandingPath, servicePath, smbLandingPath, workPath } from "@/lib/site-routes";

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
      <Container className="flex min-h-[38rem] flex-col justify-end pb-16 pt-32 md:min-h-[50rem] md:pb-20 md:pt-48">
        <p className="max-w-4xl font-serif text-[2.6rem] leading-[1.02] md:text-[4.75rem]">
          {fr ? "Un studio indépendant. Pas d'intermédiaire entre " : "An independent studio. No middleman between "}
          <em className="text-rs-accent-fg">{fr ? "votre idée" : "your idea"}</em>
          {fr ? " et la mise en production." : " and production."}
        </p>

        <Link
          href={workPath(locale)}
          className="group mt-14 flex items-center justify-between gap-6 border-y border-[var(--rs-border-strong)] py-7 transition-colors duration-200 hover:border-rs-fg hover:bg-rs-fg hover:text-rs-bg md:mt-20 md:px-4"
        >
          <span className="text-[2.5rem] font-extrabold leading-[0.95] tracking-[-0.045em] md:text-6xl">
            {fr ? "Voir les réalisations" : "See the work"}
          </span>
          <ArrowRight aria-hidden className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:translate-x-2 md:h-12 md:w-12" />
        </Link>
      </Container>
    </div>
  );
}

export function HomeServicesA({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const rows = [
    {
      title: fr ? "Sites web & refonte" : "Websites & redesign",
      body: fr ? "Pour être trouvé et contacté. Maquette gratuite sous 24 h ouvrées." : "To be found and contacted. Free mockup within 24 business hours.",
      href: smbLandingPath(locale),
    },
    {
      title: fr ? "Applications & SaaS" : "Applications & SaaS",
      body: fr ? "Du cadrage à la production, livré par étapes visibles." : "From scoping to production, delivered in visible steps.",
      href: saasLandingPath(locale),
    },
    {
      title: fr ? "Automatisation & IA" : "Automation & AI",
      body: fr ? "Gagner du temps avant d'ajouter de l'IA." : "Save time before adding AI.",
      href: servicePath(locale, "automation"),
    },
    {
      title: fr ? "DevOps & cloud" : "DevOps & cloud",
      body: fr ? "Mettre en ligne, puis rester fiable." : "Ship, then stay reliable.",
      href: servicePath(locale, "devops"),
    },
  ];
  return (
    <div className="pt-[var(--rs-section-space)]">
      <Container>
        <div className="flex items-end justify-between gap-6 border-b border-rs-fg pb-5">
          <h2 className="text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.045em] md:text-6xl">
            {fr ? "Ce que je construis" : "What I build"}
          </h2>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-rs-muted">Services</span>
        </div>
        <ul>
          {rows.map((row, index) => (
            <li key={row.href} className="border-b border-[var(--rs-border)]">
              <Link
                href={row.href}
                className="group grid grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] items-center gap-x-4 gap-y-1 py-6 transition-colors duration-200 hover:bg-rs-fg hover:text-rs-bg md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)_2.5rem] md:px-4"
              >
                <span className="text-sm text-rs-muted group-hover:text-current">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[1.75rem] font-bold leading-tight tracking-[-0.035em] md:text-[2.6rem]">{row.title}</span>
                <span className="col-start-2 text-base text-rs-muted group-hover:text-current md:col-start-auto">{row.body}</span>
                <ArrowRight aria-hidden className="col-start-3 row-start-1 h-6 w-6 md:col-start-4" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export function HomeProofA({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const live = PROJECTS.filter((p) => projectStatusBadge(p, locale).tone === "live").length;
  const items = [
    { value: String(live), label: fr ? "produits du studio en production" : "studio products in production" },
    { value: "24 h", label: fr ? "pour une première réponse argumentée, en jours ouvrés" : "for a first reasoned reply, in business days" },
    { value: "2020", label: fr ? "développement logiciel depuis, en entreprise puis en studio" : "building software since, in companies then as a studio" },
    { value: "1", label: fr ? "seul interlocuteur, du devis au déploiement" : "single point of contact, from quote to deployment" },
  ];
  return (
    <div className="pt-[var(--rs-section-space)]">
      <Container>
        <ul className="grid grid-cols-2 gap-y-10 border-t border-rs-fg lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.value} className="pr-6 pt-7">
              <span className="block text-5xl font-extrabold tracking-[-0.05em] md:text-6xl">{item.value}</span>
              <span className="mt-2 block max-w-[16rem] text-base leading-snug text-rs-muted">{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
