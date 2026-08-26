import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is Base64 encryption?",
    a: "No — it's an encoding, not encryption. Anyone can decode Base64 back to the original text instantly; it provides no security or confidentiality at all, just a way to represent binary data using only printable characters.",
  },
  {
    q: "What are the trailing = characters for?",
    a: "Base64 processes input three bytes at a time, and = is padding added when the final group has fewer than three bytes — it tells a decoder exactly how many real bytes are in that last group.",
  },
];

export function Base64CalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this does</h2>
        <p className="mt-2">
          This encodes text to Base64, or decodes Base64 back to text, entirely in your browser
          — nothing is sent anywhere.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/url-encode-decode/" className="text-figure hover:underline">
            URL encode/decode
          </a>{" "}
          for percent-encoding instead.
        </p>
      </section>
    </div>
  );
}
