export const localSeoCities = [
  { slug: "paris", label: "Paris" },
  { slug: "marseille", label: "Marseille" },
  { slug: "lyon", label: "Lyon" },
  { slug: "toulouse", label: "Toulouse" },
  { slug: "nice", label: "Nice" },
  { slug: "nantes", label: "Nantes" },
  { slug: "montpellier", label: "Montpellier" },
  { slug: "strasbourg", label: "Strasbourg" },
  { slug: "bordeaux", label: "Bordeaux" },
  { slug: "lille", label: "Lille" },
] as const;

export const localSeoSectors = [
  { slug: "restaurant", label: "Restaurant", title: "Création de site restaurant" },
  { slug: "cafe", label: "Café", title: "Création de site café" },
  { slug: "hotel", label: "Hôtel", title: "Création de site hôtel" },
  { slug: "boulangerie", label: "Boulangerie", title: "Création de site boulangerie" },
  { slug: "patisserie", label: "Pâtisserie", title: "Création de site pâtisserie" },
  { slug: "bar", label: "Bar", title: "Création de site bar" },
  { slug: "commerce-local", label: "Commerce local", title: "Création de site commerce local" },
] as const;

export type LocalSeoCitySlug = (typeof localSeoCities)[number]["slug"];
export type LocalSeoSectorSlug = (typeof localSeoSectors)[number]["slug"];

export function getCityBySlug(city: string) {
  return localSeoCities.find((item) => item.slug === city);
}

export function getSectorBySlug(sector: string) {
  return localSeoSectors.find((item) => item.slug === sector);
}

export function getAllLocalSeoCombos() {
  return localSeoSectors.flatMap((sector) =>
    localSeoCities.map((city) => ({
      sector,
      city,
    })),
  );
}

