import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What makes half-life decay different from a fixed rate of loss?",
    a: "It's proportional, not fixed — each half-life removes half of whatever remains, not a fixed amount. That's why the quantity never reaches exactly zero mathematically, only gets closer and closer to it.",
  },
  {
    q: "What is this commonly used for?",
    a: "Radioactive decay is the classic example, but the same math applies to drug elimination from the body (pharmacokinetics), and any other process where a quantity decreases by a constant proportion over a constant time interval.",
  },
];

export function HalfLifeContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds how much of a substance remains after a given elapsed time, based on
          exponential decay at a fixed half-life.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          100g with a 10-day half-life, after 20 days (2 half-lives), leaves{" "}
          <strong>25g</strong> — 25% of the original.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
