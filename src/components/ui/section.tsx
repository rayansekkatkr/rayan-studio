import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
};

export function Section({ as: Tag = "section", className, ...props }: SectionProps) {
  return <Tag className={cn("py-(--rs-section-space)", className)} {...props} />;
}
