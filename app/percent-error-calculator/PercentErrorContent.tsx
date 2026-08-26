import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why use the absolute value?",
    a: "Percent error measures the size of the discrepancy, not its direction — using the absolute value means a measurement that's too high and one that's too low by the same amount get the same percent error.",
  },
  {
    q: "What counts as a \"good\" percent error?",
    a: "It depends entirely on the context — a few percent might be excellent for a rough field measurement, while a fraction of a percent might be required in precision manufacturing or lab work.",
  },
];

export function PercentErrorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">
          This measures how far a measured (experimental) value is from an accepted
          (theoretical) value, as a percentage of the theoretical value.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A measured value of 48 against a theoretical value of 50 gives a percent error of{" "}
          <strong>4%</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
