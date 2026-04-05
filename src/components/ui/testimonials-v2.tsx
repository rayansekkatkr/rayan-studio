"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

function TestimonialsColumn({
  items,
  duration = 16,
  className,
}: {
  items: TestimonialItem[];
  duration?: number;
  className?: string;
}) {
  return (
    <div className={cn("w-full max-w-xs", className)}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="m-0 flex list-none flex-col gap-4 pb-4 p-0"
      >
        {[0, 1].map((dupIndex) => (
          <li key={dupIndex} aria-hidden={dupIndex === 1}>
            <ul className="m-0 list-none space-y-4 p-0">
              {items.map((item, itemIndex) => (
                <motion.li
                  key={`${dupIndex}-${itemIndex}-${item.name}`}
                  whileHover={{
                    y: -6,
                    scale: 1.012,
                    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="rounded-3xl border border-white/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(229,241,255,0.72))] p-5 shadow-[0_18px_30px_rgba(123,157,217,0.2)] backdrop-blur-xl"
                >
                  <p className="text-sm leading-relaxed text-slate-700">“{item.text}”</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/80">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export function TestimonialsV2({ items }: { items: TestimonialItem[] }) {
  const first = items.slice(0, 3);
  const second = items.slice(3, 6);
  const third = items.slice(6, 9);

  return (
    <div className="relative mt-8 overflow-hidden rounded-[34px] border border-white/85 bg-[linear-gradient(145deg,rgba(255,255,255,0.87),rgba(227,240,255,0.68))] p-4 shadow-[0_34px_56px_rgba(122,157,220,0.24)] md:p-6">
      <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-[#9fc4ff]/36 blur-[80px]" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-white/54 blur-[92px]" />

      <div className="relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <div className="max-h-[520px] overflow-hidden">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialsColumn items={first} duration={15.5} />
            <TestimonialsColumn items={second} duration={18} className="hidden md:block" />
            <TestimonialsColumn items={third} duration={16.8} className="hidden lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}
