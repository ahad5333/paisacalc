import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is this suitable for anything security-sensitive, like generating passwords?",
    a: "No — this uses standard pseudorandom generation suitable for games, sampling, and everyday randomness, not the cryptographically secure randomness required for passwords, tokens, or keys.",
  },
  {
    q: "What happens if I ask for more unique numbers than fit in the range?",
    a: "You'll get fewer numbers than requested — for example, asking for 20 unique whole numbers between 1 and 10 can only return 10, since that's every value available.",
  },
];

export function RandomNumberContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This generates random whole numbers or decimals within a range, with or without duplicates.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
