"use client";

import { PRINCIPLES } from "@/lib/content";

export function Principles() {
  return (
    <section
      id="how-we-think"
      className="py-20 lg:py-28 relative overflow-hidden"
      aria-label="Core Investment Philosophy"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-surface border border-navy-border text-[11px] font-mono tracking-widest text-gold uppercase mb-3">
            How We Think
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-copy-primary font-normal tracking-tight">
            Quiet Conviction. <span className="italic text-gold">Clear Architecture.</span>
          </h2>
          <p className="text-sm sm:text-base text-copy-secondary mt-3 leading-relaxed">
            Three principles run through everything we publish, and every portfolio we construct for client families.
          </p>
        </div>

        {/* 3 Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRINCIPLES.map((principle) => {
            return (
              <div
                key={principle.number}
                className="card-glass p-7 sm:p-8 flex flex-col justify-between group hover:border-gold/40 transition-all duration-300 relative"
              >
                <div>
                  {/* Card Header: Number & SVG Architectural Motif */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-sm font-semibold text-gold px-2.5 py-1 rounded bg-gold/10 border border-gold/20">
                      {principle.number}
                    </span>

                    {/* Thin SVG Motif */}
                    <div className="w-24 h-12 text-gold flex items-center justify-end" aria-hidden="true">
                      {principle.motif === "rolling-returns" && (
                        // Rolling returns band narrowing over time
                        <svg viewBox="0 0 96 48" fill="none" className="w-full h-full">
                          {/* Upper & lower confidence bands */}
                          <path
                            d="M4 8 Q 48 18 92 20 L 92 28 Q 48 30 4 40 Z"
                            fill="rgba(197, 160, 89, 0.08)"
                            stroke="#C5A059"
                            strokeWidth="1"
                            strokeDasharray="2 2"
                          />
                          {/* Center median compounding line */}
                          <path
                            d="M4 24 Q 48 24 92 24"
                            stroke="#E5C76D"
                            strokeWidth="1.5"
                          />
                        </svg>
                      )}

                      {principle.motif === "correction-timeline" && (
                        // Timeline with marked market corrections
                        <svg viewBox="0 0 96 48" fill="none" className="w-full h-full">
                          {/* Overall secular upward trajectory */}
                          <path
                            d="M4 42 L 24 34 L 32 40 L 52 24 L 62 32 L 80 14 L 92 8"
                            stroke="#C5A059"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Marked correction points */}
                          <circle cx="32" cy="40" r="2.5" fill="#B4533F" />
                          <circle cx="62" cy="32" r="2.5" fill="#B4533F" />
                          <circle cx="92" cy="8" r="2.5" fill="#E5C76D" />
                        </svg>
                      )}

                      {principle.motif === "asset-stack" && (
                        // Layered allocation stack
                        <svg viewBox="0 0 96 48" fill="none" className="w-full h-full">
                          {/* Top: AIF/PMS */}
                          <polygon points="48,6 64,16 32,16" stroke="#C5A059" strokeWidth="1" fill="rgba(197, 160, 89, 0.15)" />
                          {/* Mid: Core Mutual Funds */}
                          <polygon points="28,20 68,20 76,30 20,30" stroke="#5B7DB1" strokeWidth="1" fill="rgba(91, 125, 177, 0.15)" />
                          {/* Base: Preservation / Liquid */}
                          <polygon points="16,34 80,34 90,44 6,44" stroke="#9AA7BD" strokeWidth="1" fill="rgba(154, 167, 189, 0.15)" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Principle Title */}
                  <h3 className="text-xl sm:text-2xl font-serif text-copy-primary group-hover:text-gold-light transition-colors">
                    {principle.title}
                  </h3>

                  {/* Principle Description */}
                  <p className="text-xs sm:text-sm text-copy-secondary mt-3 leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-navy-border/40">
                  <span className="text-[11px] font-mono text-copy-muted tracking-wider uppercase">
                    Non-Negotiable Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
