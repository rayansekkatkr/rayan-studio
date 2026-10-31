import Image from "next/image";
import { cn } from "@/lib/utils";

type NightBandProps = {
  /** Atmosphere photo blended into the night background. Decorative. */
  image?: string;
  /** CSS object-position of the photo, to keep its subject on the right. */
  imagePosition?: string;
  /** Busy images (product screens) are dimmed further so the giant type stays clean. */
  dim?: boolean;
  children: React.ReactNode;
  className?: string;
};

/**
 * Night page header shared by every inner page: dark background, a theme photo
 * faded into it on the right, and a slow glow when there is no photo.
 * The header bar sits on top of it in its inverse (light ink) state.
 */
export function NightBand({ image, imagePosition = "center", dim = false, children, className }: NightBandProps) {
  return (
    <div
      data-night-band
      className={cn("rs-theme-dark relative isolate overflow-hidden bg-rs-bg pb-16 text-rs-fg md:pb-20", className)}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className={cn("night-band-image -z-20 object-cover", dim && "night-band-image--dim")}
          style={{ objectPosition: imagePosition }}
        />
      ) : null}
      <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", image ? "night-band-shade" : "hero-glow")} />
      {children}
    </div>
  );
}
