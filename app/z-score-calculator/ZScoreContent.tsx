import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What does a negative z-score mean?",
    a: "It means the value is below the mean — a z-score of -1 is one standard deviation below average, while +1 is one standard deviation above.",
  },
  {
    q: "Why might the percentile be inaccurate for my data?",
    a: "The percentile assumes the underlying data follows a normal (bell-curve) distribution. The z-score itself is always valid as a measure of distance from the mean, but if your actual data is skewed or has a different shape, the percentile figure won't reflect it accurately.",
  },
];

export function ZScoreContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds how many standard deviations a value is from the mean (its z-score), and
          the corresponding percentile under a normal distribution.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A value of 70 with a mean of 60 and standard deviation of 10 has a z-score of{" "}
          <strong>1</strong> — the 84th percentile.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
