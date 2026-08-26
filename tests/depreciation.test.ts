import { describe, expect, it } from "vitest";
import { calculateDepreciation } from "@/lib/calc/depreciation";

describe("calculateDepreciation — worked example", () => {
  it("₹10L asset, 15% WDV rate, 15-year SLM life, 5% salvage, 5 years elapsed", () => {
    const result = calculateDepreciation({
      assetCost: 1000000,
      wdvRatePercent: 15,
      slmUsefulLifeYears: 15,
      salvageValuePercent: 5,
      yearsElapsed: 5,
    });
    expect(result.value.slmAnnualDepreciation).toBe(63333);
    expect(result.value.slmAccumulatedDepreciation).toBe(316665);
    expect(result.value.slmBookValue).toBe(683335);
    expect(result.value.wdvAccumulatedDepreciation).toBe(556295);
    expect(result.value.wdvBookValue).toBe(443705);
  });

  it("WDV front-loads depreciation — its book value is lower than SLM's at the same point", () => {
    const result = calculateDepreciation({
      assetCost: 1000000,
      wdvRatePercent: 15,
      slmUsefulLifeYears: 15,
      salvageValuePercent: 5,
      yearsElapsed: 5,
    });
    expect(result.value.wdvBookValue).toBeLessThan(result.value.slmBookValue);
  });
});

describe("calculateDepreciation — boundary cases", () => {
  it("SLM depreciation never reduces book value below the salvage value", () => {
    const result = calculateDepreciation({
      assetCost: 500000,
      wdvRatePercent: 15,
      slmUsefulLifeYears: 10,
      salvageValuePercent: 10,
      yearsElapsed: 20,
    });
    expect(result.value.slmBookValue).toBe(50000);
  });

  it("WDV book value stays positive even after many years — it approaches but never reaches zero", () => {
    const result = calculateDepreciation({
      assetCost: 500000,
      wdvRatePercent: 15,
      slmUsefulLifeYears: 10,
      salvageValuePercent: 10,
      yearsElapsed: 30,
    });
    expect(result.value.wdvBookValue).toBeGreaterThan(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDepreciation({
      assetCost: 1000000,
      wdvRatePercent: 15,
      slmUsefulLifeYears: 15,
      salvageValuePercent: 5,
      yearsElapsed: 5,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
