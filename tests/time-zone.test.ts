import { describe, expect, it } from "vitest";
import { calculateTimeZone } from "@/lib/calc/time-zone";

describe("calculateTimeZone — worked example", () => {
  it("14:30 UTC+5:30 (IST) to UTC+0 is 09:00, same day", () => {
    const result = calculateTimeZone({ hour: 14, minute: 30, fromOffsetHours: 5.5, toOffsetHours: 0 });
    expect(result.value.resultHour).toBe(9);
    expect(result.value.resultMinute).toBe(0);
    expect(result.value.dayOffset).toBe(0);
  });
});

describe("calculateTimeZone — boundary cases", () => {
  it("crossing midnight forward increments the day offset", () => {
    const result = calculateTimeZone({ hour: 23, minute: 0, fromOffsetHours: 0, toOffsetHours: 5 });
    expect(result.value.dayOffset).toBe(1);
  });

  it("crossing midnight backward decrements the day offset", () => {
    const result = calculateTimeZone({ hour: 1, minute: 0, fromOffsetHours: 5, toOffsetHours: 0 });
    expect(result.value.dayOffset).toBe(-1);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateTimeZone({ hour: 14, minute: 30, fromOffsetHours: 5.5, toOffsetHours: 0 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
