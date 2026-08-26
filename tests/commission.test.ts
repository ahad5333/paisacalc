import { describe, expect, it } from "vitest";
import { calculateCommission } from "@/lib/calc/commission";

describe("calculateCommission — worked example", () => {
  it("₹10L sale at 2% commission", () => {
    const result = calculateCommission({ saleAmount: 1000000, commissionPercent: 2 });
    expect(result.value.commissionAmount).toBe(20000);
    expect(result.value.netAmount).toBe(980000);
  });
});

describe("calculateCommission — boundary cases", () => {
  it("zero commission leaves the net amount equal to the sale amount", () => {
    const result = calculateCommission({ saleAmount: 500000, commissionPercent: 0 });
    expect(result.value.commissionAmount).toBe(0);
    expect(result.value.netAmount).toBe(500000);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateCommission({ saleAmount: 1000000, commissionPercent: 2 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
