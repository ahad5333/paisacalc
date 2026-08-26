import { describe, expect, it } from "vitest";
import { calculateBodySurfaceArea } from "@/lib/calc/body-surface-area";

describe("calculateBodySurfaceArea — worked example", () => {
  it("175cm, 75kg", () => {
    const result = calculateBodySurfaceArea({ heightCm: 175, weightKg: 75 });
    expect(result.value.mosteller).toBe(1.91);
    expect(result.value.dubois).toBe(1.9);
  });
});

describe("calculateBodySurfaceArea — boundary cases", () => {
  it("both formulas agree within a small margin", () => {
    const result = calculateBodySurfaceArea({ heightCm: 165, weightKg: 60 });
    expect(Math.abs(result.value.mosteller - result.value.dubois)).toBeLessThan(0.1);
  });

  it("a taller, heavier person has a larger BSA", () => {
    const small = calculateBodySurfaceArea({ heightCm: 160, weightKg: 55 });
    const large = calculateBodySurfaceArea({ heightCm: 190, weightKg: 95 });
    expect(large.value.mosteller).toBeGreaterThan(small.value.mosteller);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBodySurfaceArea({ heightCm: 175, weightKg: 75 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
