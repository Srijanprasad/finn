/**
 * Prospar Wealth Platform - Indian Currency & Number Formatting Utility
 * 
 * Provides strict Indian digit grouping (Lakhs and Crores),
 * compact financial shorthands, and tabular-num friendly formatting.
 */

/**
 * Formats a numeric value into compact Indian shorthand (e.g., ₹2.50 Cr, ₹50.0 L, ₹10,000).
 * 
 * @param value The monetary amount in INR
 * @param decimals Number of decimal places (default: 2)
 */
export function formatRupeesShort(value: number, decimals = 2): string {
  if (value === 0 || isNaN(value)) return "₹0";

  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const sign = isNegative ? "-" : "";

  // 1 Crore = 10,000,000 (100 Lakhs)
  if (absValue >= 10000000) {
    const crores = absValue / 10000000;
    const formatted = crores.toFixed(decimals).replace(/\.00$/, "");
    return `${sign}₹${formatted} Cr`;
  }

  // 1 Lakh = 100,000
  if (absValue >= 100000) {
    const lakhs = absValue / 100000;
    const formatted = lakhs.toFixed(decimals).replace(/\.00$/, "");
    return `${sign}₹${formatted} L`;
  }

  // Under 1 Lakh
  if (absValue >= 1000) {
    return `${sign}₹${Math.round(absValue).toLocaleString("en-IN")}`;
  }

  return `${sign}₹${Math.round(absValue)}`;
}

/**
 * Formats full value in standard Indian currency format with rupee symbol.
 * Example: 24986345 -> ₹2,49,86,345
 */
export function formatIndianCurrency(value: number): string {
  if (isNaN(value)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a plain number with Indian digit grouping (no currency sign).
 * Example: 24986345 -> 2,49,86,345
 */
export function formatIndianNumber(value: number): string {
  if (isNaN(value)) return "0";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Breaks down an amount into numeral and unit for stylized editorial displays.
 */
export function formatEditorialRupees(value: number): {
  number: string;
  unit: string;
  formatted: string;
} {
  const absValue = Math.abs(value);
  if (absValue >= 10000000) {
    const cr = (absValue / 10000000).toFixed(2).replace(/\.00$/, "");
    return { number: `₹${cr}`, unit: "Cr", formatted: `₹${cr} Cr` };
  }
  if (absValue >= 100000) {
    const lk = (absValue / 100000).toFixed(1).replace(/\.0$/, "");
    return { number: `₹${lk}`, unit: "Lakh", formatted: `₹${lk} L` };
  }
  return {
    number: `₹${Math.round(absValue).toLocaleString("en-IN")}`,
    unit: "",
    formatted: `₹${Math.round(absValue).toLocaleString("en-IN")}`,
  };
}
