import type { CalcResult } from "./types";

export type ConcreteInputs = {
  lengthFt: number;
  widthFt: number;
  depthInches: number;
};

export type ConcreteValue = {
  cubicFeet: number;
  cubicYards: number;
  bags60lb: number;
  bags80lb: number;
};

// Bag yields are the manufacturer-published figures for standard
// pre-mixed concrete bags (e.g. Quikrete) — 0.45 ft³ for a 60lb bag,
// 0.6 ft³ for an 80lb bag.
const BAG_YIELD_60LB_CUFT = 0.45;
const BAG_YIELD_80LB_CUFT = 0.6;

export function calculateConcrete(inputs: ConcreteInputs): CalcResult<ConcreteValue> {
  const { lengthFt, widthFt, depthInches } = inputs;
  const cubicFeet = Math.round(lengthFt * widthFt * (depthInches / 12) * 100) / 100;
  const cubicYards = Math.round((cubicFeet / 27) * 1000) / 1000;
  const bags60lb = Math.ceil(cubicFeet / BAG_YIELD_60LB_CUFT);
  const bags80lb = Math.ceil(cubicFeet / BAG_YIELD_80LB_CUFT);

  return {
    value: { cubicFeet, cubicYards, bags60lb, bags80lb },
    steps: [
      { label: "Volume", formula: `${lengthFt}ft × ${widthFt}ft × (${depthInches}in ÷ 12)`, value: `${cubicFeet} ft³ (${cubicYards} yd³)` },
      { label: "60lb bags needed", formula: `volume ÷ ${BAG_YIELD_60LB_CUFT} ft³/bag`, value: bags60lb },
      { label: "80lb bags needed", formula: `volume ÷ ${BAG_YIELD_80LB_CUFT} ft³/bag`, value: bags80lb },
    ],
    assumptions: [
      "Bag counts use manufacturer-published yields for standard pre-mixed concrete bags — different brands or ready-mix concrete may vary slightly",
      "Rounded up to the next whole bag, and doesn't add extra for waste or spillage — buying a small surplus is standard practice",
    ],
    rulesVersion: "Standard concrete volume, published bag yields",
  };
}
