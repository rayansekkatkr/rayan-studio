import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { GiantWord } from "@/components/ui/giant-word";
import { projectStatusBadge } from "@/components/work/project-labels";
import { FeatureProject, WorkCard } from "@/components/work/work-card";
import { PROJECTS, getProject, type ProjectKey, type ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { quotePath, saasLandingPath, servicePath, smbLandingPath, workPath } from "@/lib/site-routes";

function project(key: ProjectKey) {
  return getProject(key) as ProjectRecord;
}

export function HomeHeroA({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <div className="pt-24 md:pt-28">
      <Container>
        <div className="overflow-x-clip">
          <GiantWord text="Rayan Studio" maxRem={16} />
        </div>
        <div className="mt-8 grid gap-6 border-b border-rs-fg pb-8 md:grid-cols-3 md:gap-8">
          <h1 className="text-lg font-bold leading-snug">
            {fr ? "Sites web, applications et logiciels sur mesure." : "Websites, applications and custom software."}
            <span className="block font-normal text-rs-muted">
              {fr ? "Conçus, codés et mis en ligne par la même personne." : "Designed, built and shipped by the same person."}
            </span>
          </h1>
          <p className="text-lg leading-snug text-rs-muted">
            {fr
              ? "Pour les commerces et PME qui veulent être trouvés, et pour les startups qui veulent un produit en production."
              : "For small businesses that want to be found, and for startups that want a product in production."}
          </p>
          <div className="flex flex-col gap-4 md:items-end">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#136b33] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#22a05a] before:content-['']">
              {fr ? "Réponse sous 24 h ouvrées" : "Reply within 24 business hours"}
            </span>
            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <TrackedLink
                href={quotePath(locale)}
                event={{ ctaId: "home_hero_free_quote", source: "home_hero", destination: quotePath(locale), locale }}
                className="inline-flex items-center gap-2 bg-rs-fg px-6 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent hover:text-white"
              >
                {fr ? "Demander un devis gratuit" : "Get a free quote"}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </TrackedLink>
              <Link href={workPath(locale)} className="text-base font-semibold underline underline-offset-4 hover:text-rs-accent-fg">
                {fr ? "Voir nos réalisations" : "View our work"}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function HomeWorkA({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const pick4me = project("pick4me");
  return (
    <div className="pt-8">
      <Container>
        <FeatureProject p={pick4me} locale={locale} priority />

        <p className="mx-auto max-w-5xl py-20 text-center font-serif text-[2.5rem] leading-[1.02] md:py-28 md:text-[4.25rem]">
          {fr ? "Un studio indépendant. Pas d'intermédiaire entre " : "An independent studio. No middleman between "}
          <em className="text-rs-accent-fg">{fr ? "votre idée" : "your idea"}</em>
          {fr ? " et la mise en production." : " and production."}
        </p>

        <div className="flex items-end justify-between gap-6 border-b border-rs-fg pb-5">
          <h2 className="text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.045em] md:text-6xl">{fr ? "Réalisations" : "Work"}</h2>
          <Link href={workPath(locale)} className="text-xs font-semibold uppercase tracking-[0.14em] text-rs-muted hover:text-rs-fg">
            {fr ? "Tout voir →" : "See all →"}
          </Link>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <WorkCard p={project("pont-facturx")} locale={locale} featured heightClass="aspect-[16/10] lg:aspect-auto lg:h-[32rem]" />
          <WorkCard p={project("goodcall")} locale={locale} featured heightClass="aspect-[16/10] lg:aspect-auto lg:h-[32rem]" />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <WorkCard p={project("manteigaria")} locale={locale} heightClass="aspect-[16/10] lg:aspect-auto lg:h-[32rem]" />
          <WorkCard p={project("docextract")} locale={locale} heightClass="aspect-[16/10] lg:aspect-auto lg:h-[32rem]" />
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
    {
      value: "170+",
      label: fr ? "pipelines par jour sur la mission CI/CD STMicroelectronics (2024)" : "pipelines a day on the STMicroelectronics CI/CD engagement (2024)",
    },
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
