import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Extra screens of a case study, side by side on desktop (the hero image is not repeated). */
export function ProjectGallery({ locale, items }: { locale: Locale; items: ProjectRecord["gallery"] }) {
  if (items.length === 0) return null;
  return (
    <Container>
      <div className={cn("grid gap-6", items.length > 1 && "md:grid-cols-2")}>
        {items.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className="overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface"
          >
            <Image
              src={item.src}
              alt={item.alt[locale]}
              width={1600}
              height={1000}
              sizes={items.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
              className={cn("h-auto w-full object-cover object-left-top", items.length > 1 && "aspect-[16/10]")}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
