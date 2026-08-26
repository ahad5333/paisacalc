import { describe, expect, it } from "vitest";
import { calculateCapitalGains } from "@/lib/calc/capital-gains";

describe("calculateCapitalGains — equity", () => {
  it("long-term: gain above the ₹1.25L exemption is taxed at 12.5%", () => {
    const result = calculateCapitalGains({
      assetType: "equity",
      purchaseValue: 500000,
      saleValue: 900000,
      purchaseFinancialYear: "2020-21",
      holdingMonths: 24,
    });
    expect(result.value.isLongTerm).toBe(true);
    expect(result.value.gain).toBe(400000);
    expect(result.value.exemption).toBe(125000);
    expect(result.value.taxableGain).toBe(275000);
    expect(result.value.tax).toBe(34375);
  });

  it("short-term: full gain taxed at 20%, no exemption", () => {
    const result = calculateCapitalGains({
      assetType: "equity",
      purchaseValue: 500000,
      saleValue: 600000,
      purchaseFinancialYear: "2025-26",
      holdingMonths: 6,
    });
    expect(result.value.isLongTerm).toBe(false);
    expect(result.value.exemption).toBe(0);
    expect(result.value.taxableGain).toBe(100000);
    expect(result.value.tax).toBe(20000);
  });

  it("exactly 12 months is still short-term (must exceed, not just reach, the threshold)", () => {
    const result = calculateCapitalGains({
      assetType: "equity",
      purchaseValue: 500000,
      saleValue: 600000,
      purchaseFinancialYear: "2025-26",
      holdingMonths: 12,
    });
    expect(result.value.isLongTerm).toBe(false);
  });

  it("a gain fully inside the exemption owes no tax", () => {
    const result = calculateCapitalGains({
      assetType: "equity",
      purchaseValue: 500000,
      saleValue: 600000,
      purchaseFinancialYear: "2020-21",
      holdingMonths: 24,
    });
    expect(result.value.gain).toBe(100000);
    expect(result.value.exemption).toBe(100000);
    expect(result.value.taxableGain).toBe(0);
    expect(result.value.tax).toBe(0);
  });
});

describe("calculateCapitalGains — property, long-term", () => {
  it("indexation wins for an old purchase with modest appreciation", () => {
    const result = calculateCapitalGains({
      assetType: "property",
      purchaseValue: 2000000,
      saleValue: 6000000,
      purchaseFinancialYear: "2010-11",
      holdingMonths: 200,
    });
    expect(result.value.indexedCost).toBe(4598802);
    expect(result.value.taxWithIndexation).toBe(280240);
    expect(result.value.taxWithoutIndexation).toBe(500000);
    expect(result.value.usedIndexation).toBe(true);
    expect(result.value.tax).toBe(280240);
  });

  it("the flat 12.5% rate wins for huge appreciation, where indexation barely helps", () => {
    const result = calculateCapitalGains({
      assetType: "property",
      purchaseValue: 1000000,
      saleValue: 10000000,
      purchaseFinancialYear: "2015-16",
      holdingMonths: 130,
    });
    expect(result.value.taxWithoutIndexation).toBe(1125000);
    expect(result.value.taxWithIndexation).toBe(1697638);
    expect(result.value.usedIndexation).toBe(false);
    expect(result.value.tax).toBe(1125000);
  });

  it("property purchased after the grandfathering cutover gets no indexation choice", () => {
    const result = calculateCapitalGains({
      assetType: "property",
      purchaseValue: 5000000,
      saleValue: 6000000,
      purchaseFinancialYear: "2025-26", // after the 2024-25 cutover
      holdingMonths: 30,
    });
    expect(result.value.usedIndexation).toBe(false);
    expect(result.value.tax).toBe(result.value.taxWithoutIndexation);
  });

  it("indexation can produce an indexed loss, correctly zeroing that side of the comparison", () => {
    const result = calculateCapitalGains({
      assetType: "property",
      purchaseValue: 5000000,
      saleValue: 5500000, // appreciation below inflation
      purchaseFinancialYear: "2023-24",
      holdingMonths: 30,
    });
    expect(result.value.taxWithIndexation).toBe(0);
    expect(result.value.usedIndexation).toBe(true);
    expect(result.value.tax).toBe(0);
  });
});

describe("calculateCapitalGains — property, short-term", () => {
  it("reports the gain but no flat-rate tax — slab rate applies instead", () => {
    const result = calculateCapitalGains({
      assetType: "property",
      purchaseValue: 5000000,
      saleValue: 5500000,
      purchaseFinancialYear: "2025-26",
      holdingMonths: 10,
    });
    expect(result.value.isLongTerm).toBe(false);
    expect(result.value.gain).toBe(500000);
    expect(result.value.taxRate).toBeNull();
    expect(result.value.tax).toBe(0);
  });

  it("exactly 24 months is still short-term", () => {
    const result = calculateCapitalGains({
      assetType: "property",
      purchaseValue: 5000000,
      saleValue: 5500000,
      purchaseFinancialYear: "2024-25",
      holdingMonths: 24,
    });
    expect(result.value.isLongTerm).toBe(false);
  });
});

describe("calculateCapitalGains — boundaries", () => {
  it("a loss produces zero tax, not a negative one", () => {
    const result = calculateCapitalGains({
      assetType: "equity",
      purchaseValue: 900000,
      saleValue: 500000,
      purchaseFinancialYear: "2020-21",
      holdingMonths: 24,
    });
    expect(result.value.gain).toBe(-400000);
    expect(result.value.tax).toBe(0);
  });

  it("zero purchase and sale value doesn't crash", () => {
    const result = calculateCapitalGains({
      assetType: "property",
      purchaseValue: 0,
      saleValue: 0,
      purchaseFinancialYear: "2015-16",
      holdingMonths: 60,
    });
    expect(Number.isFinite(result.value.tax)).toBe(true);
  });

  it("an unrecognised financial year falls back to the base-year index rather than crashing", () => {
    const result = calculateCapitalGains({
      assetType: "property",
      purchaseValue: 1000000,
      saleValue: 2000000,
      purchaseFinancialYear: "1985-86",
      holdingMonths: 200,
    });
    expect(Number.isFinite(result.value.tax)).toBe(true);
  });
});

describe("calculateCapitalGains — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateCapitalGains({
      assetType: "equity",
      purchaseValue: 500000,
      saleValue: 900000,
      purchaseFinancialYear: "2020-21",
      holdingMonths: 24,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBe("FY 2026-27");
  });
});
