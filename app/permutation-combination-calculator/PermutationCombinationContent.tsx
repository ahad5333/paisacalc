import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "How do I know whether I need permutations or combinations?",
    a: "Ask whether order matters. Ranking 3 winners out of 10 racers is a permutation (1st, 2nd, 3rd are different outcomes). Picking 3 people out of 10 for a committee is a combination (the same 3 people are the same committee regardless of selection order).",
  },
  {
    q: "Why is combinations always smaller than or equal to permutations?",
    a: "Combinations group together every permutation that contains the same items in a different order — dividing permutations by r! (the number of ways to arrange r items) removes that order-based duplication.",
  },
];

export function PermutationCombinationContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This finds the number of ways to choose r items from a total of n — as ordered
          arrangements (permutations) or unordered selections (combinations).
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Choosing 2 items from 5: <strong>20</strong> permutations, <strong>10</strong>{" "}
          combinations.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
