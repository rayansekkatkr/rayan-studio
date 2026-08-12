import { docextract } from "./docextract";
import { goodcall } from "./goodcall";
import { manteigaria } from "./manteigaria";
import { pick4me } from "./pick4me";
import { pontFacturx } from "./pont-facturx";
import type { ProjectKey } from "./types";

export const PROJECTS = [pick4me, pontFacturx, goodcall, docextract, manteigaria] as const;
export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featuredOrder).sort(
  (a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999),
);

export function getProject(key: ProjectKey) {
  return PROJECTS.find((project) => project.key === key) ?? null;
}

export * from "./types";
