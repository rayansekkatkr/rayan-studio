import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TechIcon } from "@/components/ui/tech-chips";
import { PROJECTS } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

// Only verifiable facts: products that are online, the founder's real background,
// commitments the studio controls. No testimonials, client counts or results.
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
  const live = PROJECTS.filter((project) => project.kind === "product" && project.key !== "product-infrastructure").length;
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
        <h2 className="mt-4 max-w-4xl text-[2.25rem] font-extrabold leading-[0.98] tracking-[-0.045em] md:text-6xl">
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
              {fr ? `${live} produits du studio en production` : `${live} studio products in production`}
            </p>
            <p className="mt-3 text-base leading-relaxed text-rs-muted">
              {fr
                ? "Des produits utilisés, conçus, développés et exploités par le studio. Développement logiciel depuis 2020."
                : "Products in use, designed, built and operated by the studio. Building software since 2020."}
            </p>
            <Link
              href={workPath(locale)}
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Voir les réalisations" : "See the work"}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
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
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-none bg-rs-accent">
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
