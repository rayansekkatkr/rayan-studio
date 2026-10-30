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
} as const;
