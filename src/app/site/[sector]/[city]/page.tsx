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
import { buildLocalSeoContent } from "@/lib/local-seo-content";

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

  const content = getLocalSeoContent(sector, city);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
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

function getLocalSeoContent(
  sector: NonNullable<ReturnType<typeof getSectorBySlug>>,
  city: NonNullable<ReturnType<typeof getCityBySlug>>,
) {
  return buildLocalSeoContent({
    citySlug: city.slug,
    cityLabel: city.label,
    sectorSlug: sector.slug,
    sectorLabel: sector.label,
    kpi: kpiBySector[sector.slug],
  });
}

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
      content={getLocalSeoContent(sector, city)}
    />
  );
}
