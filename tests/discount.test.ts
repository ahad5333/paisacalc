import { describe, expect, it } from "vitest";
import { calculateDiscount } from "@/lib/calc/discount";

describe("calculateDiscount — worked example", () => {
  it("₹2,000 at 30% off", () => {
    const result = calculateDiscount({ originalPrice: 2000, discountPercent: 30 });
    expect(result.value.discountAmount).toBe(600);
    expect(result.value.finalPrice).toBe(1400);
  });
});

describe("calculateDiscount — boundary cases", () => {
  it("0% discount leaves the price unchanged", () => {
    const result = calculateDiscount({ originalPrice: 1000, discountPercent: 0 });
    expect(result.value.discountAmount).toBe(0);
    expect(result.value.finalPrice).toBe(1000);
  });

  it("100% discount brings the final price to zero", () => {
    const result = calculateDiscount({ originalPrice: 1000, discountPercent: 100 });
    expect(result.value.finalPrice).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDiscount({ originalPrice: 2000, discountPercent: 30 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
