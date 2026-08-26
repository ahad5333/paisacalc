import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does resting heart rate matter — why not just use age?",
    a: "A simpler formula (max heart rate × %intensity) only looks at age. The Karvonen formula also factors in resting heart rate, which is a rough proxy for cardiovascular fitness — a fitter heart rests lower, and that shifts the whole training zone. Two 40-year-olds with resting heart rates of 55 and 85 get meaningfully different target zones here, not an identical one.",
  },
  {
    q: "How accurate is the 220 − age formula for max heart rate?",
    a: "It's the most common estimate in general fitness guidance, but it's a population average — an individual's actual max heart rate can reasonably be 10-15 bpm higher or lower than this estimate. If you've had your max heart rate measured directly (e.g. via a supervised treadmill test), that number is more accurate than this formula for you specifically.",
  },
  {
    q: "Which zone should I be training in?",
    a: "It depends on the goal: lower zones (warm up, fat burn) suit longer, easier sessions and beginners; higher zones (cardio, peak) build cardiovascular fitness faster but are harder to sustain and recover from. Most general fitness guidance recommends spending most training time in the moderate 50-85% range shown as the main result above.",
  },
];

export function TargetHeartRateContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out target heart rate training zones from age and resting heart rate, using
          the Karvonen (heart rate reserve) formula rather than a simpler age-only estimate.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 30-year-old with a 70 bpm resting heart rate &mdash; the calculator&rsquo;s own
          defaults &mdash; has a max heart rate of <strong>190 bpm</strong> and a
          moderate-to-vigorous training zone of <strong>130&ndash;172 bpm</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/calories-burned/" className="text-figure hover:underline">
            Calories burned calculator
          </a>{" "}
          to see how far an activity gets you toward a calorie goal once you know which heart
          rate zone it falls in.
        </p>
      </section>
    </div>
  );
}
