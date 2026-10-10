import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateDisciplinedSIP,
  calculateCashDrag,
  calculateDelayedSIP,
  calculateCostOfWaiting,
  generateTrajectoryData,
} from "../lib/calc.ts";
import {
  formatRupeesShort,
  formatIndianCurrency,
  formatEditorialRupees,
} from "../lib/format.ts";

test("calculateDisciplinedSIP handles base cases and returns 0 for zero inputs", () => {
  assert.equal(calculateDisciplinedSIP(0, 15), 0);
  assert.equal(calculateDisciplinedSIP(50000, 0), 0);
  assert.equal(calculateDisciplinedSIP(-1000, 10), 0);
});

test("calculateDisciplinedSIP produces expected compounding for 15 years at 50,000/month", () => {
  const result = calculateDisciplinedSIP(50000, 15, 0.12);
  // Total invested = 50,000 * 180 = ₹90 Lakhs
  // Compounded at 12% annual rate should be between 2.3 Cr and 2.6 Cr
  assert.ok(result > 23000000, "Compounded value should exceed 2.3 Crore");
  assert.ok(result < 26500000, "Compounded value should be under 2.65 Crore");
});

test("calculateCashDrag models ~7% inflation loss on idle cash", () => {
  const result = calculateCashDrag(50000, 15, 0.07);
  const nominalTotal = 50000 * 15 * 12; // 90 Lakhs
  // Real purchasing power should be significantly lower than 90 Lakhs
  assert.ok(result < nominalTotal * 0.45, "Real purchasing power should be deflated by >55%");
  assert.ok(result > 3000000, "Deflated purchasing power should be around 32-35 Lakhs");
});

test("calculateCostOfWaiting properly calculates the penalty of delaying 3 years", () => {
  const monthly = 50000;
  const horizon = 15;
  const disciplined = calculateDisciplinedSIP(monthly, horizon, 0.12);
  const delayed = calculateDelayedSIP(monthly, horizon, 3, 0.12);
  const costOfDelay = calculateCostOfWaiting(monthly, horizon, 3, 0.12);

  assert.ok(disciplined > delayed, "Disciplined compounding must exceed delayed compounding");
  assert.equal(costOfDelay, disciplined - delayed, "Cost of delay is exact difference between disciplined and delayed");
  // 3 years of delay costs over 80 Lakhs on a 15-year horizon
  assert.ok(costOfDelay > 8000000, "Waiting 3 years must impose at least 80 Lakhs penalty");
});

test("generateTrajectoryData returns correct points array and monotonic growth", () => {
  const data = generateTrajectoryData(50000, 15, 3, 0.12, 0.07);
  assert.equal(data.length, 16); // years 0 to 15 inclusive
  assert.equal(data[0].year, 0);
  assert.equal(data[0].disciplined, 0);
  assert.equal(data[0].delayed, 0);

  // In years 1, 2, 3 delayed should be 0
  assert.equal(data[1].delayed, 0);
  assert.equal(data[2].delayed, 0);
  assert.equal(data[3].delayed, 0);

  // In year 4 delayed should be > 0
  assert.ok(data[4].delayed > 0);

  // Disciplined compounding is strictly increasing
  for (let i = 1; i < data.length; i++) {
    assert.ok(data[i].disciplined > data[i - 1].disciplined);
  }
});

test("formatRupeesShort formats Crores, Lakhs, and Thousands cleanly", () => {
  assert.equal(formatRupeesShort(25000000), "₹2.50 Cr");
  assert.equal(formatRupeesShort(10700000), "₹1.07 Cr");
  assert.equal(formatRupeesShort(400000), "₹4 L");
  assert.equal(formatRupeesShort(9124000), "₹91.24 L");
  assert.equal(formatRupeesShort(50000), "₹50,000");
  assert.equal(formatRupeesShort(0), "₹0");
});

test("formatIndianCurrency applies standard Indian comma groupings", () => {
  const formatted = formatIndianCurrency(24986345);
  // Should include ₹ and comma grouping (2,49,86,345)
  assert.ok(formatted.includes("2,49,86,345"));
});

test("formatEditorialRupees breaks amount into readable components", () => {
  const cr = formatEditorialRupees(25000000);
  assert.equal(cr.unit, "Cr");
  assert.ok(cr.number.includes("2.5"));

  const lk = formatEditorialRupees(5000000);
  assert.equal(lk.unit, "Lakh");
  assert.ok(lk.number.includes("50"));
});
