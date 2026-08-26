import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does a space become %20?",
    a: "URLs can't contain literal spaces, so percent-encoding replaces reserved and unsafe characters with a % followed by their hex byte value — %20 is the hex code for a space character.",
  },
  {
    q: "Why does this also encode characters like / and :?",
    a: "This encodes for use as a single query parameter value (component encoding), not a whole URL — inside a value, structural characters like / and : need escaping too, since a raw / or : there could otherwise be misread as part of the URL's own structure.",
  },
];

export function UrlEncodeCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this does</h2>
        <p className="mt-2">
          This percent-encodes text for safe use inside a URL query parameter, or decodes it
          back, entirely in your browser.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          &quot;hello world &amp; more&quot; encodes to{" "}
          <strong>hello%20world%20%26%20more</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Related calculators</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="/base64-encode-decode/" className="text-figure hover:underline">
            Base64 encode/decode
          </a>{" "}
          for a different encoding scheme.
        </p>
      </section>
    </div>
  );
}
