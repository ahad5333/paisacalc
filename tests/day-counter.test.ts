import { describe, expect, it } from "vitest";
import { calculateDayCounter } from "@/lib/calc/day-counter";
import { toEpochDay } from "@/lib/date-utils";

describe("calculateDayCounter — worked example", () => {
  it("2026-01-01 to 2026-01-08 is 7 days", () => {
    const result = calculateDayCounter({ startEpochDay: toEpochDay("2026-01-01"), endEpochDay: toEpochDay("2026-01-08") });
    expect(result.value.totalDays).toBe(7);
    expect(result.value.weekdays + result.value.weekendDays).toBe(7);
  });
});

describe("calculateDayCounter — boundary cases", () => {
  it("the same date twice gives 0 days", () => {
    const result = calculateDayCounter({ startEpochDay: toEpochDay("2026-01-01"), endEpochDay: toEpochDay("2026-01-01") });
    expect(result.value.totalDays).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDayCounter({ startEpochDay: toEpochDay("2026-01-01"), endEpochDay: toEpochDay("2026-01-08") });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
