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
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>Project</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            Start a project
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            Five quick questions to frame your need. No specification document required: simply
            describe where you are. First response within 24 business hours.
          </p>
        </Container>
      </div>
      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <ProjectForm locale="en" />
        </Container>
      </div>
    </CommercialPageShell>
  );
}
