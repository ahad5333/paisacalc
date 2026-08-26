// Runs against a live deployment URL (passed as argv[2], or defaults to
// the beta URL below) after every successful Vercel deploy — see
// .github/workflows/smoke-test.yml. Exists because the real bugs found in
// this project so far (CSP blocking hydration, a third-party CDN
// dependency failing, wrong Content-Type on OG images) were all invisible
// in local dev and only showed up in production. This catches that class
// of bug automatically instead of relying on someone noticing and
// reporting a broken console.
import { chromium } from "playwright";

const baseUrl = (process.argv[2] || "https://paisacalc-beta.vercel.app").replace(/\/$/, "");

const PAGES = [
  { path: "/", check: (text) => text.includes("Calculators") },
  {
    path: "/home-loan-emi/?p=4000000&r=8.5&t=20",
    check: (text) => text.includes("34,713") && text.includes("total interest"),
  },
  { path: "/about/", check: (text) => text.includes("Why this exists") },
];

let failed = false;

const browser = await chromium.launch();

for (const { path, check } of PAGES) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

  const url = `${baseUrl}${path}`;
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1500);

    const bodyText = await page.evaluate(() => document.body.innerText);

    if (!check(bodyText)) {
      failed = true;
      console.error(`FAIL ${url}: expected content not found`);
    } else if (errors.length > 0) {
      failed = true;
      console.error(`FAIL ${url}: ${errors.length} console error(s)`);
      for (const e of errors) console.error(`  - ${e}`);
    } else {
      console.log(`OK   ${url}`);
    }
  } catch (err) {
    failed = true;
    console.error(`FAIL ${url}: ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();

if (failed) {
  console.error("\nSmoke test failed.");
  process.exit(1);
}
console.log("\nAll smoke tests passed.");
