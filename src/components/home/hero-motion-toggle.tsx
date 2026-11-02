"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Pause control for the hero's looping motion (WCAG 2.2.2), plus an automatic pause while the
 * hero is off-screen. Both set `data-motion-paused` on the closest `[data-hero-motion]` root;
 * globals.css pauses the screen tracks and the glow from that attribute.
 */
export function HeroMotionToggle({ locale, className }: { locale: Locale; className?: string }) {
  const fr = locale === "fr";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const root = buttonRef.current?.closest<HTMLElement>("[data-hero-motion]");
    if (!root || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = buttonRef.current?.closest<HTMLElement>("[data-hero-motion]");
    root?.toggleAttribute("data-motion-paused", paused || offscreen);
  }, [paused, offscreen]);

  const label = paused
    ? fr ? "Relancer l'animation" : "Play the animation"
    : fr ? "Mettre l'animation en pause" : "Pause the animation";

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-pressed={paused}
      aria-label={label}
      title={label}
      onClick={() => setPaused((value) => !value)}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center border border-[var(--rs-border-strong)] bg-rs-surface text-rs-muted transition-colors duration-150 hover:border-rs-accent hover:text-rs-fg motion-reduce:hidden",
        className,
      )}
    >
      {paused ? <Play aria-hidden className="h-4 w-4" /> : <Pause aria-hidden className="h-4 w-4" />}
    </button>
  );
}
