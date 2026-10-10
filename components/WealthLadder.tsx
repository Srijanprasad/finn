"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Clock,
  Layers,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { WEALTH_LADDER_DATA } from "@/lib/content";

export function WealthLadder() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to Level 02: Core Compounding
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeRung = WEALTH_LADDER_DATA[activeIndex];

  // ARIA arrow-key keyboard navigation across tablist
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
      className="py-20 lg:py-28 relative overflow-hidden"
      aria-label="The Wealth Ladder Architecture"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-surface border border-navy-border text-[11px] font-mono tracking-widest text-gold uppercase mb-3">
            A Progression, Not A Product List
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-copy-primary font-normal tracking-tight">
            The Wealth <span className="italic text-gold">Ladder</span>
          </h2>
          <p className="text-sm sm:text-base text-copy-secondary mt-3 leading-relaxed">
            Every sophisticated allocation starts with a foundation sturdy enough to hold it. We meet you at the right rung—not the loudest one.
          </p>
        </div>

        {/* Interactive Ladder Container: Left Tablist / Right Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Ladder Tablist (5 cols) */}
          <div
            role="tablist"
            aria-label="Wealth Ladder progression rungs"
            onKeyDown={handleKeyDown}
            className="lg:col-span-5 space-y-3"
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
                  className={`w-full text-left p-4 sm:p-5 rounded-card border transition-all duration-200 flex items-center justify-between group relative ${
                    isActive
                      ? "bg-navy-surface border-gold/60 shadow-lg shadow-black/30"
                      : "bg-navy/40 border-navy-border hover:border-navy-border/80 hover:bg-navy/70 text-copy-secondary"
                  }`}
                >
                  {/* Left rung number & label */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-sm sm:text-base font-semibold px-2.5 py-1 rounded-control ${
                        isActive
                          ? "bg-gold text-obsidian font-bold"
                          : "bg-navy-surface text-copy-muted group-hover:text-copy-primary"
                      }`}
                    >
                      {rung.level}
                    </span>

                    <div>
                      <h3
                        className={`text-sm sm:text-base font-semibold ${
                          isActive ? "text-copy-primary" : "text-copy-secondary group-hover:text-white"
                        }`}
                      >
                        {rung.title}
                      </h3>
                      <p className="text-xs text-copy-muted line-clamp-1 mt-0.5">
                        {rung.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Indicator Arrow */}
                  <div
                    className={`transition-transform duration-200 ${
                      isActive ? "text-gold translate-x-1" : "text-copy-muted opacity-40 group-hover:opacity-80"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Rung Detail Card (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRung.id}
                role="tabpanel"
                id={`panel-${activeRung.id}`}
                aria-labelledby={`tab-${activeRung.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="card-glass p-6 sm:p-8 relative border-gold/30 shadow-2xl space-y-6"
              >
                {/* Rung Badge & Title */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest text-gold uppercase">
                      Rung {activeRung.level} Architecture
                    </span>
                    <span className="text-xs font-mono text-copy-muted">
                      {activeRung.entryCriteria}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-copy-primary mt-1">
                    {activeRung.title}
                  </h3>
                  <p className="text-sm text-copy-secondary mt-2 leading-relaxed">
                    {activeRung.description}
                  </p>
                </div>

                {/* Instruments Included */}
                <div className="p-4 rounded-lg bg-navy/80 border border-navy-border space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold">
                    Representative Instruments
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeRung.instruments.map((inst) => (
                      <span
                        key={inst}
                        className="text-xs px-2.5 py-1 rounded bg-navy-surface border border-navy-border text-copy-primary"
                      >
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Grid of Key Structural Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Entry Criteria */}
                  <div className="p-3.5 rounded-lg bg-navy-surface border border-navy-border space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-copy-muted">
                      Entry Criteria
                    </span>
                    <p className="font-semibold text-copy-primary">
                      {activeRung.entryCriteria}
                    </p>
                  </div>

                  {/* 5-Segment Risk Profile Meter */}
                  <div className="p-3.5 rounded-lg bg-navy-surface border border-navy-border space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-copy-muted">
                        Risk Profile
                      </span>
                      <span className="font-mono text-copy-primary font-semibold">
                        {activeRung.riskScore} of 5
                      </span>
                    </div>

                    {/* 5 Segment Visual Meter */}
                    <div className="flex gap-1.5 h-2" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((seg) => {
                        const isFilled = seg <= activeRung.riskScore;
                        return (
                          <div
                            key={seg}
                            className={`flex-1 rounded-sm transition-colors ${
                              isFilled ? "bg-gold" : "bg-navy-border"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-copy-secondary">
                      {activeRung.riskLabel}
                    </p>
                  </div>

                  {/* Taxation Structure */}
                  <div className="p-3.5 rounded-lg bg-navy-surface border border-navy-border space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-copy-muted">
                      Taxation Architecture
                    </span>
                    <p className="text-copy-secondary leading-snug">
                      {activeRung.taxation}
                    </p>
                  </div>

                  {/* Liquidity & Lock-In */}
                  <div className="p-3.5 rounded-lg bg-navy-surface border border-navy-border space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-copy-muted">
                      Liquidity & Lock-In
                    </span>
                    <p className="text-copy-secondary leading-snug">
                      {activeRung.lockIn}
                    </p>
                  </div>
                </div>

                {/* Target Profile ("Who this is for") */}
                <div className="border-t border-navy-border/60 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-xs text-copy-secondary">
                    <span className="font-semibold text-copy-primary">Who this is for: </span>
                    {activeRung.targetProfile}
                  </div>

                  <Link
                    href={activeRung.routeHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-light whitespace-nowrap self-start sm:self-auto group"
                  >
                    <span>{activeRung.routeLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Link to Seven-Stage Framework */}
        <div className="mt-12 text-center pt-6 border-t border-navy-border/40">
          <Link
            href="/insight-wealth-ladder.html"
            className="inline-flex items-center gap-2 text-sm font-medium text-copy-secondary hover:text-gold transition-colors"
          >
            <span>Read the comprehensive seven-stage framework</span>
            <ArrowUpRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
