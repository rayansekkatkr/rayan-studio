import { cn } from "@/lib/utils";

export function EditorialAccent({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("font-serif font-normal italic", className)} {...props} />;
}
