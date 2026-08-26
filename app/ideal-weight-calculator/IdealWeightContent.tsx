import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Which formula is \"correct\"?",
    a: "None of them definitively — all four are decades-old attempts to summarize a healthy weight range from height and sex alone, and they were derived from different (mostly Western, mostly older) datasets. Devine is the one most referenced in hospital drug-dosing calculations, if you want a single clinically-standard pick, but that's a convention for a specific use case, not a claim that it's more \"correct\" than the others.",
  },
  {
    q: "Why do the four formulas disagree so much?",
    a: "Each was fitted to a different reference population at a different point in time, with different assumptions about frame size and body composition. The spread between them — sometimes several kilograms at the same height — is itself useful information: it shows how much any single \"ideal weight\" number should be treated as a rough guide, not a precise target.",
  },
  {
    q: "Is this more useful than BMI?",
    a: "It's a different kind of estimate. BMI gives a range based purely on height; these formulas give a single point estimate per formula. Neither accounts for frame size, muscle mass, or individual build — both are screening tools, not diagnoses.",
  },
];

export function IdealWeightContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This shows four different clinical formulas for ideal body weight side by side,
          rather than picking one as the definitive answer &mdash; because they genuinely
          don&rsquo;t agree with each other.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 175cm male &mdash; the calculator&rsquo;s own default &mdash; gets estimates
          ranging from <strong>68.7kg</strong> (Miller) to <strong>72.3kg</strong> (Hamwi),
          averaging to 70.1kg across all four.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/bmi-calculator/" className="text-figure hover:underline">
            BMI calculator
          </a>{" "}
          for a range-based alternative using the Asian-specific WHO cutoffs.
        </p>
      </section>
    </div>
  );
}
