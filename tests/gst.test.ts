import { describe, expect, it } from "vitest";
import { calculateGst } from "@/lib/calc/gst";

// Plain percentage arithmetic — no external worked example needed, these
// are hand-computed and round-trip-checked (add then remove returns the
// original amount) directly against the formula.
describe("calculateGst — add mode", () => {
  it("₹10,000 base @ 18%", () => {
    const result = calculateGst({ amount: 10000, gstRatePercent: 18, mode: "add" });
    expect(result.value.gstAmount).toBe(1800);
    expect(result.value.totalAmount).toBe(11800);
  });

  it("₹2,000 base @ 5%", () => {
    const result = calculateGst({ amount: 2000, gstRatePercent: 5, mode: "add" });
    expect(result.value.gstAmount).toBe(100);
    expect(result.value.totalAmount).toBe(2100);
  });

  it("₹1,00,000 base @ 40%", () => {
    const result = calculateGst({ amount: 100000, gstRatePercent: 40, mode: "add" });
    expect(result.value.gstAmount).toBe(40000);
    expect(result.value.totalAmount).toBe(140000);
  });

  it("0% rate leaves the price unchanged", () => {
    const result = calculateGst({ amount: 500, gstRatePercent: 0, mode: "add" });
    expect(result.value.gstAmount).toBe(0);
    expect(result.value.totalAmount).toBe(500);
  });
});

describe("calculateGst — remove mode", () => {
  it("₹11,800 total @ 18% recovers a ₹10,000 base", () => {
    const result = calculateGst({ amount: 11800, gstRatePercent: 18, mode: "remove" });
    expect(result.value.baseAmount).toBe(10000);
    expect(result.value.gstAmount).toBe(1800);
  });

  it("₹2,100 total @ 5% recovers a ₹2,000 base", () => {
    const result = calculateGst({ amount: 2100, gstRatePercent: 5, mode: "remove" });
    expect(result.value.baseAmount).toBe(2000);
  });

  it("₹1,40,000 total @ 40% recovers a ₹1,00,000 base", () => {
    const result = calculateGst({ amount: 140000, gstRatePercent: 40, mode: "remove" });
    expect(result.value.baseAmount).toBe(100000);
  });
});

describe("calculateGst — add/remove round-trip", () => {
  it.each([
    [10000, 18],
    [2000, 5],
    [100000, 40],
    [7777, 3],
  ])("adding then removing GST on %i @ %i%% returns the original amount", (amount, rate) => {
    const added = calculateGst({ amount, gstRatePercent: rate, mode: "add" });
    const removed = calculateGst({
      amount: added.value.totalAmount,
      gstRatePercent: rate,
      mode: "remove",
    });
    expect(removed.value.baseAmount).toBe(amount);
  });
});
