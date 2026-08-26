import type { CalcResult } from "./types";

export type TriangleInputs = {
  a: number;
  b: number;
  c: number;
};

export type TriangleValue = {
  valid: boolean;
  area: number;
  perimeter: number;
  angleA: number;
  angleB: number;
  angleC: number;
};

function lawOfCosinesAngle(opposite: number, side1: number, side2: number): number {
  const cosAngle = (side1 * side1 + side2 * side2 - opposite * opposite) / (2 * side1 * side2);
  return Math.round(((Math.acos(Math.max(-1, Math.min(1, cosAngle))) * 180) / Math.PI) * 100) / 100;
}

// Solved from three known side lengths (SSS) — Heron's formula for area,
// then the law of cosines for each angle in turn.
export function calculateTriangle(inputs: TriangleInputs): CalcResult<TriangleValue> {
  const { a, b, c } = inputs;
  const valid = a + b > c && a + c > b && b + c > a && a > 0 && b > 0 && c > 0;

  if (!valid) {
    return {
      value: { valid: false, area: NaN, perimeter: a + b + c, angleA: NaN, angleB: NaN, angleC: NaN },
      steps: [{ label: "Triangle inequality check", formula: "each side must be less than the sum of the other two", value: "failed — not a valid triangle" }],
      assumptions: ["A triangle can only exist if every side is shorter than the sum of the other two sides"],
      rulesVersion: "Heron's formula, law of cosines",
    };
  }

  const perimeter = Math.round((a + b + c) * 10000) / 10000;
  const s = perimeter / 2;
  const area = Math.round(Math.sqrt(s * (s - a) * (s - b) * (s - c)) * 10000) / 10000;
  const angleA = lawOfCosinesAngle(a, b, c);
  const angleB = lawOfCosinesAngle(b, a, c);
  const angleC = Math.round((180 - angleA - angleB) * 100) / 100;

  return {
    value: { valid: true, area, perimeter, angleA, angleB, angleC },
    steps: [
      { label: "Area (Heron's formula)", formula: "√(s(s−a)(s−b)(s−c))", value: area },
      { label: "Angle opposite side a", formula: "law of cosines", value: `${angleA}°` },
      { label: "Angle opposite side b", formula: "law of cosines", value: `${angleB}°` },
      { label: "Angle opposite side c", formula: "180° − other two angles", value: `${angleC}°` },
    ],
    assumptions: ["Solved from three known side lengths (SSS) — Heron's formula for area, then the law of cosines for each angle"],
    rulesVersion: "Heron's formula, law of cosines",
  };
}
