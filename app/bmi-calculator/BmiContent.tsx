import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does this use lower cutoffs than the BMI calculators I've seen elsewhere?",
    a: "Most BMI calculators default to WHO's original, Western-derived cutoffs (normal up to 25, obese from 30). WHO's own 2004 Asian-population expert consultation found that Indians and other Asian populations show a meaningfully higher risk of diabetes and cardiovascular disease at lower BMI than those cutoffs assume — so India's public health guidance (ICMR) uses the lower Asian cutoffs (normal up to 23, obese from 25) instead. Using the Western cutoffs here would under-flag risk for exactly the population this site is built for.",
  },
  {
    q: "Is BMI a reliable measure on its own?",
    a: "It's a quick screening tool, not a diagnosis. BMI can't tell muscle from fat — a lean, muscular person can register a high BMI while carrying very little body fat, and someone with normal BMI can still carry unhealthy visceral fat. It's a useful starting signal, not the final word.",
  },
  {
    q: "Does this apply to everyone?",
    a: "No — it's calibrated for adults. Children, pregnant women, and elderly adults need different reference standards where BMI alone isn't the right tool.",
  },
];

export function BmiContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out Body Mass Index from height and weight, and where it falls using the
          WHO Asian-specific cutoffs rather than the higher Western thresholds most calculators
          default to.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 170cm, 65kg adult &mdash; the calculator&rsquo;s own defaults &mdash; comes to a
          BMI of <strong>22.5</strong>, in the healthy range under the Asian cutoffs (18.5-22.9).
          The same 170cm at 66.5kg gives a BMI of exactly 23 &mdash; already &ldquo;overweight&rdquo;
          under the Asian thresholds, while a Western-cutoff calculator would still call it
          normal.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
