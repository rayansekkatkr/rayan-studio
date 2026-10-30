import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getCraPage } from "@/content/cra";
import { craPath, servicePath, type ServiceKey } from "@/lib/site-routes";
import { SERVICE_VISUALS as VISUALS } from "@/content/visuals";

const GROUPS: Array<{ id: string; label: Record<Locale, string>; keys: ServiceKey[] }> = [
  { id: "software", label: { fr: "Logiciel", en: "Software" }, keys: ["applications", "mvp", "backends", "automation", "ai"] },
  { id: "web", label: { fr: "Web & infrastructure", en: "Web & infrastructure" }, keys: ["web", "devops"] },
];

const LABELS: Record<ServiceKey, Record<Locale, string>> = {
  applications: { fr: "Applications web & SaaS", en: "Web applications & SaaS" },
  mvp: { fr: "MVP & produits digitaux", en: "MVP & digital products" },
  backends: { fr: "APIs & backends", en: "APIs & backends" },
  automation: { fr: "Automatisation & IA", en: "Automation & AI" },
  ai: { fr: "IA générative en entreprise", en: "Generative AI for business" },
  web: { fr: "Sites premium & refonte", en: "Premium websites & redesign" },
  devops: { fr: "DevOps, cloud & déploiement", en: "DevOps, cloud & deployment" },
};

function ServiceCard({ href, label, visual, kicker }: { href: string; label: string; visual: string; kicker: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
      >
        <div className="relative aspect-[2/1] overflow-hidden bg-[var(--rs-dark)]">
          <Image
            src={visual}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 100vw"
            className={cn("object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]", visual.startsWith("/realisations/") ? "object-left-top" : "object-center")}
          />
        </div>
        <div className="flex flex-1 items-start justify-between gap-4 px-5 py-4">
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-rs-muted">{kicker}</span>
            <span className="mt-1.5 block text-lg font-semibold leading-snug tracking-tight text-rs-fg transition-colors duration-150 group-hover:text-rs-accent-fg">
              {label}
            </span>
          </span>
          <ArrowUpRight
            aria-hidden
            className="mt-1 h-5 w-5 shrink-0 text-rs-muted transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rs-accent-fg"
          />
        </div>
      </Link>
    </li>
  );
}

export function ServicesOverview({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div className="home-chapter-large border-t border-[var(--rs-border)] py-[var(--rs-section-space)] lg:flex lg:items-center">
      <Container>
        <Eyebrow>Services</Eyebrow>
        <h2 className="sr-only">{fr ? "Nos services" : "Our services"}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.flatMap((group) => [
            ...group.keys.map((key) => (
              <ServiceCard
                key={key}
                href={servicePath(locale, key)}
                label={LABELS[key][locale]}
                visual={VISUALS[key]}
                kicker={group.label[locale]}
              />
            )),
            ...(group.id === "web"
              ? [
                  <ServiceCard
                    key="cra"
                    href={craPath(locale)}
                    label={getCraPage(locale).serviceCard.title}
                    visual={VISUALS.cra}
                    kicker={group.label[locale]}
                  />,
                ]
              : []),
          ])}
        </ul>
        <TrackedLink
          href={`/${locale}/services`}
          event={{
            ctaId: "home_services",
            source: "home_services_overview",
            destination: `/${locale}/services`,
            locale,
          }}
          className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
        >
          {fr ? "Découvrir nos services" : "Explore our services"}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </TrackedLink>
      </Container>
    </div>
  );
}
