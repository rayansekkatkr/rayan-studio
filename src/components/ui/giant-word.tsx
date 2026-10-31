"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type GiantWordProps = {
  text: string;
  /** Upper bound in rem, so short words ("STUDIO") do not take a whole screen. */
  maxRem?: number;
  className?: string;
};

/**
 * Direction A signature: a page name set in very heavy type, stretched to the full
 * container width. Decorative (aria-hidden): the page keeps a real h1 next to it.
 *
 * The first paint uses a CSS estimate from the character count, then the size is
 * measured and adjusted once the font is loaded and on every container resize.
 */
export function GiantWord({ text, maxRem = 14, className }: GiantWordProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    let lastWidth = -1;
    const fit = (force = false) => {
      const styles = getComputedStyle(parent);
      const available = parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      // Refit only when the available width changes: the fit itself changes the
      // parent's height, which would otherwise retrigger the observer in a loop.
      if (!force && available === lastWidth) return;
      lastWidth = available;
      el.style.fontSize = "100px";
      const measured = el.getBoundingClientRect().width;
      if (!available || !measured) return;
      const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      el.style.fontSize = `${Math.min((100 * available) / measured, maxRem * rootPx) * 0.99}px`;
    };

    fit(true);
    void document.fonts?.ready.then(() => fit(true));
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => fit());
    observer.observe(parent);
    return () => observer.disconnect();
  }, [text, maxRem]);

  // About 0.58em per uppercase character in Inter Tight Black with -0.06em tracking.
  const estimate = `min(${maxRem}rem, ${(92 / (text.length * 0.58)).toFixed(2)}vw)`;

  return (
    <span
      ref={ref}
      aria-hidden
      data-giant-word
      className={cn("block w-max whitespace-nowrap font-black uppercase leading-[0.8] tracking-[-0.06em]", className)}
      style={{ fontSize: estimate, marginLeft: "-0.04em", paddingTop: "0.14em" }}
    >
      {text}
    </span>
  );
}
