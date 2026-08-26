import { describe, expect, it } from "vitest";
import { calculateDayOfWeek } from "@/lib/calc/day-of-week";
import { toEpochDay } from "@/lib/date-utils";

describe("calculateDayOfWeek — worked example", () => {
  it("2026-08-19 is a Wednesday", () => {
    const result = calculateDayOfWeek({ epochDay: toEpochDay("2026-08-19") });
    expect(result.value.dayName).toBe("Wednesday");
  });
});

describe("calculateDayOfWeek — boundary cases", () => {
  it("returns a full CalcResult with steps and a rules version", () => {
    const result = calculateDayOfWeek({ epochDay: toEpochDay("2026-08-19") });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
