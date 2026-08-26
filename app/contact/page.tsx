import type { Metadata } from "next";
import { UtilityPage } from "@/components/chrome/UtilityPage";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/contact/`;
const TITLE = "Contact | PaisaCalc";
const DESCRIPTION = "How to reach PaisaCalc about a calculator error, a suggestion, or anything else.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function ContactPage() {
  return (
    <UtilityPage title="Contact">
      <p>
        PaisaCalc is built and maintained by one person, and every email
        actually gets read. The fastest way to reach out is directly at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-figure hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>

      <h2 className="font-serif text-lg text-ink">Found a calculator that looks wrong?</h2>
      <p>
        Include which calculator, the numbers you entered, and what result
        you expected versus what you got. Corrections get logged on the{" "}
        <a href="/changelog/" className="text-figure hover:underline">
          changelog
        </a>{" "}
        with a date, the same way rule updates are.
      </p>
      <p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Report%20an%20error`}
          className="text-figure hover:underline"
        >
          Report an error →
        </a>
      </p>

      <h2 className="font-serif text-lg text-ink">Want to see a new calculator?</h2>
      <p>
        Say what it should calculate and, if you have one in mind, an
        example of the kind of result you&rsquo;d expect back. New
        calculators get logged on the{" "}
        <a href="/changelog/" className="text-figure hover:underline">
          changelog
        </a>{" "}
        as they ship.
      </p>
      <p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Calculator%20request`}
          className="text-figure hover:underline"
        >
          Request a calculator →
        </a>
      </p>

      <h2 className="font-serif text-lg text-ink">Advertising and partnerships</h2>
      <p>
        For anything related to advertising on PaisaCalc, use the subject
        line &ldquo;Advertising&rdquo; so it&rsquo;s easy to spot.
      </p>

      <h2 className="font-serif text-lg text-ink">What this isn&rsquo;t for</h2>
      <p>
        This inbox can&rsquo;t give you personal tax, financial, or
        medical advice about your specific situation — that needs a
        qualified professional who can see your actual numbers and
        circumstances, not a calculator. See the{" "}
        <a href="/disclaimer/" className="text-figure hover:underline">
          disclaimer
        </a>{" "}
        for why.
      </p>

      <h2 className="font-serif text-lg text-ink">Everything else</h2>
      <p>
        Feedback on how a page works, a general question, or anything
        that doesn&rsquo;t fit the categories above — all welcome at the
        same address. Expect a reply within a few days; this is a
        one-person project, not a support team.
      </p>
    </UtilityPage>
  );
}
