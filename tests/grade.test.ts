import { describe, expect, it } from "vitest";
import { calculateGrade } from "@/lib/calc/grade";

describe("calculateGrade — worked example", () => {
  it("90% at 50% weight, 80% at 50% weight", () => {
    const result = calculateGrade({ assignments: [{ score: 90, weightPct: 50 }, { score: 80, weightPct: 50 }] });
    expect(result.value.weightedAveragePct).toBe(85);
    expect(result.value.letterGrade).toBe("B");
  });
});

describe("calculateGrade — boundary cases", () => {
  it("a 95% average maps to an A", () => {
    const result = calculateGrade({ assignments: [{ score: 95, weightPct: 100 }] });
    expect(result.value.letterGrade).toBe("A");
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateGrade({ assignments: [{ score: 90, weightPct: 100 }] });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
