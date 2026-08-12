"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ParallaxMediaProps = {
  children: React.ReactNode;
  className?: string;
  /** Maximum translation in px; clamped to 40 desktop / 16 mobile. */
  strength?: number;
  isMobile?: boolean;
};

export function ParallaxMedia({ children, className, strength, isMobile = false }: ParallaxMediaProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const cap = isMobile ? 16 : 40;
  const distance = Math.min(strength ?? cap, cap);
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
