import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-black ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d94f2b] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-[#17120f] bg-[#17120f] text-[#fffaf0] shadow-[5px_5px_0_rgba(217,79,43,0.68)] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_rgba(217,79,43,0.68)]",
        outline:
          "border border-[#2a231d]/18 bg-[#fffaf0]/78 text-[#17120f] backdrop-blur-md hover:-translate-y-0.5 hover:bg-[#fffaf0]",
        ghost: "text-[#63584d] hover:bg-[#fffaf0]/75",
        glass:
          "border border-[#2a231d]/16 bg-[linear-gradient(135deg,rgba(255,250,240,0.94),rgba(232,224,210,0.74))] text-[#17120f] backdrop-blur-xl hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-none",
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
