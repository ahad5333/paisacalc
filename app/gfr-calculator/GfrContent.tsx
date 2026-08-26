import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why did the equation change to remove race?",
    a: "The original CKD-EPI equation (2009) included a coefficient for Black patients based on population-average creatinine differences, which major medical bodies concluded could contribute to inequitable care by systematically overestimating kidney function in those patients. The 2021 race-free version was developed and validated to remove that coefficient while maintaining accuracy.",
  },
  {
    q: "My eGFR looks low — do I have kidney disease?",
    a: "Not necessarily from one reading alone. Chronic kidney disease is only diagnosed when reduced eGFR (or other markers of kidney damage) persists for three months or more — a single test can be affected by dehydration, a recent high-protein meal, certain medications, or measurement variability. See a doctor to interpret any single result.",
  },
  {
    q: "Why does the same creatinine level give a different eGFR for men and women?",
    a: "Creatinine is a byproduct of muscle metabolism, and average muscle mass differs by sex — the equation's kappa and alpha coefficients adjust for this, so the same creatinine level doesn't imply the same filtration rate across sexes.",
  },
];

export function GfrContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates glomerular filtration rate (eGFR) &mdash; a measure of how well the
          kidneys filter blood &mdash; from a serum creatinine blood test result, age, and sex,
          using the CKD-EPI 2021 equation, the current clinical standard.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 50-year-old male with a serum creatinine of 1.0 mg/dL has an eGFR of{" "}
          <strong>91.7 mL/min/1.73m²</strong>, KDIGO stage <strong>G1 (normal or high)</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
