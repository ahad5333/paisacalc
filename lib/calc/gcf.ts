import type { CalcResult } from "./types";
import { gcdMany, primeFactorize } from "./math-utils";

export type GcfInputs = {
  a: number;
  b: number;
  c: number;
};

function formatFactorization(n: number): string {
  const factors = primeFactorize(n);
  if (factors.length === 0) return `${n}`;
  return factors.map((f) => (f.exponent === 1 ? `${f.prime}` : `${f.prime}^${f.exponent}`)).join(" × ");
}

export function calculateGcf(inputs: GcfInputs): CalcResult<{ gcf: number }> {
  const { a, b, c } = inputs;
  const result = gcdMany([a, b, c]);

  return {
    value: { gcf: result },
    steps: [
      { label: "Prime factorisation of each number", formula: `${a}, ${b}, ${c}`, value: `${formatFactorization(a)}  |  ${formatFactorization(b)}  |  ${formatFactorization(c)}` },
      { label: "Greatest common factor", formula: `gcf(${a}, ${b}, ${c})`, value: result },
    ],
    assumptions: ["Computed by taking the lowest power of every prime factor common to all of the numbers"],
    rulesVersion: "Standard GCF via prime factorisation (also known as GCD)",
  };
}
