import { describe, expect, it } from "vitest";
import { calculateShoeSize } from "@/lib/calc/shoe-size";

describe("calculateShoeSize — worked example", () => {
  it("US Men's 10 converts to EU 43", () => {
    const result = calculateShoeSize({ size: 10, system: "usMen" });
    expect(result.value.eu).toBe(43);
  });
});

describe("calculateShoeSize — boundary cases", () => {
  it("converting EU back to US Men's roughly round-trips", () => {
    const original = calculateShoeSize({ size: 10, system: "usMen" });
    const roundTrip = calculateShoeSize({ size: original.value.eu, system: "eu" });
    expect(roundTrip.value.usMen).toBe(10);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateShoeSize({ size: 10, system: "usMen" });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.rulesVersion).toBeTruthy();
  });
});
