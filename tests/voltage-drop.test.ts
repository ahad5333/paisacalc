import { describe, expect, it } from "vitest";
import { calculateVoltageDrop } from "@/lib/calc/voltage-drop";

describe("calculateVoltageDrop — worked example", () => {
  it("100ft of 12AWG at 10A, 120V source", () => {
    const result = calculateVoltageDrop({ gauge: "12", lengthFt: 100, currentAmps: 10, sourceVoltage: 120 });
    expect(result.value.voltageDrop).toBeCloseTo(3.176, 2);
    expect(result.value.voltageAtLoad).toBeLessThan(120);
  });
});

describe("calculateVoltageDrop — boundary cases", () => {
  it("a thinner gauge (higher resistance) has a larger voltage drop", () => {
    const thick = calculateVoltageDrop({ gauge: "10", lengthFt: 100, currentAmps: 10, sourceVoltage: 120 });
    const thin = calculateVoltageDrop({ gauge: "14", lengthFt: 100, currentAmps: 10, sourceVoltage: 120 });
    expect(thin.value.voltageDrop).toBeGreaterThan(thick.value.voltageDrop);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateVoltageDrop({ gauge: "12", lengthFt: 100, currentAmps: 10, sourceVoltage: 120 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
