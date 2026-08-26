import { describe, expect, it } from "vitest";
import { calculateDateCalculator } from "@/lib/calc/date-calculator";
import { toEpochDay } from "@/lib/date-utils";

describe("calculateDateCalculator — worked example", () => {
  it("adds 1 month to 31 Jan, landing on the last day of Feb", () => {
    const result = calculateDateCalculator({
      startEpochDay: toEpochDay("2026-01-31"),
      days: 0,
      weeks: 0,
      months: 1,
      years: 0,
      operation: "add",
    });
    // 2026 is not a leap year, so Feb has 28 days.
    expect(result.value.resultEpochDay).toBe(toEpochDay("2026-02-28"));
  });
});

describe("calculateDateCalculator — boundary cases", () => {
  it("subtracting reverses adding the same amount", () => {
    const start = toEpochDay("2026-06-15");
    const added = calculateDateCalculator({ startEpochDay: start, days: 10, weeks: 0, months: 0, years: 0, operation: "add" });
    const subtracted = calculateDateCalculator({
      startEpochDay: added.value.resultEpochDay,
      days: 10,
      weeks: 0,
      months: 0,
      years: 0,
      operation: "subtract",
    });
    expect(subtracted.value.resultEpochDay).toBe(start);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDateCalculator({ startEpochDay: toEpochDay("2026-01-01"), days: 5, weeks: 0, months: 0, years: 0, operation: "add" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
