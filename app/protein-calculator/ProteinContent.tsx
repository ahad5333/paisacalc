import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does protein use grams per kg instead of a percentage of calories, like the other macros?",
    a: "Protein needs scale with lean body mass and training load, not with total energy intake — someone eating 1,500 kcal and someone eating 3,000 kcal doing the same training don't need proportionally different protein. A percentage split would push protein up and down with calories for no physiological reason.",
  },
  {
    q: "Why does a weight-loss goal increase the protein target?",
    a: "Higher protein intake during a calorie deficit helps preserve lean muscle mass that would otherwise be at greater risk of being broken down for energy alongside fat — a well-supported finding in sports nutrition research.",
  },
  {
    q: "Is more protein always better?",
    a: "No — beyond a certain point (roughly 2.2g/kg for most people, higher only in specific competitive bodybuilding contexts), additional protein doesn't meaningfully add to muscle growth and just displaces calories that could go toward carbs or fat.",
  },
];

export function ProteinContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This scales a daily protein target directly from your bodyweight and activity level,
          the way sports-nutrition guidance conventionally prescribes protein &mdash; rather than
          as a percentage of total calories.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 75kg person at moderate activity, maintaining weight, gets a target of{" "}
          <strong>1.4g/kg</strong> &mdash; <strong>105g</strong> of protein per day, or 420 kcal.
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
          for a full protein/carb/fat split from your calorie target.
        </p>
      </section>
    </div>
  );
}
