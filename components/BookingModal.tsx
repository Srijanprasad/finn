"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Shield, Calendar, Phone, Mail, User } from "lucide-react";
import Link from "next/link";
import { SITE_METADATA } from "@/lib/content";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState("Morning (10:00 AM - 1:00 PM IST)");
  const [focusArea, setFocusArea] = useState("Portfolio Review & Goal Planning");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus trap & ESC key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Set initial focus
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-obsidian-deep/85 backdrop-blur-md"
            onClick={resetAndClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-heading"
            aria-describedby="modal-subheading"
            className="relative w-full max-w-lg overflow-hidden rounded-card border border-navy-border bg-[#121B2F] p-6 sm:p-8 shadow-2xl text-copy-primary"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={resetAndClose}
              className="absolute top-5 right-5 p-2 rounded-control text-copy-secondary hover:text-white hover:bg-navy-surface transition-colors"
              aria-label="Close discovery call dialog"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {isSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold/15 flex items-center justify-center text-gold">
                  <CheckCircle2 className="w-9 h-9" strokeWidth={1.5} />
                </div>
                <h2 id="modal-heading" className="text-2xl font-serif font-normal text-copy-primary">
                  Conversation Requested
                </h2>
                <p id="modal-subheading" className="text-sm text-copy-secondary max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. A senior wealth consultant from Prospar will review your details and reach out within{" "}
                  <span className="text-gold">one working day</span>.
                </p>

                <div className="p-4 rounded-lg bg-navy/80 border border-navy-border text-left text-xs space-y-2 text-copy-secondary">
                  <div className="flex items-center justify-between">
                    <span>Preferred Window:</span>
                    <strong className="text-copy-primary">{slot}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Contact:</span>
                    <strong className="text-copy-primary">{phone}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="btn-gold w-full py-3 px-6 text-sm font-semibold"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 space-y-1">
                  <div className="inline-flex items-center gap-2 text-gold text-xs font-mono tracking-widest uppercase">
                    <Shield className="w-3.5 h-3.5" />
                    Boutique Wealth Consultation
                  </div>
                  <h2
                    id="modal-heading"
                    className="text-2xl sm:text-3xl font-serif font-normal text-copy-primary"
                  >
                    Schedule a Discovery Call
                  </h2>
                  <p
                    id="modal-subheading"
                    className="text-sm text-copy-secondary leading-relaxed"
                  >
                    A calm, confidential dialogue with an experienced wealth architect. We respect your privacy and respond within one working day.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="modal-name"
                      className="block text-xs font-medium text-copy-secondary mb-1"
                    >
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-copy-muted">
                        <User className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                      <input
                        ref={firstInputRef}
                        id="modal-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="e.g. Vikram Malhotra"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full pl-9 pr-3 py-2.5 rounded-control bg-navy-surface border ${
                          errors.name ? "border-chart-cashDrag" : "border-navy-border"
                        } text-sm text-copy-primary placeholder-copy-muted focus:border-gold`}
                      />
                    </div>
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-rose-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Contact Row (Phone + Email) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="modal-phone"
                        className="block text-xs font-medium text-copy-secondary mb-1"
                      >
                        Phone Number <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-copy-muted">
                          <Phone className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <input
                          id="modal-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                          placeholder="+91 98765 43210"
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-control bg-navy-surface border ${
                            errors.phone ? "border-chart-cashDrag" : "border-navy-border"
                          } text-sm text-copy-primary placeholder-copy-muted focus:border-gold`}
                        />
                      </div>
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-xs text-rose-400">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="modal-email"
                        className="block text-xs font-medium text-copy-secondary mb-1"
                      >
                        Email Address <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-copy-muted">
                          <Mail className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <input
                          id="modal-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          placeholder="vikram@domain.com"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={`w-full pl-9 pr-3 py-2.5 rounded-control bg-navy-surface border ${
                            errors.email ? "border-chart-cashDrag" : "border-navy-border"
                          } text-sm text-copy-primary placeholder-copy-muted focus:border-gold`}
                        />
                      </div>
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-rose-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Portfolio Horizon / Focus */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="modal-slot"
                        className="block text-xs font-medium text-copy-secondary mb-1"
                      >
                        Preferred Time Slot
                      </label>
                      <div className="relative">
                        <select
                          id="modal-slot"
                          value={slot}
                          onChange={(e) => setSlot(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-control bg-navy-surface border border-navy-border text-xs text-copy-primary focus:border-gold"
                        >
                          <option value="Morning (10:00 AM - 1:00 PM IST)">Morning (10:00 AM - 1:00 PM IST)</option>
                          <option value="Afternoon (2:00 PM - 5:00 PM IST)">Afternoon (2:00 PM - 5:00 PM IST)</option>
                          <option value="Evening (5:00 PM - 8:00 PM IST)">Evening (5:00 PM - 8:00 PM IST)</option>
                          <option value="Saturday Morning">Saturday Morning</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="modal-focus"
                        className="block text-xs font-medium text-copy-secondary mb-1"
                      >
                        Primary Discussion Area
                      </label>
                      <select
                        id="modal-focus"
                        value={focusArea}
                        onChange={(e) => setFocusArea(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-control bg-navy-surface border border-navy-border text-xs text-copy-primary focus:border-gold"
                      >
                        <option value="Portfolio Review & Goal Planning">Portfolio Review & Goal Planning</option>
                        <option value="PMS Allocation (₹50L+ Minimum)">PMS Allocation (₹50L+ Minimum)</option>
                        <option value="AIF Alternative Strategies (₹1Cr+)">AIF Alternative Strategies (₹1Cr+)</option>
                        <option value="Core Mutual Fund SIP Architecture">Core Mutual Fund SIP Architecture</option>
                        <option value="NRI Wealth Structuring">NRI Wealth Structuring</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-gold w-full py-3 px-6 text-sm font-semibold flex items-center justify-center gap-2 group"
                    >
                      <span>Request Confidential Conversation</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  {/* Fallback to /contact.html */}
                  <div className="text-center pt-1 text-xs text-copy-muted">
                    Prefer direct email or office details?{" "}
                    <Link
                      href="/contact.html"
                      className="text-gold hover:underline"
                      onClick={resetAndClose}
                    >
                      Visit full contact directory (/contact.html)
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
