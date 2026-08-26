import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is this actually measuring compatibility?",
    a: "No — it has no scientific basis whatsoever. It's a novelty tool, purely for fun, in the same spirit as a fortune cookie or a magic 8-ball. The number comes from a fixed calculation on the two names, nothing more.",
  },
  {
    q: "Why does the same pair of names always give the same result?",
    a: "The calculation is deterministic — the same two names, in either order, always produce the same number, so you can compare it with friends without it changing on a refresh.",
  },
];

export function LoveCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this is</h2>
        <p className="mt-2">
          A lighthearted, for-fun-only compatibility percentage between two names. This has no
          scientific or predictive basis &mdash; it&rsquo;s a novelty, not a real relationship
          assessment.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
