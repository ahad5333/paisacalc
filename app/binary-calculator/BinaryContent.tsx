import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does computing use binary at all?",
    a: "Digital circuits are built from switches that are naturally either on or off — two states map directly to binary's two digits (0 and 1), making it the native language of computer hardware.",
  },
  {
    q: "How do negative binary numbers work here?",
    a: "This calculator shows negative numbers as a minus sign plus the binary magnitude — real computer systems typically use a different scheme called two's complement instead, which this calculator doesn't replicate.",
  },
];

export function BinaryContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This converts between decimal (base 10) and binary (base 2), in either direction.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Decimal 13 in binary is <strong>1101</strong> — 8 + 4 + 0 + 1.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
