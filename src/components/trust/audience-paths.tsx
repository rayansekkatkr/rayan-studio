import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import type { Locale } from "@/lib/i18n";
import { saasLandingPath, smbLandingPath } from "@/lib/site-routes";

/** The two commercial paths of the brand, as two large cards on a light background. */
export function AudiencePaths({ locale, source }: { locale: Locale; source: string }) {
  const fr = locale === "fr";
  const paths = [
    {
      id: "websites",
      href: smbLandingPath(locale),
      image: "/services/web.webp",
      kicker: fr ? "Commerces, restaurants, indépendants, PME" : "Shops, restaurants, freelancers, small businesses",
      title: fr ? "Un site qui vous apporte des clients" : "A website that brings you clients",
      body: fr
        ? "Site vitrine ou refonte : clair sur mobile, bien référencé localement, pensé pour recevoir des demandes. Maquette gratuite sous 24 h ouvrées."
        : "New website or redesign: clear on mobile, well referenced locally, built to receive enquiries. Free mockup within 24 business hours.",
      cta: fr ? "Découvrir l'offre sites web" : "See the website offer",
    },
    {
      id: "applications",
      href: saasLandingPath(locale),
      image: "/images/devices.webp",
      kicker: fr ? "Startups, entreprises, porteurs de projet" : "Startups, companies, founders",
      title: fr ? "Une application construite autour de votre métier" : "An application built around your business",
      body: fr
        ? "SaaS, plateforme métier, MVP ou application mobile : cadrage, développement et mise en production avec un seul interlocuteur."
        : "SaaS, business platform, MVP or mobile app: scoping, development and production with one point of contact.",
      cta: fr ? "Découvrir l'offre applications & SaaS" : "See the applications & SaaS offer",
    },
  ];

  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {paths.map((path) => (
        <li key={path.id}>
          <TrackedLink
            href={path.href}
            event={{ ctaId: `path_${path.id}`, source, destination: path.href, locale }}
            className="group flex h-full flex-col overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
          >
            <span className="relative block aspect-[16/6] overflow-hidden bg-[var(--rs-dark)]">
              <Image
                src={path.image}
                alt=""
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </span>
            <span className="flex flex-1 flex-col p-6 md:p-7">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-rs-muted">{path.kicker}</span>
              <span className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{path.title}</span>
              <span className="mt-2 text-base leading-relaxed text-rs-muted">{path.body}</span>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-base font-semibold text-rs-accent-fg">
                {path.cta}
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </span>
          </TrackedLink>
        </li>
      ))}
    </ul>
  );
}
