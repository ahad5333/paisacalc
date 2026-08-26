import type { CalcResult } from "./types";

export type TireSizeInputs = {
  widthMm: number;
  aspectRatioPct: number;
  rimDiameterIn: number;
};

export type TireSizeValue = {
  sidewallHeightMm: number;
  overallDiameterIn: number;
  circumferenceIn: number;
  revsPerMile: number;
};

export function calculateTireSize(inputs: TireSizeInputs): CalcResult<TireSizeValue> {
  const { widthMm, aspectRatioPct, rimDiameterIn } = inputs;
  const sidewallHeightMm = Math.round(((widthMm * aspectRatioPct) / 100) * 100) / 100;
  const overallDiameterIn = Math.round((rimDiameterIn + (2 * sidewallHeightMm) / 25.4) * 1000) / 1000;
  const circumferenceIn = Math.round(overallDiameterIn * Math.PI * 1000) / 1000;
  const revsPerMile = Math.round((63360 / circumferenceIn) * 100) / 100;

  return {
    value: { sidewallHeightMm, overallDiameterIn, circumferenceIn, revsPerMile },
    steps: [
      { label: "Sidewall height", formula: `${widthMm}mm × ${aspectRatioPct}%`, value: `${sidewallHeightMm} mm` },
      { label: "Overall diameter", formula: `rim + 2 × sidewall (in inches)`, value: `${overallDiameterIn} in` },
      { label: "Revolutions per mile", formula: "63,360 in/mile ÷ circumference", value: revsPerMile },
    ],
    assumptions: ["Sidewall height is calculated as a percentage of tread width (the tire's aspect ratio) — the standard convention printed on every tire's sidewall (e.g. 225/45R17)"],
    rulesVersion: "Standard tire size geometry",
  };
}
