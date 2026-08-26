import { describe, expect, it } from "vitest";
import { calculateBraSize } from "@/lib/calc/bra-size";

describe("calculateBraSize — worked example", () => {
  it("underbust 32, bust 36", () => {
    const result = calculateBraSize({ underbustIn: 32, bustIn: 36 });
    expect(result.value.bandSize).toBe(36);
    expect(result.value.cupLetter).toBe("D");
    expect(result.value.sizeLabel).toBe("36D");
  });
});

describe("calculateBraSize — boundary cases", () => {
  it("an odd underbust measurement adds 5 instead of 4", () => {
    const result = calculateBraSize({ underbustIn: 31, bustIn: 34 });
    expect(result.value.bandSize).toBe(36);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBraSize({ underbustIn: 32, bustIn: 36 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
