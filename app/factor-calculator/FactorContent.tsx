import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What's the difference between \"factors\" and \"prime factorization\"?",
    a: "Factors are every whole number that divides evenly into n, including 1 and n itself. Prime factorization breaks n down into the specific prime numbers that multiply together to make it — every other factor can be built by combining those primes.",
  },
  {
    q: "How does the calculator find factors efficiently for large numbers?",
    a: "It only checks divisors up to the square root of n — every factor pairs with another factor whose product is n, so once you pass the square root you've already found every pair.",
  },
];

export function FactorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This lists every factor of a number, and its prime factorization.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          36 has factors <strong>1, 2, 3, 4, 6, 9, 12, 18, 36</strong>, with prime factorization{" "}
          <strong>2² × 3²</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
