"use client";

import { Warp } from "@paper-design/shaders-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroLiquidShader() {
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion || isMobile) {
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
          opacity: 0.28,
          transform: "scale(1.14)",
          filter: "saturate(102%) contrast(101%) brightness(1.01)",
        }}
        proportion={0.5}
        softness={0.95}
        distortion={0.22}
        swirl={0.6}
        swirlIterations={8}
        shape="checks"
        shapeScale={0.12}
        scale={1}
        rotation={8}
        speed={0.28}
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
