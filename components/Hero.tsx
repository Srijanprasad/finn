"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ShieldCheck, Clock3 } from "lucide-react";
import { HERO_COPY } from "@/lib/content";
import { CostOfDelayChart } from "./CostOfDelayChart";

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const scrollToSimulator = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("wealth-simulator");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      target.focus();
    }
  };

  return (
    <section
      className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 bg-alabaster border-b border-hairline-light overflow-hidden"
      aria-label="Hero Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Thesis (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6"
          >
            {/* Category Marker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-hairline-light text-[11px] font-mono tracking-widest text-ink-secondary uppercase w-fit shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-aurum" />
              <span>{HERO_COPY.eyebrow}</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-normal leading-[1.08] text-ink-primary tracking-tight">
              Wealth is built by{" "}
              <span className="italic text-aurum-dark font-normal">behaviour,</span> not
              brilliance.
            </h1>

            {/* Editorial Body */}
            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans max-w-xl">
              {HERO_COPY.lead}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="btn-aurum px-6 py-3.5 text-xs font-medium flex items-center justify-center gap-2 group shadow-subtle"
              >
                <span>{HERO_COPY.primaryCta}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href="#wealth-simulator"
                onClick={scrollToSimulator}
                className="btn-outline-editorial px-5 py-3.5 text-xs font-medium flex items-center justify-center gap-2"
              >
                <span>{HERO_COPY.secondaryCta}</span>
                <ChevronRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-aurum-dark" />
              </a>
            </div>

            {/* Supporting Microcopy with Hairline Accent */}
            <div className="pl-3 border-l-2 border-aurum/60 pt-0.5">
              <p className="text-xs sm:text-sm font-medium text-ink-primary leading-snug">
                {HERO_COPY.supportingMicrocopy}
              </p>
            </div>

            {/* Trust Signals */}
            <div className="pt-4 border-t border-hairline-light/80 flex items-center gap-5 text-xs text-ink-muted font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-aurum" />
                <span>Evidence-Led Portfolios</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-hairline-medium" />
              <div className="flex items-center gap-1.5">
                <Clock3 className="w-4 h-4 text-aurum" />
                <span>Multi-Decade Horizon</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Precision Simulator (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <CostOfDelayChart />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
