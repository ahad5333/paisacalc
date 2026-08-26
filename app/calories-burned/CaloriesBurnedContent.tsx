import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What's a MET, exactly?",
    a: "Metabolic Equivalent of Task — a way of expressing how energy-intensive an activity is as a multiple of resting metabolism. 1 MET is roughly what your body burns sitting quietly; running at 6mph is about 9.8 METs, meaning it burns roughly 9.8 times as much energy per minute as sitting still.",
  },
  {
    q: "Why does weight matter so much to the result?",
    a: "Because the MET formula scales directly with body weight — a heavier body burns more calories doing the same activity at the same intensity, simply because it takes more energy to move more mass.",
  },
  {
    q: "Why might my fitness tracker show a different number?",
    a: "Trackers often use heart rate, GPS pace, or proprietary algorithms layered on top of MET tables, and can factor in your actual fitness level or specific pace rather than a fixed activity average. This calculator uses standard, published MET averages for a general version of each activity, not your specific effort level.",
  },
];

export function CaloriesBurnedContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out calories burned during an activity, using standard MET (Metabolic
          Equivalent of Task) values from the Compendium of Physical Activities.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          30 minutes of running at a 75kg body weight &mdash; the calculator&rsquo;s own
          defaults &mdash; burns an estimated <strong>386 kcal</strong>, using running&rsquo;s
          9.8 MET value.
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
          to fold activity into an overall daily calorie target instead of a single session.
        </p>
      </section>
    </div>
  );
}
