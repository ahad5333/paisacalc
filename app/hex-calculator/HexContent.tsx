import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does hex use letters A-F?",
    a: "Base 16 needs 16 distinct digits, and the usual 0-9 only provides ten — A through F extend the digit set to represent the values ten through fifteen in a single character.",
  },
  {
    q: "Where does hex show up in everyday computing?",
    a: "Most commonly in colour codes (like #FF5733 in CSS) and memory addresses — hex is popular because each hex digit maps cleanly to exactly 4 binary digits, making it a compact stand-in for binary.",
  },
];

export function HexContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This converts between decimal (base 10) and hexadecimal (base 16), in either direction.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          Decimal 255 in hex is <strong>FF</strong> — the largest value a single byte can hold.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
