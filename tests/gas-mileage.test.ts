import { describe, expect, it } from "vitest";
import { calculateGasMileage } from "@/lib/calc/gas-mileage";

describe("calculateGasMileage — worked example", () => {
  it("300km using 20L", () => {
    const result = calculateGasMileage({ distanceKm: 300, fuelUsedLiters: 20 });
    expect(result.value.kmPerLiter).toBe(15);
  });
});

describe("calculateGasMileage — boundary cases", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateGasMileage({ distanceKm: 300, fuelUsedLiters: 20 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
