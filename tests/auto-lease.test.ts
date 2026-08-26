import { describe, expect, it } from "vitest";
import { calculateAutoLease } from "@/lib/calc/auto-lease";

describe("calculateAutoLease — worked example", () => {
  it("₹15L vehicle, 50% residual, 36-month term, 8% rate", () => {
    const result = calculateAutoLease({
      vehiclePrice: 1500000,
      residualValuePercent: 50,
      leaseTermMonths: 36,
      ratePercent: 8,
    });
    expect(result.value.residualValue).toBe(750000);
    expect(result.value.depreciationFeeMonthly).toBe(20833);
    expect(result.value.financeFeeMonthly).toBe(15000);
    expect(result.value.monthlyLeasePayment).toBe(35833);
    expect(result.value.totalLeaseCost).toBe(1289988);
  });
});

describe("calculateAutoLease — boundary cases", () => {
  it("a higher residual value lowers the monthly depreciation charge", () => {
    const lowResidual = calculateAutoLease({ vehiclePrice: 1500000, residualValuePercent: 40, leaseTermMonths: 36, ratePercent: 8 });
    const highResidual = calculateAutoLease({ vehiclePrice: 1500000, residualValuePercent: 60, leaseTermMonths: 36, ratePercent: 8 });
    expect(highResidual.value.depreciationFeeMonthly).toBeLessThan(lowResidual.value.depreciationFeeMonthly);
  });

  it("zero interest rate leaves only the depreciation charge", () => {
    const result = calculateAutoLease({ vehiclePrice: 1000000, residualValuePercent: 50, leaseTermMonths: 24, ratePercent: 0 });
    expect(result.value.financeFeeMonthly).toBe(0);
    expect(result.value.monthlyLeasePayment).toBe(result.value.depreciationFeeMonthly);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateAutoLease({
      vehiclePrice: 1500000,
      residualValuePercent: 50,
      leaseTermMonths: 36,
      ratePercent: 8,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
