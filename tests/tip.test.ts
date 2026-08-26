import { describe, expect, it } from "vitest";
import { calculateTip } from "@/lib/calc/tip";

describe("calculateTip — worked example", () => {
  it("$100 bill, 20% tip, 4 people", () => {
    const result = calculateTip({ billAmount: 100, tipPct: 20, numPeople: 4 });
    expect(result.value.tipAmount).toBe(20);
    expect(result.value.totalAmount).toBe(120);
    expect(result.value.perPerson).toBe(30);
  });
});

describe("calculateTip — boundary cases", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateTip({ billAmount: 100, tipPct: 20, numPeople: 4 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
