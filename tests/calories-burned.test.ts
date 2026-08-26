import { describe, expect, it } from "vitest";
import { calculateCaloriesBurned } from "@/lib/calc/calories-burned";

describe("calculateCaloriesBurned — worked example", () => {
  it("running, 75kg, 30 minutes", () => {
    const result = calculateCaloriesBurned({ activity: "running", weightKg: 75, durationMinutes: 30 });
    // (9.8 * 3.5 * 75 / 200) * 30 = 12.8625 * 30 = 385.875 -> 386
    expect(result.value.met).toBe(9.8);
    expect(result.value.caloriesBurned).toBe(386);
  });
});

describe("calculateCaloriesBurned — boundary cases", () => {
  it("a higher-MET activity burns more calories for the same weight and duration", () => {
    const yoga = calculateCaloriesBurned({ activity: "yoga", weightKg: 70, durationMinutes: 30 });
    const running = calculateCaloriesBurned({ activity: "running", weightKg: 70, durationMinutes: 30 });
    expect(running.value.caloriesBurned).toBeGreaterThan(yoga.value.caloriesBurned);
  });

  it("double the duration burns double the calories", () => {
    const short = calculateCaloriesBurned({ activity: "cycling", weightKg: 70, durationMinutes: 20 });
    const long = calculateCaloriesBurned({ activity: "cycling", weightKg: 70, durationMinutes: 40 });
    expect(long.value.caloriesBurned).toBe(short.value.caloriesBurned * 2);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateCaloriesBurned({ activity: "running", weightKg: 75, durationMinutes: 30 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
