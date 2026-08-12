"use client";

import { cn } from "@/lib/utils";

type FormStatusProps = {
  state: "idle" | "sending" | "success" | "error";
  message: string;
};

export function FormStatus({ state, message }: FormStatusProps) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        "min-h-[1.5rem] text-sm font-medium",
        state === "error" && "text-red-700",
        state === "success" && "text-emerald-700",
        state === "sending" && "text-rs-muted",
      )}
    >
      {message}
      {state === "error" ? <span aria-hidden> ⚠</span> : null}
      {state === "success" ? <span aria-hidden> ✓</span> : null}
    </p>
  );
}
