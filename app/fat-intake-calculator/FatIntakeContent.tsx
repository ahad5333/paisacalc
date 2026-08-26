import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is there a separate saturated fat number?",
    a: "Total fat and saturated fat answer different questions — how much fat overall, and how much of that specifically should not be saturated. The saturated fat cap is a subset of the total fat range, not an amount on top of it; a diet at the low end of total fat could still exceed the saturated fat cap if most of that fat comes from saturated sources.",
  },
  {
    q: "Why does fat need more grams for the same percentage than protein or carbs?",
    a: "Fat has 9 kcal per gram, more than double protein or carbohydrate's 4 kcal per gram — so hitting a given percentage of calories from fat takes fewer grams than the same percentage from protein or carbs would.",
  },
  {
    q: "Is a low-fat diet automatically healthier?",
    a: "Not necessarily — fat plays essential roles in hormone production, vitamin absorption, and cell function, and the 20-35% AMDR reflects that a moderate amount is part of typical healthy eating, not just a ceiling to minimise.",
  },
];

export function FatIntakeContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out a recommended daily fat range in grams from the US Dietary Guidelines'
          AMDR (20-35% of calories), plus a separate cap on saturated fat specifically (under
          10% of calories), applied to your goal-adjusted daily calorie target.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 2,300 kcal daily target gives a recommended fat range of <strong>51&ndash;89g</strong>{" "}
          per day, with saturated fat kept under <strong>26g</strong>.
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
