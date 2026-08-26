import { describe, expect, it } from "vitest";
import { calculateConception } from "@/lib/calc/conception";
import { toEpochDay } from "@/lib/date-utils";

describe("calculateConception — worked example", () => {
  it("from a due date", () => {
    const dueDate = toEpochDay("2026-10-08");
    const result = calculateConception({ referenceEpochDay: dueDate, referenceType: "dueDate" });
    expect(dueDate - result.value.conceptionEpochDay).toBe(266);
    expect(result.value.lmpEstimateEpochDay).toBe(result.value.conceptionEpochDay - 14);
  });
});

describe("calculateConception — boundary cases", () => {
  it("conception window is symmetric around the estimated conception date", () => {
    const result = calculateConception({ referenceEpochDay: toEpochDay("2026-10-08"), referenceType: "birthDate" });
    const { conceptionEpochDay, conceptionWindowStartEpochDay, conceptionWindowEndEpochDay } = result.value;
    expect(conceptionEpochDay - conceptionWindowStartEpochDay).toBe(conceptionWindowEndEpochDay - conceptionEpochDay);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateConception({ referenceEpochDay: toEpochDay("2026-10-08"), referenceType: "dueDate" });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
