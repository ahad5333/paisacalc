import { describe, expect, it } from "vitest";
import { calculateBalanceTransfer } from "@/lib/calc/balance-transfer";

describe("calculateBalanceTransfer — worked example", () => {
  it("₹30L outstanding, 9.5% → 8.3%, 15-year tenure both sides, 1% transfer cost", () => {
    const result = calculateBalanceTransfer({
      outstandingBalance: 3000000,
      currentRatePercent: 9.5,
      remainingTenureYears: 15,
      newRatePercent: 8.3,
      newTenureYears: 15,
      transferCostPercent: 1,
    });
    expect(result.value.currentEmi).toBe(31327);
    expect(result.value.currentRemainingInterest).toBe(2638766);
    expect(result.value.newEmi).toBe(29192);
    expect(result.value.newTotalInterest).toBe(2254400);
    expect(result.value.transferCost).toBe(30000);
    expect(result.value.emiChange).toBe(-2135);
    expect(result.value.netSavings).toBe(354366);
    expect(result.value.worthIt).toBe(true);
  });
});

describe("calculateBalanceTransfer — boundary cases", () => {
  it("a transfer cost bigger than the interest saved is correctly flagged not worth it", () => {
    const result = calculateBalanceTransfer({
      outstandingBalance: 500000,
      currentRatePercent: 9,
      remainingTenureYears: 2,
      newRatePercent: 8.9,
      newTenureYears: 2,
      transferCostPercent: 3,
    });
    expect(result.value.netSavings).toBeLessThan(0);
    expect(result.value.worthIt).toBe(false);
  });

  it("identical rates on both sides leave interest saved at zero before transfer cost", () => {
    const result = calculateBalanceTransfer({
      outstandingBalance: 1000000,
      currentRatePercent: 9,
      remainingTenureYears: 10,
      newRatePercent: 9,
      newTenureYears: 10,
      transferCostPercent: 0,
    });
    expect(result.value.netSavings).toBe(0);
    expect(result.value.emiChange).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBalanceTransfer({
      outstandingBalance: 3000000,
      currentRatePercent: 9.5,
      remainingTenureYears: 15,
      newRatePercent: 8.3,
      newTenureYears: 15,
      transferCostPercent: 1,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
