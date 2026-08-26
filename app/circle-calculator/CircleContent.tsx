import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What is pi (π), and why does it show up in every circle formula?",
    a: "Pi is the ratio of any circle's circumference to its diameter — always the same value (about 3.14159) no matter how big or small the circle. Because it's a fixed ratio, it appears in both the circumference and area formulas.",
  },
  {
    q: "How is area different from circumference?",
    a: "Circumference is the distance around the circle's edge (a length); area is the amount of space enclosed inside it (a two-dimensional measurement) — that's why area scales with radius squared, while circumference scales with radius directly.",
  },
];

export function CircleContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This finds the diameter, circumference, and area of a circle from its radius.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A circle with radius 5 has a diameter of 10, a circumference of about{" "}
          <strong>31.42</strong>, and an area of about <strong>78.54</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
