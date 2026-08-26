import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is a future rupee worth less today?",
    a: "Because money available today can be invested and grow, so a rupee promised in the future has to be worth less than a rupee in hand right now to be equivalent — the size of that gap depends entirely on the discount rate chosen. A higher discount rate means the future amount is worth even less today.",
  },
  {
    q: "What discount rate should I use?",
    a: "It depends on what you're comparing against — a common choice is the return you could reasonably expect from investing the money instead, or a bank's deposit rate for a more conservative estimate. There's no single correct rate; it's the assumption that drives the whole calculation.",
  },
  {
    q: "How is this different from the future value calculator?",
    a: "This works backward — from a known future amount to what it's worth today. Future value works forward — from what you have today to what it becomes later. Same formula, opposite direction.",
  },
];

export function PresentValueContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This works out what a known future lump sum is worth in today&rsquo;s money,
          discounted at a rate you choose.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          ₹10,00,000 due in 10 years, discounted at 8% &mdash; the calculator&rsquo;s own
          defaults &mdash; is worth <strong>₹4,63,193</strong> today.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>

      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/future-value/" className="text-figure hover:underline">
            Future value calculator
          </a>{" "}
          for the opposite direction &mdash; projecting today&rsquo;s money forward instead.
        </p>
      </section>
    </div>
  );
}
