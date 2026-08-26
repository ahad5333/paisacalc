import { describe, expect, it } from "vitest";
import { calculateBtu } from "@/lib/calc/btu";

describe("calculateBtu — worked example", () => {
  it("300 sq ft, moderate climate, 2 occupants, not sunny", () => {
    const result = calculateBtu({ squareFeet: 300, climateZone: "moderate", occupants: 2, sunnyRoom: false });
    expect(result.value.btu).toBe(9000);
  });
});

describe("calculateBtu — boundary cases", () => {
  it("a hotter climate requires more BTU for the same area", () => {
    const mild = calculateBtu({ squareFeet: 300, climateZone: "mild", occupants: 2, sunnyRoom: false });
    const hot = calculateBtu({ squareFeet: 300, climateZone: "hot", occupants: 2, sunnyRoom: false });
    expect(hot.value.btu).toBeGreaterThan(mild.value.btu);
  });

  it("a sunny room requires more BTU than a non-sunny one", () => {
    const notSunny = calculateBtu({ squareFeet: 300, climateZone: "moderate", occupants: 2, sunnyRoom: false });
    const sunny = calculateBtu({ squareFeet: 300, climateZone: "moderate", occupants: 2, sunnyRoom: true });
    expect(sunny.value.btu).toBeGreaterThan(notSunny.value.btu);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBtu({ squareFeet: 300, climateZone: "moderate", occupants: 2, sunnyRoom: false });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
