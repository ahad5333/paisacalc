import { describe, expect, it } from "vitest";
import { calculatePace } from "@/lib/calc/pace";

describe("calculatePace — worked example", () => {
  it("10km in 52 minutes", () => {
    const result = calculatePace({ distanceKm: 10, timeMinutes: 52 });
    expect(result.value.paceMinPerKm).toBe(5.2);
    expect(result.value.paceMinutesPart).toBe(5);
    expect(result.value.paceSecondsPart).toBe(12);
    expect(result.value.speedKmh).toBe(11.54);
  });
});

describe("calculatePace — boundary cases", () => {
  it("a round pace (exactly 5 min/km) has zero seconds part", () => {
    const result = calculatePace({ distanceKm: 10, timeMinutes: 50 });
    expect(result.value.paceMinutesPart).toBe(5);
    expect(result.value.paceSecondsPart).toBe(0);
  });

  it("faster time over the same distance gives a lower pace and higher speed", () => {
    const slow = calculatePace({ distanceKm: 5, timeMinutes: 30 });
    const fast = calculatePace({ distanceKm: 5, timeMinutes: 25 });
    expect(fast.value.paceMinPerKm).toBeLessThan(slow.value.paceMinPerKm);
    expect(fast.value.speedKmh).toBeGreaterThan(slow.value.speedKmh);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePace({ distanceKm: 10, timeMinutes: 52 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
