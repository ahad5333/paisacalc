import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type RentalYieldInputs = {
  propertyPrice: number;
  downPaymentPercent: number;
  loanRatePercent: number;
  loanTenureYears: number;
  monthlyRent: number;
  annualExpensesPercent: number;
  vacancyPercent: number;
};

export type RentalYieldValue = {
  downPayment: number;
  loanAmount: number;
  emi: number;
  grossAnnualRent: number;
  effectiveAnnualRent: number;
  annualExpenses: number;
  netAnnualIncome: number;
  annualCashFlow: number;
  monthlyCashFlow: number;
  grossYieldPercent: number;
  netYieldPercent: number;
  cashOnCashReturnPercent: number;
};

// Landlord-side analysis — gross/net rental yield are the standard
// figures Indian real estate media actually quote, and cash-on-cash
// return (annual cash flow ÷ actual cash invested, i.e. the down
// payment) is the metric that reflects leverage: financing most of the
// purchase with a loan can make a property look far more attractive on
// cash-on-cash terms than the plain yield suggests, for better or worse.
// Distinct from lib/calc/real-estate-returns.ts (a buy-and-later-sell
// appreciation play, no rental income) and lib/calc/rent-vs-buy.ts (a
// personal housing decision, not an investment one).
export function calculateRentalYield(inputs: RentalYieldInputs): CalcResult<RentalYieldValue> {
  const { propertyPrice, downPaymentPercent, loanRatePercent, loanTenureYears, monthlyRent, annualExpensesPercent, vacancyPercent } =
    inputs;

  const downPayment = Math.round((propertyPrice * downPaymentPercent) / 100);
  const loanAmount = propertyPrice - downPayment;
  const emiResult = calculateEmi({
    principal: loanAmount,
    annualRatePercent: loanRatePercent,
    tenureMonths: Math.max(1, Math.round(loanTenureYears * 12)),
  });
  const emi = emiResult.value.emi;

  const grossAnnualRent = monthlyRent * 12;
  const effectiveAnnualRent = Math.round(grossAnnualRent * (1 - vacancyPercent / 100));
  const annualExpenses = Math.round((propertyPrice * annualExpensesPercent) / 100);
  const netAnnualIncome = effectiveAnnualRent - annualExpenses;
  const annualEmiOutflow = emi * 12;
  const annualCashFlow = netAnnualIncome - annualEmiOutflow;
  const monthlyCashFlow = Math.round(annualCashFlow / 12);

  const grossYieldPercent = Math.round((grossAnnualRent / propertyPrice) * 1000) / 10;
  const netYieldPercent = Math.round((netAnnualIncome / propertyPrice) * 1000) / 10;
  const cashOnCashReturnPercent = downPayment > 0 ? Math.round((annualCashFlow / downPayment) * 1000) / 10 : 0;

  return {
    value: {
      downPayment,
      loanAmount,
      emi,
      grossAnnualRent,
      effectiveAnnualRent,
      annualExpenses,
      netAnnualIncome,
      annualCashFlow,
      monthlyCashFlow,
      grossYieldPercent,
      netYieldPercent,
      cashOnCashReturnPercent,
    },
    steps: [
      { label: "Gross annual rent", formula: `${monthlyRent} × 12`, value: grossAnnualRent },
      { label: "Effective rent after vacancy", formula: `${grossAnnualRent} × (1 − ${vacancyPercent}%)`, value: effectiveAnnualRent },
      { label: "Annual expenses", formula: `${propertyPrice} × ${annualExpensesPercent}%`, value: annualExpenses },
      { label: "Net annual income", formula: "Effective rent − Expenses", value: netAnnualIncome },
      { label: "Annual cash flow (after EMI)", formula: `Net income − (EMI × 12)`, value: annualCashFlow },
      { label: "Gross rental yield", formula: "Gross annual rent ÷ Property price", value: grossYieldPercent },
      { label: "Cash-on-cash return", formula: "Annual cash flow ÷ Down payment", value: cashOnCashReturnPercent },
    ],
    assumptions: [
      "Vacancy is applied as a flat percentage of annual rent, not modelled as specific vacant months",
      "Annual expenses (maintenance, property tax, insurance) are estimated as a percentage of property price, not itemised",
      "Rent and expenses are held constant for this year's snapshot — no rent escalation or expense inflation projected forward",
      "Ignores property appreciation entirely — this is a pure income/cash-flow view, not a total-return one",
      "Cash-on-cash return uses only the down payment as invested cash, not closing costs or later capital expenditure",
    ],
    rulesVersion: "Rental yield and cash flow (assumption-based)",
  };
}
