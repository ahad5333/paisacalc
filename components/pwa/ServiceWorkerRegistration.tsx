"use client";

import { useEffect } from "react";

// Skipped outside production: registering a service worker in dev would
// cache Turbopack's own dev output, which is exactly what you don't want
// while actively editing.
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration can fail (unsupported browser, blocked storage,
      // private browsing in some browsers) — the site works fine without
      // it, offline support just isn't available for that visit.
    });
  }, []);

  return null;
}
