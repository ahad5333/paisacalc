import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why does my download seem slower than my advertised internet speed suggests?",
    a: "Internet plans are advertised in megabits per second (Mbps), but file sizes and download managers usually show megabytes (MB) — since 1 byte = 8 bits, a \"100 Mbps\" connection tops out around 12.5 MB/s, not 100 MB/s. This mix-up is the single most common source of confusion about download speed.",
  },
  {
    q: "Why is my actual transfer slower than this calculation?",
    a: "This assumes the full advertised bandwidth is available and sustained for the entire transfer — real-world speeds are usually lower due to network overhead, server-side limits, Wi-Fi conditions, and other traffic sharing the connection.",
  },
];

export function BandwidthCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds how long a file takes to transfer at a given connection speed.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 100MB file over a 10 Mbps connection takes about <strong>1m 20s</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
