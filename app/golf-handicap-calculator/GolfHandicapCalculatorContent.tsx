import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is this differential my official Handicap Index?",
    a: "Not on its own — the official USGA/World Handicap System Handicap Index averages the best several differentials from your last 20 rounds (with adjustments), not a single round. This calculator gives you the differential for one round, the building block that feeds into that average.",
  },
  {
    q: "What's the difference between course rating and slope rating?",
    a: "Course rating estimates the score a scratch (zero-handicap) golfer would shoot on that course. Slope rating measures how much harder the course plays for a bogey golfer relative to a scratch golfer — 113 is defined as the standard, average difficulty.",
  },
];

export function GolfHandicapCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the handicap differential for a single round of golf, from your score,
          course rating, and slope rating — the same formula behind the official USGA Handicap
          Index.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A score of 90 on a course rated 72 with a standard slope of 113 gives a differential
          of <strong>18</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
