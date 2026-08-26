import { describe, expect, it } from "vitest";
import { calculateFat } from "@/lib/calc/fat";

describe("calculateFat — worked example", () => {
  it("low bound is 20% of calories, high bound is 35%, at 9 kcal/g", () => {
    const result = calculateFat({ sex: "male", age: 30, heightCm: 175, weightKg: 75, activityLevel: "moderate", goal: "maintain" });
    const { dailyCalorieTarget, fatLowG, fatHighG } = result.value;
    expect(fatLowG).toBe(Math.round((dailyCalorieTarget * 0.2) / 9));
    expect(fatHighG).toBe(Math.round((dailyCalorieTarget * 0.35) / 9));
  });

  it("saturated fat cap is 10% of calories, always below total fat low bound", () => {
    const result = calculateFat({ sex: "male", age: 30, heightCm: 175, weightKg: 75, activityLevel: "moderate", goal: "maintain" });
    expect(result.value.saturatedFatCapG).toBeLessThan(result.value.fatLowG);
  });
});

describe("calculateFat — boundary cases", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateFat({ sex: "female", age: 25, heightCm: 165, weightKg: 60, activityLevel: "light", goal: "lose" });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
