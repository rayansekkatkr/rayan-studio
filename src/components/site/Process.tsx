"use client";

import VerticalTabs from "@/components/ui/vertical-tabs";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);

  return (
    <section id="process" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title={en ? "A clear 4-step process" : "Un process clair en 4 étapes"}
            description={
              en
                ? "From discovery to launch: each step includes a concrete deliverable, a clear objective, and shared validation."
                : "De la découverte à la mise en ligne: chaque étape a un livrable concret, un objectif précis et une validation commune."
            }
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-7">
            <VerticalTabs locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
