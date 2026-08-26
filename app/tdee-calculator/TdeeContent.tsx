import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the calorie calculator?",
    a: "Same BMR and activity-multiplier math underneath, different focus: this shows TDEE at every activity level side by side, purely to maintain your current weight. The calorie calculator picks one activity level and adds a deficit or surplus on top for a weight-loss or weight-gain target.",
  },
  {
    q: "Should I eat exactly my TDEE every day?",
    a: "Only if your goal is to maintain your current weight — eating below TDEE leads to weight loss over time, and above it to weight gain, roughly 7,700 kcal per kilogram of body fat either direction.",
  },
  {
    q: "My activity level changes week to week — which one should I pick?",
    a: "Pick whichever level best describes your typical week, not your best or worst day — TDEE is meant as a weekly average, and picking your most active day will overestimate what you actually burn most of the time.",
  },
];

export function TdeeContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out Total Daily Energy Expenditure &mdash; the calories needed to maintain
          your current weight &mdash; using the Mifflin-St Jeor BMR equation and standard
          activity multipliers, shown across every activity level for comparison.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 30-year-old male, 175cm, 75kg, at moderate activity has a BMR of{" "}
          <strong>1,699 kcal</strong> and a TDEE of <strong>2,633 kcal</strong> &mdash; ranging
          from around 2,039 kcal sedentary to 3,228 kcal at very high activity.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/calorie-calculator/" className="text-figure hover:underline">
            Calorie calculator
          </a>{" "}
          to turn this into a specific weight-loss or weight-gain target, or the{" "}
          <a href="/macro-calculator/" className="text-figure hover:underline">
            macro calculator
          </a>{" "}
          to split it into protein, carbs, and fat.
        </p>
      </section>
    </div>
  );
}
