import Image from "next/image";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Screen = NonNullable<ProjectRecord["screens"]>[number]["items"][number];

function Shot({ screen, locale, className, sizes }: { screen: Screen; locale: Locale; className?: string; sizes: string }) {
  if (screen.frame === "phone") {
    return (
      <div className={cn("flex items-center justify-center rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-[color-mix(in_srgb,var(--rs-accent)_6%,var(--rs-surface))] p-6", className)}>
        <div className="w-[62%] max-w-[15rem] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(9,9,12,0.55)]">
          <Image src={screen.src} alt={screen.alt[locale]} width={screen.width} height={screen.height} sizes="20vw" className="block h-auto w-full" />
        </div>
      </div>
    );
  }
  return (
    <div className={cn("overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface shadow-[0_30px_70px_-45px_rgba(9,9,12,0.5)]", className)}>
      <Image src={screen.src} alt={screen.alt[locale]} width={screen.width} height={screen.height} sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}

/** Real screenshots grouped by journey. Groups without screens are simply not part of the content. */
export function CaseStudyGallery({ locale, groups }: { locale: Locale; groups: NonNullable<ProjectRecord["screens"]> }) {
  return (
    <div className="space-y-12">
      {groups
        .filter((group) => group.items.length > 0)
        .map((group) => {
          const phones = group.items.filter((item) => item.frame === "phone");
          const browsers = group.items.filter((item) => item.frame === "browser");
          return (
            <div key={group.title.en}>
              <p className="text-lg font-semibold">{group.title[locale]}</p>
              <div className="mt-5 grid items-start gap-5 lg:grid-cols-12">
                {phones.length > 0 ? (
                  <>
                    <div className="space-y-5 lg:col-span-8">
                      {browsers.map((screen) => (
                        <Shot key={screen.src} screen={screen} locale={locale} sizes="(min-width: 1024px) 60vw, 100vw" />
                      ))}
                    </div>
                    <div className="grid gap-5 lg:col-span-4">
                      {phones.map((screen) => (
                        <Shot key={screen.src} screen={screen} locale={locale} sizes="25vw" className="h-full" />
                      ))}
                    </div>
                  </>
                ) : (
                  browsers.map((screen, index) => (
                    <Shot
                      key={screen.src}
                      screen={screen}
                      locale={locale}
                      sizes={index === 0 || browsers.length === 1 ? "(min-width: 1024px) 80vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
                      className={browsers.length === 1 || (browsers.length === 3 && index === 0) ? "lg:col-span-12" : browsers.length === 2 ? (index === 0 ? "lg:col-span-7" : "lg:col-span-5") : "lg:col-span-6"}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
