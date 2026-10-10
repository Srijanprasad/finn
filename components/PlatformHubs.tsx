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
      className="py-20 lg:py-28 bg-alabaster border-b border-hairline-light relative"
      aria-label="Platform Tools and Knowledge Hubs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-hairline-light text-[11px] font-mono tracking-widest text-aurum uppercase font-semibold mb-3">
            A Better Place To Begin
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ink-primary font-normal tracking-tight">
            Tools for the <span className="italic text-aurum-dark">Long View</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary mt-3 leading-relaxed">
            Clarity compounds too. Use our independent decision tools to ask better questions before selecting financial products.
          </p>
        </div>

        {/* 2×2 Architectural Grid of Platform Tool Hubs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PLATFORM_TOOLS.map((tool) => {
            const Icon = toolIcons[tool.iconName] || Calculator;

            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="bg-white border border-hairline-light rounded-card p-7 sm:p-8 flex flex-col justify-between group hover:border-aurum/60 hover:shadow-editorial transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurum"
              >
                <div>
                  {/* Top Bar: Number + Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-semibold text-aurum-dark px-2.5 py-1 rounded bg-parchment border border-hairline-light">
                      {tool.number}
                    </span>

                    <div className="w-10 h-10 rounded bg-parchment/60 border border-hairline-light flex items-center justify-center text-ink-secondary group-hover:text-aurum group-hover:border-aurum/40 transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif text-ink-primary group-hover:text-aurum-dark transition-colors font-normal">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ink-secondary mt-2.5 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Highlights Badges */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {tool.highlights.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-alabaster border border-hairline-light text-ink-muted group-hover:text-ink-secondary transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Link */}
                <div className="mt-8 pt-4 border-t border-hairline-light/80 flex items-center justify-between text-xs font-semibold text-aurum-dark group-hover:text-aurum">
                  <span>{tool.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Two Editorial Insight Teasers Beneath the Grid */}
        <div className="mt-16 pt-12 border-t border-hairline-light">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-aurum" />
              <span className="text-xs font-mono uppercase tracking-widest text-aurum-dark font-semibold">
                From Our Insights & Empirical Essays
              </span>
            </div>

            <Link
              href="/insights.html"
              className="text-xs text-ink-secondary hover:text-aurum-dark transition-colors inline-flex items-center gap-1 font-medium"
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
                className="bg-white border border-hairline-light rounded-card p-6 group hover:border-aurum/50 hover:shadow-editorial transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurum"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-ink-muted mb-2">
                    <span className="text-aurum-dark font-semibold">{insight.tag}</span>
                    <span>{insight.readTime}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif text-ink-primary group-hover:text-aurum-dark transition-colors leading-snug font-normal">
                    {insight.title}
                  </h3>

                  <p className="text-xs text-ink-secondary mt-2 line-clamp-2 leading-relaxed">
                    {insight.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-hairline-light/60 flex items-center gap-1.5 text-xs font-medium text-aurum-dark group-hover:text-aurum">
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
