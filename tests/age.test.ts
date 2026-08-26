import { describe, expect, it } from "vitest";
import { calculateAge } from "@/lib/calc/age";
import { toEpochDay } from "@/lib/date-utils";

describe("calculateAge — worked example", () => {
  it("born 2000-05-15, as of 2026-08-19", () => {
    const result = calculateAge({ birthEpochDay: toEpochDay("2000-05-15"), asOfEpochDay: toEpochDay("2026-08-19") });
    expect(result.value.years).toBe(26);
    expect(result.value.months).toBe(3);
    expect(result.value.days).toBe(4);
  });
});

describe("calculateAge — boundary cases", () => {
  it("the day before a birthday shows 0 days until next birthday is 1", () => {
    const result = calculateAge({ birthEpochDay: toEpochDay("2000-05-15"), asOfEpochDay: toEpochDay("2026-05-14") });
    expect(result.value.daysUntilNextBirthday).toBe(1);
  });

  it("on the exact birthday, next birthday is exactly a year away", () => {
    const result = calculateAge({ birthEpochDay: toEpochDay("2000-05-15"), asOfEpochDay: toEpochDay("2026-05-15") });
    expect(result.value.years).toBe(26);
    expect(result.value.months).toBe(0);
    expect(result.value.days).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateAge({ birthEpochDay: toEpochDay("2000-05-15"), asOfEpochDay: toEpochDay("2026-08-19") });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
