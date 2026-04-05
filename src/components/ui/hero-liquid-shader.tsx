"use client";

import { Warp } from "@paper-design/shaders-react";
import { useReducedMotion } from "framer-motion";

export function HeroLiquidShader() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden [mask-image:radial-gradient(78%_70%_at_58%_35%,black_46%,transparent_100%)]"
    >
      <Warp
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.36,
          transform: "scale(1.14)",
          filter: "saturate(104%) contrast(102%) brightness(1.02)",
        }}
        proportion={0.5}
        softness={0.95}
        distortion={0.28}
        swirl={0.78}
        swirlIterations={12}
        shape="checks"
        shapeScale={0.12}
        scale={1}
        rotation={8}
        speed={0.42}
        colors={[
          "hsl(219, 100%, 78%)",
          "hsl(203, 100%, 94%)",
          "hsl(229, 100%, 72%)",
          "hsl(194, 100%, 86%)",
        ]}
      />
    </div>
  );
}
