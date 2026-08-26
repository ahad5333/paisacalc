import { describe, expect, it } from "vitest";
import { calculateBodyFat } from "@/lib/calc/body-fat";

describe("calculateBodyFat — worked examples", () => {
  it("male, 175cm, neck 38cm, waist 85cm", () => {
    const result = calculateBodyFat({ sex: "male", heightCm: 175, neckCm: 38, waistCm: 85, hipCm: 0 });
    expect(result.value.bodyFatPercent).toBe(17);
    expect(result.value.category).toBe("average");
  });

  it("female, 162cm, neck 32cm, waist 75cm, hip 98cm", () => {
    const result = calculateBodyFat({ sex: "female", heightCm: 162, neckCm: 32, waistCm: 75, hipCm: 98 });
    expect(result.value.bodyFatPercent).toBe(30);
    expect(result.value.category).toBe("average");
  });
});

describe("calculateBodyFat — boundary cases", () => {
  it("a larger waist-to-neck gap increases body fat percentage for men", () => {
    const lean = calculateBodyFat({ sex: "male", heightCm: 175, neckCm: 40, waistCm: 80, hipCm: 0 });
    const heavier = calculateBodyFat({ sex: "male", heightCm: 175, neckCm: 38, waistCm: 100, hipCm: 0 });
    expect(heavier.value.bodyFatPercent).toBeGreaterThan(lean.value.bodyFatPercent);
  });

  it("male and female use different formulas — hip only matters for female", () => {
    const male1 = calculateBodyFat({ sex: "male", heightCm: 175, neckCm: 38, waistCm: 85, hipCm: 90 });
    const male2 = calculateBodyFat({ sex: "male", heightCm: 175, neckCm: 38, waistCm: 85, hipCm: 120 });
    expect(male1.value.bodyFatPercent).toBe(male2.value.bodyFatPercent);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBodyFat({ sex: "male", heightCm: 175, neckCm: 38, waistCm: 85, hipCm: 0 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
