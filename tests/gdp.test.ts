import { describe, expect, it } from "vitest";
import { calculateGdp } from "@/lib/calc/gdp";

describe("calculateGdp — worked example", () => {
  it("C=500, I=200, G=150, X=100, M=80", () => {
    const result = calculateGdp({ consumption: 500, investment: 200, governmentSpending: 150, exports: 100, imports: 80 });
    expect(result.value.netExports).toBe(20);
    expect(result.value.gdp).toBe(870);
  });
});

describe("calculateGdp — boundary cases", () => {
  it("imports exceeding exports reduces GDP via negative net exports", () => {
    const result = calculateGdp({ consumption: 500, investment: 200, governmentSpending: 150, exports: 50, imports: 100 });
    expect(result.value.netExports).toBe(-50);
    expect(result.value.gdp).toBe(800);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateGdp({ consumption: 500, investment: 200, governmentSpending: 150, exports: 100, imports: 80 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
