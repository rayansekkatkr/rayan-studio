import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return { ...actual, useReducedMotion: () => true };
});

import { Fade } from "@/components/motion/fade";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";

it("renders reveal content when reduced motion is enabled", () => {
  render(
    <Reveal>
      <span>Visible proof</span>
    </Reveal>,
  );
  expect(screen.getByText("Visible proof")).toBeInTheDocument();
});

it("renders fade and stagger content when reduced motion is enabled", () => {
  render(
    <Stagger>
      <Fade>
        <span>Faded proof</span>
      </Fade>
    </Stagger>,
  );
  expect(screen.getByText("Faded proof")).toBeInTheDocument();
});
