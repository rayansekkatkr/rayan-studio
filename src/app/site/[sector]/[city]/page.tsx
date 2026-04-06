import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalSeoLanding } from "@/components/site/LocalSeoLanding";
import {
  getAllLocalSeoCombos,
  getCityBySlug,
  getSectorBySlug,
  type LocalSeoCitySlug,
  type LocalSeoSectorSlug,
} from "@/lib/local-seo";

type Params = {
  sector: LocalSeoSectorSlug;
  city: LocalSeoCitySlug;
};

export function generateStaticParams(): Params[] {
  return getAllLocalSeoCombos().map(({ sector, city }) => ({
    sector: sector.slug,
    city: city.slug,
  }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const sector = getSectorBySlug(params.sector);
  const city = getCityBySlug(params.city);

  if (!sector || !city) {
    return {};
  }

  const title = `${sector.title} à ${city.label}`;
  const description = `Création et refonte de site ${sector.label.toLowerCase()} à ${city.label}: design premium, UX conversion et accompagnement local.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/site/${sector.slug}/${city.slug}`,
    },
  };
}

const kpiBySector: Record<LocalSeoSectorSlug, string> = {
  restaurant: "+28% de réservations sur 30 jours",
  cafe: "+24 messages WhatsApp sur 30 jours",
  hotel: "+41% de demandes sur 30 jours",
  boulangerie: "+26% de commandes / demandes traiteur",
  patisserie: "+29% de prises de contact",
  bar: "+23% de réservations de groupe",
  "commerce-local": "+25% de demandes qualifiées",
};

export default function Page({ params }: { params: Params }) {
  const sector = getSectorBySlug(params.sector);
  const city = getCityBySlug(params.city);

  if (!sector || !city) {
    notFound();
  }

  return (
    <LocalSeoLanding
      city={city.label}
      sector={sector.label}
      title={`${sector.title} à ${city.label}`}
      subtitle={`Un site vitrine ${sector.label.toLowerCase()} pensé pour ${city.label}: image premium, message clair et demandes locales plus qualifiées.`}
      kpi={kpiBySector[sector.slug]}
    />
  );
}

