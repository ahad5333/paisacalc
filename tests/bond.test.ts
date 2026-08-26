import { describe, expect, it } from "vitest";
import { calculateBond } from "@/lib/calc/bond";

describe("calculateBond — worked example", () => {
  it("₹1L face value, 7% coupon, 8% YTM, 10 years, semi-annual", () => {
    const result = calculateBond({
      faceValue: 100000,
      couponRatePercent: 7,
      yieldToMaturityPercent: 8,
      yearsToMaturity: 10,
      paymentsPerYear: 2,
    });
    expect(result.value.couponPerPeriod).toBe(3500);
    expect(result.value.presentValueOfCoupons).toBe(47566);
    expect(result.value.presentValueOfFaceValue).toBe(45639);
    expect(result.value.bondPrice).toBe(93205);
    expect(result.value.premiumOrDiscount).toBe(-6795);
  });
});

describe("calculateBond — boundary cases", () => {
  it("YTM equal to the coupon rate prices the bond at exactly face value (par)", () => {
    const result = calculateBond({
      faceValue: 100000,
      couponRatePercent: 7,
      yieldToMaturityPercent: 7,
      yearsToMaturity: 10,
      paymentsPerYear: 2,
    });
    expect(result.value.bondPrice).toBe(100000);
    expect(result.value.premiumOrDiscount).toBe(0);
  });

  it("YTM below the coupon rate prices the bond at a premium above face value", () => {
    const result = calculateBond({
      faceValue: 100000,
      couponRatePercent: 8,
      yieldToMaturityPercent: 6,
      yearsToMaturity: 10,
      paymentsPerYear: 2,
    });
    expect(result.value.bondPrice).toBeGreaterThan(100000);
    expect(result.value.premiumOrDiscount).toBeGreaterThan(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBond({
      faceValue: 100000,
      couponRatePercent: 7,
      yieldToMaturityPercent: 8,
      yearsToMaturity: 10,
      paymentsPerYear: 2,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
