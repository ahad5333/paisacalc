import type { CalcResult } from "./types";

export type ShoeSizeSystem = "usMen" | "usWomen" | "uk" | "eu";

export type ShoeSizeInputs = {
  size: number;
  system: ShoeSizeSystem;
};

export type ShoeSizeValue = {
  usMen: number;
  usWomen: number;
  uk: number;
  eu: number;
};

// Converts through a common US Men's baseline using widely cited
// approximate offsets — real conversions vary by brand and last shape,
// so this is a general reference, not an exact match for every
// manufacturer's own size chart.
export function calculateShoeSize(inputs: ShoeSizeInputs): CalcResult<ShoeSizeValue> {
  const { size, system } = inputs;

  let usMen: number;
  if (system === "usMen") usMen = size;
  else if (system === "usWomen") usMen = size - 1.5;
  else if (system === "uk") usMen = size + 0.5;
  else usMen = size - 33;

  const usWomen = Math.round((usMen + 1.5) * 2) / 2;
  const uk = Math.round((usMen - 0.5) * 2) / 2;
  const eu = Math.round((usMen + 33) * 2) / 2;
  const usMenRounded = Math.round(usMen * 2) / 2;

  return {
    value: { usMen: usMenRounded, usWomen, uk, eu },
    steps: [
      { label: "US Men's", formula: "", value: usMenRounded },
      { label: "US Women's", formula: "US Men's + 1.5", value: usWomen },
      { label: "UK", formula: "US Men's − 0.5", value: uk },
      { label: "EU", formula: "US Men's + 33", value: eu },
    ],
    assumptions: ["Uses widely cited approximate conversion offsets — actual sizing varies by brand and shoe last, so always check a specific brand's own size chart when possible, especially near a half-size boundary"],
    rulesVersion: "Standard approximate shoe size conversion",
  };
}
