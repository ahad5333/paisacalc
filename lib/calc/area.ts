import type { CalcResult } from "./types";

export type AreaShape = "square" | "rectangle" | "circle" | "triangle" | "trapezoid";

export type AreaInputs = {
  shape: AreaShape;
  a: number; // side / length / radius / base
  b: number; // width / base2 (unused for square, circle)
  height: number; // for triangle, trapezoid
};

export function calculateArea(inputs: AreaInputs): CalcResult<{ area: number }> {
  const { shape, a, b, height } = inputs;
  let area: number;
  let formula: string;

  switch (shape) {
    case "square":
      area = a * a;
      formula = `${a}²`;
      break;
    case "rectangle":
      area = a * b;
      formula = `${a} × ${b}`;
      break;
    case "circle":
      area = Math.PI * a * a;
      formula = `π × ${a}²`;
      break;
    case "triangle":
      area = 0.5 * a * height;
      formula = `0.5 × ${a} × ${height}`;
      break;
    case "trapezoid":
      area = 0.5 * (a + b) * height;
      formula = `0.5 × (${a} + ${b}) × ${height}`;
      break;
  }
  area = Math.round(area * 10000) / 10000;

  return {
    value: { area },
    steps: [{ label: `Area (${shape})`, formula, value: area }],
    assumptions: [],
    rulesVersion: "Standard 2D area formulas",
  };
}
