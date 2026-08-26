import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How is this different from the body fat calculator?",
    a: "The body fat calculator uses tape measurements (neck, waist, and hip) with the US Navy method — more input effort, generally a more accurate estimate. This uses only height and weight (the Boer formula), which is faster but coarser. The two won't always agree exactly, and the body fat calculator's estimate is generally the more reliable of the two.",
  },
  {
    q: "What exactly counts as \"lean mass\"?",
    a: "Everything that isn't fat — muscle, bone, organs, and body water. It's not the same as muscle mass alone; two people with identical lean mass could have quite different amounts of actual muscle.",
  },
  {
    q: "Does this work well for very muscular people?",
    a: "Less reliably — the Boer formula was derived from a general population, not people with unusually high muscle mass or very low body fat, where these height/weight-only estimates tend to be less accurate than for an average build.",
  },
];

export function LeanBodyMassContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates lean body mass &mdash; everything except fat &mdash; from height and
          weight alone, using the Boer formula.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 175cm, 75kg male &mdash; the calculator&rsquo;s own defaults &mdash; comes to{" "}
          <strong>58.1kg</strong> of lean mass, or 77.5% of total body weight.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/body-fat-calculator/" className="text-figure hover:underline">
            Body fat calculator
          </a>{" "}
          for a more precise estimate using tape measurements.
        </p>
      </section>
    </div>
  );
}
