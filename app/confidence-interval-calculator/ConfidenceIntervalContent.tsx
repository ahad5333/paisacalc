import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What does a 95% confidence interval actually mean?",
    a: "If you repeated the same sampling process many times and built a confidence interval each time, about 95% of those intervals would contain the true population mean — it's a statement about the reliability of the method, not a 95% probability the true mean falls in this specific interval.",
  },
  {
    q: "Why does a larger sample size narrow the interval?",
    a: "A larger sample gives a more precise estimate of the true mean — the margin of error shrinks with the square root of the sample size, so quadrupling the sample size halves the margin of error.",
  },
  {
    q: "When is this Z-based method not appropriate?",
    a: "For small samples (roughly under 30) where the population standard deviation isn't known, a t-distribution-based interval is more accurate than this Z-based one, since it accounts for the extra uncertainty in a small sample's estimated standard deviation.",
  },
];

export function ConfidenceIntervalContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the confidence interval for a population mean, from a sample's mean,
          standard deviation, and size.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A sample mean of 50, standard deviation 10, size 100, at 95% confidence gives an
          interval of <strong>48.04 to 51.96</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
