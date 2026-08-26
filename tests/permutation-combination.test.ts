import { describe, expect, it } from "vitest";
import { calculatePermutationCombination } from "@/lib/calc/permutation-combination";

describe("calculatePermutationCombination — worked example", () => {
  it("nPr and nCr for n=5, r=2", () => {
    const result = calculatePermutationCombination({ n: 5, r: 2 });
    expect(result.value.permutations).toBe(20);
    expect(result.value.combinations).toBe(10);
  });
});

describe("calculatePermutationCombination — boundary cases", () => {
  it("r=0 gives exactly 1 permutation and 1 combination", () => {
    const result = calculatePermutationCombination({ n: 5, r: 0 });
    expect(result.value.permutations).toBe(1);
    expect(result.value.combinations).toBe(1);
  });

  it("r > n is invalid and returns NaN", () => {
    const result = calculatePermutationCombination({ n: 3, r: 5 });
    expect(Number.isNaN(result.value.permutations)).toBe(true);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePermutationCombination({ n: 5, r: 2 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
