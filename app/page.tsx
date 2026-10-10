"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { WealthLadder } from "@/components/WealthLadder";
import { PlatformHubs } from "@/components/PlatformHubs";
import { Principles } from "@/components/Principles";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BookingModal } from "@/components/BookingModal";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-ink-primary selection:bg-aurum/20 selection:text-aurum-dark">
      {/* Sticky Navigation with Mega-Menu */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Landmark */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {/* Module 2: Hero + Cost of Delay Visualizer */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Module 3: Data Proof Strip */}
        <ProofStrip />

        {/* Module 4: The Wealth Ladder */}
        <WealthLadder />

        {/* Module 5: Platform Tools (Portal Hubs) + Insights */}
        <PlatformHubs />

        {/* Module 6: How We Think (Principles) */}
        <Principles />
      </main>

      {/* Module 7: Closing CTA & Regulatory Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Floating WhatsApp Quick Consultation CTA */}
      <WhatsAppButton />

      {/* Discovery Call / Portfolio Review Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </div>
  );
}
