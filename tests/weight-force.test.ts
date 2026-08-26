import { describe, expect, it } from "vitest";
import { calculateWeightForce } from "@/lib/calc/weight-force";

describe("calculateWeightForce — worked example", () => {
  it("70kg on Earth", () => {
    const result = calculateWeightForce({ massKg: 70 });
    expect(result.value.weightEarthN).toBeCloseTo(686.49, 1);
  });
});

describe("calculateWeightForce — boundary cases", () => {
  it("weight on the Moon is much less than on Earth", () => {
    const result = calculateWeightForce({ massKg: 70 });
    expect(result.value.weightMoonN).toBeLessThan(result.value.weightEarthN);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateWeightForce({ massKg: 70 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
