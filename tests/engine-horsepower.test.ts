import { describe, expect, it } from "vitest";
import { calculateEngineHorsepower } from "@/lib/calc/engine-horsepower";

describe("calculateEngineHorsepower — worked example", () => {
  it("3200 lbs at 100 mph trap speed", () => {
    const result = calculateEngineHorsepower({ weightLbs: 3200, trapSpeedMph: 100 });
    expect(result.value.horsepower).toBeCloseTo(3200 * Math.pow(100 / 234, 3), 1);
  });
});

describe("calculateEngineHorsepower — boundary cases", () => {
  it("a higher trap speed for the same weight means more horsepower", () => {
    const slow = calculateEngineHorsepower({ weightLbs: 3200, trapSpeedMph: 90 });
    const fast = calculateEngineHorsepower({ weightLbs: 3200, trapSpeedMph: 110 });
    expect(fast.value.horsepower).toBeGreaterThan(slow.value.horsepower);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateEngineHorsepower({ weightLbs: 3200, trapSpeedMph: 100 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
