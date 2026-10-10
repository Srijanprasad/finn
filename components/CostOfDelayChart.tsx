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
const PADDING = { top: 20, right: 25, bottom: 35, left: 20 };

export function CostOfDelayChart() {
  const [monthly, setMonthly] = useState<number>(50000);
  const [years, setYears] = useState<number>(15);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Compute curve trajectory points
  const points = useMemo(() => {
    return generateTrajectoryData(monthly, years, 3, 0.12, 0.07);
  }, [monthly, years]);

  // Terminal values
  const disciplinedFinal = useMemo(() => {
    return calculateDisciplinedSIP(monthly, years, 0.12);
  }, [monthly, years]);

  const cashDragFinal = useMemo(() => {
    return calculateCashDrag(monthly, years, 0.07);
  }, [monthly, years]);

  const costOfWaitingFinal = useMemo(() => {
    return calculateCostOfWaiting(monthly, years, 3, 0.12);
  }, [monthly, years]);

  // SVG coordinate transformation
  const maxY = Math.max(...points.map((p) => p.disciplined), 1);
  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const getX = (year: number) => PADDING.left + (year / years) * plotWidth;
  const getY = (val: number) => PADDING.top + plotHeight - (val / maxY) * plotHeight;

  // Build SVG path strings
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

  // Summary announcement string for screen readers
  const liveSummary = `Model results for ${formatRupeesShort(monthly)} monthly over ${years} years: Disciplined compounding reaches ${formatRupeesShort(
    disciplinedFinal
  )}, purchasing power of uninvested cash falls to ${formatRupeesShort(
    cashDragFinal
  )}, and delaying by 3 years costs ${formatRupeesShort(costOfWaitingFinal)}.`;

  return (
    <div
      id="wealth-simulator"
      tabIndex={-1}
      className="card-glass p-5 sm:p-7 relative overflow-hidden shadow-2xl focus:outline-none focus:ring-1 focus:ring-gold/60"
    >
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-navy-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">
              Live Compounding Engine
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-copy-primary mt-1">
            The Cost of Delay
          </h2>
          <p className="text-xs text-copy-secondary">
            Visualizing the mathematical penalty of procrastination vs steady execution.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-[11px] font-mono text-copy-muted bg-navy/60 px-3 py-1.5 rounded-control border border-navy-border">
          <Clock className="w-3.5 h-3.5 text-gold" />
          <span>CAGR: 12% • Inflation: 7%</span>
        </div>
      </div>

      {/* SVG Trajectory Chart */}
      <div className="relative mt-5">
        <div className="w-full aspect-[640/260] max-h-[280px]">
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="w-full h-full overflow-visible"
            role="img"
            aria-label={`Compounding curves comparing disciplined investing, cash drag, and 3-year delay over ${years} years.`}
          >
            <defs>
              <linearGradient id="disciplinedGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C5A059" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#C5A059" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
              const yVal = PADDING.top + plotHeight * pct;
              return (
                <g key={pct}>
                  <line
                    x1={PADDING.left}
                    x2={CHART_WIDTH - PADDING.right}
                    y1={yVal}
                    y2={yVal}
                    stroke="#24324D"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                </g>
              );
            })}

            {/* Disciplined Gradient Area */}
            <path d={disciplinedAreaPath} fill="url(#disciplinedGlow)" />

            {/* Curve 1: Cash Drag (Muted Red, dashed) */}
            <path
              d={cashDragPath}
              fill="none"
              stroke="#B4533F"
              strokeWidth="2.5"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />

            {/* Curve 2: Cost of Waiting 3 Years (Slate Blue) */}
            <path
              d={delayedPath}
              fill="none"
              stroke="#5B7DB1"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Curve 3: Disciplined Compounding (Champagne Gold) */}
            <path
              d={disciplinedPath}
              fill="none"
              stroke="#C5A059"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Terminal Point Highlights */}
            <circle
              cx={getX(years)}
              cy={getY(disciplinedFinal)}
              r="4.5"
              fill="#C5A059"
              stroke="#0A0F1D"
              strokeWidth="2"
            />
            <circle
              cx={getX(years)}
              cy={getY(cashDragFinal)}
              r="4"
              fill="#B4533F"
              stroke="#0A0F1D"
              strokeWidth="2"
            />

            {/* Axis Year Labels */}
            <text
              x={PADDING.left}
              y={CHART_HEIGHT - 10}
              fill="#6B7A94"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              Today
            </text>
            <text
              x={PADDING.left + plotWidth * 0.5}
              y={CHART_HEIGHT - 10}
              fill="#6B7A94"
              fontSize="10"
              textAnchor="middle"
              fontFamily="var(--font-mono)"
            >
              Year {Math.round(years / 2)}
            </text>
            <text
              x={CHART_WIDTH - PADDING.right}
              y={CHART_HEIGHT - 10}
              fill="#6B7A94"
              fontSize="10"
              textAnchor="end"
              fontFamily="var(--font-mono)"
            >
              Year {years}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-navy-border/50 flex flex-wrap items-center justify-between gap-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 rounded-full bg-[#C5A059]" />
            <span className="text-copy-primary font-medium">Disciplined SIP (12%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 rounded-full bg-[#5B7DB1]" />
            <span className="text-copy-secondary">Waited 3 Years</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 rounded-full bg-[#B4533F] border-b border-dashed border-white" />
            <span className="text-copy-secondary">Cash Drag (7% infl.)</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls (Sliders) */}
      <div className="mt-6 pt-5 border-t border-navy-border/60 space-y-5">
        {/* Monthly Contribution Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="slider-monthly" className="text-xs font-medium text-copy-secondary">
              Monthly Contribution
            </label>
            <span className="text-sm font-mono font-semibold text-gold tabular-nums">
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
          <div className="flex justify-between text-[10px] font-mono text-copy-muted mt-1">
            <span>₹10,000</span>
            <span>₹2,50,000</span>
            <span>₹5,00,000</span>
          </div>
        </div>

        {/* Time Horizon Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="slider-years" className="text-xs font-medium text-copy-secondary">
              Time Horizon
            </label>
            <span className="text-sm font-mono font-semibold text-copy-primary tabular-nums">
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
          <div className="flex justify-between text-[10px] font-mono text-copy-muted mt-1">
            <span>5 Years</span>
            <span>15 Years</span>
            <span>25 Years</span>
          </div>
        </div>
      </div>

      {/* Three Live Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-navy-border/60">
        {/* Tile A: Disciplined Ending Value */}
        <div className="p-3.5 rounded-lg bg-navy/80 border border-navy-border flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-copy-secondary">
            Disciplined Wealth
          </span>
          <div className="mt-1">
            <div className="text-xl sm:text-2xl font-serif text-copy-primary tabular-nums font-semibold">
              {formatRupeesShort(disciplinedFinal)}
            </div>
            <p className="text-[10px] text-copy-muted mt-0.5">
              Principal: {formatRupeesShort(monthly * years * 12)}
            </p>
          </div>
        </div>

        {/* Tile B: Cash Drag */}
        <div className="p-3.5 rounded-lg bg-navy/80 border border-navy-border flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300/80">
            Real Cash Value
          </span>
          <div className="mt-1">
            <div className="text-xl sm:text-2xl font-serif text-copy-primary tabular-nums font-semibold">
              {formatRupeesShort(cashDragFinal)}
            </div>
            <p className="text-[10px] text-copy-muted mt-0.5">
              7% inflation erosion
            </p>
          </div>
        </div>

        {/* Tile C: Cost of Waiting 3 Years */}
        <div className="p-3.5 rounded-lg bg-gold/10 border border-gold/40 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-gold font-medium">
            Cost of Waiting 3 Yrs
          </span>
          <div className="mt-1">
            <div className="text-xl sm:text-2xl font-serif text-gold-light tabular-nums font-semibold">
              {formatRupeesShort(costOfWaitingFinal)}
            </div>
            <p className="text-[10px] text-gold/80 mt-0.5">
              Gap vs delayed start
            </p>
          </div>
        </div>
      </div>

      {/* Accessible Polite Announcement for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveSummary}
      </div>

      {/* Footnote & Link to full SIP Calculator */}
      <div className="mt-5 pt-4 border-t border-navy-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-copy-muted">
        <div className="flex items-center gap-1.5 leading-normal">
          <AlertCircle className="w-3.5 h-3.5 text-copy-muted flex-shrink-0" />
          <span>{HERO_COPY.footnote}</span>
        </div>

        <Link
          href={HERO_COPY.fullCalculatorHref}
          className="inline-flex items-center gap-1 text-gold hover:text-gold-light font-medium transition-colors whitespace-nowrap"
        >
          <span>{HERO_COPY.fullCalculatorLinkText}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
