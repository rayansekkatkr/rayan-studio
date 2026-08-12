import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Container } from "@/components/ui/container";
import { EditorialAccent } from "@/components/ui/editorial-accent";
import { Section } from "@/components/ui/section";

it("renders semantic layout primitives without forcing client state", () => {
  render(
    <Section as="section" id="proof">
      <Container>
        <h2>
          Build <EditorialAccent>better</EditorialAccent>
        </h2>
      </Container>
    </Section>,
  );

  expect(screen.getByRole("heading", { name: "Build better" })).toBeInTheDocument();
  expect(document.getElementById("proof")).toBeInTheDocument();
});
