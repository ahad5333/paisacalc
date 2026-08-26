import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Pins the workspace root to this project — without it, Next.js walks up
    // and picks up an unrelated package-lock.json in the home directory.
    root: path.resolve(__dirname),
  },
  experimental: {
    // This dev machine has only ~7GB RAM. Each parallel static-generation
    // worker runs its own sharp/vips instance for the opengraph-image
    // routes, and with 170+ pages the default worker count exhausts
    // memory mid-build. Forcing effectively one worker trades build speed
    // for reliability, which matters more here.
    staticGenerationMinPagesPerWorker: 400,
  },
};

export default nextConfig;
