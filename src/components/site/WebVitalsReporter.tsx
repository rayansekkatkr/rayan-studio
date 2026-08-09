"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "@/lib/analytics";

const REPORTED = new Set(["LCP", "CLS", "INP", "FCP", "TTFB"]);

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (!REPORTED.has(metric.name)) return;

    trackEvent("web_vitals", {
      metric_name: metric.name,
      // CLS est un ratio (<1) : multiplié pour rester exploitable en entier côté GA.
      metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      metric_id: metric.id,
    });
  });

  return null;
}
