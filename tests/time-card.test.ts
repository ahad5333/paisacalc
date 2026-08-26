import { describe, expect, it } from "vitest";
import { calculateTimeCard } from "@/lib/calc/time-card";

describe("calculateTimeCard — worked example", () => {
  it("five 8-hour days totals 40 hours, all regular", () => {
    const day = { clockInH: 9, clockInM: 0, clockOutH: 17, clockOutM: 0, breakMinutes: 0 };
    const result = calculateTimeCard({ days: [day, day, day, day, day], overtimeThresholdHours: 40 });
    expect(result.value.totalHours).toBe(40);
    expect(result.value.regularHours).toBe(40);
    expect(result.value.overtimeHours).toBe(0);
  });
});

describe("calculateTimeCard — boundary cases", () => {
  it("hours beyond the threshold count as overtime", () => {
    const day = { clockInH: 9, clockInM: 0, clockOutH: 18, clockOutM: 0, breakMinutes: 0 };
    const result = calculateTimeCard({ days: [day, day, day, day, day], overtimeThresholdHours: 40 });
    expect(result.value.totalHours).toBe(45);
    expect(result.value.regularHours).toBe(40);
    expect(result.value.overtimeHours).toBe(5);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const day = { clockInH: 9, clockInM: 0, clockOutH: 17, clockOutM: 0, breakMinutes: 0 };
    const result = calculateTimeCard({ days: [day], overtimeThresholdHours: 40 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
