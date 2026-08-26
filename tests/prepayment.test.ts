import { describe, expect, it } from "vitest";
import { calculatePrepaymentImpact } from "@/lib/calc/prepayment";
import { simulateScheduleAtFixedEmi, calculateEmi } from "@/lib/calc/emi";

describe("simulateScheduleAtFixedEmi — self-consistency with calculateEmi", () => {
  it("reproduces calculateEmi's own schedule exactly when given its own EMI", () => {
    const original = calculateEmi({ principal: 4000000, annualRatePercent: 8.5, tenureMonths: 240 });
    const simulated = simulateScheduleAtFixedEmi(4000000, 8.5, original.value.emi);
    expect(simulated).toEqual(original.value.schedule);
  });
});

describe("calculatePrepaymentImpact — worked example (hand-verified)", () => {
  // ₹40,00,000 @ 8.5% / 240 months, ₹5,00,000 prepaid at month 24. Figures
  // independently computed from the already-verified EMI engine (see
  // tests/emi.test.ts) before use here — no external source needed since
  // this is a derived scenario, not a published rate/rule.
  const base = {
    principal: 4000000,
    annualRatePercent: 8.5,
    tenureMonths: 240,
    prepaymentAmount: 500000,
    prepaymentMonth: 24,
  };

  it("reduce-EMI strategy: same tenure, lower EMI", () => {
    const result = calculatePrepaymentImpact({ ...base, strategy: "reduceEmi" });
    expect(result.value.originalEmi).toBe(34713);
    expect(result.value.newEmi).toBe(30186);
    expect(result.value.newTenureMonths).toBe(240);
    expect(result.value.tenureSavedMonths).toBe(0);
    expect(result.value.interestSaved).toBe(477969);
  });

  it("reduce-tenure strategy: same EMI, shorter tenure", () => {
    const result = calculatePrepaymentImpact({ ...base, strategy: "reduceTenure" });
    expect(result.value.newEmi).toBe(result.value.originalEmi);
    expect(result.value.newTenureMonths).toBe(186);
    expect(result.value.tenureSavedMonths).toBe(54);
    expect(result.value.interestSaved).toBe(1390129);
  });
});

describe("calculatePrepaymentImpact — invariants", () => {
  const base = {
    principal: 4000000,
    annualRatePercent: 8.5,
    tenureMonths: 240,
    prepaymentAmount: 500000,
    prepaymentMonth: 24,
  };

  it("reduce-tenure never saves less interest than reduce-EMI for the same prepayment", () => {
    // Paying down faster (same EMI, shorter tenure) always beats stretching
    // the same tenure at a lower EMI — a basic fact about compounding
    // interest, not something specific to these numbers.
    const reduceEmi = calculatePrepaymentImpact({ ...base, strategy: "reduceEmi" });
    const reduceTenure = calculatePrepaymentImpact({ ...base, strategy: "reduceTenure" });
    expect(reduceTenure.value.interestSaved).toBeGreaterThanOrEqual(reduceEmi.value.interestSaved);
  });

  it.each(["reduceEmi", "reduceTenure"] as const)(
    "a zero prepayment changes nothing under %s",
    (strategy) => {
      const result = calculatePrepaymentImpact({ ...base, prepaymentAmount: 0, strategy });
      expect(result.value.interestSaved).toBe(0);
      expect(result.value.newTenureMonths).toBe(base.tenureMonths);
    },
  );

  it("a prepayment large enough to clear the balance ends the loan immediately", () => {
    const result = calculatePrepaymentImpact({
      ...base,
      prepaymentAmount: 100000000, // far more than the outstanding balance
      strategy: "reduceTenure",
    });
    expect(result.value.newTenureMonths).toBe(base.prepaymentMonth);
    expect(result.value.newEmi).toBe(0);
  });

  it("combined schedule length matches the reported new tenure", () => {
    const result = calculatePrepaymentImpact({ ...base, strategy: "reduceTenure" });
    expect(result.value.combinedSchedule).toHaveLength(result.value.newTenureMonths);
    expect(result.value.combinedSchedule.at(-1)?.balance).toBe(0);
  });
});

describe("calculatePrepaymentImpact — boundaries", () => {
  it("clamps an out-of-range prepayment month instead of crashing", () => {
    const result = calculatePrepaymentImpact({
      principal: 2000000,
      annualRatePercent: 8.5,
      tenureMonths: 180,
      prepaymentAmount: 100000,
      prepaymentMonth: 9999,
      strategy: "reduceTenure",
    });
    expect(Number.isFinite(result.value.newTenureMonths)).toBe(true);
  });

  it("prepayment in month 1 still produces a valid result", () => {
    const result = calculatePrepaymentImpact({
      principal: 2000000,
      annualRatePercent: 8.5,
      tenureMonths: 180,
      prepaymentAmount: 100000,
      prepaymentMonth: 1,
      strategy: "reduceTenure",
    });
    expect(result.value.interestSaved).toBeGreaterThan(0);
  });
});

describe("calculatePrepaymentImpact — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePrepaymentImpact({
      principal: 4000000,
      annualRatePercent: 8.5,
      tenureMonths: 240,
      prepaymentAmount: 500000,
      prepaymentMonth: 24,
      strategy: "reduceTenure",
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
