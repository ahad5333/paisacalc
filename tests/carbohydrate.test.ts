import { describe, expect, it } from "vitest";
import { calculateCarbohydrate } from "@/lib/calc/carbohydrate";

describe("calculateCarbohydrate — worked example", () => {
  it("low bound is 45% of calories, high bound is 65%, at 4 kcal/g", () => {
    const result = calculateCarbohydrate({ sex: "male", age: 30, heightCm: 175, weightKg: 75, activityLevel: "moderate", goal: "maintain" });
    const { dailyCalorieTarget, carbLowG, carbHighG } = result.value;
    expect(carbLowG).toBe(Math.round((dailyCalorieTarget * 0.45) / 4));
    expect(carbHighG).toBe(Math.round((dailyCalorieTarget * 0.65) / 4));
  });
});

describe("calculateCarbohydrate — boundary cases", () => {
  it("high bound exceeds low bound", () => {
    const result = calculateCarbohydrate({ sex: "female", age: 25, heightCm: 165, weightKg: 60, activityLevel: "light", goal: "lose" });
    expect(result.value.carbHighG).toBeGreaterThan(result.value.carbLowG);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateCarbohydrate({ sex: "male", age: 30, heightCm: 175, weightKg: 75, activityLevel: "moderate", goal: "maintain" });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
