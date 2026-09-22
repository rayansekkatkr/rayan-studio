import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { getLegalDocument, legalAlternatePath } from "@/content/legal";
import { buildLocalizedMetadata } from "@/lib/seo";
import { legalPath } from "@/lib/site-routes";

const doc = getLegalDocument("terms", "fr");

export const metadata: Metadata = buildLocalizedMetadata({
  locale: "fr",
  title: doc.title,
  description: doc.description,
  path: legalPath("fr", "terms"),
  alternatePath: legalAlternatePath("terms", "fr"),
});

export default function CgvPage() {
  return <LegalDocument locale="fr" doc={doc} />;
}
