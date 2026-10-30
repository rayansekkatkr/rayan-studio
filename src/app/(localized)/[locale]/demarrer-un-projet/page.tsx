import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { ProjectForm } from "@/components/forms/project-form";
import { Container } from "@/components/ui/container";
import { ContactAside } from "@/components/contact/contact-aside";
import { PageHero } from "@/components/ui/page-hero";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";
import { normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  // Both locales resolve; the EN variant redirects to the canonical EN route below.
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    locale: "fr",
    title: "Démarrer un projet",
    description:
      "Décrivez votre projet en cinq étapes : type, avancement, objectif, timing et contact. Première réponse sous 24h ouvrées.",
    path: "/fr/demarrer-un-projet",
    alternatePath: "/en/start-a-project",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  if (locale !== "fr") {
    redirect("/en/start-a-project");
  }

  return (
    <CommercialPageShell locale="fr" headerTopTheme="dark">
      <PageHero
        eyebrow="Projet · Devis"
        title="Démarrer un projet"
        lead={
          <p>
            Cinq questions rapides pour cadrer votre besoin et demander un devis. Pas besoin d&apos;un cahier des
            charges : décrivez simplement où vous en êtes. Première réponse sous 24 h ouvrées.
          </p>
        }
        image={PAGE_HERO_PHOTOS.contact}
      />
      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
            <ProjectForm locale="fr" />
            <ContactAside locale="fr" source="project" />
          </div>
        </Container>
      </div>
    </CommercialPageShell>
  );
}
