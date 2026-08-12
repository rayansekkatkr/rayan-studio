import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ProjectGallery({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  return (
    <Container>
      <div className="grid gap-6">
        {project.gallery.map((item, index) => {
          const detail = index % 2 === 1;
          return (
            <div
              key={`${item.src}-${index}`}
              className={cn(
                "overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)]",
                detail && "md:mx-auto md:w-2/3",
              )}
            >
              <Image
                src={item.src}
                alt={item.alt[locale]}
                width={detail ? 1080 : 1600}
                height={detail ? 540 : 1000}
                sizes={detail ? "(min-width: 768px) 66vw, 100vw" : "100vw"}
                className={cn(
                  "h-auto w-full object-cover",
                  detail && "aspect-[2/1] object-top",
                )}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
