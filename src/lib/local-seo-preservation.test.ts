import { describe, expect, it } from "vitest";
import { getAllLocalSeoCombos, localSeoCities, localSeoSectors } from "@/lib/local-seo";

describe("local SEO preservation contract", () => {
  it("keeps exactly 7 sectors and 10 cities for 70 acquisition pages", () => {
    expect(localSeoSectors).toHaveLength(7);
    expect(localSeoCities).toHaveLength(10);
    expect(getAllLocalSeoCombos()).toHaveLength(70);
  });

  it("keeps every sector/city pair unique", () => {
    const paths = getAllLocalSeoCombos().map(
      ({ sector, city }) => `/site/${sector.slug}/${city.slug}`,
    );
    expect(new Set(paths).size).toBe(70);
  });
});
