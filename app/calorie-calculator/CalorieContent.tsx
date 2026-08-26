import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What's the difference between BMR, TDEE, and this daily target?",
    a: "BMR is what your body burns at complete rest — no movement at all. TDEE (Total Daily Energy Expenditure) adds your activity level on top of that, giving your actual maintenance calories. This calculator's daily target then adjusts TDEE up or down depending on whether your goal is to lose, maintain, or gain weight.",
  },
  {
    q: "Why exactly 500 kcal for losing or gaining?",
    a: "It's a widely used planning figure: roughly 7,700 kcal equals 1kg of body fat, so a 500 kcal/day deficit or surplus works out to about 0.45kg a week — a pace generally considered sustainable. It's a starting point, not a precise guarantee; actual results vary with water retention, muscle change, and how consistently the target is hit.",
  },
  {
    q: "How do I pick my activity level honestly?",
    a: "Most people overestimate this. \"Moderate\" assumes structured exercise 3-5 days a week on top of a normal daily routine — a desk job with a gym habit a few times a week is closer to \"light\" than \"active.\" Overestimating activity level is one of the most common reasons a calorie target doesn't produce the expected result.",
  },
  {
    q: "Why does the same activity level change the target between sexes?",
    a: "Mifflin-St Jeor's BMR formula already accounts for typical differences in body composition between men and women at the same height and weight, before activity is even factored in — see the BMR calculator for that piece on its own.",
  },
];

export function CalorieContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out a daily calorie target for losing, maintaining, or gaining weight
          &mdash; starting from BMR (Mifflin-St Jeor), scaled up by activity level to get TDEE,
          then adjusted for the goal you pick.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 30-year-old male, 175cm, 75kg, moderately active, aiming to lose weight &mdash; the
          calculator&rsquo;s own defaults. BMR comes to 1,699 kcal; scaled by the moderate
          activity multiplier (1.55), TDEE is 2,633 kcal; with the 500 kcal deficit for the
          weight-loss goal, the daily target is <strong>2,133 kcal</strong> &mdash; about 0.45kg
          lost per week at that rate.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/bmr-calculator/" className="text-figure hover:underline">
            BMR calculator
          </a>{" "}
          for resting calories alone, and{" "}
          <a href="/tdee-calculator/" className="text-figure hover:underline">
            TDEE calculator
          </a>{" "}
          for maintenance calories without a weight-change goal.
        </p>
      </section>
    </div>
  );
}
