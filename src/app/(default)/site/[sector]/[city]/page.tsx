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

const objectiveBySector: Record<LocalSeoSectorSlug, string> = {
  restaurant: "Rendre la réservation et l'appel immédiats depuis mobile",
  cafe: "Rendre les horaires et le contact WhatsApp évidents",
  hotel: "Faire remonter la demande directe avant les plateformes",
  boulangerie: "Simplifier les commandes et les demandes traiteur",
  patisserie: "Rendre lisibles les commandes sur mesure et la prise de contact",
  bar: "Mettre en avant les réservations de groupe et les événements",
  "commerce-local": "Rendre l'offre et les informations pratiques accessibles en un écran",
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
    objective: objectiveBySector[sector.slug],
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
      citySlug={city.slug}
      sector={sector.label}
      sectorSlug={sector.slug}
      content={getLocalSeoContent(sector, city)}
    />
  );
}
