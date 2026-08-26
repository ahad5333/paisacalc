// Single flag gating whether the site is indexable. Per ticket F-06/I-10:
// stays false (noindex on every page, via app/layout.tsx's metadata) until
// I-01 through I-09 are complete and the domain is actually live — flip
// this only as the deliberate act of launching, not as a side effect of
// adding another page.
export const SITE_LAUNCHED = false;

export const SITE_URL = "https://paisacalc.in";
export const CONTACT_EMAIL = "ahad53344@gmail.com";
