import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Which diet plan should I pick?",
    a: "Balanced suits most general fitness goals. High protein helps preserve muscle during a calorie deficit or supports muscle building. Low carb and low fat are specific dietary approaches some people follow for personal or medical reasons — none is objectively \"best\" for everyone.",
  },
  {
    q: "Why do the grams round to slightly more or less than my exact calorie target?",
    a: "Each macro is rounded to the nearest gram independently, and protein/carbs (4 kcal/g) round differently than fat (9 kcal/g) — the small gap between the reconstructed total and your calorie target is just rounding, not an error.",
  },
  {
    q: "How is this different from the protein calculator?",
    a: "This applies a percentage-of-calories split across all three macros at once, using your chosen diet plan. The protein calculator instead scales protein directly from bodyweight, the approach most sports-nutrition guidance actually uses — worth checking if protein is your main concern.",
  },
];

export function MacroContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This splits your goal-adjusted daily calorie target into grams of protein,
          carbohydrate, and fat, using a diet-plan preset ratio you choose.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 2,300 kcal target on the Balanced plan (30/40/30%) gives{" "}
          <strong>173g protein</strong>, <strong>230g carbs</strong>, and{" "}
          <strong>77g fat</strong> per day.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/protein-calculator/" className="text-figure hover:underline">
            Protein calculator
          </a>{" "}
          for a bodyweight-based protein target, or the{" "}
          <a href="/carbohydrate-calculator/" className="text-figure hover:underline">
            carbohydrate
          </a>{" "}
          and{" "}
          <a href="/fat-intake-calculator/" className="text-figure hover:underline">
            fat intake
          </a>{" "}
          calculators to look at either macro on its own.
        </p>
      </section>
    </div>
  );
}
