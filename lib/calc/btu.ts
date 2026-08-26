import type { CalcResult } from "./types";

export type ClimateZone = "mild" | "moderate" | "hot";

export type BtuInputs = {
  squareFeet: number;
  climateZone: ClimateZone;
  occupants: number;
  sunnyRoom: boolean;
};

const BASE_BTU_PER_SQFT: Record<ClimateZone, number> = { mild: 25, moderate: 30, hot: 35 };

// A standard HVAC-contractor rule of thumb: a base BTU/sq ft rate by
// climate, plus fixed adjustments for extra occupants and direct sun
// exposure — a reasonable sizing estimate, not a substitute for a
// professional Manual J load calculation, which also factors insulation,
// window count, and ceiling height.
export function calculateBtu(inputs: BtuInputs): CalcResult<{ btu: number }> {
  const { squareFeet, climateZone, occupants, sunnyRoom } = inputs;
  const base = squareFeet * BASE_BTU_PER_SQFT[climateZone];
  const occupantAdjustment = Math.max(0, occupants - 2) * 600;
  const sunAdjustment = sunnyRoom ? base * 0.1 : 0;
  const btu = Math.round(base + occupantAdjustment + sunAdjustment);

  return {
    value: { btu },
    steps: [
      { label: "Base BTU", formula: `${squareFeet} sq ft × ${BASE_BTU_PER_SQFT[climateZone]} BTU/sq ft (${climateZone})`, value: Math.round(base) },
      { label: "Occupant adjustment", formula: `max(0, ${occupants}−2) × 600`, value: occupantAdjustment },
      { label: "Sun exposure adjustment", formula: sunnyRoom ? "base × 10%" : "none", value: Math.round(sunAdjustment) },
    ],
    assumptions: [
      "This is a rule-of-thumb sizing estimate — a professional Manual J load calculation (factoring insulation, window count, and ceiling height) gives a more precise figure for an actual HVAC purchase",
      "Assumes a standard 8ft ceiling; a taller room needs proportionally more capacity",
    ],
    rulesVersion: "Standard HVAC sizing rule of thumb",
  };
}
