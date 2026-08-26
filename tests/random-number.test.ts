import { describe, expect, it } from "vitest";
import { generateRandomNumbers } from "@/lib/calc/random-number";

function sequenceRng(values: number[]): () => number {
  let i = 0;
  return () => values[i++ % values.length];
}

describe("generateRandomNumbers — worked example", () => {
  it("with a fixed rng, produces deterministic whole numbers in range", () => {
    const result = generateRandomNumbers(
      { min: 1, max: 10, count: 3, wholeNumbers: true, allowDuplicates: true },
      sequenceRng([0, 0.5, 0.999]),
    );
    expect(result.value.numbers).toEqual([1, 6, 10]);
  });
});

describe("generateRandomNumbers — boundary cases", () => {
  it("every generated number stays within [min, max] using real randomness", () => {
    const result = generateRandomNumbers({ min: 5, max: 15, count: 50, wholeNumbers: true, allowDuplicates: true });
    for (const n of result.value.numbers) {
      expect(n).toBeGreaterThanOrEqual(5);
      expect(n).toBeLessThanOrEqual(15);
    }
  });

  it("no-duplicates mode never repeats a value", () => {
    const result = generateRandomNumbers({ min: 1, max: 20, count: 15, wholeNumbers: true, allowDuplicates: false });
    const unique = new Set(result.value.numbers);
    expect(unique.size).toBe(result.value.numbers.length);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = generateRandomNumbers({ min: 1, max: 10, count: 3, wholeNumbers: true, allowDuplicates: true });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
