"use client";

import { motion, useReducedMotion } from "framer-motion";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  interval?: number;
};

export function Stagger({ children, className, interval = 0.08 }: StaggerProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: interval } },
      }}
    >
      {children}
    </motion.div>
  );
}
