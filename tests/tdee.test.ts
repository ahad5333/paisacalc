import { describe, expect, it } from "vitest";
import { calculateTdee } from "@/lib/calc/tdee";

describe("calculateTdee — worked example", () => {
  it("male, 30, 175cm, 70kg, moderate activity", () => {
    const result = calculateTdee({ sex: "male", age: 30, heightCm: 175, weightKg: 70, activityLevel: "moderate" });
    // BMR = 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75 -> round 1649
    expect(result.value.bmr).toBe(1649);
    expect(result.value.tdee).toBe(Math.round(1649 * 1.55));
  });
});

describe("calculateTdee — boundary cases", () => {
  it("returns all five activity levels, strictly increasing", () => {
    const result = calculateTdee({ sex: "female", age: 28, heightCm: 165, weightKg: 60, activityLevel: "sedentary" });
    expect(result.value.allLevels).toHaveLength(5);
    for (let i = 0; i < result.value.allLevels.length - 1; i++) {
      expect(result.value.allLevels[i + 1].calories).toBeGreaterThan(result.value.allLevels[i].calories);
    }
  });

  it("the selected level's calories match the corresponding row in allLevels", () => {
    const result = calculateTdee({ sex: "male", age: 40, heightCm: 180, weightKg: 85, activityLevel: "active" });
    const row = result.value.allLevels.find((r) => r.level === "active");
    expect(row?.calories).toBe(result.value.tdee);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateTdee({ sex: "male", age: 30, heightCm: 175, weightKg: 70, activityLevel: "moderate" });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
