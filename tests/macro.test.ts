import { describe, expect, it } from "vitest";
import { calculateMacro } from "@/lib/calc/macro";

describe("calculateMacro — worked example", () => {
  it("balanced plan grams roughly reconstruct the calorie target", () => {
    const result = calculateMacro({
      sex: "male",
      age: 30,
      heightCm: 175,
      weightKg: 75,
      activityLevel: "moderate",
      goal: "maintain",
      plan: "balanced",
    });
    const { dailyCalorieTarget, proteinG, carbG, fatG } = result.value;
    const reconstructed = proteinG * 4 + carbG * 4 + fatG * 9;
    expect(Math.abs(reconstructed - dailyCalorieTarget)).toBeLessThan(15);
  });
});

describe("calculateMacro — boundary cases", () => {
  it("low-carb plan gives fewer carb grams and more fat grams than balanced", () => {
    const inputs = { sex: "male" as const, age: 30, heightCm: 175, weightKg: 75, activityLevel: "moderate" as const, goal: "maintain" as const };
    const balanced = calculateMacro({ ...inputs, plan: "balanced" });
    const lowCarb = calculateMacro({ ...inputs, plan: "lowCarb" });
    expect(lowCarb.value.carbG).toBeLessThan(balanced.value.carbG);
    expect(lowCarb.value.fatG).toBeGreaterThan(balanced.value.fatG);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateMacro({ sex: "male", age: 30, heightCm: 175, weightKg: 75, activityLevel: "moderate", goal: "maintain", plan: "balanced" });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
