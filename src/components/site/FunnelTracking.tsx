"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const SECTION_IDS = [
  "hero",
  "probleme-solution",
  "services",
  "realisations",
  "process",
  "tarifs",
  "temoignages",
  "faq",
  "contact",
];

const SCROLL_THRESHOLDS = [25, 50, 75, 90];

export function FunnelTracking() {
  useEffect(() => {
    const seen = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const percent = Math.round((scrollTop / max) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !seen.has(threshold)) {
          seen.add(threshold);
          trackEvent("scroll_depth", { threshold });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const viewed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewed.has(entry.target.id)) {
            viewed.add(entry.target.id);
            trackEvent("section_view", { section_id: entry.target.id });
          }
        }
      },
      { threshold: 0.45 },
    );

    for (const id of SECTION_IDS) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}

