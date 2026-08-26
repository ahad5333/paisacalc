import type { CalcResult } from "./types";
import { type SolidShape, surfaceAreaCube, surfaceAreaBox, surfaceAreaSphere, surfaceAreaCylinder, surfaceAreaCone } from "./geometry-utils";

export type { SolidShape } from "./geometry-utils";

export type SurfaceAreaInputs = {
  shape: SolidShape;
  a: number;
  b: number;
  height: number;
};

export function calculateSurfaceArea(inputs: SurfaceAreaInputs): CalcResult<{ surfaceArea: number }> {
  const { shape, a, b, height } = inputs;
  let surfaceArea: number;
  let formula: string;

  switch (shape) {
    case "cube":
      surfaceArea = surfaceAreaCube(a);
      formula = `6 × ${a}²`;
      break;
    case "box":
      surfaceArea = surfaceAreaBox(a, b, height);
      formula = `2 × (${a}×${b} + ${a}×${height} + ${b}×${height})`;
      break;
    case "sphere":
      surfaceArea = surfaceAreaSphere(a);
      formula = `4 × π × ${a}²`;
      break;
    case "cylinder":
      surfaceArea = surfaceAreaCylinder(a, height);
      formula = `2 × π × ${a} × (${a} + ${height})`;
      break;
    case "cone":
      surfaceArea = surfaceAreaCone(a, height);
      formula = `π × ${a} × (${a} + slant height)`;
      break;
  }
  surfaceArea = Math.round(surfaceArea * 10000) / 10000;

  return {
    value: { surfaceArea },
    steps: [{ label: `Surface area (${shape})`, formula, value: surfaceArea }],
    assumptions: shape === "cone" ? ["Slant height is derived from the radius and height via the Pythagorean theorem"] : [],
    rulesVersion: "Standard 3D surface area formulas",
  };
}
