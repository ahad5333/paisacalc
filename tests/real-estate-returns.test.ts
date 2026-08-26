import { describe, expect, it } from "vitest";
import { calculateRealEstateReturns } from "@/lib/calc/real-estate-returns";

describe("calculateRealEstateReturns — worked example", () => {
  it("₹60L property, 7% buying cost, 2% selling cost, 8% appreciation, 5-year hold", () => {
    const result = calculateRealEstateReturns({
      purchasePrice: 6000000,
      buyingCostPercent: 7,
      sellingCostPercent: 2,
      appreciationPercent: 8,
      holdingYears: 5,
    });
    expect(result.value.totalBuyCost).toBe(6420000);
    expect(result.value.saleValue).toBe(8815968);
    expect(result.value.netSaleProceeds).toBe(8639649);
    expect(result.value.netProfit).toBe(2219649);
    expect(result.value.absoluteReturnPercent).toBe(34.6);
    expect(result.value.annualizedReturnPercent).toBe(6.1);
  });

  it("annualised return is lower than the raw appreciation rate — buying and selling costs are real friction", () => {
    const result = calculateRealEstateReturns({
      purchasePrice: 6000000,
      buyingCostPercent: 7,
      sellingCostPercent: 2,
      appreciationPercent: 8,
      holdingYears: 5,
    });
    expect(result.value.annualizedReturnPercent).toBeLessThan(8);
  });
});

describe("calculateRealEstateReturns — boundary cases", () => {
  it("zero buying/selling costs makes annualised return converge on the appreciation rate", () => {
    const result = calculateRealEstateReturns({
      purchasePrice: 5000000,
      buyingCostPercent: 0,
      sellingCostPercent: 0,
      appreciationPercent: 7,
      holdingYears: 10,
    });
    expect(result.value.annualizedReturnPercent).toBe(7);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRealEstateReturns({
      purchasePrice: 6000000,
      buyingCostPercent: 7,
      sellingCostPercent: 2,
      appreciationPercent: 8,
      holdingYears: 5,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
