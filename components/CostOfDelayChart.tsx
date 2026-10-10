"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, AlertCircle } from "lucide-react";
import {
  generateTrajectoryData,
  calculateDisciplinedSIP,
  calculateCashDrag,
  calculateCostOfWaiting,
} from "@/lib/calc";
import { formatRupeesShort, formatIndianCurrency } from "@/lib/format";
import { HERO_COPY } from "@/lib/content";

const CHART_WIDTH = 640;
const CHART_HEIGHT = 260;
const PADDING = { top: 25, right: 30, bottom: 35, left: 20 };

export function CostOfDelayChart() {
  const [monthly, setMonthly] = useState<number>(50000);
  const [years, setYears] = useState<number>(15);

  const points = useMemo(() => {
    return generateTrajectoryData(monthly, years, 3, 0.12, 0.07);
  }, [monthly, years]);

  const disciplinedFinal = useMemo(() => {
    return calculateDisciplinedSIP(monthly, years, 0.12);
  }, [monthly, years]);

  const cashDragFinal = useMemo(() => {
    return calculateCashDrag(monthly, years, 0.07);
  }, [monthly, years]);

  const costOfWaitingFinal = useMemo(() => {
    return calculateCostOfWaiting(monthly, years, 3, 0.12);
  }, [monthly, years]);

  const maxY = Math.max(...points.map((p) => p.disciplined), 1);
  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const getX = (year: number) => PADDING.left + (year / years) * plotWidth;
  const getY = (val: number) => PADDING.top + plotHeight - (val / maxY) * plotHeight;

  const disciplinedPath = useMemo(() => {
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(p.year).toFixed(1)} ${getY(p.disciplined).toFixed(1)}`)
      .join(" ");
  }, [points, years, maxY]);

  const disciplinedAreaPath = useMemo(() => {
    if (points.length === 0) return "";
    const firstX = getX(0).toFixed(1);
    const lastX = getX(years).toFixed(1);
    const zeroY = (PADDING.top + plotHeight).toFixed(1);
    return `${disciplinedPath} L ${lastX} ${zeroY} L ${firstX} ${zeroY} Z`;
  }, [disciplinedPath, years, plotHeight]);

  const delayedPath = useMemo(() => {
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(p.year).toFixed(1)} ${getY(p.delayed).toFixed(1)}`)
      .join(" ");
  }, [points, years, maxY]);

  const cashDragPath = useMemo(() => {
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(p.year).toFixed(1)} ${getY(p.cashDrag).toFixed(1)}`)
      .join(" ");
  }, [points, years, maxY]);

  const liveSummary = `Model results for ${formatRupeesShort(monthly)} monthly over ${years} years: Disciplined compounding reaches ${formatRupeesShort(
    disciplinedFinal
  )}, purchasing power of uninvested cash falls to ${formatRupeesShort(
    cashDragFinal
  )}, and delaying by 3 years costs ${formatRupeesShort(costOfWaitingFinal)}.`;

  return (
    <div
      id="wealth-simulator"
      tabIndex={-1}
      className="bg-white border border-hairline-light rounded-card p-6 sm:p-8 shadow-editorial relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-aurum"
    >
      {/* Top Header of the Ledger */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-hairline-light/80 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-aurum uppercase font-semibold">
            Precision Compounding Ledger
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-normal text-ink-primary mt-1">
            The Cost of Delay
          </h2>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-ink-secondary bg-alabaster px-3 py-1.5 rounded border border-hairline-light">
          <Clock className="w-3.5 h-3.5 text-aurum" />
          <span>Assumptions: 12% CAGR • 7% Inflation</span>
        </div>
      </div>

      {/* SVG Chart Graphic */}
      <div className="relative mt-6">
        <div className="w-full aspect-[640/260] max-h-[270px]">
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="w-full h-full overflow-visible"
            role="img"
            aria-label={`Visual trajectory curves comparing disciplined investing, cash drag, and 3-year delay over ${years} years.`}
          >
            <defs>
              <linearGradient id="disciplinedLightGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A88238" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#A88238" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Hairline Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
              const yVal = PADDING.top + plotHeight * pct;
              return (
                <g key={pct}>
                  <line
                    x1={PADDING.left}
                    x2={CHART_WIDTH - PADDING.right}
                    y1={yVal}
                    y2={yVal}
                    stroke="#EFEBE4"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </g>
              );
            })}

            {/* Disciplined Gradient Area */}
            <path d={disciplinedAreaPath} fill="url(#disciplinedLightGlow)" />

            {/* Curve 1: Cash Drag (Muted Red, dashed) */}
            <path
              d={cashDragPath}
              fill="none"
              stroke="#B64E3A"
              strokeWidth="2"
              strokeDasharray="5 4"
              strokeLinecap="round"
            />

            {/* Curve 2: Cost of Waiting 3 Years (Slate Blue) */}
            <path
              d={delayedPath}
              fill="none"
              stroke="#4B729F"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Curve 3: Disciplined Compounding (Aurum Bronze) */}
            <path
              d={disciplinedPath}
              fill="none"
              stroke="#A88238"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Terminal Points */}
            <circle
              cx={getX(years)}
              cy={getY(disciplinedFinal)}
              r="4.5"
              fill="#A88238"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <circle
              cx={getX(years)}
              cy={getY(cashDragFinal)}
              r="4"
              fill="#B64E3A"
              stroke="#FFFFFF"
              strokeWidth="2"
            />

            {/* Year Axis Markers */}
            <text
              x={PADDING.left}
              y={CHART_HEIGHT - 10}
              fill="#7E8799"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              Start (Yr 0)
            </text>
            <text
              x={PADDING.left + plotWidth * 0.5}
              y={CHART_HEIGHT - 10}
              fill="#7E8799"
              fontSize="10"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
            >
              Year {Math.round(years / 2)}
            </text>
            <text
              x={CHART_WIDTH - PADDING.right}
              y={CHART_HEIGHT - 10}
              fill="#7E8799"
              fontSize="10"
              textAnchor="end"
              fontFamily="var(--font-mono)"
            >
              Year {years}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-hairline-light/60 flex flex-wrap items-center justify-between gap-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 rounded-full bg-[#A88238]" />
            <span className="text-ink-primary font-medium">Disciplined SIP (12% CAGR)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 rounded-full bg-[#4B729F]" />
            <span className="text-ink-secondary">Waited 3 Years</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 rounded-full bg-[#B64E3A] border-b border-dashed border-white" />
            <span className="text-ink-secondary">Cash Drag (7% infl.)</span>
          </div>
        </div>
      </div>

      {/* Sliders Controls */}
      <div className="mt-6 pt-5 border-t border-hairline-light/80 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="slider-monthly" className="text-xs font-medium text-ink-secondary">
              Monthly Contribution
            </label>
            <span className="text-sm font-mono font-semibold text-aurum-dark tabular-nums">
              {formatIndianCurrency(monthly)} / mo
            </span>
          </div>
          <input
            id="slider-monthly"
            type="range"
            min={10000}
            max={500000}
            step={5000}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            aria-valuemin={10000}
            aria-valuemax={500000}
            aria-valuenow={monthly}
            aria-valuetext={`Monthly SIP contribution: ${formatIndianCurrency(monthly)}`}
          />
          <div className="flex justify-between text-[10px] font-mono text-ink-muted mt-1">
            <span>₹10,000</span>
            <span>₹2,50,000</span>
            <span>₹5,00,000</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="slider-years" className="text-xs font-medium text-ink-secondary">
              Investment Horizon
            </label>
            <span className="text-sm font-mono font-semibold text-ink-primary tabular-nums">
              {years} Years
            </span>
          </div>
          <input
            id="slider-years"
            type="range"
            min={5}
            max={25}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            aria-valuemin={5}
            aria-valuemax={25}
            aria-valuenow={years}
            aria-valuetext={`Time horizon: ${years} years`}
          />
          <div className="flex justify-between text-[10px] font-mono text-ink-muted mt-1">
            <span>5 Years</span>
            <span>15 Years</span>
            <span>25 Years</span>
          </div>
        </div>
      </div>

      {/* 3 Live Stat Tiles (Broadsheet Ledger Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-5 border-t border-hairline-light/80">
        <div className="p-3.5 rounded bg-alabaster border border-hairline-light flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ink-secondary">
            Disciplined Wealth
          </span>
          <div className="mt-1.5">
            <div className="text-xl sm:text-2xl font-serif text-ink-primary tabular-nums font-semibold">
              {formatRupeesShort(disciplinedFinal)}
            </div>
            <p className="text-[10px] text-ink-muted mt-0.5">
              Principal: {formatRupeesShort(monthly * years * 12)}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded bg-alabaster border border-hairline-light flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-rose-800">
            Real Cash Value
          </span>
          <div className="mt-1.5">
            <div className="text-xl sm:text-2xl font-serif text-ink-primary tabular-nums font-semibold">
              {formatRupeesShort(cashDragFinal)}
            </div>
            <p className="text-[10px] text-ink-muted mt-0.5">
              7% inflation erosion
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded bg-aurum/10 border border-aurum/30 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-aurum-dark font-semibold">
            Cost of Waiting 3 Yrs
          </span>
          <div className="mt-1.5">
            <div className="text-xl sm:text-2xl font-serif text-aurum-dark tabular-nums font-semibold">
              {formatRupeesShort(costOfWaitingFinal)}
            </div>
            <p className="text-[10px] text-aurum-dark/80 mt-0.5">
              Wealth lost to hesitation
            </p>
          </div>
        </div>
      </div>

      {/* Screen Reader polite live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveSummary}
      </div>

      {/* Footnote & Full Calculator Link */}
      <div className="mt-5 pt-4 border-t border-hairline-light/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-muted">
        <div className="flex items-center gap-1.5 leading-normal">
          <AlertCircle className="w-3.5 h-3.5 text-ink-muted flex-shrink-0" />
          <span>{HERO_COPY.footnote}</span>
        </div>

        <Link
          href={HERO_COPY.fullCalculatorHref}
          className="inline-flex items-center gap-1 text-aurum-dark hover:text-aurum font-medium transition-colors whitespace-nowrap"
        >
          <span>{HERO_COPY.fullCalculatorLinkText}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
