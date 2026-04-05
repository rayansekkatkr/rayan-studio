"use client";

import VerticalTabs from "@/components/ui/vertical-tabs";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <section id="process" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal delay={0.08}>
          <VerticalTabs />
        </Reveal>
      </div>
    </section>
  );
}
