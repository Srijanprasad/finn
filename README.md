# Prospar Consulting LLP — Wealth Platform Homepage Architecture

> **"Wealth is built by behaviour, not brilliance."**  
> A boutique private wealth management platform engineered for high-earning salaried professionals, business founders, HNIs, and NRIs seeking structured multi-decade compounding. Built to benchmarks of top global and domestic private wealth platforms (Julius Baer, Marcellus, GQG Partners, Vanguard).

---

## 1. System Overview & Technology Stack

- **Framework**: Next.js 14 (App Router) with TypeScript & React 18
- **Styling**: Tailwind CSS with custom boutique design system tokens
- **Typography**: Playfair Display (editorial serif for headlines, numerals) & Plus Jakarta Sans (body, microcopy), loaded via `next/font` with zero layout shift
- **Interactive Modeling**: Recharts & Crisp SVG mathematical rendering with reactive state
- **Motion**: Framer Motion with reduced-motion support (`prefers-reduced-motion`)
- **Icons**: Lucide-React (clean 1.5px stroke architectural icons)
- **Compliance & Accessibility**: WCAG 2.1 AA compliant, semantic HTML5 landmarks, full keyboard navigation with visible focus rings, ARIA tablists, screen-reader polite announcements, and touch targets ≥ 44×44px.

---

## 2. Quickstart & Execution Instructions

### Prerequisites
- Node.js ≥ 18 (Tested on Node v26.7.0)
- npm ≥ 9

### Installation
```bash
# Install all required project dependencies
npm install
```

### Run Unit Tests
A dedicated mathematical test suite covers the financial compounding models, cash inflation drag, cost of waiting calculations, and Indian currency formatters:
```bash
npm test
```
*Expected result: 8/8 tests passing.*

### Development Server
```bash
npm run dev
# The dev server will start at http://localhost:3000 (or http://localhost:3001 if 3000 is occupied)
```

### Production Build & Launch
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
# Or on custom port: npx next start -p 3001
```

---

## 3. Financial Calculation Engine (`lib/calc.ts`)

The financial engine strictly calculates three distinct trajectories across the investor's specified horizon:

1. **Curve A — Disciplined Compounding**:
   - Compounding rate: $12\%$ CAGR assumed annual return.
   - Monthly effective rate: $r_m = (1 + 0.12)^{1/12} - 1 \approx 0.94888\%/\text{month}$.
   - Number of installments: $m = \text{years} \times 12$.
   - Monthly investment: $P$ (Slider range: ₹10,000 to ₹5,00,000, default: ₹50,000).
   - Annuity due formula:
     $$FV_A = P \times \left[ \frac{(1 + r_m)^m - 1}{r_m} \right] \times (1 + r_m)$$

2. **Curve B — Cash Drag (Inflation Erosion on Uninvested Capital)**:
   - Nominal total contributed at 0% interest: $\text{Nominal} = P \times (\text{years} \times 12)$.
   - Real purchasing power deflated under $7\%$ annual long-term Indian CPI inflation:
     $$\text{Real Purchasing Power} = \frac{\text{Nominal}}{(1 + 0.07)^\text{years}}$$
   - *Example*: At ₹50,000/month over 15 years, ₹90 Lakhs of nominal cash saved is eroded to just **₹32.62 Lakhs** in real purchasing power—a ~64% destruction of purchasing power.

3. **Curve C — Cost of Waiting 3 Years**:
   - Compounding delayed by 3 years (starts in year 4 and ends at year $N$):
     $$FV_C = \begin{cases} 0 & \text{if } N \le 3 \\ FV_A(N - 3) & \text{if } N > 3 \end{cases}$$
   - **Cost of Waiting Stat**: The live gap between Curve A and Curve C:
     $$\text{Cost of Delay} = FV_A(N) - FV_C(N)$$
   - *Example*: Waiting 3 years on a 15-year horizon at ₹50,000/month costs the investor **₹83.92 Lakhs** in wealth forfeited to hesitation.

---

## 4. Navigation Architecture & Route Mapping

All existing live routes from `consultprospar.com` have been strictly preserved. Sub-items without standalone HTML pages are mapped to their respective parent pages or anchor targets as detailed below:

| Navigation Item | Target Route | Sub-Item Links | Mapping Rationale |
| :--- | :--- | :--- | :--- |
| **Calculators** | `/tools.html` | • Goal & Wealth Hub (15 Calculators) → `/tools.html`<br>• SIP Delay Visualizer → `/sip-calculator.html`<br>• Step-Up Compounding → `/tools.html#step-up`<br>• Retirement Runway → `/tools.html#retirement` | Preserves all 15 calculators on `/tools.html` and links directly to `/sip-calculator.html`. |
| **Risk Profile** | `/risk-profile.html` | • Empirical Questionnaire → `/risk-profile.html`<br>• Drawdown Capacity → `/risk-profile.html#capacity` | Direct destination to the 2-minute questionnaire. |
| **Tax Architecture** | `/income-tax-calculator.html` | • Capital Gains Harvesting → `/income-tax-calculator.html#capital-gains`<br>• Regime Analysis → `/income-tax-calculator.html#regime` | Direct destination to tax models. |
| **Investment Solutions** | `/mutual-funds.html` | • Core Mutual Funds → `/mutual-funds.html`<br>• PMS (₹50 Lakh+ Minimum) → `/pms-aif.html#pms`<br>• AIF (₹1 Crore+ Minimum) → `/pms-aif.html#aif` | Links to mutual fund core and high-net-worth PMS/AIF portals. |
| **Insights & Research** | `/insights.html` | • Research Essays → `/insights.html`<br>• SIP Discipline Study → `/insight-sip-discipline.html`<br>• Seven-Stage Wealth Ladder → `/insight-wealth-ladder.html` | Preserves the two deep-dive research whitepapers. |
| **Download Centre & FAQ** | `/downloads.html` | • Research Whitepapers → `/downloads.html`<br>• FAQ Hub → `/faq.html`<br>• How We Work → `/how-we-work.html` | Links to repository files, process details, and disclosures. |
| **Company & Compliance** | `/about.html`, `/contact.html`, `/compliance.html` | • About Us → `/about.html`<br>• Contact → `/contact.html`<br>• Disclosures & Privacy → `/compliance.html` | Accessible in footer and mobile drawer. |

---

## 5. Figures & Statements Requiring Client / Compliance Verification

To ensure compliance with SEBI and AMFI advertising standards, the following data points have been centralized in `lib/content.ts` for legal review:

1. **"26× Over 26 Years" Proof Stat**:
   - *Source cited*: NSE published Nifty 50 Total Returns Index (1999 to 2026).
   - *Action for Client*: Verify exact start/end NAV dates and confirm that dividend reinvestment (TRI vs PRI) is explicitly stated in the compliance disclosure annexure.

2. **"₹1.07 Cr vs ₹4 L" SIP Discontinuation Proof Stat**:
   - *Source cited*: Prospar illustrative study using historical equity multi-cap mutual fund NAV histories.
   - *Action for Client*: Re-confirm the exact underlying representative mutual fund scheme used for the 15-year simulation.

3. **"50% Real Loss Every Decade" Cash Drag Proof Stat**:
   - *Source cited*: Long-term historical Indian CPI inflation benchmark of ~7%.
   - *Action for Client*: Confirm whether headline CPI or core CPI reference is preferred by compliance.

4. **Tax Structure Summaries in The Wealth Ladder**:
   - *Equity Mutual Funds*: LTCG at 12.5% above ₹1.25 Lakh exemption, STCG at 20% (as per Finance Act 2024 amendments).
   - *Debt Mutual Funds*: Taxed at individual slab rates without indexation for investments made after April 1, 2023.
   - *Arbitrage Mutual Funds*: Equity taxation treatment.
   - *PMS*: Direct pass-through taxation per trade executed in the client's individual demat account.
   - *AIF Category II & III*: Cat II pass-through with withholding tax; Cat III fund-level maximum marginal rate taxation.
   - *Note*: All entries are marked with the statutory disclaimer: *"as per current law, subject to change"*.

---

## 6. Placeholders to Replace Before Production Go-Live

The following registration IDs and partner disclosures in `lib/content.ts` are marked as placeholders:

- `COMPLIANCE_DISCLOSURES.registrationDetails.amfiArn`: **`ARN-XXXXX`**  
  *(Replace with Prospar Consulting LLP's actual AMFI Registration Number).*
- `COMPLIANCE_DISCLOSURES.registrationDetails.sebiPartners`: **`INZ-XXXXXX / INP-XXXXXX`**  
  *(Replace with SEBI Registration numbers of registered portfolio managers and AIF trustees).*
- Principal Officer Contact Email: `nikesh@consultprospar.com`
- WhatsApp Consultation Line: `+91 98710 01868` (active)

---

## 7. Directory Structure

```
├── app/
│   ├── globals.css          # Design tokens, custom sliders, glassmorphism, responsive typography
│   ├── layout.tsx           # SEO metadata, OpenGraph, Canonical URL, next/font imports
│   └── page.tsx             # Homepage orchestrator integrating all 7 page modules
├── components/
│   ├── Navbar.tsx           # Sticky nav with mega-menu dropdowns, keyboard support & mobile drawer
│   ├── Hero.tsx             # 12-col hero section with primary CTAs and value proposition
│   ├── CostOfDelayChart.tsx # Live compounding engine with sliders, SVG curves & live stats
│   ├── ProofStrip.tsx       # 3 empirical data cards with inline SVG visuals & methodology drawer
│   ├── WealthLadder.tsx     # 4-level interactive ladder, 5-segment risk meter & detail panel
│   ├── PlatformHubs.tsx     # 2x2 tool cards grid + 2 research insight teasers
│   ├── Principles.tsx       # 3 architectural cards with custom thin SVG geometric motifs
│   ├── Footer.tsx           # Closing CTA banner, directory links & regulatory disclosures
│   ├── WhatsAppButton.tsx   # Fixed accessible floating WhatsApp CTA (≥44px)
│   └── BookingModal.tsx     # Accessible dialog with focus trap, ESC listener & validation
├── lib/
│   ├── calc.ts              # Mathematical models for compounding, inflation drag & delay penalty
│   ├── format.ts            # Indian currency formatting (Lakhs, Crores, tabular-nums)
│   └── content.ts           # Centralized source of truth for copy, statistics, tax notes & URLs
├── public/
│   └── assets/
│       └── prospar-logo.svg # Official Prospar Consulting LLP SVG brand mark
├── tests/
│   └── calc.test.ts         # Automated unit test suite for calculation engine
├── tailwind.config.ts       # Design system tokens (Obsidian Slate, Champagne Gold, Navy)
├── postcss.config.mjs       # PostCSS processor configuration
└── tsconfig.json            # Strict TypeScript configuration with @/ alias
```

---

## 8. Compliance & Disclaimer Notice

*Figures cited on the platform are derived from published market data (NSE) and illustrative studies using actual fund NAV histories; past performance does not guarantee future returns. All content is for education and awareness, not investment advice or an offer of any product. Investments are subject to market risks. PMS & AIF carry regulatory minimums (₹50 Lakh / ₹1 Crore) and are distributed through formal tie-ups with SEBI-registered entities.*  
© 2026 Prospar Consulting LLP. All rights reserved.

# finn
