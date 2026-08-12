import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { ProjectForm } from "@/components/forms/project-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  // Both locales resolve; the EN variant redirects to the canonical EN route below.
  return [{ locale: "fr" }, { locale: "en" }];
}

export function generateMetadata(): Metadata {
  return buildLocalizedMetadata({
    locale: "fr",
    title: "Démarrer un projet",
    description:
      "Décrivez votre projet en cinq étapes : type, avancement, objectif, timing et contact. Première réponse sous 24h ouvrées.",
    path: "/fr/demarrer-un-projet",
    alternatePath: "/en/start-a-project",
  });
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = normalizeLocale(params.locale) as Locale;
  if (locale !== "fr") {
    redirect("/en/start-a-project");
  }

  return (
    <CommercialPageShell locale="fr" headerTopTheme="dark">
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>Projet</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            Démarrer un projet
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            Cinq questions rapides pour cadrer votre besoin. Pas besoin d&apos;un cahier des charges :
            décrivez simplement où vous en êtes. Première réponse sous 24h ouvrées.
          </p>
        </Container>
      </div>
      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <ProjectForm locale="fr" />
        </Container>
      </div>
    </CommercialPageShell>
  );
}
