"use client";

import { PRINCIPLES } from "@/lib/content";

export function Principles() {
  return (
    <section
      id="how-we-think"
      className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-hairline-light relative"
      aria-label="Core Investment Philosophy"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-hairline-light text-[11px] font-mono tracking-widest text-aurum uppercase font-semibold mb-3">
            How We Think
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ink-primary font-normal tracking-tight">
            Quiet Conviction. <span className="italic text-aurum-dark">Clear Architecture.</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary mt-3 leading-relaxed">
            Three principles run through everything we publish, and every portfolio we construct for client families.
          </p>
        </div>

        {/* 3 Architectural Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRINCIPLES.map((principle) => {
            return (
              <div
                key={principle.number}
                className="bg-white border border-hairline-light rounded-card p-7 sm:p-8 flex flex-col justify-between group hover:border-aurum/40 hover:shadow-editorial transition-all duration-200"
              >
                <div>
                  {/* Top Bar with Number & Geometric Motif */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-sm font-semibold text-aurum-dark px-2.5 py-1 rounded bg-parchment border border-hairline-light">
                      {principle.number}
                    </span>

                    {/* Architectural SVG Line Motif */}
                    <div className="w-24 h-12 text-aurum flex items-center justify-end" aria-hidden="true">
                      {principle.motif === "rolling-returns" && (
                        <svg viewBox="0 0 96 48" fill="none" className="w-full h-full">
                          <path
                            d="M4 8 Q 48 18 92 20 L 92 28 Q 48 30 4 40 Z"
                            fill="rgba(168, 130, 56, 0.08)"
                            stroke="#A88238"
                            strokeWidth="1.2"
                            strokeDasharray="2 2"
                          />
                          <path
                            d="M4 24 Q 48 24 92 24"
                            stroke="#BF9748"
                            strokeWidth="1.6"
                          />
                        </svg>
                      )}

                      {principle.motif === "correction-timeline" && (
                        <svg viewBox="0 0 96 48" fill="none" className="w-full h-full">
                          <path
                            d="M4 42 L 24 34 L 32 40 L 52 24 L 62 32 L 80 14 L 92 8"
                            stroke="#A88238"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="32" cy="40" r="2.5" fill="#B64E3A" />
                          <circle cx="62" cy="32" r="2.5" fill="#B64E3A" />
                          <circle cx="92" cy="8" r="2.5" fill="#BF9748" />
                        </svg>
                      )}

                      {principle.motif === "asset-stack" && (
                        <svg viewBox="0 0 96 48" fill="none" className="w-full h-full">
                          <polygon points="48,6 64,16 32,16" stroke="#A88238" strokeWidth="1.2" fill="rgba(168, 130, 56, 0.12)" />
                          <polygon points="28,20 68,20 76,30 20,30" stroke="#4B729F" strokeWidth="1.2" fill="rgba(75, 114, 159, 0.12)" />
                          <polygon points="16,34 80,34 90,44 6,44" stroke="#7E8799" strokeWidth="1.2" fill="rgba(126, 135, 153, 0.12)" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Principle Title */}
                  <h3 className="text-xl sm:text-2xl font-serif text-ink-primary group-hover:text-aurum-dark transition-colors font-normal">
                    {principle.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ink-secondary mt-3 leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline-light/80">
                  <span className="text-[11px] font-mono text-ink-muted tracking-wider uppercase">
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
