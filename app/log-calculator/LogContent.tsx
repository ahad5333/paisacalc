import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What does a logarithm actually mean?",
    a: "log base b of x asks \"what power do I raise b to, to get x?\" — log base 10 of 1000 is 3, because 10³ = 1000.",
  },
  {
    q: "Why must the base and argument be positive?",
    a: "No real power of a positive base ever produces a negative or zero result, so a logarithm of a non-positive number has no real answer. A base of exactly 1 is also excluded, since 1 raised to any power is always 1, never anything else.",
  },
];

export function LogContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the logarithm of a number to any base, via the change-of-base formula.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          log base 10 of 1000 = <strong>3</strong>, since 10³ = 1000.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
