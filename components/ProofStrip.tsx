"use client";

import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import { PROOF_STATS } from "@/lib/content";

export function ProofStrip() {
  const [openMethodology, setOpenMethodology] = useState<number | null>(null);

  const toggleMethodology = (index: number) => {
    setOpenMethodology(openMethodology === index ? null : index);
  };

  return (
    <section
      className="bg-nocturne py-16 sm:py-20 border-b border-hairline-dark relative text-white"
      aria-label="Empirical Market Proof"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-hairline-dark pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-aurum-light uppercase font-semibold">
              Historical Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white mt-1">
              The Math of Staying Invested
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Unvarnished market records across 26 years demonstrating the compounding penalty of premature discontinuation.
          </p>
        </div>

        {/* 3-Column Architectural Ledger (No floating cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline-dark">
          {PROOF_STATS.map((stat, index) => {
            const isMethodologyOpen = openMethodology === index;

            return (
              <div
                key={stat.numeral}
                className={`py-8 md:py-0 ${
                  index === 0
                    ? "md:pr-8"
                    : index === 1
                    ? "md:px-8"
                    : "md:pl-8"
                } flex flex-col justify-between`}
              >
                <div>
                  {/* Top Bar with Number & Tiny Graphic */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-aurum-light uppercase">
                      Study 0{index + 1}
                    </span>

                    {/* Tiny inline SVG visual */}
                    <div className="w-16 h-7 text-aurum-light flex items-center justify-end" aria-hidden="true">
                      {index === 0 && (
                        <svg viewBox="0 0 64 28" fill="none" className="w-full h-full stroke-aurum-light stroke-[1.8]">
                          <path
                            d="M2 24 L12 18 L18 22 L28 10 L34 20 L44 8 L50 14 L62 2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg viewBox="0 0 64 28" fill="none" className="w-full h-full">
                          <path d="M2 24 L18 23 L32 23 L62 23" stroke="#B64E3A" strokeWidth="1.5" strokeDasharray="3 3" />
                          <path d="M2 24 L18 23 L32 18 L48 10 L62 3" stroke="#BF9748" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg viewBox="0 0 64 28" fill="none" className="w-full h-full stroke-chart-cashDrag stroke-[1.8]">
                          <path
                            d="M2 4 C18 4, 30 14, 62 24"
                            strokeLinecap="round"
                            strokeDasharray="4 4"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Large Serif Metric */}
                  <div className="mb-3">
                    <div className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-normal text-white tracking-tight tabular-nums">
                      {stat.numeral}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-aurum-light mt-1 font-semibold">
                      {stat.label}
                    </div>
                  </div>

                  {/* Context */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                    {stat.context}
                  </p>
                </div>

                {/* Methodology Accordion */}
                <div className="mt-6 pt-4 border-t border-hairline-dark/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono truncate max-w-[170px]">Source: {stat.source}</span>
                    <button
                      type="button"
                      onClick={() => toggleMethodology(index)}
                      className="inline-flex items-center gap-1 text-aurum-light hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aurum rounded"
                      aria-expanded={isMethodologyOpen}
                      aria-controls={`methodology-${index}`}
                    >
                      <Info className="w-3 h-3" />
                      <span>Methodology</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          isMethodologyOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isMethodologyOpen && (
                    <div
                      id={`methodology-${index}`}
                      className="mt-3 p-3 rounded bg-nocturne-surface border border-hairline-dark text-[11px] text-slate-300 leading-normal animate-in fade-in duration-150"
                    >
                      {stat.methodology}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
