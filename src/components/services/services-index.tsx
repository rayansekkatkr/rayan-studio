import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { ClosingCta } from "@/components/ui/closing-cta";
import { PageHero } from "@/components/ui/page-hero";
import { TechIcon } from "@/components/ui/tech-chips";
import { getCraPage } from "@/content/cra";
import { getService } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { craPath, quotePath, saasLandingPath, servicePath, smbLandingPath, type ServiceKey } from "@/lib/site-routes";

const STACK = ["Next.js", "React", "TypeScript", "Node.js", "NestJS", "Python", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Stripe", "Claude"];

type Row = { key: ServiceKey | "cra" };
type Group = {
  id: string;
  label: { fr: string; en: string };
  audience: { fr: string; en: string };
  cta?: { label: { fr: string; en: string }; href: (locale: Locale) => string; ctaId: string };
  rows: Row[];
};

// The page is a table of contents: one row per service, grouped by who it is for.
const GROUPS: Group[] = [
  {
    id: "parcours-sites",
    label: { fr: "Pour être trouvé", en: "To be found" },
    audience: { fr: "Commerces, restaurants, indépendants et PME.", en: "Shops, restaurants, freelancers and small businesses." },
    cta: {
      label: { fr: "Maquette gratuite sous 24 h ouvrées", en: "Free mockup within 24 business hours" },
      href: (locale) => quotePath(locale, "site"),
      ctaId: "services_free_mockup",
    },
    rows: [{ key: "web" }],
  },
  {
    id: "parcours-applications",
    label: { fr: "Pour lancer un produit", en: "To launch a product" },
    audience: { fr: "Startups, entreprises, équipes métier.", en: "Startups, companies, business teams." },
    cta: {
      label: { fr: "Voir l'offre applications", en: "See the applications offer" },
      href: (locale) => saasLandingPath(locale),
      ctaId: "services_to_saas_landing",
    },
    rows: [
      { key: "applications" },
      { key: "mvp" },
      { key: "backends" },
    ],
  },
  {
    id: "parcours-evoluer",
    label: { fr: "Pour vos équipes", en: "For your teams" },
    audience: { fr: "Gagner du temps, fiabiliser l'existant.", en: "Save time, make what exists reliable." },
    rows: [
      { key: "ai" },
      { key: "automation" },
      { key: "devops" },
      { key: "cra" },
    ],
  },
];

function ServiceRow({ locale, row, index }: { locale: Locale; row: Row; index: number }) {
  const cra = getCraPage(locale).serviceCard;
  const isCra = row.key === "cra";
  const service = isCra ? null : getService(row.key as ServiceKey);
  const href = isCra ? craPath(locale) : servicePath(locale, row.key as ServiceKey);
  const title = isCra ? cra.title : service!.eyebrow[locale];
  const tagline = isCra ? cra.description : service!.title[locale];

  return (
    <li className="border-b border-[var(--rs-border)] last:border-b-0">
      <Link
        href={href}
        data-service-row={row.key}
        className="group relative grid grid-cols-[3.5rem_minmax(0,1fr)_1.5rem] items-center gap-x-4 gap-y-2 py-6 outline-none transition-colors duration-200 hover:bg-[var(--rs-dark)] hover:text-[#f7f7f4] focus-visible:bg-[var(--rs-dark)] focus-visible:text-[#f7f7f4] md:grid-cols-[3rem_minmax(0,1.35fr)_minmax(0,1fr)_2rem] md:gap-x-6 md:px-6"
      >
        <span aria-hidden className="text-sm text-rs-muted group-hover:text-current group-focus-visible:text-current">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-2xl font-bold leading-[1.05] tracking-[-0.035em] md:text-[2.25rem]">{title}</span>
        <span className="col-start-2 line-clamp-2 text-sm leading-relaxed text-rs-muted transition-opacity duration-200 md:col-start-auto md:text-base ">
          {tagline}
        </span>
        <ArrowRight
          aria-hidden
          className="col-start-3 row-start-1 h-5 w-5 text-rs-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-current md:col-start-4"
        />
      </Link>
    </li>
  );
}

export function ServicesIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const total = GROUPS.reduce((sum, group) => sum + group.rows.length, 0);
  const doors = [
    {
      id: "sites",
      kicker: fr ? "Commerces, PME" : "Shops, small businesses",
      title: fr ? "Sites web & refonte" : "Websites & redesign",
      href: smbLandingPath(locale),
    },
    {
      id: "applications",
      kicker: fr ? "Startups, entreprises" : "Startups, companies",
      title: fr ? "Applications & SaaS" : "Applications & SaaS",
      href: saasLandingPath(locale),
    },
  ];
  let position = 0;

  return (
    <div data-page-identity="services">
      <PageHero
        eyebrow={fr ? `Services · ${total} expertises · 2 parcours` : `Services · ${total} areas · 2 paths`}
        word="Services"
        title={fr ? "Ce que le studio construit, du cadrage à la mise en production." : "What the studio builds, from scoping to production."}
        lead={
          <p>
            {fr
              ? "Un seul interlocuteur. Choisissez votre parcours, ou parcourez la liste : chaque service mène à des réalisations réelles."
              : "One point of contact. Pick your path, or browse the list: every service leads to real work."}
          </p>
        }
      >
        <div className="mt-6 grid max-w-xl border border-rs-fg sm:grid-cols-2">
          {doors.map((door, index) => (
            <TrackedLink
              key={door.id}
              href={door.href}
              event={{ ctaId: `services_door_${door.id}`, source: "services_index", destination: door.href, locale }}
              className={`group flex items-center justify-between gap-4 p-5 transition-colors duration-150 hover:bg-rs-fg hover:text-rs-bg ${index > 0 ? "border-t border-rs-fg sm:border-l sm:border-t-0" : ""}`}
            >
              <span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-rs-muted group-hover:text-current">{door.kicker}</span>
                <span className="mt-1.5 block text-lg font-semibold">{door.title}</span>
              </span>
              <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0" />
            </TrackedLink>
          ))}
        </div>
      </PageHero>

      <Container>
        <nav aria-label={fr ? "Sommaire des services" : "Services index"}>
          {GROUPS.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="grid scroll-mt-24 border-b border-rs-fg md:grid-cols-[13rem_minmax(0,1fr)]"
            >
              <div className="border-[var(--rs-border)] pb-2 pt-8 md:border-r md:py-8 md:pr-7">
                <h2 className="text-xs font-bold uppercase tracking-[0.16em]">{group.label[locale]}</h2>
                <p className="mt-2 text-sm leading-relaxed text-rs-muted">{group.audience[locale]}</p>
                {group.cta ? (
                  <TrackedLink
                    href={group.cta.href(locale)}
                    event={{ ctaId: group.cta.ctaId, source: "services_index", destination: group.cta.href(locale), locale }}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
                  >
                    {group.cta.label[locale]}
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </TrackedLink>
                ) : null}
              </div>
              <ul>
                {group.rows.map((row) => (
                  <ServiceRow key={row.key} locale={locale} row={row} index={++position} />
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <div className="flex flex-col gap-5 border-b border-[var(--rs-border)] py-7 md:flex-row md:items-center">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
            {fr ? "Stack éprouvée" : "Proven stack"}
          </span>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {STACK.map((name) => (
              <li key={name} className="flex items-center gap-2 text-sm font-medium">
                <TechIcon name={name} className="h-4 w-4" />
                {name}
              </li>
            ))}
          </ul>
        </div>

      </Container>

      <ClosingCta
        locale={locale}
        ctaId="services_free_quote"
        source="services_index"
        href={quotePath(locale)}
        label={fr ? "Demander un devis gratuit" : "Get a free quote"}
        title={fr ? "Pas sûr du bon service ?" : "Not sure which service fits?"}
        body={fr ? "Décrivez le besoin en quelques lignes : réponse sous 24 h ouvrées, devis gratuit." : "Describe the need in a few lines: reply within 24 business hours, free quote."}
      />
    </div>
  );
}
