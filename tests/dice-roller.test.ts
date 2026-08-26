import { describe, expect, it } from "vitest";
import { rollDice } from "@/lib/calc/dice-roller";

function sequenceRng(values: number[]): () => number {
  let i = 0;
  return () => values[i++ % values.length];
}

describe("rollDice — worked example", () => {
  it("with a fixed rng, produces deterministic rolls", () => {
    const result = rollDice({ numDice: 2, sides: 6 }, sequenceRng([0, 0.999]));
    expect(result.value.rolls).toEqual([1, 6]);
    expect(result.value.total).toBe(7);
  });
});

describe("rollDice — boundary cases", () => {
  it("every roll with real randomness stays within [1, sides]", () => {
    const result = rollDice({ numDice: 20, sides: 20 });
    for (const roll of result.value.rolls) {
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(20);
    }
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = rollDice({ numDice: 2, sides: 6 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
