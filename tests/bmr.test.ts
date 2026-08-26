import { describe, expect, it } from "vitest";
import { calculateBmr } from "@/lib/calc/bmr";

describe("calculateBmr — worked examples", () => {
  it("male, 30, 175cm, 75kg", () => {
    const result = calculateBmr({ sex: "male", age: 30, heightCm: 175, weightKg: 75 });
    // 10*75 + 6.25*175 - 5*30 + 5 = 750 + 1093.75 - 150 + 5 = 1698.75 -> 1699
    expect(result.value.bmr).toBe(1699);
  });

  it("female, 30, 165cm, 60kg", () => {
    const result = calculateBmr({ sex: "female", age: 30, heightCm: 165, weightKg: 60 });
    // 10*60 + 6.25*165 - 5*30 - 161 = 600 + 1031.25 - 150 - 161 = 1320.25 -> 1320
    expect(result.value.bmr).toBe(1320);
  });
});

describe("calculateBmr — boundary cases", () => {
  it("male and female differ by exactly 166 at identical inputs (the +5 vs -161 offset)", () => {
    const male = calculateBmr({ sex: "male", age: 40, heightCm: 170, weightKg: 70 });
    const female = calculateBmr({ sex: "female", age: 40, heightCm: 170, weightKg: 70 });
    expect(male.value.bmr - female.value.bmr).toBe(166);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBmr({ sex: "male", age: 30, heightCm: 175, weightKg: 75 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
