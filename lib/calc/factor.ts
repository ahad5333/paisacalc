import type { CalcResult } from "./types";
import { allFactors, primeFactorize, isPrime } from "./math-utils";

export type FactorInputs = {
  n: number;
};

export type FactorValue = {
  factors: number[];
  primeFactorization: { prime: number; exponent: number }[];
  isPrime: boolean;
};

export function calculateFactor(inputs: FactorInputs): CalcResult<FactorValue> {
  const { n } = inputs;
  const factors = allFactors(n);
  const primeFactorization = primeFactorize(n);
  const prime = isPrime(n);

  const factorizationStr = primeFactorization.map((f) => (f.exponent === 1 ? `${f.prime}` : `${f.prime}^${f.exponent}`)).join(" × ");

  return {
    value: { factors, primeFactorization, isPrime: prime },
    steps: [
      { label: "All factors", formula: `divisors of ${n}`, value: factors.join(", ") },
      { label: "Prime factorization", formula: `${n} as a product of primes`, value: prime ? `${n} (prime)` : factorizationStr },
    ],
    assumptions: ["Factors are found by trial division up to √n, checking every integer that divides n with no remainder"],
    rulesVersion: "Standard factorization by trial division",
  };
}
