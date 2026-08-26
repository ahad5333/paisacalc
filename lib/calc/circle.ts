import type { CalcResult } from "./types";

export type CircleInputs = {
  radius: number;
};

export type CircleValue = {
  radius: number;
  diameter: number;
  circumference: number;
  area: number;
};

export function calculateCircle(inputs: CircleInputs): CalcResult<CircleValue> {
  const { radius } = inputs;
  const round = (n: number) => Math.round(n * 10000) / 10000;

  const diameter = round(2 * radius);
  const circumference = round(2 * Math.PI * radius);
  const area = round(Math.PI * radius * radius);

  return {
    value: { radius, diameter, circumference, area },
    steps: [
      { label: "Diameter", formula: "2 × radius", value: diameter },
      { label: "Circumference", formula: "2 × π × radius", value: circumference },
      { label: "Area", formula: "π × radius²", value: area },
    ],
    assumptions: [],
    rulesVersion: "Standard circle formulas",
  };
}
