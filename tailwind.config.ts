import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0A0F1D",
          deep: "#060A14",
        },
        navy: {
          DEFAULT: "#0F172A",
          dark: "#0C1322",
          surface: "#162035",
          border: "#24324D",
        },
        gold: {
          DEFAULT: "#C5A059",
          hover: "#D4AF37",
          light: "#E5C76D",
          dark: "#9E7B35",
          muted: "rgba(197, 160, 89, 0.15)",
        },
        copy: {
          primary: "#E8ECF4",
          secondary: "#9AA7BD",
          muted: "#6B7A94",
        },
        chart: {
          compounding: "#C5A059",
          delay: "#5B7DB1",
          cashDrag: "#B4533F",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Instrument Serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        card: "12px",
        control: "8px",
        badge: "999px",
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(36, 50, 77, 0.6)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(197, 160, 89, 0.4)",
        "gold-glow": "0 0 25px rgba(197, 160, 89, 0.25)",
      },
      backgroundImage: {
        "brushed-gold": "linear-gradient(135deg, #C5A059 0%, #E5C76D 48%, #B89243 100%)",
        "brushed-gold-hover": "linear-gradient(135deg, #D4AF37 0%, #F0D488 48%, #C5A059 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(22, 32, 53, 0.90) 0%, rgba(15, 23, 42, 0.92) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
