import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-none border border-[#2a231d]/16 bg-[#fffaf0]/84 px-4 py-3 text-base text-[#17120f] placeholder:text-[#6f6355] ring-offset-background transition focus-visible:border-[#d94f2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d94f2b] focus-visible:ring-offset-1 focus-visible:shadow-[0_0_0_3px_rgba(217,79,43,0.14)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
