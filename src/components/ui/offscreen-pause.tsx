"use client";

import { useEffect, useRef } from "react";

/**
 * Pauses the looping glow of the closest `[data-night-band]` while it is off-screen, through the
 * same `data-motion-paused` attribute the home hero uses (see globals.css). Renders nothing visible.
 */
export function OffscreenPause() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>("[data-night-band]");
    if (!root || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      root.toggleAttribute("data-motion-paused", !entry.isIntersecting);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} hidden />;
}
