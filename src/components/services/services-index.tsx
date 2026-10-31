import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/ui/page-hero";
import { TechIcon } from "@/components/ui/tech-chips";
import { StatusBadge } from "@/components/work/status-badge";
import { getCraPage } from "@/content/cra";
import { getProject, type ProjectKey } from "@/content/projects";
import { getService } from "@/content/services";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { localSeoSectors } from "@/lib/local-seo";
import {
  craPath,
  quotePath,
  saasLandingPath,
  servicePath,
  smbLandingPath,
  workPath,
  type ServiceKey,
} from "@/lib/site-routes";
import { cn } from "@/lib/utils";

const STACK = ["Next.js", "React", "TypeScript", "Node.js", "NestJS", "Python", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Stripe", "Claude"];

type Feature = { key: ServiceKey; image: string; proof: ProjectKey; companion?: string; ratio?: string };

const BUILD_APPS: Feature[] = [
  { key: "applications", image: "/realisations/pick4me.webp", proof: "pick4me", companion: "/realisations/pick4me-app.webp" },
  { key: "mvp", image: "/realisations/goodcall.webp", proof: "goodcall" },
  { key: "backends", image: "/realisations/pont-facturx-conversion.webp", proof: "pont-facturx", ratio: "aspect-[2/1]" },
];

const EVOLVE: Array<{ key: ServiceKey | "cra"; image: string; proof?: ProjectKey }> = [
  { key: "automation", image: "/realisations/docextract.png", proof: "docextract" },
  { key: "ai", image: "/realisations/ops-agent.webp", proof: "ops-knowledge-agent" },
  { key: "devops", image: "/realisations/ci-cd-platform.webp", proof: "ci-cd-platform" },
  { key: "cra", image: "/services/cra.webp" },
];

function PathHeader({ index, title, body, id }: { index: string; title: string; body: string; id: string }) {
  return (
    <div id={id} className="scroll-mt-24 flex flex-col gap-4 border-b border-[var(--rs-border)] pb-6 pt-20 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow>{index}</Eyebrow>
        <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight md:text-5xl">{title}</h2>
      </div>
      <p className="max-w-md text-base leading-relaxed text-rs-muted md:text-lg">{body}</p>
    </div>
  );
}

function EditorialService({ locale, feature, reverse, index }: { locale: Locale; feature: Feature; reverse: boolean; index: number }) {
  const fr = locale === "fr";
  const service = getService(feature.key);
  const proof = getProject(feature.proof);
  const quote = quotePath(locale, feature.key === "web" ? "site" : "app");

  return (
    <div
      data-service-feature={feature.key}
      className="grid items-center gap-10 border-b border-[var(--rs-border)] py-14 lg:grid-cols-12 lg:gap-16 md:py-20"
    >
      <Link
        href={servicePath(locale, feature.key)}
        className={cn("group relative block lg:col-span-7", reverse && "lg:order-2")}
        tabIndex={-1}
        aria-hidden
      >
        <span
          className={cn(
            "relative block overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface shadow-[0_30px_70px_-45px_rgba(9,9,12,0.55)]",
            feature.ratio ?? "aspect-[16/10]",
          )}
        >
          <Image
            src={feature.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </span>
        {feature.companion ? (
          <span className="absolute -bottom-8 -right-4 hidden w-[24%] overflow-hidden rounded-[1.5rem] border border-[var(--rs-border)] shadow-[0_30px_60px_-20px_rgba(9,9,12,0.6)] md:block">
            <Image src={feature.companion} alt="" width={510} height={1112} sizes="15vw" className="block h-auto w-full" />
          </span>
        ) : null}
      </Link>
      <div className={cn("lg:col-span-5", reverse && "lg:order-1")}>
        <Eyebrow>
          <span className="text-rs-accent-fg">{String(index).padStart(2, "0")}</span> · {service.eyebrow[locale]}
        </Eyebrow>
        <h3 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-tight md:text-[2.4rem]">{service.title[locale]}</h3>
        <p className="mt-4 text-lg leading-relaxed text-rs-muted">{service.description[locale]}</p>
        <ul className="mt-6 space-y-3">
          {service.benefits[locale].map((benefit) => (
            <li key={benefit.title} className="flex gap-3 text-base leading-relaxed">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-none bg-[color-mix(in_srgb,var(--rs-accent)_14%,transparent)]">
                <Check aria-hidden className="h-3.5 w-3.5 text-rs-accent-fg" />
              </span>
              <span>
                <span className="font-semibold">{benefit.title}</span>
                <span className="text-rs-muted"> : {benefit.body.charAt(0).toLowerCase() + benefit.body.slice(1)}</span>
              </span>
            </li>
          ))}
        </ul>
        {proof ? (
          <Link
            href={workPath(locale, proof.slug)}
            className="mt-6 inline-flex flex-wrap items-center gap-2 text-sm text-rs-muted transition-colors duration-150 hover:text-rs-fg"
          >
            {fr ? "Réalisé :" : "Built:"}
            <StatusBadge project={proof} locale={locale} />
            <span className="font-semibold text-rs-fg">{proof.title}</span>
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <TrackedLink
            href={quote}
            event={{ ctaId: `services_${feature.key}_free_quote`, source: "services_index", destination: quote, locale }}
            className="inline-flex items-center gap-2 rounded-none bg-rs-fg px-6 py-3 text-sm font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
          >
            {fr ? "Devis gratuit" : "Free quote"}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </TrackedLink>
          <Link
            href={servicePath(locale, feature.key)}
            className="inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
          >
            {fr ? "Voir le service" : "See the service"}
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const cra = getCraPage(locale).serviceCard;
  const doors = [
    {
      id: "sites",
      index: "01",
      image: "/services/web.webp",
      kicker: fr ? "Commerces, restaurants, indépendants, PME" : "Shops, restaurants, freelancers, small businesses",
      title: fr ? "Créer un site web" : "Create a website",
      items: fr
        ? ["Site vitrine ou refonte", "Référencement local", "Maquette gratuite sous 24 h ouvrées"]
        : ["New website or redesign", "Local SEO", "Free mockup within 24 business hours"],
      href: smbLandingPath(locale),
      cta: fr ? "Voir l'offre sites web" : "See the website offer",
    },
    {
      id: "applications",
      index: "02",
      image: "/images/devices.webp",
      kicker: fr ? "Startups, entreprises, porteurs de projet" : "Startups, companies, founders",
      title: fr ? "Développer une application" : "Build an application",
      items: fr
        ? ["Application web, SaaS ou mobile", "MVP pour tester une idée", "APIs, paiements, back-office"]
        : ["Web, SaaS or mobile application", "MVP to test an idea", "APIs, payments, back office"],
      href: saasLandingPath(locale),
      cta: fr ? "Voir l'offre applications" : "See the applications offer",
    },
    {
      id: "evoluer",
      index: "03",
      image: "/images/network-cubes.webp",
      kicker: fr ? "Équipes qui ont déjà un produit ou des outils" : "Teams that already have a product or tools",
      title: fr ? "Faire évoluer l'existant" : "Evolve what exists",
      items: fr
        ? ["Automatisation et IA", "IA générative pour vos équipes", "DevOps, cloud, conformité CRA"]
        : ["Automation and AI", "Generative AI for your teams", "DevOps, cloud, CRA compliance"],
      href: "#parcours-evoluer",
      cta: fr ? "Voir les services" : "See the services",
    },
  ];

  return (
    <div>
      <PageHero
        eyebrow="Services"
        title={
          fr
            ? "Un site qui vous amène des clients, une application qui fait tourner votre activité."
            : "A website that brings you clients, an application that runs your business."
        }
        lead={
          <p>
            {fr
              ? "Trois façons de démarrer, selon où vous en êtes. Un seul interlocuteur du premier échange à la mise en ligne."
              : "Three ways to start, depending on where you are. One point of contact from the first conversation to launch."}
          </p>
        }
        image={PAGE_HERO_PHOTOS.services}
        className="pb-36 md:pb-48"
      />

      <Container>
        <ul className="relative z-10 -mt-24 grid gap-5 md:-mt-32 md:grid-cols-3">
          {doors.map((door) => (
            <li key={door.id}>
              <TrackedLink
                href={door.href}
                event={{ ctaId: `services_door_${door.id}`, source: "services_index", destination: door.href, locale }}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface shadow-[0_30px_60px_-40px_rgba(9,9,12,0.5)] transition-colors duration-200 hover:border-[var(--rs-border-strong)]"
              >
                <span className="relative block h-36 overflow-hidden bg-[var(--rs-dark)]">
                  <Image
                    src={door.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover opacity-85 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  <span className="absolute bottom-3 left-5 text-4xl font-bold tracking-tight text-white/90">{door.index}</span>
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rs-muted">{door.kicker}</span>
                  <span className="mt-2 text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-rs-accent-fg md:text-2xl">
                    {door.title}
                  </span>
                  <span className="mt-3 block space-y-2">
                    {door.items.map((item) => (
                      <span key={item} className="flex gap-2.5 text-sm leading-relaxed">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rs-accent-fg" />
                        {item}
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-rs-accent-fg">
                    {door.cta}
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </span>
              </TrackedLink>
            </li>
          ))}
        </ul>

        <PathHeader
          id="parcours-sites"
          index={fr ? "Parcours 01" : "Path 01"}
          title={fr ? "Créer un site web" : "Create a website"}
          body={
            fr
              ? "Pour les commerces et PME : un site clair, rapide et trouvable, avec une maquette avant tout engagement."
              : "For shops and small businesses: a clear, fast, findable website, with a mockup before any commitment."
          }
        />
        <EditorialService locale={locale} feature={{ key: "web", image: "/realisations/manteigaria-before.png", proof: "manteigaria" }} reverse={false} index={1} />

        <div className="mt-6 grid overflow-hidden rounded-[var(--rs-radius-lg)] border border-[var(--rs-border)] bg-rs-surface lg:grid-cols-2">
          <div className="rs-theme-dark relative isolate bg-rs-bg p-8 text-rs-fg md:p-10">
            <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
            <Eyebrow>{fr ? "Commerces, restaurants, refontes" : "Shops, restaurants, redesigns"}</Eyebrow>
            <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
              {fr ? "Une maquette de votre site, gratuite, sous 24 h ouvrées." : "A mockup of your website, free, within 24 business hours."}
            </p>
            <p className="mt-4 text-base leading-relaxed text-rs-muted">
              {fr
                ? "Vous décrivez votre activité en quelques lignes, vous voyez votre future page d'accueil avant de décider. Pour une refonte, vos adresses utiles sont conservées pour ne pas perdre votre référencement."
                : "Describe your business in a few lines and see your future home page before deciding. For a redesign, your useful URLs are kept so you do not lose your rankings."}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <TrackedLink
                href={quotePath(locale, "site")}
                event={{ ctaId: "services_free_mockup", source: "services_index", destination: quotePath(locale, "site"), locale }}
                className="inline-flex items-center gap-2 rounded-none bg-rs-fg px-6 py-3 text-sm font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
              >
                {fr ? "Recevoir ma maquette gratuite" : "Get my free mockup"}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </TrackedLink>
              <Link href={smbLandingPath(locale)} className="text-sm font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg">
                {fr ? "Voir l'offre sites web" : "See the website offer"}
              </Link>
            </div>
          </div>
          <div className="p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">{fr ? "Pensé pour" : "Built for"}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {(fr
                ? [
                    ["Restaurants et cafés", "Menu, horaires, réservation, avis Google"],
                    ["Boulangeries et commerces", "Produits, adresse, itinéraire, appel en un clic"],
                    ["Indépendants", "Prestations, réalisations, prise de rendez-vous"],
                    ["PME", "Offre claire, pages métiers, formulaire qualifié"],
                  ]
                : [
                    ["Restaurants and cafés", "Menu, opening hours, booking, Google reviews"],
                    ["Bakeries and shops", "Products, address, directions, one-tap call"],
                    ["Freelancers", "Services, work, appointment booking"],
                    ["Small businesses", "Clear offer, service pages, qualified form"],
                  ]
              ).map(([title, body]) => (
                <li key={title} className="rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] bg-rs-bg p-4">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-rs-muted">{body}</p>
                </li>
              ))}
            </ul>
            {fr ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {localSeoSectors.slice(0, 5).map((sector) => (
                  <Link
                    key={sector.slug}
                    href={`/site/${sector.slug}/paris`}
                    className="rounded-none border border-[var(--rs-border)] px-3 py-1.5 text-xs font-medium transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent-fg"
                  >
                    {sector.title}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <PathHeader
          id="parcours-applications"
          index={fr ? "Parcours 02" : "Path 02"}
          title={fr ? "Développer une application" : "Build an application"}
          body={
            fr
              ? "Pour les startups et entreprises : un produit construit autour de votre métier, livré par étapes visibles."
              : "For startups and companies: a product built around your business, delivered in visible steps."
          }
        />
        {BUILD_APPS.map((feature, position) => (
          <EditorialService key={feature.key} locale={locale} feature={feature} reverse={position % 2 === 1} index={position + 2} />
        ))}

        <PathHeader
          id="parcours-evoluer"
          index={fr ? "Parcours 03" : "Path 03"}
          title={fr ? "Faire évoluer l'existant" : "Evolve what exists"}
          body={
            fr
              ? "Pour les équipes qui ont déjà un produit ou des outils : automatiser, équiper en IA, fiabiliser la production."
              : "For teams that already have a product or tools: automate, equip with AI, make production reliable."
          }
        />
        <ul className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {EVOLVE.map((item) => {
            const isCra = item.key === "cra";
            const service = isCra ? null : getService(item.key as ServiceKey);
            const proof = item.proof ? getProject(item.proof) : null;
            const href = isCra ? craPath(locale) : servicePath(locale, item.key as ServiceKey);
            const title = isCra ? cra.title : service!.eyebrow[locale];
            const body = isCra ? cra.description : service!.benefits[locale][0].body;
            return (
              <li key={item.key}>
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-200 hover:border-[var(--rs-border-strong)]"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden bg-[var(--rs-dark)]">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="flex items-start justify-between gap-3 text-lg font-semibold leading-snug transition-colors duration-200 group-hover:text-rs-accent-fg">
                      {title}
                      <ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-rs-muted group-hover:text-rs-accent-fg" />
                    </span>
                    <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-rs-muted">{body}</span>
                    {proof ? (
                      <span className="mt-auto flex items-center gap-2 pt-4 text-xs text-rs-muted">
                        <StatusBadge project={proof} locale={locale} />
                        <span className="truncate">{proof.title}</span>
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-20 flex flex-col gap-5 border-y border-[var(--rs-border)] py-7 md:flex-row md:items-center">
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
        className="pt-20"
        href={quotePath(locale)}
        label={fr ? "Demander un devis gratuit" : "Get a free quote"}
        title={fr ? "Pas sûr du bon service ?" : "Not sure which service fits?"}
        body={
          fr
            ? "Décrivez votre situation en quelques lignes : réponse sous 24 h ouvrées, devis gratuit."
            : "Describe your situation in a few lines: reply within 24 business hours, free quote."
        }
      />
    </div>
  );
}
