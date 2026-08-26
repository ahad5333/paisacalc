import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does this use different BMI cutoffs than the site's own BMI calculator?",
    a: "The IOM's pregnancy weight gain guidelines were validated specifically against the standard 18.5/25/30 BMI cutoffs, not the lower Asian cutoffs used elsewhere on this site — using the Asian cutoffs here would apply the wrong recommended-gain range to some users, since the ranges themselves are only meaningful relative to the boundaries they were built on.",
  },
  {
    q: "Why do twin pregnancies get a higher recommended gain?",
    a: "Supporting two developing babies, two placentas, and more amniotic fluid requires meaningfully more maternal weight gain than a singleton pregnancy — IOM publishes separate, higher ranges specifically for twins.",
  },
  {
    q: "What if I'm gaining faster or slower than this range?",
    a: "This is a population guideline, not a target to hit exactly — individual circumstances vary, and consistent deviation either way is worth discussing with your doctor rather than adjusting diet based on a calculator alone.",
  },
];

export function PregnancyWeightGainContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out the recommended total pregnancy weight gain for your pre-pregnancy BMI,
          using the IOM (Institute of Medicine) guidelines, and roughly where you should be by
          your current week.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A pre-pregnancy height of 165cm and weight of 60kg &mdash; a BMI of 22.0, in the normal
          range &mdash; gives a total recommended gain of <strong>11.5&ndash;16 kg</strong>, of
          which about <strong>4.6&ndash;6.6 kg</strong> should typically be gained by week 20.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/pregnancy-calculator/" className="text-figure hover:underline">
            Pregnancy calculator
          </a>{" "}
          for your current week and due date.
        </p>
      </section>
    </div>
  );
}
