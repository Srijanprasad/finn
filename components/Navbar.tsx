"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Calculator,
  Clock,
  TrendingUp,
  Target,
  Compass,
  Shield,
  Coins,
  Receipt,
  PieChart,
  BarChart3,
  Layers,
  BookOpen,
  Activity,
  GitFork,
  Download,
  HelpCircle,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { NAVIGATION_DATA, SITE_METADATA } from "@/lib/content";

// Icon resolution map
const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Clock,
  TrendingUp,
  Target,
  Compass,
  Shield,
  Coins,
  Receipt,
  PieChart,
  BarChart3,
  Layers,
  BookOpen,
  Activity,
  GitFork,
  Download,
  HelpCircle,
  Briefcase,
};

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection for blurred navy background (>24px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation: Escape key closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenuIndex(null);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileOpen]);

  const handleMouseEnter = (index: number) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenuIndex(index);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuIndex(null);
    }, 250);
  };

  const handleButtonClick = (index: number) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  };

  const toggleMobileSubmenu = (index: number) => {
    setMobileExpandedIndex(mobileExpandedIndex === index ? null : index);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0F1D]/95 backdrop-blur-md border-b border-[#24324D]/80 shadow-lg shadow-black/30"
          : "bg-[#0A0F1D]/60 backdrop-blur-sm border-b border-navy-border/40"
      }`}
    >
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        {/* Brand Logo & Refined Typography */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-control p-1"
          aria-label="Prospar Consulting LLP Home"
        >
          {/* Logo Mark from /assets/prospar-logo.svg */}
          <div className="relative w-10 h-7 text-gold flex items-center justify-center transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 214 120"
              fill="currentColor"
              className="w-full h-full text-gold"
              aria-hidden="true"
            >
              <defs>
                <mask id="pc-nav-cut">
                  <rect x="0" y="0" width="214" height="120" fill="#fff" />
                  <path
                    d="M3 103 C 28 103 32 82 62 75"
                    fill="none"
                    stroke="#000"
                    strokeWidth="17"
                    strokeLinecap="round"
                  />
                </mask>
              </defs>
              <g fill="currentColor" mask="url(#pc-nav-cut)">
                <rect x="6" y="66" width="13" height="30" />
                <rect x="25" y="44" width="13" height="52" />
                <rect x="44" y="14" width="13" height="82" />
                <rect x="63" y="14" width="16" height="82" />
              </g>
              <path
                d="M79 21 a20 20 0 0 1 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="14"
              />
              <path
                d="M3 103 C 28 103 32 82 62 75"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M175.7 27.4 A40 40 0 1 0 180.6 83.7"
                fill="none"
                stroke="currentColor"
                strokeWidth="17"
                strokeLinecap="round"
              />
              <path
                d="M122 84 L140 60 L151 69 L179 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <polygon points="196,15 170,22 189,41" fill="currentColor" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-serif tracking-wider text-base font-semibold text-copy-primary group-hover:text-gold-light transition-colors">
              PROSPAR
            </span>
            <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-copy-secondary">
              Consulting LLP
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items (with Mega Menu Dropdowns) */}
        <div className="hidden lg:flex items-center space-x-1">
          {NAVIGATION_DATA.map((item, index) => {
            const isOpen = activeMenuIndex === index;
            return (
              <div
                key={item.label}
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  id={`nav-btn-${index}`}
                  onClick={() => handleButtonClick(index)}
                  onFocus={() => handleMouseEnter(index)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-control transition-all ${
                    isOpen
                      ? "text-gold bg-navy-surface border border-gold/40 shadow-sm"
                      : "text-copy-secondary hover:text-white hover:bg-navy-surface/60 border border-transparent"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-gold" : "text-copy-muted"
                    }`}
                  />
                </button>

                {/* Mega-menu panel with invisible hover bridge */}
                {isOpen && (
                  <div
                    role="menu"
                    aria-labelledby={`nav-btn-${index}`}
                    className="absolute top-full left-0 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-80 md:w-96 rounded-card bg-[#121B2F]/98 backdrop-blur-2xl border border-navy-border shadow-2xl p-3 grid gap-1.5">
                      <div className="px-3 py-1.5 border-b border-navy-border/50 flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest text-gold uppercase">
                          {item.label} Overview
                        </span>
                        <Link
                          href={item.href}
                          className="text-[11px] text-copy-muted hover:text-gold transition-colors inline-flex items-center gap-1"
                          onClick={() => setActiveMenuIndex(null)}
                        >
                          Parent Hub <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid gap-1 py-1">
                        {item.subItems?.map((sub) => {
                          const Icon = iconMap[sub.icon] || Calculator;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              role="menuitem"
                              onClick={() => setActiveMenuIndex(null)}
                              className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-navy-surface border border-transparent hover:border-navy-border transition-all"
                            >
                              <div className="w-8 h-8 rounded-lg bg-navy/80 border border-navy-border flex items-center justify-center text-copy-secondary group-hover:text-gold group-hover:border-gold/40 transition-colors flex-shrink-0 mt-0.5">
                                <Icon className="w-4 h-4" strokeWidth={1.5} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-copy-primary group-hover:text-gold-light flex items-center justify-between">
                                  <span>{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
                                </div>
                                <p className="text-[11px] text-copy-secondary line-clamp-1 mt-0.5">
                                  {sub.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenBooking}
            className="btn-gold px-4 py-2.5 text-xs font-semibold flex items-center gap-2 group"
          >
            <span>Book Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            aria-expanded={isMobileOpen}
            aria-label="Open mobile navigation menu"
            className="p-2.5 rounded-control text-copy-secondary hover:text-white hover:bg-navy-surface border border-navy-border transition-colors"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Drawer with Focus Trap */}
      {isMobileOpen && (
        <div
          ref={mobileDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-[#0A0F1D] flex flex-col p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Header row */}
          <div className="flex items-center justify-between pb-6 border-b border-navy-border">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-6 text-gold">
                <svg viewBox="0 0 214 120" fill="currentColor" className="w-full h-full">
                  <path d="M79 21 a20 20 0 0 1 0 40" fill="none" stroke="currentColor" strokeWidth="14" />
                  <path d="M175.7 27.4 A40 40 0 1 0 180.6 83.7" fill="none" stroke="currentColor" strokeWidth="17" />
                  <polygon points="196,15 170,22 189,41" fill="currentColor" />
                </svg>
              </div>
              <span className="font-serif text-lg font-medium text-white tracking-wider">
                PROSPAR
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close mobile navigation"
              className="p-2 rounded-control text-copy-secondary hover:text-white border border-navy-border"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Accordion Links */}
          <div className="py-6 space-y-2 flex-1">
            {NAVIGATION_DATA.map((item, index) => {
              const isExpanded = mobileExpandedIndex === index;
              return (
                <div key={item.label} className="border-b border-navy-border/40 pb-2">
                  <button
                    type="button"
                    onClick={() => toggleMobileSubmenu(index)}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-copy-primary hover:text-gold"
                    aria-expanded={isExpanded}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? "rotate-180 text-gold" : "text-copy-muted"
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="pl-3 py-2 space-y-2">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="block text-xs font-semibold text-gold py-1"
                      >
                        All in {item.label} →
                      </Link>
                      {item.subItems?.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block text-xs text-copy-secondary hover:text-white py-1"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Preserved About & Contact & Disclosures for mobile */}
            <div className="pt-4 space-y-2 text-xs">
              <Link
                href="/about.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-copy-secondary hover:text-white"
              >
                About Prospar (/about.html)
              </Link>
              <Link
                href="/how-we-work.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-copy-secondary hover:text-white"
              >
                How We Work (/how-we-work.html)
              </Link>
              <Link
                href="/faq.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-copy-secondary hover:text-white"
              >
                FAQ (/faq.html)
              </Link>
              <Link
                href="/contact.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-copy-secondary hover:text-white"
              >
                Contact Directory (/contact.html)
              </Link>
              <Link
                href="/compliance.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-copy-muted hover:text-gold"
              >
                Disclaimers & Disclosures (/compliance.html)
              </Link>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-navy-border space-y-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                onOpenBooking();
              }}
              className="btn-gold w-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>Book Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-copy-muted">
              Direct line: {SITE_METADATA.telephoneDisplay}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
