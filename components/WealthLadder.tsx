"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { WEALTH_LADDER_DATA } from "@/lib/content";

export function WealthLadder() {
  const [activeIndex, setActiveIndex] = useState(1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeRung = WEALTH_LADDER_DATA[activeIndex];

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let newIndex = activeIndex;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      newIndex = (activeIndex + 1) % WEALTH_LADDER_DATA.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      newIndex = (activeIndex - 1 + WEALTH_LADDER_DATA.length) % WEALTH_LADDER_DATA.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newIndex = WEALTH_LADDER_DATA.length - 1;
    }

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <section
      id="wealth-ladder"
      className="py-20 lg:py-28 bg-[#F6F3EC] border-b border-hairline-light relative"
      aria-label="The Wealth Ladder Architecture"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-hairline-light text-[11px] font-mono tracking-widest text-aurum uppercase font-semibold mb-3">
            A Progression, Not A Product List
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ink-primary font-normal tracking-tight">
            The Wealth <span className="italic text-aurum-dark">Ladder</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary mt-3 leading-relaxed">
            Every sophisticated allocation starts with a foundation sturdy enough to hold it. We meet you at the right rung—not the loudest one.
          </p>
        </div>

        {/* 2-Column Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Rungs (5 cols) */}
          <div
            role="tablist"
            aria-label="Wealth Ladder progression rungs"
            onKeyDown={handleKeyDown}
            className="lg:col-span-5 space-y-2.5"
          >
            {WEALTH_LADDER_DATA.map((rung, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={rung.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  role="tab"
                  id={`tab-${rung.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${rung.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 sm:p-5 rounded-card border transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? "bg-white border-hairline-light border-l-4 border-l-aurum shadow-editorial"
                      : "bg-white/60 border-hairline-light hover:bg-white text-ink-secondary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-sm sm:text-base font-semibold px-2.5 py-1 rounded ${
                        isActive
                          ? "bg-aurum text-white font-bold"
                          : "bg-parchment text-ink-muted group-hover:text-ink-primary"
                      }`}
                    >
                      {rung.level}
                    </span>

                    <div>
                      <h3
                        className={`text-sm sm:text-base font-semibold ${
                          isActive ? "text-ink-primary" : "text-ink-secondary group-hover:text-ink-primary"
                        }`}
                      >
                        {rung.title}
                      </h3>
                      <p className="text-xs text-ink-muted line-clamp-1 mt-0.5">
                        {rung.tagline}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`transition-transform duration-200 ${
                      isActive ? "text-aurum translate-x-1" : "text-ink-muted opacity-40 group-hover:opacity-80"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Rung Briefing Dossier (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRung.id}
                role="tabpanel"
                id={`panel-${activeRung.id}`}
                aria-labelledby={`tab-${activeRung.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="bg-white border border-hairline-light rounded-card p-6 sm:p-8 shadow-editorial space-y-6"
              >
                {/* Rung Header */}
                <div className="border-b border-hairline-light/80 pb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest text-aurum uppercase font-semibold">
                      Tier {activeRung.level} Architecture
                    </span>
                    <span className="text-xs font-mono text-ink-muted">
                      {activeRung.entryCriteria}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-ink-primary mt-1 font-normal">
                    {activeRung.title}
                  </h3>
                  <p className="text-sm text-ink-secondary mt-2 leading-relaxed">
                    {activeRung.description}
                  </p>
                </div>

                {/* Instruments Included */}
                <div className="p-4 rounded bg-alabaster border border-hairline-light space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-aurum-dark font-semibold">
                    Representative Instruments
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeRung.instruments.map((inst) => (
                      <span
                        key={inst}
                        className="text-xs px-2.5 py-1 rounded bg-white border border-hairline-light text-ink-primary"
                      >
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4 Structural Parameters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded bg-alabaster border border-hairline-light space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                      Entry Criteria
                    </span>
                    <p className="font-semibold text-ink-primary">
                      {activeRung.entryCriteria}
                    </p>
                  </div>

                  {/* 5-Segment Risk Profile */}
                  <div className="p-3.5 rounded bg-alabaster border border-hairline-light space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                        Risk Profile
                      </span>
                      <span className="font-mono text-ink-primary font-semibold">
                        {activeRung.riskScore} of 5
                      </span>
                    </div>

                    <div className="flex gap-1.5 h-2" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((seg) => {
                        const isFilled = seg <= activeRung.riskScore;
                        return (
                          <div
                            key={seg}
                            className={`flex-1 rounded-sm transition-colors ${
                              isFilled ? "bg-aurum" : "bg-hairline-light"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-ink-secondary">
                      {activeRung.riskLabel}
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-alabaster border border-hairline-light space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                      Taxation Architecture
                    </span>
                    <p className="text-ink-secondary leading-snug">
                      {activeRung.taxation}
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-alabaster border border-hairline-light space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                      Liquidity & Lock-In
                    </span>
                    <p className="text-ink-secondary leading-snug">
                      {activeRung.lockIn}
                    </p>
                  </div>
                </div>

                {/* Footer Profile & Link */}
                <div className="border-t border-hairline-light/80 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-xs text-ink-secondary">
                    <span className="font-semibold text-ink-primary">Who this is for: </span>
                    {activeRung.targetProfile}
                  </div>

                  <Link
                    href={activeRung.routeHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-aurum-dark hover:text-aurum whitespace-nowrap self-start sm:self-auto group"
                  >
                    <span>{activeRung.routeLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center pt-6 border-t border-hairline-light">
          <Link
            href="/insight-wealth-ladder.html"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-aurum-dark transition-colors"
          >
            <span>Read the seven-stage framework</span>
            <ArrowUpRight className="w-4 h-4 text-aurum" />
          </Link>
        </div>
      </div>
    </section>
  );
}
