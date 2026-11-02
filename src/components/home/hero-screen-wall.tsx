import Image from "next/image";
import { cn } from "@/lib/utils";

// Real screens of the studio's own products only (kind: product: Pick4Me, Pont Factur-X,
// GoodCall, DocExtract), scrolling slowly behind the hero. Demos and client missions stay
// off the wall so it never presents them as studio products. Purely decorative: no names
// and no alt text. Each track is rendered twice so the CSS loop (translate -50%) is seamless.

type Screen = { src: string; width: number; height: number };

const SCREENS: Record<string, Screen> = {
  pick4me: {
    src: "/realisations/pick4me.webp",
    width: 2400,
    height: 1350,
  },
  pontFacturx: {
    src: "/realisations/pont-facturx.webp",
    width: 2400,
    height: 1350,
  },
  pontFacturxConversion: {
    src: "/realisations/pont-facturx-conversion.webp",
    width: 2400,
    height: 1200,
  },
  pontFacturxFormat: {
    src: "/realisations/pont-facturx-format.webp",
    width: 2400,
    height: 1500,
  },
  goodcall: {
    src: "/realisations/goodcall.webp",
    width: 2400,
    height: 1350,
  },
  goodcallRankings: {
    src: "/realisations/goodcall-classements.webp",
    width: 2400,
    height: 1500,
  },
  docextract: {
    src: "/realisations/docextract.png",
    width: 1600,
    height: 904,
  },
};

const COLUMNS: Array<{ keys: Array<keyof typeof SCREENS>; reverse: boolean; duration: string }> = [
  { keys: ["pick4me", "pontFacturxFormat", "docextract"], reverse: false, duration: "62s" },
  { keys: ["goodcall", "pontFacturx", "goodcallRankings"], reverse: true, duration: "74s" },
  { keys: ["pontFacturxConversion", "goodcall", "pick4me"], reverse: false, duration: "68s" },
];

const ROW: Array<keyof typeof SCREENS> = [
  "pick4me",
  "pontFacturx",
  "goodcall",
  "docextract",
  "pontFacturxConversion",
  "goodcallRankings",
  "pontFacturxFormat",
];

function Tile({ screen, sizes }: { screen: Screen; sizes: string }) {
  return (
    <div className="overflow-hidden border border-(--rs-border) bg-rs-surface shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)]">
      <Image
        src={screen.src}
        alt=""
        width={screen.width}
        height={screen.height}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}

/** Desktop: three tilted columns scrolling vertically, in opposite directions. */
export function HeroScreenWall({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("hero-screen-wall pointer-events-auto", className)} data-hero-wall>
      <div className="hero-screen-wall__plane grid grid-cols-3 gap-5">
        {COLUMNS.map((column, index) => (
          <div key={index} className="overflow-hidden">
            <div
              className={cn("hero-screen-track flex flex-col", column.reverse && "hero-screen-track--reverse")}
              style={{ animationDuration: column.duration }}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex flex-col gap-5 pb-5">
                  {column.keys.map((key) => (
                    <Tile key={`${copy}-${key}`} screen={SCREENS[key]} sizes="(min-width: 1024px) 18vw, 0px" />
                  ))}
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
export function HeroScreenRow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("hero-screen-row overflow-hidden", className)} data-hero-row>
      <div className="hero-screen-track--x flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4 pr-4">
            {ROW.map((key) => (
              <div key={`${copy}-${key}`} className="w-68 shrink-0 sm:w-88">
                <Tile screen={SCREENS[key]} sizes="(min-width: 640px) 352px, 272px" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
