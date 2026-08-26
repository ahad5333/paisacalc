import Link from "next/link";
import { UtilityPage } from "@/components/chrome/UtilityPage";

export default function NotFound() {
  return (
    <UtilityPage title="Page not found">
      <p>
        That page doesn&rsquo;t exist — it may have been renamed or never
        existed at this address. Every calculator on PaisaCalc is listed
        on the homepage, grouped by category with a search box if
        you&rsquo;re looking for something specific.
      </p>
      <p>
        <Link href="/" className="text-figure hover:underline">
          Back to the calculator directory →
        </Link>
      </p>
    </UtilityPage>
  );
}
