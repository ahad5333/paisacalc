import type { CalcResult } from "./types";

export type PythagoreanUnknown = "a" | "b" | "c";

export type PythagoreanInputs = {
  a: number;
  b: number;
  c: number;
  unknown: PythagoreanUnknown;
};

export function calculatePythagorean(inputs: PythagoreanInputs): CalcResult<{ result: number }> {
  const { a, b, c, unknown } = inputs;
  let result: number;
  let formula: string;

  if (unknown === "c") {
    result = Math.sqrt(a * a + b * b);
    formula = "√(a² + b²)";
  } else if (unknown === "b") {
    result = Math.sqrt(c * c - a * a);
    formula = "√(c² − a²)";
  } else {
    result = Math.sqrt(c * c - b * b);
    formula = "√(c² − b²)";
  }
  result = Math.round(result * 10000) / 10000;

  return {
    value: { result },
    steps: [{ label: `Solve for ${unknown}`, formula, value: Number.isNaN(result) ? "undefined (c must be the longest side)" : result }],
    assumptions: ["c must always be the hypotenuse (the longest side), and must be longer than whichever other side is known — otherwise there's no valid right triangle"],
    rulesVersion: "Pythagorean theorem (a² + b² = c²)",
  };
}
