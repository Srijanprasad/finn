"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Mail, ShieldAlert } from "lucide-react";
import { SITE_METADATA, COMPLIANCE_DISCLOSURES } from "@/lib/content";

interface FooterProps {
  onOpenBooking: () => void;
}

export function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-charcoal-deep border-t border-hairline-dark pt-16 pb-24 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Closing CTA Institutional Invitation */}
        <div className="rounded-card p-8 sm:p-12 bg-charcoal border border-hairline-dark shadow-darkCard flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-aurum-light uppercase font-semibold">
              Begin A Structured Relationship
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-normal">
              Ready for a considered conversation?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              A private dialogue with an experienced wealth architect. We respond within one working day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="btn-aurum px-6 py-3.5 text-xs font-medium flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>Schedule Portfolio Review</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            <Link
              href="/contact.html"
              className="btn-outline-dark px-5 py-3.5 text-xs font-medium flex items-center justify-center gap-2 text-center whitespace-nowrap"
            >
              <span>Contact our consultant</span>
            </Link>
          </div>
        </div>

        {/* 3-Column Footer Directory */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-8 border-t border-hairline-dark/80">
          {/* Brand & Direct Contact (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              className="block relative h-9 w-[150px] sm:h-10 sm:w-[160px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aurum rounded"
            >
              {/* Authentic light version of the new logo */}
              <Image
                src="/assets/Logo-white.png"
                alt="Prospar Consulting LLP"
                fill
                sizes="(max-width: 640px) 150px, 160px"
                className="object-contain object-left"
              />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              {SITE_METADATA.tagline}
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-aurum-light" />
                <a
                  href={`tel:${SITE_METADATA.telephone}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_METADATA.telephoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-aurum-light" />
                <a
                  href={`mailto:${SITE_METADATA.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_METADATA.email}
                </a>
              </div>
            </div>
          </div>

          {/* Explore Links Directory (5 cols) */}
          <div className="md:col-span-5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-aurum-light font-semibold mb-4">
              Explore Portal
            </h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-slate-300">
              <Link href="/tools.html" className="hover:text-white transition-colors">
                Calculators Hub
              </Link>
              <Link href="/insights.html" className="hover:text-white transition-colors">
                Insights & Research
              </Link>
              <Link href="/risk-profile.html" className="hover:text-white transition-colors">
                Risk Profile Architecture
              </Link>
              <Link href="/income-tax-calculator.html" className="hover:text-white transition-colors">
                Income Tax Optimization
              </Link>
              <Link href="/mutual-funds.html" className="hover:text-white transition-colors">
                Core Mutual Funds
              </Link>
              <Link href="/pms-aif.html" className="hover:text-white transition-colors">
                PMS & AIF Solutions
              </Link>
              <Link href="/how-we-work.html" className="hover:text-white transition-colors">
                How We Work
              </Link>
              <Link href="/faq.html" className="hover:text-white transition-colors">
                Frequently Asked Questions
              </Link>
              <Link href="/downloads.html" className="hover:text-white transition-colors">
                Download Centre
              </Link>
              <Link href="/about.html" className="hover:text-white transition-colors">
                About Prospar
              </Link>
              <Link href="/contact.html" className="hover:text-white transition-colors">
                Contact Directory
              </Link>
              <Link href="/compliance.html" className="hover:text-aurum-light transition-colors font-medium">
                Disclosures & Privacy
              </Link>
            </div>
          </div>

          {/* Regulatory Governance (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-aurum-light font-semibold">
              Regulatory Minimums
            </h3>
            <div className="p-3.5 rounded bg-charcoal border border-hairline-dark text-xs space-y-2">
              <p className="text-white font-medium">
                {COMPLIANCE_DISCLOSURES.regulatoryMinimums}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Distributed through formal tie-ups with SEBI-registered portfolio managers and alternative investment fund trustees.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <p>AMFI Reg: {COMPLIANCE_DISCLOSURES.registrationDetails.amfiArn}</p>
              <p>SEBI Partners: {COMPLIANCE_DISCLOSURES.registrationDetails.sebiPartners}</p>
            </div>
          </div>
        </div>

        {/* Full Mandatory Regulatory Disclaimer */}
        <div className="pt-8 border-t border-hairline-dark/80 space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-aurum-light flex-shrink-0 mt-0.5" />
            <p>
              {COMPLIANCE_DISCLOSURES.mainDisclaimer}
            </p>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed pl-6">
            {COMPLIANCE_DISCLOSURES.intermediaryNote}
          </p>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-hairline-dark/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {SITE_METADATA.copyrightYear} {SITE_METADATA.companyName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/compliance.html" className="hover:text-slate-300 transition-colors">
              Disclaimers & Disclosures
            </Link>
            <span>•</span>
            <Link href="/compliance.html" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact.html" className="hover:text-slate-300 transition-colors">
              Grievance Redressal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
