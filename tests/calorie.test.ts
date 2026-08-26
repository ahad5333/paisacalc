import { describe, expect, it } from "vitest";
import { calculateCalorie } from "@/lib/calc/calorie";

describe("calculateCalorie — worked example", () => {
  it("male, 30, 175cm, 75kg, moderately active, goal: lose", () => {
    const result = calculateCalorie({
      sex: "male",
      age: 30,
      heightCm: 175,
      weightKg: 75,
      activityLevel: "moderate",
      goal: "lose",
    });
    expect(result.value.bmr).toBe(1699);
    expect(result.value.tdee).toBe(2633);
    expect(result.value.dailyCalorieTarget).toBe(2133);
    expect(result.value.weeklyWeightChangeKg).toBe(-0.45);
  });
});

describe("calculateCalorie — boundary cases", () => {
  it("maintain goal applies no adjustment — target equals TDEE", () => {
    const result = calculateCalorie({
      sex: "male",
      age: 30,
      heightCm: 175,
      weightKg: 75,
      activityLevel: "moderate",
      goal: "maintain",
    });
    expect(result.value.dailyCalorieTarget).toBe(result.value.tdee);
    expect(result.value.weeklyWeightChangeKg).toBe(0);
  });

  it("gain goal adds the surplus and gives a positive weekly change", () => {
    const result = calculateCalorie({
      sex: "male",
      age: 30,
      heightCm: 175,
      weightKg: 75,
      activityLevel: "moderate",
      goal: "gain",
    });
    expect(result.value.dailyCalorieTarget).toBe(result.value.tdee + 500);
    expect(result.value.weeklyWeightChangeKg).toBe(0.45);
  });

  it("a more active level produces a higher TDEE at the same BMR", () => {
    const sedentary = calculateCalorie({ sex: "female", age: 25, heightCm: 160, weightKg: 55, activityLevel: "sedentary", goal: "maintain" });
    const active = calculateCalorie({ sex: "female", age: 25, heightCm: 160, weightKg: 55, activityLevel: "active", goal: "maintain" });
    expect(active.value.tdee).toBeGreaterThan(sedentary.value.tdee);
    expect(active.value.bmr).toBe(sedentary.value.bmr);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateCalorie({
      sex: "male",
      age: 30,
      heightCm: 175,
      weightKg: 75,
      activityLevel: "moderate",
      goal: "lose",
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
