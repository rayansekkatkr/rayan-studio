"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Phones only: a slim bar with the primary action once the hero has scrolled away, hidden again
 * while the form or the footer is on screen. Sits above the cookie bar through --consent-h.
 */
export function LandingStickyCta({ label, source, locale }: { label: string; source: string; locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-night-band]");
    const form = document.getElementById("devis");
    const footer = document.querySelector("[data-site-footer]");
    if (!hero || !form || typeof IntersectionObserver === "undefined") return;

    const onScreen = new Map<Element, boolean>([
      [hero, true],
      [form, false],
    ]);
    if (footer) onScreen.set(footer, false);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) onScreen.set(entry.target, entry.isIntersecting);
      setVisible(![...onScreen.values()].some(Boolean));
    });
    for (const element of onScreen.keys()) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      data-landing-sticky-cta
      style={{ bottom: "var(--consent-h, 0px)" }}
      className={cn(
        "fixed inset-x-0 z-70 border-t border-(--rs-border) bg-rs-bg p-3 transition-[opacity,transform] duration-200 ease-rs md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <TrackedLink
        href="#devis"
        event={{ ctaId: `${source}_sticky_form`, source, destination: "#devis", locale }}
        className="flex w-full items-center justify-center gap-2 bg-rs-fg px-6 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent active:bg-rs-accent-hover active:text-(--rs-dark-fg) active:duration-0"
      >
        {label}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </TrackedLink>
    </div>
  );
}
