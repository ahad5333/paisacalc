import { describe, expect, it } from "vitest";
import { calculateBmi } from "@/lib/calc/bmi";

describe("calculateBmi — worked example", () => {
  it("170cm, 65kg", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 65 });
    // 65 / 1.7^2 = 65 / 2.89 = 22.4913... -> 22.5
    expect(result.value.bmi).toBe(22.5);
    expect(result.value.band).toBe("normal");
  });
});

describe("calculateBmi — boundary cases", () => {
  it("uses the Asian cutoffs, not the higher Western ones", () => {
    // 23 falls in the "overweight" band under Asian cutoffs (23-24.9),
    // but would still be "normal" under the Western 18.5-24.9 band —
    // this is the whole point of using the Asian thresholds.
    const result = calculateBmi({ heightCm: 170, weightKg: 66.5 });
    expect(result.value.bmi).toBe(23);
    expect(result.value.band).toBe("overweight");
  });

  it("just under 18.5 is underweight", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 53 });
    expect(result.value.bmi).toBeLessThan(18.5);
    expect(result.value.band).toBe("underweight");
  });

  it("25 and above is obese", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 72.5 });
    expect(result.value.bmi).toBe(25.1);
    expect(result.value.band).toBe("obese");
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBmi({ heightCm: 170, weightKg: 65 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
