import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What does \"independent\" mean here?",
    a: "It means event A happening doesn't change the probability of event B happening, or vice versa — like two separate coin flips. For dependent events (like drawing cards without replacement), these formulas don't directly apply.",
  },
  {
    q: "Why subtract P(A)×P(B) when calculating P(A or B)?",
    a: "Without subtracting, the overlap where both A and B happen would be counted twice — once within P(A) and once within P(B) — so it's subtracted back out once to correct for that double-counting.",
  },
];

export function ProbabilityContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          Given the probability of two independent events, this works out the probability of
          both happening, either happening, and each not happening.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Two independent events each with 50% probability: P(A and B) = <strong>25%</strong>,
          P(A or B) = <strong>75%</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
