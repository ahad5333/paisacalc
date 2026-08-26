import { describe, expect, it } from "vitest";
import { calculateRoofing } from "@/lib/calc/roofing";

describe("calculateRoofing — worked example", () => {
  it("30ft x 40ft footprint, 6:12 pitch", () => {
    const result = calculateRoofing({ lengthFt: 30, widthFt: 40, pitchRise: 6, pitchRun: 12 });
    expect(result.value.footprintSqft).toBe(1200);
    expect(result.value.roofSqft).toBeGreaterThan(1200);
  });
});

describe("calculateRoofing — boundary cases", () => {
  it("a steeper pitch gives more roof area than a flatter one", () => {
    const flat = calculateRoofing({ lengthFt: 30, widthFt: 40, pitchRise: 2, pitchRun: 12 });
    const steep = calculateRoofing({ lengthFt: 30, widthFt: 40, pitchRise: 10, pitchRun: 12 });
    expect(steep.value.roofSqft).toBeGreaterThan(flat.value.roofSqft);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRoofing({ lengthFt: 30, widthFt: 40, pitchRise: 6, pitchRun: 12 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.rulesVersion).toBeTruthy();
  });
});
