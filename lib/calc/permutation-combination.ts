import type { CalcResult } from "./types";

export type PermutationCombinationInputs = {
  n: number;
  r: number;
};

function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export function calculatePermutationCombination(inputs: PermutationCombinationInputs): CalcResult<{ permutations: number; combinations: number }> {
  const { n, r } = inputs;
  const valid = n >= 0 && r >= 0 && r <= n && n <= 170;
  const permutations = valid ? factorial(n) / factorial(n - r) : NaN;
  const combinations = valid ? permutations / factorial(r) : NaN;

  return {
    value: { permutations, combinations },
    steps: [
      { label: `Permutations (nPr)`, formula: `${n}! ÷ (${n}−${r})!`, value: valid ? permutations : "undefined" },
      { label: `Combinations (nCr)`, formula: `nPr ÷ ${r}!`, value: valid ? combinations : "undefined" },
    ],
    assumptions: [
      "Permutations count arrangements where order matters; combinations count selections where order doesn't",
      "n must be at least r, and both non-negative — n is also capped at 170 here, since 171! exceeds the range a standard floating-point number can represent exactly",
    ],
    rulesVersion: "Standard permutations and combinations",
  };
}
