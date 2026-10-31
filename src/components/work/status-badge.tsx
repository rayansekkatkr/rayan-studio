import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { STATUS_TONE_CLASSES, projectStatusBadge, type StatusTone } from "./project-labels";

export function StatusPill({ tone, children, className }: { tone: StatusTone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-none px-3 py-1 text-xs font-semibold before:h-1.5 before:w-1.5 before:rounded-full before:content-['']",
        STATUS_TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ project, locale, suffix, className }: { project: ProjectRecord; locale: Locale; suffix?: string; className?: string }) {
  const badge = projectStatusBadge(project, locale);
  return (
    <StatusPill tone={badge.tone} className={className}>
      {badge.label}
      {suffix ? <span className="font-medium opacity-80">· {suffix}</span> : null}
    </StatusPill>
  );
}
