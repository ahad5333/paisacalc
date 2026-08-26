import type { CalcResult } from "./types";

export type EngineHorsepowerInputs = {
  weightLbs: number;
  trapSpeedMph: number;
};

// The quarter-mile trap-speed method — a widely used drag-racing
// estimate of flywheel horsepower from a vehicle's weight and its speed
// at the end of a measured quarter mile, without needing a dyno.
export function calculateEngineHorsepower(inputs: EngineHorsepowerInputs): CalcResult<{ horsepower: number }> {
  const { weightLbs, trapSpeedMph } = inputs;
  const horsepower = Math.round(weightLbs * Math.pow(trapSpeedMph / 234, 3) * 100) / 100;

  return {
    value: { horsepower },
    steps: [{ label: "Estimated horsepower", formula: `weight × (trap speed ÷ 234)³`, value: horsepower }],
    assumptions: [
      "Uses the quarter-mile trap-speed method, a widely used drag-racing estimate — actual dyno-measured horsepower can differ based on drivetrain losses, tire grip, and driving technique",
      "Assumes a clean, well-executed quarter-mile run; a poor launch or missed shift underestimates the car's true capability",
    ],
    rulesVersion: "Quarter-mile trap-speed horsepower estimate",
  };
}
