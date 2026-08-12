"use client";

import { cn } from "@/lib/utils";

type ProjectStepperProps = {
  currentStep: number;
  totalSteps: number;
  label: string;
};

export function ProjectStepper({ currentStep, totalSteps, label }: ProjectStepperProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-rs-muted" aria-live="polite">
        {label}
      </p>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-150",
              index < currentStep ? "bg-rs-accent" : "bg-[var(--rs-border)]",
            )}
          />
        ))}
      </div>
    </div>
  );
}
