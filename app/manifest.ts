import type { MetadataRoute } from "next";

// output: "export" requires this on every route that isn't a plain page —
// same reason app/icon.tsx and app/opengraph-image.tsx have it.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PaisaCalc — Indian personal finance calculators",
    short_name: "PaisaCalc",
    description:
      "173 free calculators for Indian personal finance, fitness & health, math, and everyday use — each with the full working shown, not just a number.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1730",
    theme_color: "#0b1730",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
