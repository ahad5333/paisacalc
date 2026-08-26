import { describe, expect, it } from "vitest";
import { calculateProtein } from "@/lib/calc/protein";

describe("calculateProtein — worked example", () => {
  it("75kg, moderate activity, maintain", () => {
    const result = calculateProtein({ weightKg: 75, activityLevel: "moderate", goal: "maintain" });
    expect(result.value.gramsPerKg).toBe(1.4);
    expect(result.value.proteinG).toBe(105);
    expect(result.value.proteinCalories).toBe(420);
  });
});

describe("calculateProtein — boundary cases", () => {
  it("higher activity level recommends more protein per kg", () => {
    const sedentary = calculateProtein({ weightKg: 75, activityLevel: "sedentary", goal: "maintain" });
    const veryActive = calculateProtein({ weightKg: 75, activityLevel: "veryActive", goal: "maintain" });
    expect(veryActive.value.gramsPerKg).toBeGreaterThan(sedentary.value.gramsPerKg);
  });

  it("a weight-loss or muscle-building goal adds to the maintenance rate", () => {
    const maintain = calculateProtein({ weightKg: 75, activityLevel: "moderate", goal: "maintain" });
    const lose = calculateProtein({ weightKg: 75, activityLevel: "moderate", goal: "lose" });
    expect(lose.value.gramsPerKg).toBeGreaterThan(maintain.value.gramsPerKg);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateProtein({ weightKg: 75, activityLevel: "moderate", goal: "maintain" });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
