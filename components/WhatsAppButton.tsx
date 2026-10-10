"use client";

import { SITE_METADATA } from "@/lib/content";

export function WhatsAppButton() {
  return (
    <aside aria-label="Direct consultation shortcut">
      <a
        href={SITE_METADATA.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consult Prospar Wealth Advisor on WhatsApp: Consult Now"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 min-h-[46px] min-w-[46px] rounded-full bg-[#128C7E] hover:bg-[#0E6D62] text-white shadow-floating border border-white/20 transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurum focus-visible:ring-offset-2"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-2.9.8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.1 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.9 4.4 3.9 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.1-.2 0-.4.1-.5l.6-.7c.2-.2.2-.4.1-.6L9.6 8.2c-.1-.3-.3-.4-.5-.4h-.2Z" />
        </svg>
        <span className="text-xs font-semibold tracking-wider uppercase font-mono">
          Consult Now
        </span>
      </a>
    </aside>
  );
}
