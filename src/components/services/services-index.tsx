import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechIcon } from "@/components/ui/tech-chips";
import { getCraPage } from "@/content/cra";
import { getService } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { craPath, quotePath, saasLandingPath, servicePath, smbLandingPath, type ServiceKey } from "@/lib/site-routes";

const STACK = ["Next.js", "React", "TypeScript", "Node.js", "NestJS", "Python", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Stripe", "Claude"];

type Row = { key: ServiceKey | "cra"; image: string };
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
    rows: [{ key: "web", image: "/realisations/manteigaria-before.png" }],
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
      { key: "applications", image: "/realisations/pick4me.webp" },
      { key: "mvp", image: "/realisations/goodcall.webp" },
      { key: "backends", image: "/realisations/pont-facturx-conversion.webp" },
    ],
  },
  {
    id: "parcours-evoluer",
    label: { fr: "Pour vos équipes", en: "For your teams" },
    audience: { fr: "Gagner du temps, fiabiliser l'existant.", en: "Save time, make what exists reliable." },
    rows: [
      { key: "ai", image: "/realisations/ops-agent.webp" },
      { key: "automation", image: "/realisations/docextract.png" },
      { key: "devops", image: "/realisations/ci-cd-platform.webp" },
      { key: "cra", image: "/services/cra.webp" },
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
        className="group relative grid grid-cols-[3.5rem_minmax(0,1fr)_1.5rem] items-center gap-x-4 gap-y-2 py-6 outline-none transition-colors duration-200 hover:bg-[var(--rs-dark)] hover:text-[#f7f7f4] focus-visible:bg-[var(--rs-dark)] focus-visible:text-[#f7f7f4] md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)_2rem] md:gap-x-6 md:px-8"
      >
        <span aria-hidden className="num-outline text-4xl md:text-5xl">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-xl font-semibold leading-tight tracking-tight md:text-[2rem]">{title}</span>
        <span className="col-start-2 line-clamp-2 text-sm leading-relaxed text-rs-muted transition-opacity duration-200 md:col-start-auto md:text-base lg:group-hover:opacity-0 lg:group-focus-visible:opacity-0">
          {tagline}
        </span>
        <ArrowRight
          aria-hidden
          className="col-start-3 row-start-1 h-5 w-5 text-rs-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-current md:col-start-4"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-24 top-1/2 hidden h-36 w-56 -translate-y-1/2 -rotate-3 overflow-hidden border-4 border-white opacity-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block"
        >
          <Image src={row.image} alt="" fill sizes="224px" className="object-cover object-left-top" />
        </span>
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
      <section className="border-b border-rs-fg pb-14 pt-28 md:pb-16 md:pt-36">
        <Container>
          <Eyebrow>{fr ? `Services · ${total} expertises · 2 parcours` : `Services · ${total} areas · 2 paths`}</Eyebrow>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
            <h1 className="text-[3.25rem] font-bold leading-[0.95] tracking-[-0.045em] md:text-7xl lg:text-[6.5rem]">
              {fr ? (
                <>
                  Ce que le
                  <br />
                  studio construit.
                </>
              ) : (
                <>
                  What the
                  <br />
                  studio builds.
                </>
              )}
            </h1>
            <div>
              <p className="text-lg leading-relaxed text-rs-muted md:text-xl">
                {fr
                  ? "Un seul interlocuteur, du cadrage à la mise en production. Choisissez votre parcours, ou parcourez le sommaire ci-dessous."
                  : "One point of contact, from scoping to production. Pick your path, or browse the index below."}
              </p>
              <div className="mt-7 grid border border-rs-fg sm:grid-cols-2">
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
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <nav aria-label={fr ? "Sommaire des services" : "Services index"}>
          {GROUPS.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="grid scroll-mt-24 border-b border-rs-fg md:grid-cols-[15rem_minmax(0,1fr)]"
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

        <div className="flex flex-col items-start justify-between gap-6 border-b border-rs-fg py-10 md:flex-row md:items-center">
          <p className="max-w-2xl text-2xl font-semibold leading-snug tracking-tight md:text-[1.75rem]">
            {fr ? "Pas sûr du bon service ? Décrivez le besoin, on s'en occupe." : "Not sure which service fits? Describe the need, we take it from there."}
          </p>
          <TrackedLink
            href={quotePath(locale)}
            event={{ ctaId: "services_free_quote", source: "services_index", destination: quotePath(locale), locale }}
            className="inline-flex shrink-0 items-center gap-2 bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
          >
            {fr ? "Demander un devis gratuit" : "Get a free quote"}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </TrackedLink>
        </div>
        <p className="pb-[var(--rs-section-space)] pt-5 text-sm text-rs-muted">
          {fr ? "Réponse sous 24 h ouvrées, devis gratuit." : "Reply within 24 business hours, free quote."}
        </p>
      </Container>
    </div>
  );
}
