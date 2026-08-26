import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why wrist circumference specifically?",
    a: "Wrist circumference is mostly determined by bone and joint size, and barely changes with fat gain, muscle building, or weight loss — making it a reasonable stand-in for underlying skeletal frame size, separate from current body composition.",
  },
  {
    q: "Does my somatotype determine what I can achieve in the gym?",
    a: "No — it's a loose starting-point description, not a limit. People of every frame size build muscle, lose fat, and improve fitness; frame size mostly affects how a given amount of muscle or fat looks on your build, not whether you can gain or lose it.",
  },
  {
    q: "Can I be a mix of body types?",
    a: "Yes — most people don't fall neatly into one category, and combination descriptions like \"ecto-mesomorph\" are common in fitness literature. This calculator picks the single closest category from your ratio for simplicity.",
  },
];

export function BodyTypeContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This estimates skeletal frame size &mdash; ectomorph (small/narrow), mesomorph
          (medium), or endomorph (large) &mdash; from the ratio of your height to your wrist
          circumference, a common fitness-literature heuristic.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A male, 178cm tall with a 17cm wrist, has a ratio of <strong>10.47</strong>, just
          above the 10.4 cutoff &mdash; classified as <strong>ectomorph</strong>.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
