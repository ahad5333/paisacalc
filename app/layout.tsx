import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Source_Serif_4, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";
import { CONTACT_EMAIL, SITE_LAUNCHED, SITE_URL } from "@/lib/site-config";
import "./globals.css";

// Emitted once, site-wide, so Google has one canonical description of what
// PaisaCalc is as an entity — the per-page WebApplication/FAQPage schemas
// describe individual calculators, this describes the site itself.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PaisaCalc",
  url: SITE_URL,
  description:
    "Indian personal-finance, fitness, math, and everyday calculators that show their working, not just a number.",
  contactPoint: { "@type": "ContactPoint", email: CONTACT_EMAIL, contactType: "customer support" },
};

// Self-hosted at build time by next/font — no runtime request to Google Fonts.
const figures = IBM_Plex_Mono({
  variable: "--font-figures",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const labels = Inter({
  variable: "--font-labels",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PaisaCalc — Indian personal finance calculators",
  description:
    "Income tax, EMI, HRA, SIP and other Indian personal-finance calculators that show their working, not just a number.",
  robots: SITE_LAUNCHED
    ? undefined
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1730",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figures.variable} ${body.variable} ${labels.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {SITE_LAUNCHED && (
          // Plausible: cookieless, no personal data, doesn't need a consent
          // banner (see the privacy policy's Analytics section). Gated on
          // SITE_LAUNCHED — same flag that controls indexing — so local/dev
          // traffic never pollutes real numbers, and analytics turns on at
          // the same moment the site actually goes public.
          <Script
            defer
            data-domain={new URL(SITE_URL).hostname}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <ServiceWorkerRegistration />
        <SmoothScroll>
          <div className="relative flex min-h-full flex-1 flex-col">
            <Header />
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
