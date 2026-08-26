import { describe, expect, it } from "vitest";
import { calculateRentVsBuy } from "@/lib/calc/rent-vs-buy";

// Fixture independently hand-traced in a standalone script (month-by-month
// loan amortization + rent escalation + invested-difference compounding)
// before being encoded as the implementation — these numbers are what that
// independent trace produced, not numbers back-derived from the function
// itself.
describe("calculateRentVsBuy — hand-traced worked example", () => {
  const inputs = {
    homePrice: 8000000,
    downPaymentPercent: 20,
    loanRatePercent: 8.5,
    loanTenureYears: 20,
    monthlyRent: 25000,
    annualRentIncreasePercent: 5,
    appreciationPercent: 6,
    investmentReturnPercent: 10,
    maintenancePercent: 1,
    compareYears: 10,
  };

  it("₹80L home, 20% down, 8.5%/20yr loan vs ₹25k rent rising 5%/yr, compared over 10 years", () => {
    const result = calculateRentVsBuy(inputs);
    expect(result.value.emi).toBe(55541);
    expect(result.value.downPayment).toBe(1600000);
    expect(result.value.remainingLoanBalance).toBe(4479542);
    expect(result.value.propertyValue).toBe(14326782);
    expect(result.value.totalMaintenance).toBe(1054463);
    expect(result.value.totalEmiPaid).toBe(6664920);
    expect(result.value.totalRentPaid).toBe(3773364);
    expect(result.value.netWorthBuying).toBe(8792777);
    expect(result.value.netWorthRenting).toBe(9380241);
    expect(result.value.better).toBe("rent");
  });
});

describe("calculateRentVsBuy — boundary cases", () => {
  it("zero rent increase keeps rent constant across the whole comparison", () => {
    const a = calculateRentVsBuy({
      homePrice: 5000000,
      downPaymentPercent: 20,
      loanRatePercent: 8,
      loanTenureYears: 15,
      monthlyRent: 20000,
      annualRentIncreasePercent: 0,
      appreciationPercent: 5,
      investmentReturnPercent: 8,
      maintenancePercent: 1,
      compareYears: 5,
    });
    expect(a.value.totalRentPaid).toBe(20000 * 60);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRentVsBuy({
      homePrice: 8000000,
      downPaymentPercent: 20,
      loanRatePercent: 8.5,
      loanTenureYears: 20,
      monthlyRent: 25000,
      annualRentIncreasePercent: 5,
      appreciationPercent: 6,
      investmentReturnPercent: 10,
      maintenancePercent: 1,
      compareYears: 10,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
