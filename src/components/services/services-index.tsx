import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { TechStack } from "@/components/ui/tech-stack";
import { ClosingCta } from "@/components/ui/closing-cta";
import { SERVICES } from "@/content/services";
import { getCraPage } from "@/content/cra";
import { PAGE_HERO_PHOTOS, SERVICE_VISUALS } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { craPath, servicePath, startProjectPath, type ServiceKey } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { BALANCED_GRID, balancedSpan } from "@/components/ui/balanced-grid";

const GROUPS: Array<{ id: string; label: Record<Locale, string>; keys: ServiceKey[] }> = [
  { id: "software", label: { fr: "Logiciel", en: "Software" }, keys: ["applications", "mvp", "backends", "automation", "ai"] },
  { id: "web", label: { fr: "Web & infrastructure", en: "Web & infrastructure" }, keys: ["web", "devops"] },
];

function Card({ href, title, body, visual, className }: { href: string; title: string; body: string; visual: string; className?: string }) {
  return (
    <li className={className}>
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
      >
        <div className={cn("relative aspect-[16/9] overflow-hidden bg-[var(--rs-dark)]", className === "lg:col-span-3" && "lg:aspect-[2/1]")}>
          <Image
            src={visual}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]",
              visual.startsWith("/realisations/") ? "object-left-top" : "object-center",
            )}
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="flex items-start justify-between gap-4 text-xl font-semibold tracking-tight text-rs-fg transition-colors duration-150 group-hover:text-rs-accent-fg">
            {title}
            <ArrowUpRight
              aria-hidden
              className="mt-1 h-5 w-5 shrink-0 text-rs-muted transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rs-accent-fg"
            />
          </span>
          <span className="mt-2 block text-sm leading-relaxed text-rs-muted">{body}</span>
        </div>
      </Link>
    </li>
  );
}

export function ServicesIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const cra = getCraPage(locale).serviceCard;

  return (
    <div>
      <PageHero
        eyebrow="Services"
        title={fr ? "Services software, web et cloud" : "Software, web and cloud services"}
        lead={
          <p>
            {fr
              ? "Du produit SaaS complet au site vitrine premium, en passant par l'IA générative et le DevOps : chaque service part de votre besoin métier, pas d'une technologie."
              : "From a full SaaS product to a premium website, including generative AI and DevOps: every service starts from your business need, not from a technology."}
          </p>
        }
        image={PAGE_HERO_PHOTOS.services}
      />

      <div className="py-[var(--rs-section-space)]">
        <Container>
          <div className="space-y-14">
            {GROUPS.map((group) => (
              <div key={group.id}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">{group.label[locale]}</p>
                <ul className={cn("mt-5 grid gap-5 sm:grid-cols-2", BALANCED_GRID)}>
                  {group.keys.map((key, index) => {
                    const service = SERVICES.find((item) => item.key === key);
                    if (!service) return null;
                    return (
                      <Card
                        key={key}
                        href={servicePath(locale, key)}
                        title={service.eyebrow[locale]}
                        body={service.description[locale]}
                        visual={SERVICE_VISUALS[key]}
                        className={balancedSpan(index, group.keys.length + (group.id === "web" ? 1 : 0))}
                      />
                    );
                  })}
                  {group.id === "web" ? (
                    <Card
                      href={craPath(locale)}
                      title={cra.title}
                      body={cra.description}
                      visual={SERVICE_VISUALS.cra}
                      className={balancedSpan(group.keys.length, group.keys.length + 1)}
                    />
                  ) : null}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-t border-[var(--rs-border)] py-[var(--rs-section-space)]">
        <Container>
          <TechStack locale={locale} />
        </Container>
      </div>

      <ClosingCta
        locale={locale}
        ctaId="services_start_project"
        source="services_index"
        label={fr ? "Demander un devis" : "Request a quote"}
      />
    </div>
  );
}
