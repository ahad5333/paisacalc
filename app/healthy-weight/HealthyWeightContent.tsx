import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the BMI calculator?",
    a: "BMI takes height and weight and gives you a single number and a category. This runs the same calculation in reverse — take a height, and see the full weight range that falls inside the healthy BMI band. Same underlying cutoffs, opposite direction.",
  },
  {
    q: "Why does this use a range instead of a single ideal number?",
    a: "Because a range is what BMI actually defines — anywhere from 18.5 to 22.9 counts as the healthy band under the Asian cutoffs this site uses. A single \"ideal weight\" number would be misleadingly precise for what's really a zone, not a point.",
  },
  {
    q: "Should I aim for the middle of the range?",
    a: "Not necessarily — where in the range is healthy for you depends on build, muscle mass, and frame, none of which this calculator knows. Treat the whole range as reasonable, not just its midpoint.",
  },
];

export function HealthyWeightContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the healthy weight range for a given height, using the same
          Asian-specific WHO BMI cutoffs (18.5-22.9) as the BMI calculator.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          170cm &mdash; the calculator&rsquo;s own default &mdash; gives a healthy range of{" "}
          <strong>53.5kg to 66.2kg</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/bmi-calculator/" className="text-figure hover:underline">
            BMI calculator
          </a>{" "}
          for the same cutoffs run the other direction &mdash; from your actual height and
          weight to a BMI number.
        </p>
      </section>
    </div>
  );
}
