import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechIcon } from "@/components/ui/tech-chips";
import { getProject, type ProjectKey } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

// Only verifiable facts: products that are online, the founder's real background,
// commitments the studio controls. No testimonials, client counts or results.
const LIVE_PRODUCTS: ProjectKey[] = ["pick4me", "pont-facturx", "goodcall", "docextract"];
const STACK = ["Next.js", "React", "TypeScript", "Node.js", "NestJS", "Python", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Stripe", "Claude"];

type Variant = "general" | "site" | "app";

const STEPS: Record<Variant, Record<Locale, string[]>> = {
  general: {
    fr: ["Échange et cadrage du besoin", "Maquette ou prototype à valider", "Développement par étapes visibles", "Mise en ligne et suivi"],
    en: ["Conversation and scoping", "Mockup or prototype to approve", "Development in visible steps", "Launch and follow-up"],
  },
  site: {
    fr: ["Vous décrivez votre activité", "Maquette gratuite sous 24 h ouvrées", "Site développé et relu avec vous", "Mise en ligne, domaine et suivi"],
    en: ["You describe your business", "Free mockup within 24 business hours", "Website built and reviewed with you", "Launch, domain and follow-up"],
  },
  app: {
    fr: ["Cadrage : utilisateurs, périmètre V1", "Architecture et prototype", "Livraisons régulières en production", "Évolutions, supervision, passation"],
    en: ["Scoping: users, V1 scope", "Architecture and prototype", "Regular releases to production", "Evolutions, monitoring, handover"],
  },
};

export function Reassurance({ locale, variant = "general", className }: { locale: Locale; variant?: Variant; className?: string }) {
  const fr = locale === "fr";
  const products = LIVE_PRODUCTS.map((key) => getProject(key)).filter(
    (project): project is NonNullable<ReturnType<typeof getProject>> => project !== null,
  );
  const advantages = fr
    ? [
        "La personne qui cadre votre projet est celle qui le développe et le met en ligne.",
        "Des décisions rapides, sans relais commercial ni chef de projet intermédiaire.",
        "Une première réponse sous 24 h ouvrées, du lundi au vendredi.",
        "Le code, les accès et les données vous appartiennent.",
      ]
    : [
        "The person who scopes your project is the one who builds and launches it.",
        "Fast decisions, with no sales relay or intermediate project manager.",
        "A first reply within 24 business hours, Monday to Friday.",
        "The code, the accounts and the data belong to you.",
      ];

  return (
    <section data-reassurance={variant} className={cn("py-[var(--rs-section-space)]", className)}>
      <Container>
        <Eyebrow>{fr ? "Pourquoi nous faire confiance" : "Why trust the studio"}</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-[1.75rem] font-semibold leading-tight tracking-tight md:text-4xl">
          {fr ? "Des preuves que vous pouvez vérifier." : "Proof you can check for yourself."}
        </h2>
        <p className="mt-4 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
          {fr
            ? "Pas de témoignages ni de chiffres de façade : des produits en ligne, une stack éprouvée et une seule personne responsable de votre projet."
            : "No staged testimonials or vanity numbers: products that are online, a proven stack and one person accountable for your project."}
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          <div className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6 md:p-7 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
              {fr ? "Réalisations en ligne" : "Live work"}
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight">
              {fr ? "4 produits du studio en production" : "4 studio products in production"}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {products.map((project) => (
                <li key={project.key}>
                  <Link
                    href={workPath(locale, project.slug)}
                    className="group flex items-center gap-3 rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] bg-rs-bg p-2.5 pr-3 transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
                  >
                    <span className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--rs-dark)]">
                      <Image src={project.heroImage} alt="" fill sizes="80px" className="object-cover object-left-top" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{project.title}</span>
                      <span className="block truncate text-xs text-rs-muted">{project.categories[locale].slice(0, 2).join(" · ")}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-rs-muted transition-colors duration-150 group-hover:text-rs-accent-fg"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-rs-muted">
              {fr
                ? "Développement logiciel depuis 2020, dont une mission DevOps pour STMicroelectronics en 2024 (plus de 170 pipelines par jour)."
                : "Building software since 2020, including a DevOps engagement for STMicroelectronics in 2024 (more than 170 pipelines a day)."}
            </p>
          </div>

          <div className="rs-theme-dark relative isolate overflow-hidden rounded-[var(--rs-radius-md)] bg-rs-bg p-6 text-rs-fg md:p-7 lg:col-span-5">
            <div aria-hidden className="hero-glow absolute inset-0 -z-10" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
              {fr ? "Un seul interlocuteur" : "One point of contact"}
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight">
              {fr ? "Vous parlez à celui qui construit." : "You talk to the person who builds."}
            </p>
            <ul className="mt-5 space-y-3.5">
              {advantages.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rs-accent">
                    <Check aria-hidden className="h-3 w-3 text-white" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6 md:p-7 lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
              {fr ? "Processus de travail" : "How we work"}
            </p>
            <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS[variant][locale].map((step, index) => (
                <li key={step}>
                  <span aria-hidden className="num-gradient text-4xl font-bold leading-none tracking-tight">
                    {index + 1}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6 md:p-7 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
              {fr ? "Technologies maîtrisées" : "Technologies we master"}
            </p>
            <ul className="mt-5 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-4">
              {STACK.map((name) => (
                <li key={name} className="flex items-center gap-2 text-xs font-medium text-rs-fg">
                  <TechIcon name={name} className="h-5 w-5" />
                  <span className="truncate">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
