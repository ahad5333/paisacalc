import { describe, expect, it } from "vitest";
import { calculatePaybackPeriod } from "@/lib/calc/payback-period";

describe("calculatePaybackPeriod — worked example", () => {
  it("₹5L initial cost, ₹1.5L annual inflow", () => {
    const result = calculatePaybackPeriod({ initialCost: 500000, annualCashInflow: 150000 });
    // 500000 / 150000 = 3.333... years = 3 years 4 months
    expect(result.value.paybackYears).toBe(3);
    expect(result.value.paybackMonths).toBe(4);
  });
});

describe("calculatePaybackPeriod — boundary cases", () => {
  it("an exact multiple gives a whole number of years with zero leftover months", () => {
    const result = calculatePaybackPeriod({ initialCost: 400000, annualCashInflow: 100000 });
    expect(result.value.paybackYears).toBe(4);
    expect(result.value.paybackMonths).toBe(0);
  });

  it("a higher annual inflow shortens the payback period", () => {
    const slow = calculatePaybackPeriod({ initialCost: 500000, annualCashInflow: 100000 });
    const fast = calculatePaybackPeriod({ initialCost: 500000, annualCashInflow: 250000 });
    expect(fast.value.paybackYears).toBeLessThan(slow.value.paybackYears);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePaybackPeriod({ initialCost: 500000, annualCashInflow: 150000 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
