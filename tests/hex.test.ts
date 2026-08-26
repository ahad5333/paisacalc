import { describe, expect, it } from "vitest";
import { calculateHex } from "@/lib/calc/hex";

describe("calculateHex — worked example", () => {
  it("decimal 255 to hex", () => {
    const result = calculateHex({ direction: "toHex", decimalValue: 255, hexValue: "" });
    expect(result.value.hex).toBe("FF");
  });

  it("hex FF to decimal", () => {
    const result = calculateHex({ direction: "toDecimal", decimalValue: 0, hexValue: "FF" });
    expect(result.value.decimal).toBe(255);
  });
});

describe("calculateHex — boundary cases", () => {
  it("lowercase hex input is accepted", () => {
    const result = calculateHex({ direction: "toDecimal", decimalValue: 0, hexValue: "ff" });
    expect(result.value.decimal).toBe(255);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateHex({ direction: "toHex", decimalValue: 255, hexValue: "" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
