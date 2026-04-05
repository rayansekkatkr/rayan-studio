import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb4ff] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-[#d7e6ff] bg-[#2f6dff] text-white shadow-[0_14px_28px_rgba(47,109,255,0.34)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(47,109,255,0.4)]",
        outline:
          "border border-white/80 bg-white/75 text-slate-700 backdrop-blur-md hover:-translate-y-0.5 hover:bg-white",
        ghost: "text-slate-700 hover:bg-white/65",
        glass:
          "border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(232,243,255,0.7))] text-slate-800 backdrop-blur-xl hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
