"use client";

import { motion, useReducedMotion } from "framer-motion";

type FadeProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Fade({ children, className, delay = 0 }: FadeProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
