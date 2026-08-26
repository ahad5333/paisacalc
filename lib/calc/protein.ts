import type { CalcResult } from "./types";
import type { ActivityLevel } from "./bmr";

export type ProteinGoal = "maintain" | "lose" | "buildMuscle";

export type ProteinInputs = {
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: ProteinGoal;
};

export type ProteinValue = {
  gramsPerKg: number;
  proteinG: number;
  proteinCalories: number;
};

// Protein is conventionally prescribed per kg of bodyweight, not as a
// percentage of calories — needs scale with lean mass and training load,
// not total energy intake. Base rates roughly track ISSN position-stand
// ranges for general activity levels; a caloric deficit or a muscle-gain
// goal each add to the base rate, since both increase the protein needed
// to preserve or build lean mass.
const BASE_G_PER_KG: Record<ActivityLevel, number> = {
  sedentary: 0.8,
  light: 1.0,
  moderate: 1.4,
  active: 1.8,
  veryActive: 2.2,
};

const GOAL_ADJUSTMENT_G_PER_KG: Record<ProteinGoal, number> = {
  maintain: 0,
  lose: 0.3,
  buildMuscle: 0.3,
};

export function calculateProtein(inputs: ProteinInputs): CalcResult<ProteinValue> {
  const { weightKg, activityLevel, goal } = inputs;
  const gramsPerKg = BASE_G_PER_KG[activityLevel] + GOAL_ADJUSTMENT_G_PER_KG[goal];
  const proteinG = Math.round(weightKg * gramsPerKg);
  const proteinCalories = proteinG * 4;

  return {
    value: { gramsPerKg, proteinG, proteinCalories },
    steps: [
      { label: "Recommended intake", formula: `${weightKg}kg × ${gramsPerKg}g/kg`, value: proteinG },
      { label: "Calories from protein", formula: `${proteinG}g × 4 kcal/g`, value: proteinCalories },
    ],
    assumptions: [
      "Uses bodyweight-scaled ranges roughly tracking sports-nutrition position-stand guidance (about 0.8g/kg sedentary up to 2.2g/kg very active) rather than a fixed percentage of calories",
      goal === "maintain"
        ? "No adjustment for goal — this is the maintenance rate for your activity level"
        : "Adds 0.3g/kg above the activity-level base rate, since both a caloric deficit and a muscle-building goal increase the protein needed to preserve or build lean mass",
      "These are general guidance ranges — individual needs vary with training experience, age, and specific goals",
    ],
    rulesVersion: "Bodyweight-scaled protein guidance (ISSN-aligned ranges)",
  };
}
