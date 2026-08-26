import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "What happens if I buy an AC with too much BTU capacity?",
    a: "Oversizing causes short cycling — the unit cools the room quickly then shuts off before properly dehumidifying it, leaving the room feeling cold but clammy. Bigger isn't automatically better for AC sizing.",
  },
  {
    q: "Is this accurate enough to buy equipment with?",
    a: "It's a solid rule-of-thumb starting point, but a professional Manual J load calculation is more precise for an actual purchase — it also factors insulation quality, window count and type, and ceiling height, none of which this simplified estimate captures.",
  },
];

export function BtuCalculatorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this calculates</h2>
        <p className="mt-2">This estimates the air conditioner or heater capacity (in BTU/hour) needed to comfortably condition a room.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">A worked example</h2>
        <p className="mt-2">
          A 300 sq ft room in a moderate climate, 2 occupants, not sunny, needs about{" "}
          <strong>9,000 BTU/hour</strong>.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
