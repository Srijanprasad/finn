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
      className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Subtle background ambient gold glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 12-Column Grid: Copy (5 cols) + Simulator (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6"
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-surface border border-navy-border text-[11px] font-mono tracking-wider text-copy-secondary w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span>{HERO_COPY.eyebrow}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-normal leading-[1.08] text-copy-primary tracking-tight">
              Wealth is built by{" "}
              <span className="italic text-gold font-normal">behaviour,</span> not
              brilliance.
            </h1>

            {/* Body Lede */}
            <p className="text-base sm:text-lg text-copy-secondary leading-relaxed font-sans max-w-xl">
              {HERO_COPY.lead}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="btn-gold px-6 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 group shadow-lg"
              >
                <span>{HERO_COPY.primaryCta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#wealth-simulator"
                onClick={scrollToSimulator}
                className="btn-secondary px-5 py-3.5 text-sm font-medium flex items-center justify-center gap-2 hover:border-gold transition-colors"
              >
                <span>{HERO_COPY.secondaryCta}</span>
                <ChevronRight className="w-4 h-4 text-copy-muted group-hover:text-gold" />
              </a>
            </div>

            {/* Microcopy preserved from live site */}
            <div className="pt-1">
              <p className="text-xs sm:text-sm font-medium text-gold/90 leading-snug">
                {HERO_COPY.supportingMicrocopy}
              </p>
            </div>

            {/* Trust signals */}
            <div className="pt-4 border-t border-navy-border/60 flex items-center gap-5 text-xs text-copy-muted font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Evidence-Led Portfolios</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-navy-border" />
              <div className="flex items-center gap-1.5">
                <Clock3 className="w-4 h-4 text-gold" />
                <span>Multi-Decade Horizon</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Cost of Delay Visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <CostOfDelayChart />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
