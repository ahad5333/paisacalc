import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Why only 2×2 matrices?",
    a: "It's the size most introductory linear algebra starts with, and large enough to show every operation here — including that matrix multiplication isn't commutative — without needing a more complex arbitrary-size grid input.",
  },
  {
    q: "What does the determinant tell you?",
    a: "A determinant of zero means the matrix is \"singular\" — it can't be inverted, and it squashes the plane down to a line or point rather than a full 2D transformation. A non-zero determinant means the matrix is invertible.",
  },
];

export function MatrixContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This adds, subtracts, or multiplies two 2×2 matrices, along with each matrix's determinant.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          [1, 2; 3, 4] + [5, 6; 7, 8] = <strong>[6, 8; 10, 12]</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
