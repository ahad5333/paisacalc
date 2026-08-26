import { describe, expect, it } from "vitest";
import { calculateProbability } from "@/lib/calc/probability";

describe("calculateProbability — worked example", () => {
  it("P(A)=50%, P(B)=50% -> P(A and B)=25%, P(A or B)=75%", () => {
    const result = calculateProbability({ probAPct: 50, probBPct: 50 });
    expect(result.value.probAandB).toBe(25);
    expect(result.value.probAorB).toBe(75);
    expect(result.value.probNotA).toBe(50);
  });
});

describe("calculateProbability — boundary cases", () => {
  it("a certain event (100%) combined with anything gives P(A or B)=100%", () => {
    const result = calculateProbability({ probAPct: 100, probBPct: 30 });
    expect(result.value.probAorB).toBe(100);
    expect(result.value.probNotA).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateProbability({ probAPct: 50, probBPct: 50 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
