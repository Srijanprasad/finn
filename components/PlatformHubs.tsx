"use client";

import Link from "next/link";
import {
  Calculator,
  Compass,
  Receipt,
  Download,
  ArrowRight,
  BookOpen,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { PLATFORM_TOOLS, INSIGHT_TEASERS } from "@/lib/content";

const toolIcons: Record<string, React.ElementType> = {
  Calculator,
  Compass,
  Receipt,
  Download,
};

export function PlatformHubs() {
  return (
    <section
      id="tools"
      className="py-20 lg:py-28 bg-navy/60 border-t border-navy-border relative"
      aria-label="Platform Tools and Knowledge Hubs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-surface border border-navy-border text-[11px] font-mono tracking-widest text-gold uppercase mb-3">
            A Better Place To Begin
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-copy-primary font-normal tracking-tight">
            Tools for the <span className="italic text-gold">Long View</span>
          </h2>
          <p className="text-sm sm:text-base text-copy-secondary mt-3 leading-relaxed">
            Clarity compounds too. Use our independent decision tools to ask better questions before selecting financial products.
          </p>
        </div>

        {/* 2×2 Grid of Platform Tool Hubs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PLATFORM_TOOLS.map((tool) => {
            const Icon = toolIcons[tool.iconName] || Calculator;

            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="card-glass p-7 sm:p-8 flex flex-col justify-between group hover:border-gold/60 hover:shadow-gold-glow transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div>
                  {/* Top Bar: Number + Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-semibold text-gold px-2.5 py-1 rounded bg-gold/10 border border-gold/20">
                      {tool.number}
                    </span>

                    <div className="w-10 h-10 rounded-lg bg-navy-surface border border-navy-border flex items-center justify-center text-copy-secondary group-hover:text-gold group-hover:border-gold/40 transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif text-copy-primary group-hover:text-gold-light transition-colors">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-copy-secondary mt-2.5 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Highlights Pill Badges */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {tool.highlights.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-navy-surface border border-navy-border/80 text-copy-muted group-hover:text-copy-secondary transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Link */}
                <div className="mt-8 pt-4 border-t border-navy-border/50 flex items-center justify-between text-xs font-semibold text-gold group-hover:text-gold-light">
                  <span>{tool.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Two Insight Teasers Beneath the Grid */}
        <div className="mt-16 pt-12 border-t border-navy-border/60">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold" />
              <span className="text-xs font-mono uppercase tracking-widest text-gold font-semibold">
                From Our Insights & Empirical Essays
              </span>
            </div>

            <Link
              href="/insights.html"
              className="text-xs text-copy-secondary hover:text-gold transition-colors inline-flex items-center gap-1"
            >
              <span>Explore all research</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INSIGHT_TEASERS.map((insight) => (
              <Link
                key={insight.title}
                href={insight.href}
                className="card-glass p-6 group hover:border-gold/50 transition-all duration-300 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-copy-muted mb-2">
                    <span className="text-gold/90">{insight.tag}</span>
                    <span>{insight.readTime}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif text-copy-primary group-hover:text-gold-light transition-colors leading-snug">
                    {insight.title}
                  </h3>

                  <p className="text-xs text-copy-secondary mt-2 line-clamp-2 leading-relaxed">
                    {insight.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-navy-border/40 flex items-center gap-1.5 text-xs font-medium text-gold group-hover:text-gold-light">
                  <span>Read full analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
