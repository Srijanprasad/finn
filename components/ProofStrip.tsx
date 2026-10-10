"use client";

import { useState } from "react";
import { Info, ChevronDown, TrendingUp, GitCompare, ArrowDownRight } from "lucide-react";
import { PROOF_STATS } from "@/lib/content";

export function ProofStrip() {
  const [openMethodology, setOpenMethodology] = useState<number | null>(null);

  const toggleMethodology = (index: number) => {
    setOpenMethodology(openMethodology === index ? null : index);
  };

  return (
    <section
      className="bg-navy py-16 sm:py-20 border-y border-navy-border relative"
      aria-label="Empirical Market Proof"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section kicker */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase">
              Empirical Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-copy-primary mt-1">
              The Math of Staying Invested
            </h2>
          </div>
          <p className="text-xs text-copy-secondary max-w-md">
            Unvarnished historical data reflecting the difference between market noise and generational wealth creation.
          </p>
        </div>

        {/* 3 Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROOF_STATS.map((stat, index) => {
            const isMethodologyOpen = openMethodology === index;

            return (
              <div
                key={stat.numeral}
                className="card-glass p-6 sm:p-7 flex flex-col justify-between relative group hover:border-gold/40 transition-all duration-300 shadow-lg"
              >
                <div>
                  {/* Top card header with tiny inline SVG visual */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-medium text-gold/90 px-2 py-0.5 rounded bg-gold/10 border border-gold/20">
                      Case Study {index + 1}
                    </span>

                    {/* Tiny inline SVG visual based on stat */}
                    <div className="w-16 h-8 text-gold flex items-center justify-end" aria-hidden="true">
                      {index === 0 && (
                        // Nifty multi-decade curve with dips
                        <svg viewBox="0 0 64 28" fill="none" className="w-full h-full stroke-gold stroke-[2]">
                          <path
                            d="M2 24 L12 18 L18 22 L28 10 L34 20 L44 8 L50 14 L62 2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {index === 1 && (
                        // Divergence curve (staying vs quitting)
                        <svg viewBox="0 0 64 28" fill="none" className="w-full h-full">
                          {/* Abandoned line */}
                          <path d="M2 24 L18 23 L32 23 L62 23" stroke="#B4533F" strokeWidth="1.5" strokeDasharray="3 3" />
                          {/* Compounding line */}
                          <path d="M2 24 L18 23 L32 18 L48 10 L62 3" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      )}
                      {index === 2 && (
                        // 50% erosion halving curve
                        <svg viewBox="0 0 64 28" fill="none" className="w-full h-full stroke-chart-cashDrag stroke-[2]">
                          <path
                            d="M2 4 C18 4, 30 14, 62 24"
                            strokeLinecap="round"
                            strokeDasharray="4 4"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Large Serif Numeral */}
                  <div className="mb-2">
                    <div className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-normal text-copy-primary tracking-tight tabular-nums">
                      {stat.numeral}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-gold mt-1">
                      {stat.label}
                    </div>
                  </div>

                  {/* Contextual Description */}
                  <p className="text-xs sm:text-sm text-copy-secondary leading-relaxed mt-3">
                    {stat.context}
                  </p>
                </div>

                {/* Bottom Source & Methodology Disclosure */}
                <div className="mt-6 pt-4 border-t border-navy-border/60">
                  <div className="flex items-center justify-between text-[11px] text-copy-muted">
                    <span className="font-mono">Source: {stat.source}</span>
                    <button
                      type="button"
                      onClick={() => toggleMethodology(index)}
                      className="inline-flex items-center gap-1 text-gold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
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

                  {/* Collapsible Methodology Text */}
                  {isMethodologyOpen && (
                    <div
                      id={`methodology-${index}`}
                      className="mt-3 p-3 rounded bg-navy-surface border border-navy-border text-[11px] text-copy-secondary leading-normal animate-in fade-in duration-150"
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
