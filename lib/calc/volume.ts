import type { CalcResult } from "./types";
import { type SolidShape, volumeCube, volumeBox, volumeSphere, volumeCylinder, volumeCone } from "./geometry-utils";

export type { SolidShape } from "./geometry-utils";

export type VolumeInputs = {
  shape: SolidShape;
  a: number; // side / length / radius
  b: number; // width
  height: number;
};

export function calculateVolume(inputs: VolumeInputs): CalcResult<{ volume: number }> {
  const { shape, a, b, height } = inputs;
  let volume: number;
  let formula: string;

  switch (shape) {
    case "cube":
      volume = volumeCube(a);
      formula = `${a}³`;
      break;
    case "box":
      volume = volumeBox(a, b, height);
      formula = `${a} × ${b} × ${height}`;
      break;
    case "sphere":
      volume = volumeSphere(a);
      formula = `(4/3) × π × ${a}³`;
      break;
    case "cylinder":
      volume = volumeCylinder(a, height);
      formula = `π × ${a}² × ${height}`;
      break;
    case "cone":
      volume = volumeCone(a, height);
      formula = `(1/3) × π × ${a}² × ${height}`;
      break;
  }
  volume = Math.round(volume * 10000) / 10000;

  return {
    value: { volume },
    steps: [{ label: `Volume (${shape})`, formula, value: volume }],
    assumptions: [],
    rulesVersion: "Standard 3D volume formulas",
  };
}
