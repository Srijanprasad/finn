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
        // High-net-worth Institutional Editorial Palette
        alabaster: {
          DEFAULT: "#FAF8F5",
          warm: "#F5F2EB",
          card: "#FFFFFF",
        },
        parchment: "#F2EEE6",
        charcoal: {
          DEFAULT: "#151821",
          soft: "#202534",
          light: "#2B3245",
          deep: "#0B0E17",
        },
        nocturne: {
          DEFAULT: "#0D131F",
          surface: "#141C2B",
          border: "#222C3F",
        },
        aurum: {
          DEFAULT: "#A88238",
          light: "#BF9748",
          hover: "#CFA754",
          dark: "#846322",
          muted: "rgba(168, 130, 56, 0.12)",
        },
        ink: {
          primary: "#141720",
          secondary: "#525A6C",
          muted: "#7E8799",
        },
        hairline: {
          light: "#E4DFD5",
          medium: "#D5CEBF",
          dark: "#232D3F",
        },
        chart: {
          disciplined: "#A88238",
          delay: "#4B729F",
          cashDrag: "#B64E3A",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Instrument Serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        card: "4px", // Editorial architectural radius: sharp, disciplined, not bubbly
        control: "4px",
        badge: "999px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        editorial: "0 10px 30px -10px rgba(14, 20, 32, 0.08)",
        floating: "0 20px 45px -15px rgba(14, 20, 32, 0.14)",
        darkCard: "0 10px 30px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(35, 45, 63, 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
