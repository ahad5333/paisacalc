import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

const CALCULATOR_PATHS = [
  "home-loan-emi",
  "car-loan-emi",
  "income-tax",
  "in-hand-salary",
  "hra-exemption",
  "loan-prepayment",
  "sip-returns",
  "capital-gains",
  "gratuity",
  "fd-calculator",
  "rd-calculator",
  "gst-calculator",
  "ppf-calculator",
  "nps-calculator",
  "home-loan-eligibility",
  "personal-loan-emi",
  "education-loan-emi",
  "credit-card-payoff",
  "inflation-calculator",
  "debt-to-income-ratio",
  "savings-goal",
  "rent-vs-buy",
  "debt-consolidation",
  "rent-affordability",
  "real-estate-returns",
  "balance-transfer",
  "rental-yield",
  "apr-calculator",
  "loan-against-property",
  "home-loan-overdraft",
  "down-payment-calculator",
  "cashback-vs-lowrate",
  "auto-lease",
  "interest-calculator",
  "simple-interest",
  "bond-calculator",
  "mutual-fund-calculator",
  "average-return",
  "irr-calculator",
  "roi-calculator",
  "payback-period",
  "present-value",
  "future-value",
  "eps-pension",
  "annuity-payout",
  "credit-card-minimum",
  "debt-payoff",
  "college-cost",
  "depreciation-calculator",
  "business-loan",
  "margin-calculator",
  "discount-calculator",
  "budget-calculator",
  "commission-calculator",
  "bmi-calculator",
  "calorie-calculator",
  "body-fat-calculator",
  "bmr-calculator",
  "ideal-weight-calculator",
  "pace-calculator",
  "lean-body-mass",
  "healthy-weight",
  "calories-burned",
];

const UTILITY_PATHS = ["about", "disclaimer", "changelog"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...CALCULATOR_PATHS.map((path) => ({
      url: `${SITE_URL}/${path}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...UTILITY_PATHS.map((path) => ({
      url: `${SITE_URL}/${path}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
