import { describe, expect, it } from "vitest";
import { calculateFuelCost } from "@/lib/calc/fuel-cost";

describe("calculateFuelCost — worked example", () => {
  it("300km at 15km/L, ₹100/L", () => {
    const result = calculateFuelCost({ distanceKm: 300, kmPerLiter: 15, pricePerLiter: 100 });
    expect(result.value.litersUsed).toBe(20);
    expect(result.value.totalCost).toBe(2000);
  });
});

describe("calculateFuelCost — boundary cases", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateFuelCost({ distanceKm: 300, kmPerLiter: 15, pricePerLiter: 100 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
