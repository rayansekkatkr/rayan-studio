import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-none border px-3 py-1 text-xs font-black uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "border-[#2a231d]/14 bg-[#fffaf0]/84 text-[#d94f2b] shadow-[3px_3px_0_rgba(42,35,29,0.08)]",
        neutral: "border-[#2a231d]/14 bg-[#fffaf0]/76 text-[#63584d]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
