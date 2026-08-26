import { describe, expect, it } from "vitest";
import { calculateIncomeTax } from "@/lib/calc/income-tax";

// FY 2026-27 new-regime slabs/rebate verified independently across five
// sources (see lib/rules/fy-2026-27.ts) — one source (a CAclubindia article)
// disagreed on the slabs above ₹16L and was rejected after five others
// disagreed with it. The four Section 87A marginal-relief examples below
// come from that same CAclubindia article's worked calculations, which were
// re-derived by hand before use (each one's arithmetic checked independently,
// unlike the article's disputed slab table).
// https://www.caclubindia.com/articles/section-87a-marginal-relief-fy-2026-27-the-rs-12l-cliff-the-capital-gains-carve-out-and-6-worked-examples-56062.asp

const NEW_REGIME_STANDARD_DEDUCTION = 75000;
const OLD_REGIME_STANDARD_DEDUCTION = 50000;

function grossForNewRegimeTaxableIncome(taxableIncome: number): number {
  return taxableIncome + NEW_REGIME_STANDARD_DEDUCTION;
}

describe("calculateIncomeTax — new regime, Section 87A marginal relief (sourced examples)", () => {
  it.each([
    [1205000, 5000],
    [1210000, 10000],
    [1250000, 50000],
    [1275000, 74100],
  ])("taxable income ₹%i → tax payable ₹%i", (taxableIncome, expectedTax) => {
    const result = calculateIncomeTax({
      annualIncome: grossForNewRegimeTaxableIncome(taxableIncome),
      ageCategory: "general",
      otherDeductions: 0,
    });
    expect(result.value.newRegime.totalTax).toBe(expectedTax);
  });

  it("taxable income exactly ₹12,00,000 gets a full rebate — zero tax", () => {
    const result = calculateIncomeTax({
      annualIncome: grossForNewRegimeTaxableIncome(1200000),
      ageCategory: "general",
      otherDeductions: 0,
    });
    expect(result.value.newRegime.totalTax).toBe(0);
  });
});

describe("calculateIncomeTax — old regime", () => {
  it("₹8,00,000 gross, no extra deductions: taxable ₹7,50,000 after standard deduction", () => {
    const result = calculateIncomeTax({
      annualIncome: 800000,
      ageCategory: "general",
      otherDeductions: 0,
    });
    // 0-2.5L nil, 2.5-5L @5% = 12,500, 5-7.5L @20% = 50,000 → 62,500 + 4% cess
    expect(result.value.oldRegime.baseTax).toBe(62500);
    expect(result.value.oldRegime.totalTax).toBe(65000);
  });

  it("taxable income exactly ₹5,00,000 gets a full Section 87A rebate", () => {
    const result = calculateIncomeTax({
      annualIncome: 550000,
      ageCategory: "general",
      otherDeductions: 0,
    });
    expect(result.value.oldRegime.totalTax).toBe(0);
  });

  it("senior citizens (60-80) get a ₹3L nil band instead of ₹2.5L", () => {
    const result = calculateIncomeTax({
      annualIncome: 800000,
      ageCategory: "senior",
      otherDeductions: 0,
    });
    // 0-3L nil, 3-5L @5% = 10,000, 5-7.5L @20% = 50,000 → 60,000 + cess
    expect(result.value.oldRegime.baseTax).toBe(60000);
    expect(result.value.oldRegime.totalTax).toBe(62400);
  });

  it("super senior citizens (80+) get a ₹5L nil band", () => {
    const result = calculateIncomeTax({
      annualIncome: 800000,
      ageCategory: "superSenior",
      otherDeductions: 0,
    });
    // 0-5L nil, 5-7.5L @20% = 50,000 → 50,000 + cess
    expect(result.value.oldRegime.baseTax).toBe(50000);
    expect(result.value.oldRegime.totalTax).toBe(52000);
  });

  it("other deductions (80C/80D/HRA combined) reduce old-regime taxable income", () => {
    const withoutDeductions = calculateIncomeTax({
      annualIncome: 1200000,
      ageCategory: "general",
      otherDeductions: 0,
    });
    const withDeductions = calculateIncomeTax({
      annualIncome: 1200000,
      ageCategory: "general",
      otherDeductions: 150000,
    });
    expect(withDeductions.value.oldRegime.taxableIncome).toBe(
      withoutDeductions.value.oldRegime.taxableIncome - 150000,
    );
    expect(withDeductions.value.oldRegime.totalTax).toBeLessThan(
      withoutDeductions.value.oldRegime.totalTax,
    );
  });
});

describe("calculateIncomeTax — surcharge and marginal relief at high incomes", () => {
  it("₹60,00,000 gross, new regime: crosses the ₹50L surcharge threshold", () => {
    const result = calculateIncomeTax({
      annualIncome: 6000000,
      ageCategory: "general",
      otherDeductions: 0,
    });
    // taxable 59,25,000 → base tax 13,57,500; 10% surcharge = 1,35,750;
    // cess 4% of 14,93,250 = 59,730 → total 15,52,980 (hand-verified; a
    // web source's published total for this exact scenario, ₹12,24,580,
    // did not reconcile against its own listed slab-by-slab figures and
    // was rejected).
    expect(result.value.newRegime.baseTax).toBe(1357500);
    expect(result.value.newRegime.surcharge).toBe(135750);
    expect(result.value.newRegime.totalTax).toBe(1552980);
  });

  it("surcharge marginal relief softens the cliff just above ₹50L", () => {
    const atThreshold = calculateIncomeTax({
      annualIncome: 5000000 + OLD_REGIME_STANDARD_DEDUCTION,
      ageCategory: "general",
      otherDeductions: 0,
    });
    const justAbove = calculateIncomeTax({
      annualIncome: 5010000 + OLD_REGIME_STANDARD_DEDUCTION,
      ageCategory: "general",
      otherDeductions: 0,
    });
    expect(atThreshold.value.oldRegime.surcharge).toBe(0);
    // Without relief, 10% surcharge on ~10.8L of tax would jump by five
    // figures; relief limits the surcharge itself to roughly the income
    // that crossed the threshold.
    const surchargeJump = justAbove.value.oldRegime.surcharge - atThreshold.value.oldRegime.surcharge;
    expect(surchargeJump).toBeLessThan(10000);
  });

  it("old regime carries a 37% surcharge above ₹5Cr; new regime caps at 25%", () => {
    const income = 55000000;
    const result = calculateIncomeTax({
      annualIncome: income,
      ageCategory: "general",
      otherDeductions: 0,
    });
    const oldSurchargeRate = result.value.oldRegime.surcharge / result.value.oldRegime.baseTax;
    const newSurchargeRate = result.value.newRegime.surcharge / result.value.newRegime.baseTax;
    expect(oldSurchargeRate).toBeGreaterThan(newSurchargeRate);
  });
});

describe("calculateIncomeTax — comparison and derivation", () => {
  it("identifies the cheaper regime and the savings amount", () => {
    const result = calculateIncomeTax({
      annualIncome: 1500000,
      ageCategory: "general",
      otherDeductions: 300000,
    });
    const { newRegime, oldRegime, cheaperRegime, savings } = result.value;
    const diff = Math.abs(oldRegime.totalTax - newRegime.totalTax);
    expect(savings).toBe(diff);
    expect(["new", "old", "equal"]).toContain(cheaperRegime);
  });

  it("zero income produces zero tax under both regimes with no crash", () => {
    const result = calculateIncomeTax({
      annualIncome: 0,
      ageCategory: "general",
      otherDeductions: 0,
    });
    expect(result.value.newRegime.totalTax).toBe(0);
    expect(result.value.oldRegime.totalTax).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateIncomeTax({
      annualIncome: 1500000,
      ageCategory: "general",
      otherDeductions: 150000,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBe("FY 2026-27");
  });
});
