import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

type UtilityPageProps = {
  title: string;
  heroImage?: string;
  heroObjectPosition?: string;
  children: ReactNode;
};

// Shared container for the utility pages (about, disclaimer, changelog) —
// same paper/rule card treatment as a calculator page's sections. heroImage
// is optional: About uses it (same hero pattern as CalculatorPage), while
// Disclaimer and Changelog stay plain text — a photo doesn't add anything
// to a legal or dated-log page the way it does to "how this site works."
export function UtilityPage({
  title,
  heroImage,
  heroObjectPosition = "center",
  children,
}: UtilityPageProps) {
  return (
    <div className="flex w-full flex-col">
      {heroImage && (
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: heroObjectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-paper/85 via-paper/45 to-paper/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
          </div>
          <Reveal className="mx-auto flex min-h-[180px] w-full max-w-2xl flex-col justify-center px-4 py-8 text-left sm:min-h-[220px] sm:px-6">
            <h1 className="font-serif text-2xl text-ink sm:text-3xl">{title}</h1>
          </Reveal>
        </section>
      )}

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6">
        <Reveal className="rounded-lg border border-rule bg-paper/90 p-6 shadow-sm backdrop-blur-sm">
          {!heroImage && <h1 className="font-serif text-xl text-ink">{title}</h1>}
          <div
            className={`prose-content flex flex-col gap-4 text-sm leading-relaxed text-ink ${heroImage ? "" : "mt-4"}`}
          >
            {children}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
