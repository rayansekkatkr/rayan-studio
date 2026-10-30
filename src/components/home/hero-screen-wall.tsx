import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// Real screens of the studio's own products, scrolling slowly behind the hero.
// Each track is rendered twice so the CSS loop (translate -50%) is seamless;
// only the first copy carries alt text, the duplicate is hidden from assistive tech.

type Screen = { src: string; alt: Record<Locale, string>; width: number; height: number };

const SCREENS: Record<string, Screen> = {
  pick4me: {
    src: "/realisations/pick4me.webp",
    alt: { fr: "Interface du produit Pick4Me", en: "Pick4Me product interface" },
    width: 2400,
    height: 1350,
  },
  pontFacturx: {
    src: "/realisations/pont-facturx.webp",
    alt: { fr: "Interface du produit Pont Factur-X", en: "Pont Factur-X product interface" },
    width: 2400,
    height: 1350,
  },
  pontFacturxConversion: {
    src: "/realisations/pont-facturx-conversion.webp",
    alt: { fr: "Conversion d'une facture dans Pont Factur-X", en: "Invoice conversion in Pont Factur-X" },
    width: 2400,
    height: 1200,
  },
  pontFacturxFormat: {
    src: "/realisations/pont-facturx-format.webp",
    alt: { fr: "Choix du format dans Pont Factur-X", en: "Format selection in Pont Factur-X" },
    width: 2400,
    height: 1500,
  },
  goodcall: {
    src: "/realisations/goodcall.webp",
    alt: { fr: "Interface du produit GoodCall", en: "GoodCall product interface" },
    width: 2400,
    height: 1350,
  },
  goodcallRankings: {
    src: "/realisations/goodcall-classements.webp",
    alt: { fr: "Classements dans GoodCall", en: "Rankings in GoodCall" },
    width: 2400,
    height: 1500,
  },
  docextract: {
    src: "/realisations/docextract.png",
    alt: { fr: "Interface du produit DocExtract", en: "DocExtract product interface" },
    width: 1600,
    height: 904,
  },
};

const COLUMNS: Array<{ keys: Array<keyof typeof SCREENS>; reverse: boolean; duration: string }> = [
  { keys: ["pick4me", "pontFacturxFormat", "docextract"], reverse: false, duration: "62s" },
  { keys: ["goodcall", "pontFacturx", "goodcallRankings"], reverse: true, duration: "74s" },
  { keys: ["pontFacturxConversion", "pick4me", "goodcall"], reverse: false, duration: "68s" },
];

const ROW: Array<keyof typeof SCREENS> = [
  "pick4me",
  "pontFacturx",
  "goodcall",
  "docextract",
  "pontFacturxConversion",
  "goodcallRankings",
];

function Tile({ screen, locale, labelled, sizes }: { screen: Screen; locale: Locale; labelled: boolean; sizes: string }) {
  return (
    <div className="overflow-hidden rounded-[var(--rs-radius-md)] border border-white/10 bg-rs-surface shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)]">
      <Image
        src={screen.src}
        alt={labelled ? screen.alt[locale] : ""}
        width={screen.width}
        height={screen.height}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}

/** Desktop: three tilted columns scrolling vertically, in opposite directions. */
export function HeroScreenWall({ locale, className }: { locale: Locale; className?: string }) {
  const labelled = new Set<string>();
  return (
    <div className={cn("hero-screen-wall pointer-events-auto", className)} data-hero-wall>
      <div className="hero-screen-wall__plane grid grid-cols-3 gap-5">
        {COLUMNS.map((column, index) => (
          <div key={index} className="overflow-hidden">
            <div
              className={cn("hero-screen-track flex flex-col", column.reverse && "hero-screen-track--reverse")}
              style={{ animationDuration: column.duration }}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex flex-col gap-5 pb-5" aria-hidden={copy === 1 ? true : undefined}>
                  {column.keys.map((key) => {
                    const first = copy === 0 && !labelled.has(key);
                    if (first) labelled.add(key);
                    return (
                      <Tile key={`${copy}-${key}`} screen={SCREENS[key]} locale={locale} labelled={first} sizes="(min-width: 1024px) 18vw, 0px" />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mobile and tablet: one horizontal row scrolling sideways. */
export function HeroScreenRow({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <div className={cn("hero-screen-row overflow-hidden", className)} data-hero-row>
      <div className="hero-screen-track--x flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4 pr-4" aria-hidden={copy === 1 ? true : undefined}>
            {ROW.map((key) => (
              <div key={`${copy}-${key}`} className="w-[17rem] shrink-0 sm:w-[22rem]">
                <Tile screen={SCREENS[key]} locale={locale} labelled={copy === 0} sizes="(min-width: 640px) 352px, 272px" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
