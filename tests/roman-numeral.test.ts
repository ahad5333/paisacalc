import { describe, expect, it } from "vitest";
import { calculateRomanNumeral } from "@/lib/calc/roman-numeral";

describe("calculateRomanNumeral — worked example", () => {
  it("1994 to Roman is MCMXCIV", () => {
    const result = calculateRomanNumeral({ direction: "toRoman", decimalValue: 1994, romanValue: "" });
    expect(result.value.roman).toBe("MCMXCIV");
  });

  it("MCMXCIV to decimal is 1994", () => {
    const result = calculateRomanNumeral({ direction: "toDecimal", decimalValue: 0, romanValue: "MCMXCIV" });
    expect(result.value.decimal).toBe(1994);
  });
});

describe("calculateRomanNumeral — boundary cases", () => {
  it("rejects a malformed numeral like IIII", () => {
    const result = calculateRomanNumeral({ direction: "toDecimal", decimalValue: 0, romanValue: "IIII" });
    expect(result.value.error).not.toBeNull();
  });

  it("rejects a decimal out of the 1-3999 range", () => {
    const result = calculateRomanNumeral({ direction: "toRoman", decimalValue: 4000, romanValue: "" });
    expect(result.value.error).not.toBeNull();
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRomanNumeral({ direction: "toRoman", decimalValue: 1994, romanValue: "" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
