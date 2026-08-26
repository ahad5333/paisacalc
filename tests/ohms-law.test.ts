import { describe, expect, it } from "vitest";
import { calculateOhmsLaw } from "@/lib/calc/ohms-law";

describe("calculateOhmsLaw — worked example", () => {
  it("I=2A, R=5Ω -> V=10V", () => {
    const result = calculateOhmsLaw({ voltage: 0, current: 2, resistance: 5, unknown: "voltage" });
    expect(result.value.result).toBe(10);
  });
});

describe("calculateOhmsLaw — boundary cases", () => {
  it("solving for resistance reverses solving for voltage", () => {
    const voltage = calculateOhmsLaw({ voltage: 0, current: 2, resistance: 5, unknown: "voltage" });
    const resistance = calculateOhmsLaw({ voltage: voltage.value.result, current: 2, resistance: 0, unknown: "resistance" });
    expect(resistance.value.result).toBe(5);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateOhmsLaw({ voltage: 0, current: 2, resistance: 5, unknown: "voltage" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
