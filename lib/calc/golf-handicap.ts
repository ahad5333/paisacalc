import type { CalcResult } from "./types";

export type GolfHandicapInputs = {
  score: number;
  courseRating: number;
  slopeRating: number;
};

// The Handicap Differential — the core building block of the official
// USGA/World Handicap System Handicap Index, which averages the best
// several differentials from a golfer's last 20 rounds. This calculates
// one round's differential; 113 is the slope rating of a "standard"
// course, used to normalize for course difficulty.
export function calculateGolfHandicap(inputs: GolfHandicapInputs): CalcResult<{ differential: number }> {
  const { score, courseRating, slopeRating } = inputs;
  const differential = Math.round((((score - courseRating) * 113) / slopeRating) * 10) / 10;

  return {
    value: { differential },
    steps: [{ label: "Handicap differential", formula: `(${score} − ${courseRating}) × 113 ÷ ${slopeRating}`, value: differential }],
    assumptions: [
      "This is the differential for a single round — the official USGA Handicap Index averages the best several differentials from your last 20 rounds, not just one",
      "Course rating and slope rating are printed on the scorecard for the specific tees played — using the wrong tee's ratings gives an inaccurate differential",
    ],
    rulesVersion: "USGA/World Handicap System differential formula",
  };
}
