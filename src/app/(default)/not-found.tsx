import type { Metadata } from "next";
import { NotFoundContent } from "@/components/site/not-found-content";
import { BRAND } from "@/lib/brand";

// Used when a page of this route group calls notFound(), for example an
// unknown sector or city on the local landings.
export const metadata: Metadata = {
  title: { absolute: `Page introuvable | ${BRAND.name}` },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
