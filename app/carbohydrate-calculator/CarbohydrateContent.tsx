import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is this a range instead of one exact number?",
    a: "Because the guideline itself is a range — the Acceptable Macronutrient Distribution Range (AMDR) for carbohydrate spans 45-65% of calories, covering a wide variety of typical eating patterns rather than prescribing one ideal figure.",
  },
  {
    q: "Is low-carb eating unhealthy, since it falls below this range?",
    a: "Not necessarily — the AMDR describes population-level guidance for a general, typical diet, not a hard medical floor. Many people follow lower-carbohydrate approaches deliberately and safely; this calculator just isn't built around that specific pattern.",
  },
  {
    q: "Does the type of carbohydrate matter, or just the total grams?",
    a: "This calculator only addresses total grams. In practice, carbohydrate quality (whole grains, fruit, and vegetables vs. refined sugar) matters a great deal for health outcomes independent of the total amount — a separate consideration this tool doesn't cover.",
  },
];

export function CarbohydrateContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out a recommended daily carbohydrate range in grams, applying the US
          Dietary Guidelines' Acceptable Macronutrient Distribution Range (45-65% of calories) to
          your goal-adjusted daily calorie target.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 2,300 kcal daily target gives a recommended carbohydrate range of{" "}
          <strong>259&ndash;374g</strong> per day.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/macro-calculator/" className="text-figure hover:underline">
            Macro calculator
          </a>{" "}
          for a single protein/carb/fat split instead of separate ranges.
        </p>
      </section>
    </div>
  );
}
