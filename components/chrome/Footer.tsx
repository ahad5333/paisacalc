import Link from "next/link";
import { AdSlot } from "@/components/calculator/AdSlot";

// Contact and changelog are trust signals a YMYL finance site needs to not
// read as anonymous (SEO spec §7).
export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6">
        <AdSlot label="Footer ad slot" />

        <p className="text-xs text-muted">
          PaisaCalc is an informational tool, not tax or investment advice.
          Verify any figure with a qualified professional before acting on
          it.
        </p>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <Link href="/about/" className="text-muted hover:text-ink">
            About
          </Link>
          <Link href="/disclaimer/" className="text-muted hover:text-ink">
            Disclaimer
          </Link>
          <Link href="/privacy-policy/" className="text-muted hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service/" className="text-muted hover:text-ink">
            Terms of Service
          </Link>
          <Link href="/changelog/" className="text-muted hover:text-ink">
            Changelog
          </Link>
          <Link href="/contact/" className="text-muted hover:text-ink">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
