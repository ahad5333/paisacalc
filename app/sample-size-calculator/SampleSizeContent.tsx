import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does the estimated proportion matter?",
    a: "The required sample size is largest when the true proportion is close to 50%, and smaller the further it is from 50% in either direction — using 50% when you're unsure is the safe, conservative default that guarantees your sample is large enough regardless of the true value.",
  },
  {
    q: "Why does population size sometimes not matter?",
    a: "For very large populations, sampling a fixed number of people gives almost the same precision whether the total population is 100,000 or 100 million — the finite population correction only meaningfully shrinks the required sample when the population itself is small relative to the sample.",
  },
];

export function SampleSizeContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the minimum sample size needed for a survey or study to hit a target
          confidence level and margin of error.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          For 95% confidence, a 5% margin of error, and an unknown 50% proportion, the minimum
          sample size is <strong>385</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
