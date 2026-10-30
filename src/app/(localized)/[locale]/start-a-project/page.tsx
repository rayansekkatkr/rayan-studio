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
  // Both locales resolve; the FR variant redirects to the canonical FR route below.
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  return buildLocalizedMetadata({
    locale: "en",
    title: "Start a project",
    description:
      "Describe your project in five steps: type, stage, objective, timing and contact. First response within 24 business hours.",
    path: "/en/start-a-project",
    alternatePath: "/fr/demarrer-un-projet",
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  if (locale !== "en") {
    redirect("/fr/demarrer-un-projet");
  }

  return (
    <CommercialPageShell locale="en" headerTopTheme="dark">
      <PageHero
        eyebrow="Project · Quote"
        title="Start a project"
        lead={
          <p>
            Five quick questions to frame your need and request a quote. No specification document required: simply
            describe where you are. First response within 24 business hours.
          </p>
        }
        image={PAGE_HERO_PHOTOS.contact}
      />
      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
            <ProjectForm locale="en" />
            <ContactAside locale="en" source="project" />
          </div>
        </Container>
      </div>
    </CommercialPageShell>
  );
}
