import { describe, expect, it } from "vitest";
import { calculateInflation } from "@/lib/calc/inflation";

describe("calculateInflation — hand-computed worked examples", () => {
  it("₹1,00,000 @ 5% / 10 years", () => {
    const result = calculateInflation({ presentAmount: 100000, inflationRatePercent: 5, years: 10 });
    expect(result.value.futureCost).toBe(162889);
    expect(result.value.purchasingPowerLoss).toBe(62889);
  });

  it("₹1,00,000 @ 6% / 20 years", () => {
    const result = calculateInflation({ presentAmount: 100000, inflationRatePercent: 6, years: 20 });
    expect(result.value.futureCost).toBe(320714);
  });

  it("zero inflation: future cost equals present amount", () => {
    const result = calculateInflation({ presentAmount: 100000, inflationRatePercent: 0, years: 10 });
    expect(result.value.futureCost).toBe(100000);
    expect(result.value.purchasingPowerLoss).toBe(0);
  });
});

describe("calculateInflation — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateInflation({ presentAmount: 100000, inflationRatePercent: 5, years: 10 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
