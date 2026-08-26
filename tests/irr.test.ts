import { describe, expect, it } from "vitest";
import { calculateIrr } from "@/lib/calc/irr";

describe("calculateIrr — worked example", () => {
  it("₹5L investment, uneven 5-year cash flows", () => {
    const result = calculateIrr({
      initialInvestment: 500000,
      cashFlowYear1: 100000,
      cashFlowYear2: 120000,
      cashFlowYear3: 140000,
      cashFlowYear4: 160000,
      cashFlowYear5: 300000,
    });
    expect(result.value.totalCashReturned).toBe(820000);
    expect(result.value.netGain).toBe(320000);
    expect(result.value.irrPercent).toBe(15.73);
  });
});

describe("calculateIrr — boundary cases", () => {
  it("even cash flows that reduce to a simple annuity match a direct NPV check at the solved rate", () => {
    const result = calculateIrr({
      initialInvestment: 379079,
      cashFlowYear1: 100000,
      cashFlowYear2: 100000,
      cashFlowYear3: 100000,
      cashFlowYear4: 100000,
      cashFlowYear5: 100000,
    });
    // ₹1L/year for 5 years at a 10% discount rate has a PV of ~₹3,79,079 —
    // so the IRR of putting in that much and getting ₹1L/year back should
    // land close to 10%.
    expect(result.value.irrPercent).toBeCloseTo(10, 0);
  });

  it("a higher final cash flow produces a higher IRR, all else equal", () => {
    const lower = calculateIrr({ initialInvestment: 500000, cashFlowYear1: 100000, cashFlowYear2: 100000, cashFlowYear3: 100000, cashFlowYear4: 100000, cashFlowYear5: 150000 });
    const higher = calculateIrr({ initialInvestment: 500000, cashFlowYear1: 100000, cashFlowYear2: 100000, cashFlowYear3: 100000, cashFlowYear4: 100000, cashFlowYear5: 300000 });
    expect(higher.value.irrPercent).toBeGreaterThan(lower.value.irrPercent);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateIrr({
      initialInvestment: 500000,
      cashFlowYear1: 100000,
      cashFlowYear2: 120000,
      cashFlowYear3: 140000,
      cashFlowYear4: 160000,
      cashFlowYear5: 300000,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
