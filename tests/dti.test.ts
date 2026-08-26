import { describe, expect, it } from "vitest";
import { calculateDti } from "@/lib/calc/dti";

describe("calculateDti", () => {
  it("₹1,00,000 income, ₹30,000 debt → 30%, healthy", () => {
    const result = calculateDti({ monthlyIncome: 100000, monthlyDebtPayments: 30000 });
    expect(result.value.dtiPercent).toBe(30);
    expect(result.value.band).toBe("healthy");
  });

  it("₹1,00,000 income, ₹40,000 debt → 40%, manageable", () => {
    const result = calculateDti({ monthlyIncome: 100000, monthlyDebtPayments: 40000 });
    expect(result.value.dtiPercent).toBe(40);
    expect(result.value.band).toBe("manageable");
  });

  it("₹1,00,000 income, ₹50,000 debt → 50%, high", () => {
    const result = calculateDti({ monthlyIncome: 100000, monthlyDebtPayments: 50000 });
    expect(result.value.dtiPercent).toBe(50);
    expect(result.value.band).toBe("high");
  });

  it("exact boundary at 36% is manageable, not healthy", () => {
    const result = calculateDti({ monthlyIncome: 100000, monthlyDebtPayments: 36000 });
    expect(result.value.band).toBe("manageable");
  });

  it("exact boundary at 43% is still manageable, not high", () => {
    const result = calculateDti({ monthlyIncome: 100000, monthlyDebtPayments: 43000 });
    expect(result.value.band).toBe("manageable");
  });

  it("zero income doesn't divide by zero", () => {
    const result = calculateDti({ monthlyIncome: 0, monthlyDebtPayments: 10000 });
    expect(result.value.dtiPercent).toBe(0);
  });
});
