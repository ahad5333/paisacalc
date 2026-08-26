import { describe, expect, it } from "vitest";
import { calculateMargin } from "@/lib/calc/margin";

describe("calculateMargin — worked example", () => {
  it("₹600 cost, ₹900 selling price — a 50% markup is only a 33.33% margin", () => {
    const result = calculateMargin({ costPrice: 600, sellingPrice: 900 });
    expect(result.value.profit).toBe(300);
    expect(result.value.markupPercent).toBe(50);
    expect(result.value.marginPercent).toBe(33.33);
  });
});

describe("calculateMargin — boundary cases", () => {
  it("selling at cost gives zero profit, margin, and markup", () => {
    const result = calculateMargin({ costPrice: 500, sellingPrice: 500 });
    expect(result.value.profit).toBe(0);
    expect(result.value.marginPercent).toBe(0);
    expect(result.value.markupPercent).toBe(0);
  });

  it("selling below cost gives a negative profit and negative margin/markup", () => {
    const result = calculateMargin({ costPrice: 500, sellingPrice: 400 });
    expect(result.value.profit).toBe(-100);
    expect(result.value.marginPercent).toBeLessThan(0);
    expect(result.value.markupPercent).toBeLessThan(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateMargin({ costPrice: 600, sellingPrice: 900 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
