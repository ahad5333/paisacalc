import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How accurate is a tape-measurement method compared to a DEXA scan?",
    a: "Less accurate — the US Navy method is an estimate with a typical error margin of a few percentage points either way, since it infers body composition from three or four circumference measurements rather than directly measuring fat and lean mass. It's popular precisely because it needs nothing but a tape measure, not because it's the most precise method available.",
  },
  {
    q: "Why does the formula need height at all?",
    a: "Height helps the formula distinguish someone who's simply larger-framed from someone actually carrying more fat — two people with identical waist and neck measurements but different heights don't have the same body fat percentage, and the formula corrects for that.",
  },
  {
    q: "Where exactly should I measure?",
    a: "Neck: directly below the larynx (Adam's apple), tape sloping slightly downward at the front. Waist: at the narrowest point, usually just above the navel. Hip (women only): at the widest point around the buttocks. Measurement technique is the single biggest source of error in this method — measure at the same time of day, without clothing bulk, for consistency if tracking over time.",
  },
  {
    q: "Why do the category bands differ between men and women?",
    a: "Healthy essential body fat is higher for women than men by biological necessity (reproductive fat storage), so the same body fat percentage means something different for each sex — a 22% reading is in the healthy \"average\" range for a woman but already above it for a man.",
  },
];

export function BodyFatContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates body fat percentage from neck, waist (and hip, for women)
          measurements using the US Navy circumference method &mdash; the same formula used
          for military body-composition standards.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 175cm male with a 38cm neck and 85cm waist &mdash; the calculator&rsquo;s own
          defaults &mdash; comes to an estimated <strong>17.0%</strong> body fat, right at the
          edge of the fitness and average ranges.
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
          for a quicker (but less precise) screening number from just height and weight.
        </p>
      </section>
    </div>
  );
}
