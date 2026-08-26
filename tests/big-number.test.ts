import { describe, expect, it } from "vitest";
import { calculateBigNumber } from "@/lib/calc/big-number";

describe("calculateBigNumber — worked example", () => {
  it("adds two numbers beyond Number.MAX_SAFE_INTEGER exactly", () => {
    const result = calculateBigNumber({ aStr: "99999999999999999999", bStr: "1", operation: "add" });
    expect(result.value.result).toBe("100,000,000,000,000,000,000");
  });
});

describe("calculateBigNumber — boundary cases", () => {
  it("multiplies large numbers exactly", () => {
    const result = calculateBigNumber({ aStr: "123456789012345678", bStr: "2", operation: "multiply" });
    expect(result.value.result).toBe("246,913,578,024,691,356");
  });

  it("invalid input is treated as zero rather than throwing", () => {
    const result = calculateBigNumber({ aStr: "not a number", bStr: "5", operation: "add" });
    expect(result.value.result).toBe("5");
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBigNumber({ aStr: "10", bStr: "5", operation: "add" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
