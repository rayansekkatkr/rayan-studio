"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
                  "w-full max-w-xs rounded-none border border-[#2a231d]/14",
                  "bg-[linear-gradient(145deg,rgba(255,250,240,0.94),rgba(239,231,217,0.74))]",
                  "p-5 shadow-[6px_6px_0_rgba(42,35,29,0.08)] backdrop-blur-xl",
                )}
              >
                <p className="text-sm leading-relaxed text-[#63584d]">“{text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-none object-cover ring-2 ring-[#fffaf0]/80"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-black leading-5 text-[#17120f]">{name}</p>
                    <p className="text-xs leading-5 text-[#8a7d6f]">{role}</p>
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
