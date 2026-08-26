import { describe, expect, it } from "vitest";
import { calculateTimeDuration } from "@/lib/calc/time-duration";
import { toEpochDay } from "@/lib/date-utils";

describe("calculateTimeDuration — worked example", () => {
  it("2026-01-01 09:00 to 2026-01-03 17:30", () => {
    const result = calculateTimeDuration({
      startEpochDay: toEpochDay("2026-01-01"),
      startH: 9,
      startM: 0,
      endEpochDay: toEpochDay("2026-01-03"),
      endH: 17,
      endM: 30,
    });
    expect(result.value.days).toBe(2);
    expect(result.value.hours).toBe(8);
    expect(result.value.minutes).toBe(30);
  });
});

describe("calculateTimeDuration — boundary cases", () => {
  it("an end before the start clamps to zero", () => {
    const result = calculateTimeDuration({
      startEpochDay: toEpochDay("2026-01-05"),
      startH: 9,
      startM: 0,
      endEpochDay: toEpochDay("2026-01-01"),
      endH: 9,
      endM: 0,
    });
    expect(result.value.totalMinutes).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateTimeDuration({
      startEpochDay: toEpochDay("2026-01-01"),
      startH: 9,
      startM: 0,
      endEpochDay: toEpochDay("2026-01-03"),
      endH: 17,
      endM: 30,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
