import { describe, expect, it } from "vitest";
import { calculateBinary } from "@/lib/calc/binary";

describe("calculateBinary — worked example", () => {
  it("decimal 13 to binary", () => {
    const result = calculateBinary({ direction: "toBinary", decimalValue: 13, binaryValue: "" });
    expect(result.value.binary).toBe("1101");
  });

  it("binary 1101 to decimal", () => {
    const result = calculateBinary({ direction: "toDecimal", decimalValue: 0, binaryValue: "1101" });
    expect(result.value.decimal).toBe(13);
  });
});

describe("calculateBinary — boundary cases", () => {
  it("invalid binary input falls back to 0", () => {
    const result = calculateBinary({ direction: "toDecimal", decimalValue: 0, binaryValue: "abc" });
    expect(result.value.decimal).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBinary({ direction: "toBinary", decimalValue: 13, binaryValue: "" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
