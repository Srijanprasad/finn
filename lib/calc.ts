/**
 * Prospar Wealth Platform - Financial Calculation Engine
 * 
 * Strict mathematical modeling for multi-decade compounding,
 * cash inflation drag, and cost of delay analysis.
 */

export interface CompoundingPoint {
  year: number;
  disciplined: number;
  cashDrag: number;
  delayed: number;
  costOfDelay: number;
}

/**
 * Calculates the future value of a monthly SIP using compounding interest.
 * 
 * Formula:
 * Monthly effective rate: r_m = (1 + annualReturnRate)^(1/12) - 1
 * Total months: m = years * 12
 * For annuity due (contributions at beginning of each month):
 * FV = P * [((1 + r_m)^m - 1) / r_m] * (1 + r_m)
 * 
 * @param monthlyContribution Monthly SIP installment in INR (e.g. 50,000)
 * @param years Total investment horizon in years
 * @param annualReturnRate Assumed annual return rate (default: 0.12 = 12% p.a.)
 * @param annuityDue Whether payments occur at the start of each month (true) or end (false)
 */
export function calculateDisciplinedSIP(
  monthlyContribution: number,
  years: number,
  annualReturnRate = 0.12,
  annuityDue = true
): number {
  if (monthlyContribution <= 0 || years <= 0) return 0;
  
  const months = Math.round(years * 12);
  const monthlyRate = Math.pow(1 + annualReturnRate, 1 / 12) - 1;
  
  if (monthlyRate === 0) return monthlyContribution * months;
  
  const compoundingFactor = Math.pow(1 + monthlyRate, months);
  const baseFV = monthlyContribution * ((compoundingFactor - 1) / monthlyRate);
  
  return annuityDue ? baseFV * (1 + monthlyRate) : baseFV;
}

/**
 * Calculates the purchasing power of cash kept at 0% return under inflation.
 * Shows what nominal cash contributions would actually be worth in today's purchasing power.
 * 
 * Total nominal cash saved = monthlyContribution * (years * 12)
 * Real purchasing power = Total nominal / (1 + inflationRate)^years
 * 
 * @param monthlyContribution Monthly cash amount in INR
 * @param years Total period in years
 * @param inflationRate Assumed annual inflation rate (default: 0.07 = 7% p.a.)
 */
export function calculateCashDrag(
  monthlyContribution: number,
  years: number,
  inflationRate = 0.07
): number {
  if (monthlyContribution <= 0 || years <= 0) return 0;
  
  const totalNominal = monthlyContribution * years * 12;
  const inflationDeflator = Math.pow(1 + inflationRate, years);
  
  return totalNominal / inflationDeflator;
}

/**
 * Calculates the ending value of a SIP delayed by a given number of years.
 * Starts in year (delayYears + 1) and ends at totalYears.
 * 
 * @param monthlyContribution Monthly SIP installment in INR
 * @param totalYears Total horizon in years
 * @param delayYears Years delayed before starting (default: 3)
 * @param annualReturnRate Assumed annual return rate (default: 0.12 = 12% p.a.)
 */
export function calculateDelayedSIP(
  monthlyContribution: number,
  totalYears: number,
  delayYears = 3,
  annualReturnRate = 0.12
): number {
  if (totalYears <= delayYears) return 0;
  const activeYears = totalYears - delayYears;
  return calculateDisciplinedSIP(monthlyContribution, activeYears, annualReturnRate);
}

/**
 * Calculates the exact wealth penalty (Cost of Waiting) caused by delaying investment.
 * Cost of Waiting = Disciplined SIP value - Delayed SIP value
 * 
 * @param monthlyContribution Monthly SIP installment in INR
 * @param totalYears Total horizon in years
 * @param delayYears Delay in years (default: 3)
 * @param annualReturnRate Assumed annual return rate (default: 0.12 = 12% p.a.)
 */
export function calculateCostOfWaiting(
  monthlyContribution: number,
  totalYears: number,
  delayYears = 3,
  annualReturnRate = 0.12
): number {
  const disciplined = calculateDisciplinedSIP(monthlyContribution, totalYears, annualReturnRate);
  const delayed = calculateDelayedSIP(monthlyContribution, totalYears, delayYears, annualReturnRate);
  return Math.max(0, disciplined - delayed);
}

/**
 * Generates trajectory curve coordinates for SVG/Recharts rendering from year 0 to totalYears.
 */
export function generateTrajectoryData(
  monthlyContribution: number,
  totalYears: number,
  delayYears = 3,
  annualReturnRate = 0.12,
  inflationRate = 0.07
): CompoundingPoint[] {
  const points: CompoundingPoint[] = [];

  for (let y = 0; y <= totalYears; y++) {
    const disciplined = calculateDisciplinedSIP(monthlyContribution, y, annualReturnRate);
    const cashDrag = calculateCashDrag(monthlyContribution, y, inflationRate);
    const delayed = calculateDelayedSIP(monthlyContribution, y, delayYears, annualReturnRate);
    const costOfDelay = Math.max(0, disciplined - delayed);

    points.push({
      year: y,
      disciplined: Math.round(disciplined),
      cashDrag: Math.round(cashDrag),
      delayed: Math.round(delayed),
      costOfDelay: Math.round(costOfDelay),
    });
  }

  return points;
}
