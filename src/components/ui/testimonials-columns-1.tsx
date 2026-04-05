"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type TestimonialsColumnItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export function TestimonialsColumn(props: {
  className?: string;
  testimonials: TestimonialsColumnItem[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 12,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {[0, 1].map((dupIndex) => (
          <div key={dupIndex} className="flex flex-col gap-4">
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <article
                key={`${dupIndex}-${i}-${name}`}
                className={cn(
                  "w-full max-w-xs rounded-3xl border border-white/90",
                  "bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(229,241,255,0.72))]",
                  "p-5 shadow-[0_18px_30px_rgba(123,157,217,0.2)] backdrop-blur-xl",
                )}
              >
                <p className="text-sm leading-relaxed text-slate-700">“{text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white/80"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold leading-5 text-slate-900">{name}</p>
                    <p className="text-xs leading-5 text-slate-500">{role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
