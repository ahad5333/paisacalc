import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Should I use sample or population standard deviation?",
    a: "Use population if your data already covers everyone or everything you care about (e.g. every student in one specific class). Use sample if your data is a subset used to estimate a larger population's spread (e.g. 30 students standing in for an entire school) — sample divides by (n−1) instead of n, correcting for the fact a sample's own mean sits closer to its data points.",
  },
  {
    q: "What does standard deviation actually tell you?",
    a: "How spread out the data is around the mean — a small standard deviation means values cluster tightly near the average, a large one means they're spread widely.",
  },
];

export function StandardDeviationContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the mean, variance, and standard deviation of a data set, sample or population.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          2, 4, 4, 4, 5, 5, 7, 9 has a mean of 5 and a population standard deviation of{" "}
          <strong>2</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
