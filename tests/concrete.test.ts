import { describe, expect, it } from "vitest";
import { calculateConcrete } from "@/lib/calc/concrete";

describe("calculateConcrete — worked example", () => {
  it("10ft x 10ft slab, 4in deep", () => {
    const result = calculateConcrete({ lengthFt: 10, widthFt: 10, depthInches: 4 });
    expect(result.value.cubicFeet).toBeCloseTo(33.33, 1);
    expect(result.value.bags80lb).toBe(Math.ceil(33.33 / 0.6));
  });
});

describe("calculateConcrete — boundary cases", () => {
  it("60lb bags require more bags than 80lb bags for the same volume", () => {
    const result = calculateConcrete({ lengthFt: 10, widthFt: 10, depthInches: 4 });
    expect(result.value.bags60lb).toBeGreaterThan(result.value.bags80lb);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateConcrete({ lengthFt: 10, widthFt: 10, depthInches: 4 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
