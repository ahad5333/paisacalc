import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatIndianNumber,
  formatPercent,
  toPlainDigits,
} from "@/lib/format";

describe("formatIndianNumber", () => {
  it("formats zero", () => {
    expect(formatIndianNumber(0)).toBe("0");
  });

  it("groups thousands, lakhs, and crores in the Indian style", () => {
    expect(formatIndianNumber(1000)).toBe("1,000");
    expect(formatIndianNumber(100000)).toBe("1,00,000"); // 1 lakh
    expect(formatIndianNumber(4000000)).toBe("40,00,000"); // 40 lakh
    expect(formatIndianNumber(10000000)).toBe("1,00,00,000"); // 1 crore
  });

  it("handles negative values", () => {
    expect(formatIndianNumber(-100000)).toBe("-1,00,000");
  });

  it("never renders NaN or Infinity", () => {
    expect(formatIndianNumber(NaN)).toBe("—");
    expect(formatIndianNumber(Infinity)).toBe("—");
  });

  it("preserves a genuine fractional value instead of rounding it to a whole number", () => {
    // Regression: an earlier .toFixed(0) silently rounded every decimal
    // input's display (e.g. an 8.5% interest rate showing as "9") while
    // the underlying state and calculations stayed correct — a mismatch
    // between what the field said and what it actually held.
    expect(formatIndianNumber(8.5)).toBe("8.5");
    expect(formatIndianNumber(1.5)).toBe("1.5");
    expect(formatIndianNumber(100000.25)).toBe("1,00,000.25");
  });

  it("absorbs floating-point noise without introducing spurious decimals", () => {
    expect(formatIndianNumber(8.499999999999998)).toBe("8.5");
  });
});

describe("formatCurrency", () => {
  it("prefixes the rupee symbol and rounds to the nearest rupee", () => {
    expect(formatCurrency(4000000)).toBe("₹40,00,000");
    expect(formatCurrency(34712.6)).toBe("₹34,713");
  });
});

describe("formatPercent", () => {
  it("formats with two decimals by default", () => {
    expect(formatPercent(8.5)).toBe("8.50%");
  });
});

describe("toPlainDigits", () => {
  it("strips currency symbol, commas, and spaces", () => {
    expect(toPlainDigits("₹40,00,000")).toBe("4000000");
  });
});
