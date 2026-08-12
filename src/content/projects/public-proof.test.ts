import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/content/projects";

const prohibited = [
  /\b\d+%/,
  /x\d+\s+(faster|plus rapide)/i,
  /increased conversion/i,
  /conversion augmentée/i,
  /thousands of users/i,
  /des milliers d'utilisateurs/i,
  /\b\d+\s*(users|utilisateurs|clients|customers)\b/i,
];

describe("public proof integrity", () => {
  for (const project of PROJECTS) {
    it(`${project.key} narrative copy contains no unsupported marketing metric`, () => {
      const narrative = JSON.stringify({
        summary: project.summary,
        challenge: project.challenge,
        solution: project.solution,
        outcome: project.outcome,
        productUx: project.productUx,
        capabilities: project.capabilities,
      });
      for (const pattern of prohibited) {
        expect(narrative, `${project.key} matches ${pattern}`).not.toMatch(pattern);
      }
    });
  }
});
