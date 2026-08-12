"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

type TrackedLinkProps = React.ComponentProps<typeof Link> & {
  event: {
    ctaId: string;
    source: string;
    destination: string;
    locale: Locale;
  };
};

export function TrackedLink({ event, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        trackEvent("cta_click", {
          cta_id: event.ctaId,
          source: event.source,
          destination: event.destination,
          locale: event.locale,
        });
        onClick?.(clickEvent);
      }}
    />
  );
}
