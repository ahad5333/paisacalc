import { describe, expect, it } from "vitest";
import { calculateSurfaceArea } from "@/lib/calc/surface-area";

describe("calculateSurfaceArea — worked example", () => {
  it("cube side 3", () => {
    const result = calculateSurfaceArea({ shape: "cube", a: 3, b: 0, height: 0 });
    expect(result.value.surfaceArea).toBe(54);
  });

  it("box 2x3x4", () => {
    const result = calculateSurfaceArea({ shape: "box", a: 2, b: 3, height: 4 });
    expect(result.value.surfaceArea).toBe(52);
  });
});

describe("calculateSurfaceArea — boundary cases", () => {
  it("sphere radius 3", () => {
    const result = calculateSurfaceArea({ shape: "sphere", a: 3, b: 0, height: 0 });
    expect(result.value.surfaceArea).toBeCloseTo(4 * Math.PI * 9, 3);
  });

  it("returns a full CalcResult with steps and a rules version", () => {
    const result = calculateSurfaceArea({ shape: "cube", a: 3, b: 0, height: 0 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
