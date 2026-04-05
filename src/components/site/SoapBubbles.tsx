"use client";

import { motion, useReducedMotion } from "framer-motion";

type Bubble = {
  left: string;
  top: string;
  size: number;
  drift: number;
  duration: number;
  delay: number;
  opacity: number;
};

type SoapBubblesProps = {
  className?: string;
  bubbles?: Bubble[];
  variant?: "hero" | "ambient";
};

const heroBubbles: Bubble[] = [
  { left: "8%", top: "18%", size: 110, drift: 22, duration: 15, delay: 0.2, opacity: 0.5 },
  { left: "17%", top: "62%", size: 78, drift: 18, duration: 13.5, delay: 1.2, opacity: 0.45 },
  { left: "36%", top: "14%", size: 62, drift: 14, duration: 11.8, delay: 0.6, opacity: 0.4 },
  { left: "48%", top: "74%", size: 124, drift: 26, duration: 16.2, delay: 1.5, opacity: 0.56 },
  { left: "64%", top: "20%", size: 88, drift: 20, duration: 14.1, delay: 0.8, opacity: 0.44 },
  { left: "78%", top: "58%", size: 140, drift: 24, duration: 17.2, delay: 0.4, opacity: 0.5 },
  { left: "86%", top: "28%", size: 66, drift: 13, duration: 10.9, delay: 1.3, opacity: 0.35 },
  { left: "27%", top: "42%", size: 96, drift: 19, duration: 12.8, delay: 0.9, opacity: 0.48 },
  { left: "55%", top: "46%", size: 52, drift: 12, duration: 10.1, delay: 1.7, opacity: 0.34 },
  { left: "70%", top: "82%", size: 74, drift: 17, duration: 12.4, delay: 0.5, opacity: 0.42 },
  { left: "6%", top: "78%", size: 58, drift: 13, duration: 9.8, delay: 1.1, opacity: 0.36 },
  { left: "92%", top: "76%", size: 94, drift: 21, duration: 15.1, delay: 1.9, opacity: 0.47 },
];

const ambientBubbles: Bubble[] = [
  { left: "4%", top: "12%", size: 54, drift: 12, duration: 14, delay: 0.3, opacity: 0.28 },
  { left: "22%", top: "30%", size: 38, drift: 9, duration: 11.6, delay: 0.9, opacity: 0.2 },
  { left: "41%", top: "65%", size: 62, drift: 13, duration: 16.2, delay: 0.4, opacity: 0.24 },
  { left: "58%", top: "18%", size: 34, drift: 8, duration: 10.8, delay: 1.1, opacity: 0.22 },
  { left: "73%", top: "52%", size: 58, drift: 12, duration: 15.2, delay: 0.7, opacity: 0.26 },
  { left: "87%", top: "28%", size: 46, drift: 10, duration: 13.1, delay: 1.5, opacity: 0.23 },
  { left: "12%", top: "82%", size: 40, drift: 9, duration: 12.3, delay: 0.5, opacity: 0.2 },
  { left: "90%", top: "78%", size: 66, drift: 14, duration: 16.5, delay: 0.2, opacity: 0.28 },
];

export function SoapBubbles({
  className = "",
  bubbles,
  variant = "hero",
}: SoapBubblesProps) {
  const reducedMotion = useReducedMotion();
  const resolvedBubbles = bubbles ?? (variant === "hero" ? heroBubbles : ambientBubbles);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {resolvedBubbles.map((bubble, index) => (
        <motion.div
          key={`${bubble.left}-${bubble.top}-${index}`}
          className="soap-bubble"
          style={{
            left: bubble.left,
            top: bubble.top,
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.opacity,
            willChange: "transform",
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -bubble.drift, 0, bubble.drift * 0.6, 0],
                  x: [0, bubble.drift * 0.35, -bubble.drift * 0.24, 0],
                  scale: [1, 1.06, 0.96, 1],
                }
          }
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
}
