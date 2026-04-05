import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-2xl border border-white/85 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 ring-offset-background transition focus-visible:border-[#9ec0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb4ff] focus-visible:ring-offset-1 focus-visible:shadow-[0_0_0_3px_rgba(143,180,255,0.15)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
