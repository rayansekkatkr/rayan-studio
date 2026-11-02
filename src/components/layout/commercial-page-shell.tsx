import { SiteFooter } from "@/components/navigation/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CommercialPageShellProps = {
  locale: Locale;
  children: React.ReactNode;
  className?: string;
  headerTopTheme?: "light" | "dark";
  /** Passed to the header quote button, for pages that carry the quote form. */
  quoteHref?: string;
};

export function CommercialPageShell({
  locale,
  children,
  className,
  headerTopTheme = "dark",
  quoteHref,
}: CommercialPageShellProps) {
  return (
    <>
      <SiteHeader locale={locale} topTheme={headerTopTheme} quoteHref={quoteHref} />
      <main id="main-content" className={cn("min-h-screen bg-rs-bg text-rs-fg", className)}>
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
