import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Locale } from "@/lib/i18n";
import { servicePath, type ServiceKey } from "@/lib/site-routes";

const GROUPS: Array<{ id: string; label: Record<Locale, string>; keys: ServiceKey[] }> = [
  { id: "software", label: { fr: "LOGICIEL", en: "SOFTWARE" }, keys: ["applications", "mvp", "backends", "automation"] },
  { id: "web", label: { fr: "WEB & INFRASTRUCTURE", en: "WEB & INFRASTRUCTURE" }, keys: ["web", "devops"] },
];

const LABELS: Record<ServiceKey, Record<Locale, string>> = {
  applications: { fr: "Applications web & SaaS", en: "Web applications & SaaS" },
  mvp: { fr: "MVP & produits digitaux", en: "MVP & digital products" },
  backends: { fr: "APIs & backends", en: "APIs & backends" },
  automation: { fr: "Automatisation & IA", en: "Automation & AI" },
  web: { fr: "Sites premium & refonte", en: "Premium websites & redesign" },
  devops: { fr: "DevOps, cloud & déploiement", en: "DevOps, cloud & deployment" },
};

export function ServicesOverview({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div className="home-chapter-large bg-rs-bg py-[var(--rs-section-space)] lg:flex lg:items-center">
      <Container>
        <Eyebrow>Services</Eyebrow>
        <h2 className="sr-only">{fr ? "Nos services" : "Our services"}</h2>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          {GROUPS.map((group) => (
            <div key={group.id}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                {group.label[locale]}
              </p>
              <ul className="mt-5 divide-y divide-[var(--rs-border)] border-t border-[var(--rs-border)]">
                {group.keys.map((key) => (
                  <li key={key}>
                    <Link
                      href={servicePath(locale, key)}
                      className="group flex items-center justify-between py-5 text-xl font-semibold tracking-tight text-rs-fg transition-colors duration-150 hover:text-rs-accent-fg md:text-2xl"
                    >
                      {LABELS[key][locale]}
                      <ArrowUpRight
                        aria-hidden
                        className="h-6 w-6 text-rs-muted transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rs-accent-fg"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
