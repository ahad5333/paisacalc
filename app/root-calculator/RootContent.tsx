import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why is the square root of a negative number undefined here?",
    a: "No real number squared gives a negative result, so an even-degree root of a negative number requires complex numbers, which this calculator doesn't compute.",
  },
  {
    q: "Why is an odd-degree root of a negative number negative?",
    a: "Because a negative number raised to an odd power stays negative — the cube root of -8 is -2, since -2 × -2 × -2 = -8.",
  },
];

export function RootContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the nth root of a number — square root, cube root, or any higher degree.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          The cube root of 27 is <strong>3</strong>, since 3 × 3 × 3 = 27.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
