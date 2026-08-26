// Most-recent-first. Single source of truth — the changelog page renders
// all of these; the homepage's "last updated" teaser reads just the first.
export const CHANGELOG_ENTRIES = [
  {
    date: "19 Aug 2026",
    title: "Privacy Policy, Terms of Service, and Contact pages added",
    body: "Ahead of applying for ad placement, added a full Privacy Policy (what is and isn't collected, and how third-party ad cookies work), Terms of Service, a dedicated Contact page, and a branded 404 page — plus the About page now explains why the site exists, who it's for, and answers common questions directly.",
  },
  {
    date: "19 Aug 2026",
    title: "Home loan EMI calculator now shows total interest and total payment upfront",
    body: "The headline EMI figure now carries total interest and total payment alongside it, and a principal-vs-interest donut sits next to the existing year-by-year chart — both numbers were already being computed, just buried in the derivation panel instead of shown where they matter most.",
  },
  {
    date: "19 Aug 2026",
    title: "Every calculator page now shows a breadcrumb trail and related calculators",
    body: "Home → category → calculator navigation at the top of every page, and a \"More in [category]\" section at the bottom linking to four others in the same category — makes it possible to browse within a category without going back to the homepage each time.",
  },
  {
    date: "19 Aug 2026",
    title: "Fixed long detail tables (like amortisation schedules) rendering invisible",
    body: "The scroll-reveal animation used across the site measured how much of an element's own area had scrolled into view, which a table taller than about 10x the screen height could mathematically never satisfy — it just sat at zero opacity forever, reserving its full height as blank space. Fixed the underlying threshold so it reveals as soon as any part of the content is on screen, regardless of how tall that content is.",
  },
  {
    date: "19 Aug 2026",
    title: "Homepage redesigned: calculators grouped by category with a search bar",
    body: "With 173 calculators, one long flat list stopped being usable. The homepage now groups everything under its category heading, adds a live search box (press \"/\" from anywhere to jump to it), a popular-calculators row, jump-to-category chips, and \"New\" badges on everything added in this expansion.",
  },
  {
    date: "19 Aug 2026",
    title: "54 calculators launched across seven new categories",
    body: "Date & Time, Home & Construction, Conversions & Science, Tech Tools, Everyday & Lifestyle, Weather, and Automotive — covering things like date/time arithmetic, tile and concrete quantities, unit and number-base conversions, password generation, wind chill and heat index, and tire size and fuel cost, extending the site well beyond personal finance and health.",
  },
  {
    date: "19 Aug 2026",
    title: "38 Math calculators launched",
    body: "Scientific and matrix calculators, statistics (mean/median/mode, standard deviation, z-scores, confidence intervals), geometry (triangle, circle, volume, surface area for five solid shapes), number theory (GCF, LCM, factors, primes), and everyday math (percentages, ratios, fractions, rounding) — the site's first calculators outside personal finance and health.",
  },
  {
    date: "19 Aug 2026",
    title: "18 more Fitness & Health calculators launched",
    body: "One-rep max, target heart rate, GFR, body surface area, BAC, body type, TDEE, macro/carbohydrate/protein/fat-intake targets, and a full pregnancy and cycle-tracking cluster (due date, ovulation, conception, period, and pregnancy weight gain) — each with its own clear framing rather than one calculator trying to answer every question.",
  },
  {
    date: "19 Aug 2026",
    title: "Calories burned calculator launched",
    body: "Calories burned during a chosen activity, using standard MET values from the Compendium of Physical Activities scaled by body weight and duration.",
  },
  {
    date: "19 Aug 2026",
    title: "Healthy weight calculator launched",
    body: "The healthy weight range for a given height — the BMI calculator's own Asian-specific cutoffs, run in reverse from height alone to a weight range.",
  },
  {
    date: "19 Aug 2026",
    title: "Lean body mass calculator launched",
    body: "Lean mass estimate from height and weight alone (the Boer formula) — a quicker but coarser alternative to the body fat calculator's tape-measurement method.",
  },
  {
    date: "19 Aug 2026",
    title: "Pace calculator launched",
    body: "Running pace and average speed from a distance and a finishing time — for planning a race pace or checking a training run.",
  },
  {
    date: "19 Aug 2026",
    title: "Ideal weight calculator launched",
    body: "Four clinical ideal-weight formulas (Hamwi, Devine, Robinson, Miller) shown side by side rather than picking one — they don't agree with each other, and that spread is itself useful information.",
  },
  {
    date: "19 Aug 2026",
    title: "BMR calculator launched",
    body: "Basal Metabolic Rate on its own — calories burned at complete rest, using the Mifflin-St Jeor equation that underlies the calorie calculator too.",
  },
  {
    date: "19 Aug 2026",
    title: "Body fat calculator launched",
    body: "Body fat percentage from neck, waist, and (for women) hip measurements, using the US Navy circumference method — the same formula behind military body-composition standards.",
  },
  {
    date: "19 Aug 2026",
    title: "Calorie calculator launched",
    body: "Daily calorie target for losing, maintaining, or gaining weight — BMR (Mifflin-St Jeor) scaled by activity level to TDEE, then adjusted by the standard 500 kcal/day for a weight-change goal.",
  },
  {
    date: "19 Aug 2026",
    title: "BMI calculator launched — the site's first Fitness & Health calculator",
    body: "Body Mass Index using WHO's Asian-specific cutoffs (normal up to 22.9, obese from 25) rather than the higher Western thresholds most calculators default to — India's own public health guidance follows the lower Asian bands. First entry in a new Fitness & Health category as the site expands beyond personal finance.",
  },
  {
    date: "18 Aug 2026",
    title: "Margin, discount, budget, and commission calculators launched",
    body: "Margin calculator distinguishes margin from markup — the same profit, two different percentages. Discount and commission calculators handle everyday percentage-off and percentage-of-sale math. Budget calculator splits income into needs, wants, and savings using the 50/30/20 rule as an adjustable starting point.",
  },
  {
    date: "18 Aug 2026",
    title: "Business loan calculator launched",
    body: "EMI at the typically higher rates and shorter tenures business/MSME loans carry, plus net disbursement after a processing fee that usually runs bigger than on retail loans.",
  },
  {
    date: "18 Aug 2026",
    title: "Depreciation calculator launched",
    body: "WDV (the Income Tax Act's method for tax depreciation) against SLM (the Companies Act's usual method for book depreciation) — the same asset can legitimately show very different depreciation in each.",
  },
  {
    date: "18 Aug 2026",
    title: "College cost calculator launched",
    body: "What a course will actually cost by the time enrollment arrives and across its full duration, using education-specific inflation rather than general CPI inflation.",
  },
  {
    date: "18 Aug 2026",
    title: "Debt payoff strategy calculator launched",
    body: "Avalanche (highest rate first) vs. snowball (smallest balance first) across three debts and a fixed monthly budget — which order actually saves more interest, and by how much.",
  },
  {
    date: "18 Aug 2026",
    title: "Credit card minimum payment calculator launched",
    body: "What paying only the card issuer's minimum actually costs — simulated month by month since the minimum payment itself shrinks as the balance does, unlike the fixed-payment credit card payoff calculator already live.",
  },
  {
    date: "18 Aug 2026",
    title: "Annuity payout calculator launched",
    body: "How much a lump sum — an NPS annuity purchase, a retirement corpus — can pay out every month over a chosen period, while the remaining balance keeps earning a return.",
  },
  {
    date: "18 Aug 2026",
    title: "EPS pension calculator launched",
    body: "Monthly pension under EPFO's Employees' Pension Scheme, using the exact statutory formula — pensionable salary capped at ₹15,000, plus the 2-year service bonus past 20 years.",
  },
  {
    date: "18 Aug 2026",
    title: "Present value and future value calculators launched",
    body: "The plain PV = FV ÷ (1+r)ⁿ and FV = PV × (1+r)ⁿ formulas, each on their own focused page — what a known future amount is worth today, and what a lump sum today grows to.",
  },
  {
    date: "18 Aug 2026",
    title: "Payback period calculator launched",
    body: "How long a uniform annual cash inflow takes to pay back an initial cost — the simplest capital-budgeting check, alongside a clear note on what it deliberately ignores (time value of money, and everything after the payback point).",
  },
  {
    date: "18 Aug 2026",
    title: "ROI calculator launched",
    body: "Total and annualised return on any investment, from just a starting sum, an ending value, and how long it took.",
  },
  {
    date: "18 Aug 2026",
    title: "IRR calculator launched",
    body: "Internal rate of return on an investment with uneven cash flows across 5 years, solved numerically — for cash flow patterns that don't fit a simple compounding formula.",
  },
  {
    date: "18 Aug 2026",
    title: "Average return calculator launched",
    body: "The gap between a plain average of yearly returns and the CAGR actually realised — \"volatility drag,\" a mathematical certainty whenever returns vary year to year, worked out from your own numbers.",
  },
  {
    date: "18 Aug 2026",
    title: "Mutual fund calculator launched",
    body: "Lumpsum mutual fund growth, plus exactly how much the fund's expense ratio (TER) costs you in rupees over the holding period, not just as a percentage.",
  },
  {
    date: "18 Aug 2026",
    title: "Bond calculator launched",
    body: "Prices a bond from face value, coupon rate, and market yield to maturity — the present value of coupons plus face value, showing the inverse price/yield relationship that trips up most new bond investors.",
  },
  {
    date: "18 Aug 2026",
    title: "Simple interest calculator launched",
    body: "Plain I = P × R × T with no compounding — the basis of non-cumulative deposits and most loan penalty charges.",
  },
  {
    date: "18 Aug 2026",
    title: "Interest calculator launched",
    body: "A general-purpose compound interest calculator — any starting sum, any monthly contribution, any compounding frequency — for anything the India-specific FD and RD calculators don't cover.",
  },
  {
    date: "18 Aug 2026",
    title: "Auto lease calculator launched",
    body: "Monthly lease payment for a car, split into the depreciation charge and finance charge every lease payment is actually built from.",
  },
  {
    date: "18 Aug 2026",
    title: "Cash back vs. low interest calculator launched",
    body: "Which car financing offer actually costs less — a cash rebate financed at the regular rate, or a promotional low rate on the full price with no rebate — compared on total cost, not just the sticker appeal of either offer.",
  },
  {
    date: "18 Aug 2026",
    title: "Down payment calculator launched",
    body: "How much down payment a target home price needs, the loan and EMI it unlocks, and how long saving for it takes at a chosen monthly rate.",
  },
  {
    date: "18 Aug 2026",
    title: "Home loan overdraft calculator launched",
    body: "How much interest and tenure an overdraft-linked home loan (SBI Maxgain and similar facilities) saves by keeping surplus savings parked against the loan, simulated month by month against an equivalent regular loan.",
  },
  {
    date: "18 Aug 2026",
    title: "Loan against property calculator launched",
    body: "EMI on a loan against an already-owned property, starting from the loan-to-value cap lenders actually apply to LAP rather than the full property value.",
  },
  {
    date: "18 Aug 2026",
    title: "APR calculator launched, and a number-display bug fixed",
    body: "APR calculator works out the effective annual rate once a processing fee is factored in, solved numerically against the EMI you actually pay versus the amount actually disbursed. Also fixed a display bug where every fractional input (interest rates, percentages) was silently rounded to a whole number in the input field itself — the underlying values and all calculations were always correct, only the on-screen figure was wrong.",
  },
  {
    date: "18 Aug 2026",
    title: "Rental yield calculator launched",
    body: "Gross and net rental yield, plus the actual monthly cash flow once the home loan EMI is factored in — separate from any appreciation in the property's value.",
  },
  {
    date: "18 Aug 2026",
    title: "Home loan balance transfer calculator launched",
    body: "Whether moving an outstanding home loan to a new lender at a lower rate actually pays off, netting the transfer cost against the interest saved rather than judging on the rate gap alone.",
  },
  {
    date: "18 Aug 2026",
    title: "Real estate returns calculator launched",
    body: "Net profit and annualised return from buying a property and selling it later, accounting for stamp duty, registration, and selling costs against the headline appreciation rate.",
  },
  {
    date: "18 Aug 2026",
    title: "Rent affordability calculator launched",
    body: "How much rent actually fits your budget, checking both a straight rent-to-income ratio and a combined rent-plus-existing-debt ceiling — whichever is lower is what's recommended.",
  },
  {
    date: "18 Aug 2026",
    title: "Debt consolidation calculator launched",
    body: "Compares paying off two debts separately against rolling them into one new loan — on total interest paid, not just the resulting EMI, since a longer consolidated tenure can lower the monthly payment while costing more overall.",
  },
  {
    date: "18 Aug 2026",
    title: "Debt-to-income ratio, savings goal, and rent vs. buy calculators launched",
    body: "Debt-to-income ratio for a quick lender-style health check on your overall finances; savings goal to work backwards from a target amount to the monthly saving it takes to get there; and rent vs. buy, a full net-worth comparison between buying a home and renting while investing the difference.",
  },
  {
    date: "18 Aug 2026",
    title: "Personal loan, education loan, credit card payoff, and inflation calculators launched",
    body: "Personal loan EMI at unsecured-loan rates; education loan EMI including moratorium-period interest capitalisation; credit card payoff time and total interest at India's monthly-quoted card rates; and an inflation calculator for projecting future costs. Plus the header's calculator menu is now grouped by category (Loans & EMI, Tax, Savings & Deposits, Salary & Retirement, Planning Tools) as the list has grown.",
  },
  {
    date: "18 Aug 2026",
    title: "Home loan eligibility calculator launched",
    body: "Works backwards from income and existing EMIs to the maximum loan amount, using the FOIR (Fixed Obligation to Income Ratio) method Indian lenders actually use — the algebraic inverse of the home loan EMI calculator's own formula.",
  },
  {
    date: "18 Aug 2026",
    title: "NPS calculator launched",
    body: "Retirement corpus projection plus the lump-sum/annuity exit split under the PFRDA Exits and Withdrawals Regulations, 2025 (effective Dec 2025) — the long-standing 40% mandatory annuity rule was reduced to 20% for most subscribers, with even more flexibility below a ₹12L corpus.",
  },
  {
    date: "18 Aug 2026",
    title: "GST and PPF calculators launched",
    body: "GST add/remove across the current post-reform 0/3/5/18/40% slabs (the 12% and 28% slabs were retired in the 22 September 2025 GST 2.0 rationalisation), and PPF maturity value at the government's current 7.1% rate over the 15-year lock-in.",
  },
  {
    date: "17 Aug 2026",
    title: "FD and RD calculators launched",
    body: "Fixed and recurring deposit maturity value with quarterly compounding — RD uses the IBA-prescribed formula, cross-verified against an independently-derived annuity-due calculation before shipping.",
  },
  {
    date: "17 Aug 2026",
    title: "Car loan EMI calculator launched",
    body: "The same reducing-balance amortisation engine as the home loan EMI calculator, tuned for typical Indian car loan amounts, rates, and the 7-year tenure cap most lenders apply.",
  },
  {
    date: "17 Aug 2026",
    title: "Gratuity calculator launched",
    body: "The 15/26 formula under the Payment of Gratuity Act, the ₹20 lakh exemption ceiling under Section 10(10), and the 5-year eligibility rule with its death/disablement exception.",
  },
  {
    date: "17 Aug 2026",
    title: "Capital gains tax calculator launched",
    body: "Equity (12-month holding period, 20% STCG, 12.5% LTCG above ₹1.25L) and property (24-month holding period, the 20%-with-indexation vs 12.5%-without-indexation choice for pre-23-July-2024 purchases), with the full Cost Inflation Index table.",
  },
  {
    date: "17 Aug 2026",
    title: "SIP returns calculator launched",
    body: "Monthly SIP projections with an optional annual step-up, verified against the standard annuity-due formula.",
  },
  {
    date: "17 Aug 2026",
    title: "Loan prepayment impact calculator launched",
    body: "Compares lowering your EMI against shortening your tenure for the same lump-sum prepayment, built on the home loan EMI calculator's amortisation engine.",
  },
  {
    date: "17 Aug 2026",
    title: "HRA exemption calculator launched",
    body: "The three-way minimum rule under Section 10(13A), including the FY 2026-27 metro city list expansion from 4 to 8 cities (Bengaluru, Hyderabad, Pune, and Ahmedabad added).",
  },
  {
    date: "17 Aug 2026",
    title: "In-hand salary from CTC calculator launched",
    body: "CTC breakdown (basic, employer PF, gratuity provisioning) and take-home pay, built on the income tax calculator's regime comparison.",
  },
  {
    date: "17 Aug 2026",
    title: "Income tax (old vs new regime) calculator launched",
    body: "Full FY 2026-27 slab, rebate, surcharge, and marginal relief rules for both regimes, side by side.",
  },
  {
    date: "17 Aug 2026",
    title: "Home loan EMI calculator launched",
    body: "The first calculator on the site: EMI, amortisation schedule, and the reducing-balance formula worked out step by step.",
  },
] as const;
