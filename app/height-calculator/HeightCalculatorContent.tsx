import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How accurate is this prediction?",
    a: "It's a widely used estimate, not a guarantee — about 2 out of 3 children land within the shown range, but nutrition, health, and individual genetics beyond the two parents all play a role too.",
  },
  {
    q: "Why does the formula add or subtract 13cm?",
    a: "It accounts for the average adult height difference between men and women — adding roughly centers the estimate for a boy, subtracting centers it for a girl.",
  },
];

export function HeightCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This predicts a child's likely adult height using the mid-parental height method, from
          both parents' heights.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
