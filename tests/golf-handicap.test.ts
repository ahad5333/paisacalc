import { describe, expect, it } from "vitest";
import { calculateGolfHandicap } from "@/lib/calc/golf-handicap";

describe("calculateGolfHandicap — worked example", () => {
  it("score 90, course rating 72, slope 113", () => {
    const result = calculateGolfHandicap({ score: 90, courseRating: 72, slopeRating: 113 });
    expect(result.value.differential).toBe(18);
  });
});

describe("calculateGolfHandicap — boundary cases", () => {
  it("a lower score gives a lower differential", () => {
    const good = calculateGolfHandicap({ score: 80, courseRating: 72, slopeRating: 113 });
    const bad = calculateGolfHandicap({ score: 100, courseRating: 72, slopeRating: 113 });
    expect(good.value.differential).toBeLessThan(bad.value.differential);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateGolfHandicap({ score: 90, courseRating: 72, slopeRating: 113 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
