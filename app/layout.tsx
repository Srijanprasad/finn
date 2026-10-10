import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE_METADATA } from "@/lib/content";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  metadataBase: new URL("https://consultprospar.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prospar Consulting LLP: Evidence-led wealth management",
    description:
      "Wealth is built by behaviour, not brilliance. Planning tools, data-backed insights, and a graduated path from mutual funds to PMS & AIF.",
    url: "https://consultprospar.com/",
    siteName: "Prospar Consulting LLP",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/assets/prospar-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} scroll-smooth`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/prospar-logo.svg" />
      </head>
      <body className="bg-obsidian text-copy-primary font-sans antialiased selection:bg-gold/30 selection:text-gold-light min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-obsidian focus:font-semibold focus:rounded-control focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
