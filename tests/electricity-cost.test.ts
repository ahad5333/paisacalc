import { describe, expect, it } from "vitest";
import { calculateElectricityCost } from "@/lib/calc/electricity-cost";

describe("calculateElectricityCost — worked example", () => {
  it("1000W appliance, 5 hours/day, ₹8/kWh", () => {
    const result = calculateElectricityCost({ watts: 1000, hoursPerDay: 5, costPerKwh: 8 });
    expect(result.value.kwhPerDay).toBe(5);
    expect(result.value.costPerDay).toBe(40);
  });
});

describe("calculateElectricityCost — boundary cases", () => {
  it("monthly cost is roughly 30x the daily cost", () => {
    const result = calculateElectricityCost({ watts: 1000, hoursPerDay: 5, costPerKwh: 8 });
    expect(result.value.costPerMonth).toBe(result.value.costPerDay * 30);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateElectricityCost({ watts: 1000, hoursPerDay: 5, costPerKwh: 8 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
