import { applications } from "./applications";
import { automation } from "./automation";
import { backends } from "./backends";
import { devops } from "./devops";
import { mvp } from "./mvp";
import { web } from "./web";
import type { ServiceKey } from "@/lib/site-routes";

export const SERVICES = [applications, mvp, backends, automation, web, devops] as const;

export function getService(key: ServiceKey) {
  const service = SERVICES.find((item) => item.key === key);
  if (!service) throw new Error(`Unknown service key: ${key}`);
  return service;
}

export * from "./types";
