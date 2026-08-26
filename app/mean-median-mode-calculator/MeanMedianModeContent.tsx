import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "When is median a better measure than mean?",
    a: "When the data has outliers or is skewed — a single very large or small value can pull the mean far from where most of the data actually sits, while the median stays anchored to the middle value regardless.",
  },
  {
    q: "Can a data set have more than one mode?",
    a: "Yes — if two or more values tie for the highest frequency, all of them are modes (called \"bimodal\" for two, \"multimodal\" for more). If every value appears exactly once, there's no mode at all.",
  },
];

export function MeanMedianModeContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the mean, median, mode, and range of a data set — the four most common descriptive statistics.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          1, 2, 2, 3, 4 has a mean of <strong>2.4</strong>, median <strong>2</strong>, mode{" "}
          <strong>2</strong>, and range <strong>3</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
