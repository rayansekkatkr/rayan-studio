import type { Metadata } from "next";
import { RootBody, sharedViewport } from "@/app/_shared/root";
import { NotFoundContent } from "@/components/site/not-found-content";
import { BRAND } from "@/lib/brand";
import "./globals.css";

// Rendered for every unmatched URL. The app has several root layouts (route
// groups), so a regular app/not-found.tsx cannot apply here.
export const metadata: Metadata = {
  title: `Page introuvable | ${BRAND.name}`,
  robots: { index: false, follow: true },
};
export const viewport = sharedViewport;

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <RootBody>
        <NotFoundContent />
      </RootBody>
    </html>
  );
}
