"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Phone,
} from "lucide-react";
import { NAVIGATION_DATA, SITE_METADATA } from "@/lib/content";

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
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    }, 220);
  };

  const handleButtonClick = (index: number) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-hairline-light shadow-subtle"
          : "bg-[#FAF8F5] border-b border-hairline-light"
      }`}
    >
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        {/* New Authentic Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurum rounded"
          aria-label="Prospar Consulting LLP Home"
        >
          <div className="relative h-9 w-[145px] sm:h-10 sm:w-[160px]">
            {/* The newly added logo file in public/assets/Logo.png */}
            <Image
              src="/assets/Logo-transparent.png"
              alt="Prospar Consulting LLP"
              fill
              priority
              sizes="(max-width: 640px) 145px, 160px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
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
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium tracking-wide rounded-control transition-all ${
                    isOpen
                      ? "text-aurum-dark bg-parchment/60 font-semibold"
                      : "text-ink-secondary hover:text-ink-primary hover:bg-parchment/40"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-aurum" : "text-ink-muted"
                    }`}
                  />
                </button>

                {/* Mega-menu panel */}
                {isOpen && (
                  <div
                    role="menu"
                    aria-labelledby={`nav-btn-${index}`}
                    className="absolute top-full left-0 pt-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-88 md:w-96 rounded-card bg-white border border-hairline-light shadow-editorial p-3.5 grid gap-1.5">
                      <div className="px-3 py-2 border-b border-hairline-light/60 flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest text-aurum uppercase font-semibold">
                          {item.label} Hub
                        </span>
                        <Link
                          href={item.href}
                          className="text-[11px] text-ink-muted hover:text-aurum transition-colors inline-flex items-center gap-1 font-medium"
                          onClick={() => setActiveMenuIndex(null)}
                        >
                          View all <ArrowRight className="w-3 h-3" />
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
                              className="group flex items-start gap-3 p-2.5 rounded hover:bg-alabaster-warm border border-transparent hover:border-hairline-light transition-all"
                            >
                              <div className="w-8 h-8 rounded bg-parchment/50 border border-hairline-light flex items-center justify-center text-ink-secondary group-hover:text-aurum group-hover:border-aurum/40 transition-colors flex-shrink-0 mt-0.5">
                                <Icon className="w-4 h-4" strokeWidth={1.5} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-ink-primary group-hover:text-aurum-dark flex items-center justify-between">
                                  <span>{sub.label}</span>
                                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-aurum" />
                                </div>
                                <p className="text-[11px] text-ink-secondary line-clamp-1 mt-0.5 leading-normal">
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
        <div className="hidden lg:flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenBooking}
            className="btn-aurum px-4 py-2.5 text-xs font-medium flex items-center gap-2 group"
          >
            <span>Book Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            aria-expanded={isMobileOpen}
            aria-label="Open mobile navigation"
            className="p-2.5 rounded text-ink-secondary hover:text-ink-primary hover:bg-parchment border border-hairline-light transition-colors"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-6 border-b border-hairline-light">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="relative h-8 w-[140px]"
            >
              <Image
                src="/assets/Logo-transparent.png"
                alt="Prospar Consulting LLP"
                fill
                className="object-contain object-left"
              />
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close mobile navigation"
              className="p-2 rounded text-ink-secondary hover:text-ink-primary border border-hairline-light"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 space-y-2 flex-1">
            {NAVIGATION_DATA.map((item, index) => {
              const isExpanded = mobileExpandedIndex === index;
              return (
                <div key={item.label} className="border-b border-hairline-light/60 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedIndex(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between py-2 text-sm font-semibold text-ink-primary hover:text-aurum-dark"
                    aria-expanded={isExpanded}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isExpanded ? "rotate-180 text-aurum" : "text-ink-muted"
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="pl-3 py-2 space-y-2">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="block text-xs font-semibold text-aurum-dark py-1"
                      >
                        All in {item.label} →
                      </Link>
                      {item.subItems?.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block text-xs text-ink-secondary hover:text-ink-primary py-1"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-4 space-y-2 text-xs">
              <Link
                href="/about.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-ink-secondary hover:text-ink-primary"
              >
                About Prospar (/about.html)
              </Link>
              <Link
                href="/how-we-work.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-ink-secondary hover:text-ink-primary"
              >
                How We Work (/how-we-work.html)
              </Link>
              <Link
                href="/faq.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-ink-secondary hover:text-ink-primary"
              >
                FAQ (/faq.html)
              </Link>
              <Link
                href="/contact.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-ink-secondary hover:text-ink-primary"
              >
                Contact Directory (/contact.html)
              </Link>
              <Link
                href="/compliance.html"
                onClick={() => setIsMobileOpen(false)}
                className="block py-1.5 text-ink-muted hover:text-aurum"
              >
                Disclosures & Privacy (/compliance.html)
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-hairline-light space-y-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(false);
                onOpenBooking();
              }}
              className="btn-aurum w-full py-3 text-sm font-medium flex items-center justify-center gap-2"
            >
              <span>Book Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-ink-muted">
              Direct line: {SITE_METADATA.telephoneDisplay}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
