import type { CalcResult } from "./types";

export type RightTriangleInputs = {
  legA: number;
  legB: number;
};

export type RightTriangleValue = {
  hypotenuse: number;
  area: number;
  perimeter: number;
  angleA: number;
  angleB: number;
};

export function calculateRightTriangle(inputs: RightTriangleInputs): CalcResult<RightTriangleValue> {
  const { legA, legB } = inputs;
  const round = (n: number) => Math.round(n * 10000) / 10000;

  const hypotenuse = round(Math.sqrt(legA * legA + legB * legB));
  const area = round(0.5 * legA * legB);
  const perimeter = round(legA + legB + hypotenuse);
  const angleA = round((Math.atan(legA / legB) * 180) / Math.PI);
  const angleB = round(90 - angleA);

  return {
    value: { hypotenuse, area, perimeter, angleA, angleB },
    steps: [
      { label: "Hypotenuse", formula: "√(a² + b²)", value: hypotenuse },
      { label: "Area", formula: "0.5 × a × b", value: area },
      { label: "Perimeter", formula: "a + b + hypotenuse", value: perimeter },
      { label: "Angles", formula: "arctan(a/b) and its complement", value: `${angleA}°, ${angleB}°` },
    ],
    assumptions: ["Assumes legA and legB are the two legs (the sides forming the right angle), not the hypotenuse"],
    rulesVersion: "Pythagorean theorem, right-triangle trigonometry",
  };
}
