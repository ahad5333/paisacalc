import { FaqAccordion } from "@/components/calculator/FaqAccordion";

export const FAQS = [
  {
    q: "Is this safe to use for real passwords?",
    a: "The password is generated entirely in your browser using the Web Crypto API where available, and never sent anywhere — the same standard modern password managers rely on for secure random generation.",
  },
  {
    q: "What does \"entropy\" mean here?",
    a: "It's a measure of how many guesses a brute-force attacker would need on average to find this specific password — higher is better. It doesn't account for smarter attacks like dictionary lookups, which is exactly why a long random password beats a memorable phrase of the same length.",
  },
  {
    q: "Why include symbols if they make the password harder to type?",
    a: "Symbols expand the character pool your password is drawn from, directly increasing entropy for the same length — if typing is more important than maximum strength, a longer password using only letters and numbers is a reasonable trade-off.",
  },
];

export function PasswordGeneratorContent() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="font-serif text-lg text-ink">What this generates</h2>
        <p className="mt-2">
          This generates a random password from your chosen character types, entirely in your
          browser.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-ink">Frequently asked questions</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </div>
  );
}
