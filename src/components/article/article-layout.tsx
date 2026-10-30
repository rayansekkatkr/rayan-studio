import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArticleToc, type TocItem } from "./article-toc";

/** Photo card under the table of contents; the link is rendered by the caller. */
export function ArticleAsideCard({ image, children }: { image: string; children: ReactNode }) {
  return (
    <div className="relative mt-8 h-48 overflow-hidden rounded-[var(--rs-radius-md)] bg-[var(--rs-dark)]">
      <Image src={image} alt="" fill sizes="240px" className="object-cover object-left-top opacity-80" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(9,9,12,0.88)] to-transparent" />
      <div className="absolute inset-x-4 bottom-3.5 text-sm font-semibold text-white">{children}</div>
    </div>
  );
}

export function AsideLinkLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {children}
      <ArrowRight aria-hidden className="h-3.5 w-3.5" />
    </span>
  );
}

/**
 * Editorial layout below the dark hero: a sticky table of contents on the left
 * (desktop only) and the page content as one reading column.
 */
export function ArticleLayout({
  locale,
  toc,
  aside,
  children,
  className,
}: {
  locale: Locale;
  toc: TocItem[];
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("py-[var(--rs-section-space)]", className)}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ArticleToc items={toc} title={locale === "fr" ? "Sur cette page" : "On this page"} />
              {aside}
            </div>
          </aside>
          <div className="min-w-0 space-y-16">{children}</div>
        </div>
      </Container>
    </div>
  );
}
