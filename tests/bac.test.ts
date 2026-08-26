import { describe, expect, it } from "vitest";
import { calculateBac } from "@/lib/calc/bac";

describe("calculateBac — worked example", () => {
  it("male, 80kg, 3 drinks, 2 hours elapsed", () => {
    const result = calculateBac({ sex: "male", weightKg: 80, standardDrinks: 3, hoursElapsed: 2 });
    expect(result.value.bac).toBeCloseTo(0.047, 2);
  });

  it("female, 60kg, 2 drinks, 1 hour elapsed", () => {
    const result = calculateBac({ sex: "female", weightKg: 60, standardDrinks: 2, hoursElapsed: 1 });
    expect(result.value.bac).toBeCloseTo(0.07, 2);
  });
});

describe("calculateBac — boundary cases", () => {
  it("zero drinks gives zero BAC", () => {
    const result = calculateBac({ sex: "male", weightKg: 80, standardDrinks: 0, hoursElapsed: 0 });
    expect(result.value.bac).toBe(0);
    expect(result.value.impairmentLevel).toBe("No alcohol detected");
  });

  it("BAC never goes negative even after a long elapsed time", () => {
    const result = calculateBac({ sex: "male", weightKg: 80, standardDrinks: 1, hoursElapsed: 20 });
    expect(result.value.bac).toBe(0);
  });

  it("a lower body weight gives a higher BAC for the same drinks", () => {
    const heavy = calculateBac({ sex: "male", weightKg: 100, standardDrinks: 3, hoursElapsed: 1 });
    const light = calculateBac({ sex: "male", weightKg: 60, standardDrinks: 3, hoursElapsed: 1 });
    expect(light.value.bac).toBeGreaterThan(heavy.value.bac);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBac({ sex: "male", weightKg: 80, standardDrinks: 3, hoursElapsed: 2 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
