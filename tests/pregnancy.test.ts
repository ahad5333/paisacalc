import { describe, expect, it } from "vitest";
import { calculatePregnancy } from "@/lib/calc/pregnancy";
import { toEpochDay } from "@/lib/date-utils";

describe("calculatePregnancy — worked example", () => {
  it("28-day cycle, 59 days after LMP", () => {
    const lmp = toEpochDay("2026-01-01");
    const reference = toEpochDay("2026-03-01"); // 59 days later
    const result = calculatePregnancy({ lmpEpochDay: lmp, cycleLength: 28, referenceEpochDay: reference });
    expect(result.value.dueDateEpochDay - lmp).toBe(280);
    expect(result.value.gestationalWeeks).toBe(8);
    expect(result.value.gestationalDays).toBe(3);
    expect(result.value.trimester).toBe(1);
  });
});

describe("calculatePregnancy — boundary cases", () => {
  it("a longer cycle pushes the due date later by the same number of days", () => {
    const lmp = toEpochDay("2026-01-01");
    const cycle28 = calculatePregnancy({ lmpEpochDay: lmp, cycleLength: 28, referenceEpochDay: lmp });
    const cycle32 = calculatePregnancy({ lmpEpochDay: lmp, cycleLength: 32, referenceEpochDay: lmp });
    expect(cycle32.value.dueDateEpochDay - cycle28.value.dueDateEpochDay).toBe(4);
  });

  it("moves into the third trimester after 27 weeks", () => {
    const lmp = toEpochDay("2026-01-01");
    const reference = lmp + 28 * 7;
    const result = calculatePregnancy({ lmpEpochDay: lmp, cycleLength: 28, referenceEpochDay: reference });
    expect(result.value.trimester).toBe(3);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePregnancy({
      lmpEpochDay: toEpochDay("2026-01-01"),
      cycleLength: 28,
      referenceEpochDay: toEpochDay("2026-03-01"),
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
