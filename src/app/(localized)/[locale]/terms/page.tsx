import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { getLegalDocument, legalAlternatePath } from "@/content/legal";
import { buildLocalizedMetadata } from "@/lib/seo";
import { legalPath } from "@/lib/site-routes";

export const dynamicParams = false;

// English only: the French version keeps its historical root URL.
export function generateStaticParams() {
  return [{ locale: "en" }];
}

const doc = getLegalDocument("terms", "en");

export const metadata: Metadata = buildLocalizedMetadata({
  locale: "en",
  title: doc.title,
  description: doc.description,
  path: legalPath("en", "terms"),
  alternatePath: legalAlternatePath("terms", "en"),
});

export default function TermsPage() {
  return <LegalDocument locale="en" doc={doc} />;
}
