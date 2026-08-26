import type { CalcResult } from "./types";

export type RandomNumberInputs = {
  min: number;
  max: number;
  count: number;
  wholeNumbers: boolean;
  allowDuplicates: boolean;
};

export type RandomNumberValue = {
  numbers: number[];
};

function randomInRange(min: number, max: number, wholeNumbers: boolean, rng: () => number): number {
  if (wholeNumbers) return Math.floor(rng() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
  return Math.round((rng() * (max - min) + min) * 10000) / 10000;
}

// Accepts an injectable rng (defaulting to Math.random) so this stays a
// testable pure function — tests pass a seeded generator to assert exact
// output, while the real page always uses genuine randomness.
export function generateRandomNumbers(inputs: RandomNumberInputs, rng: () => number = Math.random): CalcResult<RandomNumberValue> {
  const { min, max, count, wholeNumbers, allowDuplicates } = inputs;
  const numbers: number[] = [];

  if (allowDuplicates || !wholeNumbers) {
    for (let i = 0; i < count; i++) numbers.push(randomInRange(min, max, wholeNumbers, rng));
  } else {
    const poolSize = Math.floor(max) - Math.ceil(min) + 1;
    const pool = Array.from({ length: poolSize }, (_, i) => Math.ceil(min) + i);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    numbers.push(...pool.slice(0, Math.min(count, pool.length)));
  }

  return {
    value: { numbers },
    steps: [{ label: `${count} random number${count === 1 ? "" : "s"}`, formula: `between ${min} and ${max}`, value: numbers.join(", ") }],
    assumptions: [
      wholeNumbers ? "Generates whole numbers only" : "Generates decimal numbers, rounded to 4 places",
      !allowDuplicates && wholeNumbers
        ? "No duplicates — if the requested count exceeds the number of possible values in range, fewer numbers are returned"
        : "Duplicates are allowed, since each number is drawn independently",
    ],
    rulesVersion: "Uniform random distribution",
  };
}
