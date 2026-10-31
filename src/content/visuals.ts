import type { ServiceKey } from "@/lib/site-routes";

// Shared image bank. /realisations: the studio's own product screens and diagrams.
// /services and /images: free-licence Unsplash photos (credits in PROJECT_MEMORY.md).
export const SERVICE_VISUALS: Record<ServiceKey | "cra", string> = {
  applications: "/realisations/pick4me.webp",
  mvp: "/realisations/goodcall.webp",
  backends: "/realisations/pont-facturx-conversion.webp",
  automation: "/realisations/docextract.png",
  ai: "/services/ai.webp",
  web: "/services/web.webp",
  devops: "/services/devops.webp",
  cra: "/services/cra.webp",
};

/** Atmospheric photos for the dark page heroes (never product proof). */
export const SERVICE_HERO_PHOTOS: Record<ServiceKey, string> = {
  applications: "/images/devices.webp",
  mvp: "/images/wireframe.webp",
  backends: "/images/code.webp",
  automation: "/images/network-cubes.webp",
  ai: "/services/ai.webp",
  web: "/services/web.webp",
  devops: "/services/devops.webp",
};

export const PAGE_HERO_PHOTOS = {
  services: "/images/lines-blue.webp",
  studio: "/images/seoul-night.webp",
  insights: "/images/notebook.webp",
  contact: "/images/desk-night.webp",
  offers: "/images/network-cubes.webp",
} as const;

/** Offer cards, in the order of OFFERS_CONTENT (applications, MVP, websites, ongoing support). */
export const OFFER_PHOTOS = [
  "/images/devices.webp",
  "/images/wireframe.webp",
  "/services/web.webp",
  "/services/devops.webp",
] as const;

/** Portfolio filters of the work page. A project can appear under several filters. */
export type WorkFilter = "apps" | "web" | "ai" | "devops";
export const WORK_FILTERS: Record<string, WorkFilter[]> = {
  pick4me: ["apps"],
  "pont-facturx": ["apps"],
  goodcall: ["apps"],
  docextract: ["apps", "ai"],
  manteigaria: ["web"],
  "ops-knowledge-agent": ["ai"],
  "ci-cd-platform": ["devops"],
  "product-infrastructure": ["devops"],
};

/**
 * Portfolio cards take each product's own colours, so the page reads as a collection of
 * products rather than identical tiles. `ink` is the text colour family on that surface.
 */
export const WORK_THEMES: Record<string, { surface: string; ink: "light" | "dark" }> = {
  pick4me: { surface: "linear-gradient(135deg, #fbe9ec 0%, #fff6ec 60%, #f4f4f1 100%)", ink: "dark" },
  "pont-facturx": { surface: "#0f1a14", ink: "light" },
  goodcall: { surface: "#f6e04a", ink: "dark" },
  docextract: { surface: "#ffffff", ink: "dark" },
  manteigaria: { surface: "#2a1d14", ink: "light" },
};

/** Short platform line next to the status badge (facts only: where the product runs). */
export const WORK_PLATFORMS: Record<string, { fr: string; en: string }> = {
  pick4me: { fr: "iOS, Android, web", en: "iOS, Android, web" },
  "pont-facturx": { fr: "SaaS B2B", en: "B2B SaaS" },
  goodcall: { fr: "Mobile et web", en: "Mobile and web" },
  docextract: { fr: "SaaS B2B", en: "B2B SaaS" },
};
