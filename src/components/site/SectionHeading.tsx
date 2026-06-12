import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Badge>{eyebrow}</Badge>
      <h2 className="font-display mt-5 text-3xl font-semibold leading-tight text-[#17120f] md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[#63584d] md:text-lg">{description}</p>
    </div>
  );
}
