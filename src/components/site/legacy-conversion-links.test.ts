import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// These preserved acquisition components are still reachable in production
// (local SEO landings and legacy service pages). They must not point at
// homepage anchors that no longer exist after the redesign cutover.
const REACHABLE_LEGACY_COMPONENTS = [
  "src/components/site/ServiceSeoPage.tsx",
  "src/components/site/LocalSeoLanding.tsx",
  "src/components/site/Navbar.tsx",
  "src/components/site/Footer.tsx",
];

describe("legacy conversion link compatibility", () => {
  for (const file of REACHABLE_LEGACY_COMPONENTS) {
    it(`${file} does not link to removed homepage anchors`, () => {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source, `${file} still links #contact`).not.toMatch(/#contact/);
      expect(source, `${file} still links #tarifs`).not.toMatch(/#tarifs/);
    });
  }
});
