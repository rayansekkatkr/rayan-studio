"use client";

import VerticalTabs from "@/components/ui/vertical-tabs";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process() {
  return (
    <section id="process" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="Un process clair en 4 étapes"
            description="De la découverte à la mise en ligne: chaque étape a un livrable concret, un objectif précis et une validation commune."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-7">
            <VerticalTabs />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
