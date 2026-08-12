import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SERVICES } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { servicePath, startProjectPath, type ServiceKey } from "@/lib/site-routes";

const GROUPS: Array<{ label: string; keys: ServiceKey[] }> = [
  { label: "SOFTWARE", keys: ["applications", "mvp", "backends", "automation"] },
  { label: "WEB & INFRASTRUCTURE", keys: ["web", "devops"] },
];

export function ServicesIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <div>
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {fr ? "Services software, web et cloud" : "Software, web and cloud services"}
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {fr
              ? "Du produit SaaS complet au site vitrine premium : chaque service part de votre besoin métier, pas d'une technologie."
              : "From a full SaaS product to a premium website: every service starts from your business need, not from a technology."}
          </p>
        </Container>
      </div>

      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <div className="grid gap-14 md:grid-cols-2">
            {GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                  {group.label}
                </p>
                <ul className="mt-5 divide-y divide-[var(--rs-border)] border-t border-[var(--rs-border)]">
                  {group.keys.map((key) => {
                    const service = SERVICES.find((item) => item.key === key);
                    if (!service) return null;
                    return (
                      <li key={key}>
                        <Link href={servicePath(locale, key)} className="group block py-6">
                          <span className="flex items-center justify-between text-2xl font-semibold tracking-tight text-rs-fg transition-colors duration-150 group-hover:text-rs-accent">
                            {service.eyebrow[locale]}
                            <ArrowUpRight
                              aria-hidden
                              className="h-6 w-6 text-rs-muted transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rs-accent"
                            />
                          </span>
                          <span className="mt-2 block max-w-xl text-base leading-relaxed text-rs-muted">
                            {service.description[locale]}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <Link
            href={startProjectPath(locale)}
            className="mt-14 inline-flex items-center gap-2 rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
          >
            {fr ? "Parler de votre projet" : "Start a project"}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Container>
      </div>
    </div>
  );
}
