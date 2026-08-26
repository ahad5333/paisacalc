import type { CalcResult } from "./types";
import { lcmMany, primeFactorize } from "./math-utils";

export type LcmInputs = {
  a: number;
  b: number;
  c: number;
};

function formatFactorization(n: number): string {
  const factors = primeFactorize(n);
  if (factors.length === 0) return `${n}`;
  return factors.map((f) => (f.exponent === 1 ? `${f.prime}` : `${f.prime}^${f.exponent}`)).join(" × ");
}

export function calculateLcm(inputs: LcmInputs): CalcResult<{ lcm: number }> {
  const { a, b, c } = inputs;
  const result = lcmMany([a, b, c]);

  return {
    value: { lcm: result },
    steps: [
      { label: "Prime factorisation of each number", formula: `${a}, ${b}, ${c}`, value: `${formatFactorization(a)}  |  ${formatFactorization(b)}  |  ${formatFactorization(c)}` },
      { label: "Least common multiple", formula: `lcm(${a}, ${b}, ${c})`, value: result },
    ],
    assumptions: ["Computed by taking the highest power of every prime factor appearing in any of the numbers"],
    rulesVersion: "Standard LCM via prime factorisation",
  };
}
