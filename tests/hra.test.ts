import { describe, expect, it } from "vitest";
import { calculateHraExemption } from "@/lib/calc/hra";

describe("calculateHraExemption — sourced example", () => {
  it("basic ₹6,00,000, HRA ₹3,60,000, rent ₹4,20,000, metro — 50%-of-salary limit binds", () => {
    // Ratios verified against a published worked example (basic 50,000,
    // HRA 30,000, rent 35,000 — this test scales ×12 to annual figures):
    // exemption = lowest of (30,000 actual HRA, 25,000 = 50% of basic,
    // 30,000 = rent − 10% of basic) → ₹25,000/month exempt, arithmetic
    // independently reproduced before use.
    const result = calculateHraExemption({
      basicAnnual: 600000,
      hraReceivedAnnual: 360000,
      rentPaidAnnual: 420000,
      isMetro: true,
    });
    expect(result.value.limitActualHra).toBe(360000);
    expect(result.value.limitSalaryPercent).toBe(300000);
    expect(result.value.limitRentMinusSalary).toBe(360000);
    expect(result.value.exemption).toBe(300000);
    expect(result.value.bindingLimit).toBe("salaryPercent");
    expect(result.value.taxableHra).toBe(60000);
  });

  it("the same figures under a non-metro rate (40%) lower the exemption further", () => {
    const result = calculateHraExemption({
      basicAnnual: 600000,
      hraReceivedAnnual: 360000,
      rentPaidAnnual: 420000,
      isMetro: false,
    });
    expect(result.value.limitSalaryPercent).toBe(240000);
    expect(result.value.exemption).toBe(240000);
    expect(result.value.bindingLimit).toBe("salaryPercent");
  });
});

describe("calculateHraExemption — each limit can bind", () => {
  it("rent-minus-salary limit binds when rent is low relative to basic", () => {
    const result = calculateHraExemption({
      basicAnnual: 1200000,
      hraReceivedAnnual: 200000,
      rentPaidAnnual: 150000,
      isMetro: true,
    });
    expect(result.value.bindingLimit).toBe("rentMinusSalary");
    expect(result.value.exemption).toBe(30000); // 150,000 - 10% of 1,200,000
  });

  it("actual-HRA limit binds when HRA received is the smallest of the three", () => {
    const result = calculateHraExemption({
      basicAnnual: 1000000,
      hraReceivedAnnual: 50000,
      rentPaidAnnual: 500000,
      isMetro: true,
    });
    expect(result.value.bindingLimit).toBe("actualHra");
    expect(result.value.exemption).toBe(50000);
  });
});

describe("calculateHraExemption — boundaries", () => {
  it("zero rent means zero exemption, regardless of HRA received", () => {
    const result = calculateHraExemption({
      basicAnnual: 800000,
      hraReceivedAnnual: 200000,
      rentPaidAnnual: 0,
      isMetro: true,
    });
    expect(result.value.exemption).toBe(0);
    expect(result.value.taxableHra).toBe(200000);
  });

  it("zero HRA received means zero exemption and zero taxable HRA", () => {
    const result = calculateHraExemption({
      basicAnnual: 800000,
      hraReceivedAnnual: 0,
      rentPaidAnnual: 300000,
      isMetro: true,
    });
    expect(result.value.exemption).toBe(0);
    expect(result.value.taxableHra).toBe(0);
  });

  it("rent below 10% of salary never produces a negative limit", () => {
    const result = calculateHraExemption({
      basicAnnual: 1200000,
      hraReceivedAnnual: 100000,
      rentPaidAnnual: 50000, // less than 10% of basic (1,20,000)
      isMetro: true,
    });
    expect(result.value.limitRentMinusSalary).toBe(0);
    expect(result.value.exemption).toBe(0);
  });

  it("exemption is never more than the HRA actually received", () => {
    const result = calculateHraExemption({
      basicAnnual: 100000000,
      hraReceivedAnnual: 100000,
      rentPaidAnnual: 100000000,
      isMetro: true,
    });
    expect(result.value.exemption).toBeLessThanOrEqual(result.value.limitActualHra);
    expect(result.value.exemption + result.value.taxableHra).toBe(result.value.limitActualHra);
  });
});

describe("calculateHraExemption — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateHraExemption({
      basicAnnual: 600000,
      hraReceivedAnnual: 360000,
      rentPaidAnnual: 420000,
      isMetro: true,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(5);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBe("FY 2026-27");
  });
});
