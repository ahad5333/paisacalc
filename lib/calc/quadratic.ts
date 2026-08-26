import type { CalcResult } from "./types";

export type QuadraticInputs = {
  a: number;
  b: number;
  c: number;
};

export type QuadraticValue = {
  discriminant: number;
  root1Display: string;
  root2Display: string;
  natureOfRoots: string;
};

function round(n: number): number {
  return Math.round(n * 10000) / 10000;
}

// ax² + bx + c = 0, solved via the quadratic formula. The discriminant
// (b² − 4ac) determines the nature of the roots before computing them:
// positive gives two distinct real roots, zero gives one repeated real
// root, negative gives two complex conjugate roots.
export function calculateQuadratic(inputs: QuadraticInputs): CalcResult<QuadraticValue> {
  const { a, b, c } = inputs;
  const discriminant = round(b * b - 4 * a * c);

  let root1Display: string;
  let root2Display: string;
  let natureOfRoots: string;

  if (discriminant > 0) {
    const sqrtD = Math.sqrt(discriminant);
    root1Display = `${round((-b + sqrtD) / (2 * a))}`;
    root2Display = `${round((-b - sqrtD) / (2 * a))}`;
    natureOfRoots = "Two distinct real roots";
  } else if (discriminant === 0) {
    const r = round(-b / (2 * a));
    root1Display = `${r}`;
    root2Display = `${r}`;
    natureOfRoots = "One repeated real root";
  } else {
    const realPart = round(-b / (2 * a));
    const imagPart = round(Math.sqrt(-discriminant) / (2 * a));
    root1Display = `${realPart} + ${imagPart}i`;
    root2Display = `${realPart} − ${imagPart}i`;
    natureOfRoots = "Two complex conjugate roots";
  }

  return {
    value: { discriminant, root1Display, root2Display, natureOfRoots },
    steps: [
      { label: "Discriminant", formula: `${b}² − 4×${a}×${c}`, value: discriminant },
      { label: `Roots (${natureOfRoots.toLowerCase()})`, formula: "(−b ± √discriminant) ÷ 2a", value: `${root1Display}, ${root2Display}` },
    ],
    assumptions: [
      "Requires a ≠ 0 — if a is zero, the equation is linear, not quadratic, and this formula doesn't apply",
      "A negative discriminant gives complex (non-real) roots, shown in the form real ± imaginary·i",
    ],
    rulesVersion: "Standard quadratic formula",
  };
}
