import { describe, expect, it } from "vitest";
import { aggregateYearly, calculateEmi } from "@/lib/calc/emi";

// Five worked examples from independently published sources. Each EMI and
// month-1 interest/principal split was cross-checked by hand against the
// standard reducing-balance formula before being used here (PRD §7.3,
// ticket C1-02) — month 1 has no prior rounding to compound, so it's the
// one point in any schedule that's unambiguous regardless of a source's
// internal rounding convention. Deeper rows (month 6+, year aggregates)
// were deliberately left out of these fixtures: extracting them from
// rendered web pages proved unreliable — one source's month-12 figures
// didn't hold up against the schedule's own geometric growth pattern once
// checked, most likely a transcription error on the way in rather than a
// real discrepancy. Deeper-schedule correctness is covered instead by the
// self-consistency properties below, which don't depend on trusting a
// second-hand transcription.

describe("calculateEmi — worked examples from published sources", () => {
  it("₹50,00,000 @ 8.5% / 240 months — Godrej Capital amortisation schedule guide", () => {
    // https://www.godrejcapital.com/media-blog/knowledge-centre/home-loan-amortization-schedule
    const result = calculateEmi({ principal: 5000000, annualRatePercent: 8.5, tenureMonths: 240 });
    expect(result.value.emi).toBe(43391);
    expect(result.value.schedule[0].interest).toBe(35417);
    expect(result.value.schedule[0].principal).toBe(7974);
  });

  it("₹20,00,000 @ 8.5% / 180 months — HomeFirst Finance EMI & amortisation guide", () => {
    // https://homefirstindia.com/blog/article/home-loan-emi-calculation-with-amortization-schedule/
    const result = calculateEmi({ principal: 2000000, annualRatePercent: 8.5, tenureMonths: 180 });
    expect(result.value.emi).toBe(19695);
  });

  it("₹60,00,000 @ 9% / 240 months — SBI home loan EMI illustration (via Groww)", () => {
    // https://groww.in/calculators/sbi-home-loan-emi-calculator
    const result = calculateEmi({ principal: 6000000, annualRatePercent: 9, tenureMonths: 240 });
    expect(result.value.emi).toBe(53984);
    expect(result.value.schedule[0].interest).toBe(45000);
    expect(result.value.schedule[0].principal).toBe(8984);
  });

  it("₹5,00,000 @ 8% / 120 months — Paisabazaar amortisation calculator guide", () => {
    // https://www.paisabazaar.com/personal-loan/amortization-calculator/
    const result = calculateEmi({ principal: 500000, annualRatePercent: 8, tenureMonths: 120 });
    expect(result.value.emi).toBe(6066);
    expect(result.value.schedule[0].interest).toBe(3333);
    expect(result.value.schedule[0].principal).toBe(2733);
  });

  it("₹50,00,000 @ 8% / 300 months — StableInvestor home loan EMI calculator guide", () => {
    // https://stableinvestor.com/2020/07/home-loan-emi-calculator.html
    const result = calculateEmi({ principal: 5000000, annualRatePercent: 8, tenureMonths: 300 });
    expect(result.value.emi).toBe(38591);
    expect(result.value.schedule[0].interest).toBe(33333);
    expect(result.value.schedule[0].principal).toBe(5258);
  });
});

describe("calculateEmi — schedule self-consistency", () => {
  const cases = [
    { principal: 5000000, annualRatePercent: 8.5, tenureMonths: 240 },
    { principal: 2000000, annualRatePercent: 8.5, tenureMonths: 180 },
    { principal: 6000000, annualRatePercent: 9, tenureMonths: 240 },
    { principal: 500000, annualRatePercent: 8, tenureMonths: 120 },
    { principal: 5000000, annualRatePercent: 8, tenureMonths: 300 },
  ];

  it.each(cases)(
    "every row's interest + principal equals that row's EMI (%o)",
    (inputs) => {
      const { schedule } = calculateEmi(inputs).value;
      for (const row of schedule) {
        expect(row.interest + row.principal).toBe(row.emi);
      }
    },
  );

  it.each(cases)("principal payments sum to the original principal (%o)", (inputs) => {
    const { schedule } = calculateEmi(inputs).value;
    const totalPrincipal = schedule.reduce((sum, row) => sum + row.principal, 0);
    expect(totalPrincipal).toBe(inputs.principal);
  });

  it.each(cases)("the schedule always closes to a zero balance (%o)", (inputs) => {
    const { schedule } = calculateEmi(inputs).value;
    expect(schedule.at(-1)?.balance).toBe(0);
    expect(schedule).toHaveLength(inputs.tenureMonths);
  });
});

describe("calculateEmi — boundary cases", () => {
  it("zero interest: EMI is principal divided evenly across the tenure", () => {
    const result = calculateEmi({ principal: 1200000, annualRatePercent: 0, tenureMonths: 12 });
    expect(result.value.emi).toBe(100000);
    expect(result.value.totalInterest).toBe(0);
    expect(result.value.schedule.every((r) => r.interest === 0)).toBe(true);
  });

  it("one-month tenure: EMI is principal plus a single month's interest", () => {
    const result = calculateEmi({ principal: 100000, annualRatePercent: 12, tenureMonths: 1 });
    // 100000 * (1 + 12/12/100) = 100000 * 1.01
    expect(result.value.emi).toBe(101000);
    expect(result.value.schedule).toHaveLength(1);
    expect(result.value.schedule[0].balance).toBe(0);
  });

  it("maximum realistic principal (₹10 crore) does not lose precision or overflow", () => {
    const result = calculateEmi({ principal: 100000000, annualRatePercent: 9, tenureMonths: 240 });
    expect(Number.isFinite(result.value.emi)).toBe(true);
    expect(result.value.emi).toBeGreaterThan(0);
    expect(result.value.schedule[239].balance).toBe(0);
  });
});

describe("aggregateYearly", () => {
  it("groups a 240-month schedule into 20 years summing to the schedule totals", () => {
    const { schedule, totalInterest } = calculateEmi({
      principal: 4000000,
      annualRatePercent: 8.5,
      tenureMonths: 240,
    }).value;
    const years = aggregateYearly(schedule);
    expect(years).toHaveLength(20);
    expect(years.reduce((s, y) => s + y.principal, 0)).toBe(4000000);
    expect(years.reduce((s, y) => s + y.interest, 0)).toBe(totalInterest);
  });
});

describe("calculateEmi — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateEmi({ principal: 4000000, annualRatePercent: 8.5, tenureMonths: 240 });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
