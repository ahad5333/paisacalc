import { describe, expect, it } from "vitest";
import { calculateTireSize } from "@/lib/calc/tire-size";

describe("calculateTireSize — worked example", () => {
  it("225/45R17", () => {
    const result = calculateTireSize({ widthMm: 225, aspectRatioPct: 45, rimDiameterIn: 17 });
    expect(result.value.sidewallHeightMm).toBeCloseTo(101.25, 1);
    expect(result.value.overallDiameterIn).toBeGreaterThan(17);
  });
});

describe("calculateTireSize — boundary cases", () => {
  it("a larger rim diameter increases overall diameter", () => {
    const small = calculateTireSize({ widthMm: 225, aspectRatioPct: 45, rimDiameterIn: 16 });
    const large = calculateTireSize({ widthMm: 225, aspectRatioPct: 45, rimDiameterIn: 18 });
    expect(large.value.overallDiameterIn).toBeGreaterThan(small.value.overallDiameterIn);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateTireSize({ widthMm: 225, aspectRatioPct: 45, rimDiameterIn: 17 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
