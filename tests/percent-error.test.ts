import { describe, expect, it } from "vitest";
import { calculatePercentError } from "@/lib/calc/percent-error";

describe("calculatePercentError — worked example", () => {
  it("experimental 48, theoretical 50 -> 4% error", () => {
    const result = calculatePercentError({ experimental: 48, theoretical: 50 });
    expect(result.value.percentError).toBe(4);
  });
});

describe("calculatePercentError — boundary cases", () => {
  it("is symmetric regardless of which value is higher", () => {
    const over = calculatePercentError({ experimental: 55, theoretical: 50 });
    const under = calculatePercentError({ experimental: 45, theoretical: 50 });
    expect(over.value.percentError).toBe(under.value.percentError);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePercentError({ experimental: 48, theoretical: 50 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
