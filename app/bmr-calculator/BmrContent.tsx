import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why Mifflin-St Jeor instead of the older Harris-Benedict formula?",
    a: "Harris-Benedict dates to 1919 (revised in 1984), and multiple later validation studies found it tends to overestimate BMR compared to actual measured values, especially for people who are overweight. Mifflin-St Jeor (1990) has consistently tested as more accurate against measured resting energy expenditure in modern populations, which is why most dietitians now default to it.",
  },
  {
    q: "Is BMR the number of calories I should eat?",
    a: "No — BMR is calories burned lying still, doing nothing. It's the starting point, not a target. The calorie calculator adds your actual activity level on top of BMR (giving TDEE) before adjusting for any weight goal, which is the number actually useful for daily planning.",
  },
  {
    q: "Why does BMR differ between men and women at the same height and weight?",
    a: "Men typically carry more lean muscle mass at the same height and weight, and muscle burns more calories at rest than fat does — the Mifflin-St Jeor formula's +5 (male) versus −161 (female) constant captures this average difference.",
  },
];

export function BmrContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out Basal Metabolic Rate &mdash; the calories your body burns at complete
          rest, before any activity is added &mdash; using the Mifflin-St Jeor equation.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 30-year-old male, 175cm, 75kg &mdash; the calculator&rsquo;s own defaults &mdash;
          has a BMR of <strong>1,699 kcal/day</strong>. At the same age, height, and weight, a
          female comes to 1,533 kcal/day, 166 kcal lower &mdash; the formula&rsquo;s built-in
          male/female offset.
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
          to turn this into an actual daily calorie target with activity and a weight goal
          factored in.
        </p>
      </section>
    </div>
  );
}
