import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What is the LCM actually used for?",
    a: "Most commonly for adding or subtracting fractions with different denominators — finding a common denominator is exactly finding the LCM of the denominators. It also comes up in scheduling problems, like figuring out when two repeating events next coincide.",
  },
  {
    q: "How is LCM related to GCF?",
    a: "For two numbers, LCM × GCF = the product of the two numbers — the two are complementary measures of how the numbers' prime factors overlap.",
  },
];

export function LcmContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the least common multiple (LCM) of three numbers, via prime factorisation.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          lcm(4, 6, 8) = <strong>24</strong> — the smallest number all three divide into evenly.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
