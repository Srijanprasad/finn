/**
 * Prospar Consulting LLP - Source of Truth Content & Configuration
 * 
 * All copy, statistics, tax notes, regulatory disclaimers, and
 * navigation routes preserved strictly per live site and compliance requirements.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  subItems?: {
    label: string;
    href: string;
    description: string;
    icon: string;
    isExternalRoute?: boolean;
  }[];
}

export interface LadderRung {
  id: string;
  level: string;
  title: string;
  tagline: string;
  description: string;
  instruments: string[];
  entryCriteria: string;
  riskScore: number; // 1 to 5
  riskLabel: string;
  taxation: string;
  lockIn: string;
  targetProfile: string;
  routeHref: string;
  routeLabel: string;
}

export interface ToolHub {
  id: string;
  number: string;
  title: string;
  description: string;
  ctaText: string;
  href: string;
  iconName: string;
  highlights: string[];
}

export interface InsightTeaser {
  title: string;
  description: string;
  href: string;
  readTime: string;
  tag: string;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
  motif: "rolling-returns" | "correction-timeline" | "asset-stack";
}

export interface ProofStat {
  numeral: string;
  label: string;
  context: string;
  methodology: string;
  source: string;
}

export const SITE_METADATA = {
  title: "Prospar Consulting LLP | Evidence-led wealth management",
  description:
    "A boutique wealth firm for people who think in decades. Goal-based planning, disciplined mutual fund portfolios, and PMS & AIF access for qualified investors.",
  canonicalUrl: "https://consultprospar.com/",
  telephone: "+91-98710-01868",
  telephoneDisplay: "+91 98710 01868",
  email: "nikesh@consultprospar.com",
  whatsappUrl: "https://wa.me/919871001868?text=I%20need%20investment%20advice",
  companyName: "Prospar Consulting LLP",
  tagline: "Evidence-led wealth management: mutual funds to PMS & AIF. Serving investors across India.",
  philosophy: "Wealth is built by behaviour, not brilliance.",
  copyrightYear: "2026",
};

export const NAVIGATION_DATA: NavItem[] = [
  {
    label: "Calculators",
    href: "/tools.html",
    subItems: [
      {
        label: "Goal & Wealth Hub (15 Calculators)",
        href: "/tools.html",
        description: "Retirement, education, income, and emergency fund roadmaps.",
        icon: "Calculator",
      },
      {
        label: "SIP Delay Visualizer",
        href: "/sip-calculator.html",
        description: "Measure the exact rupee penalty of waiting 1, 3, or 5 years.",
        icon: "Clock",
      },
      {
        label: "Step-Up Compounding",
        href: "/tools.html",
        description: "Model annual contribution increments aligned with income growth.",
        icon: "TrendingUp",
      },
      {
        label: "Retirement Runway",
        href: "/tools.html",
        description: "Calculate corpus longevity under post-retirement inflation.",
        icon: "Target",
      },
    ],
  },
  {
    label: "Risk Profile",
    href: "/risk-profile.html",
    subItems: [
      {
        label: "Empirical Risk Questionnaire",
        href: "/risk-profile.html",
        description: "2-minute evaluation mapping emotional volatility vs financial capacity.",
        icon: "Compass",
      },
      {
        label: "Capacity Architecture",
        href: "/risk-profile.html",
        description: "Understand your personal drawdown limit before allocating capital.",
        icon: "Shield",
      },
    ],
  },
  {
    label: "Tax Architecture",
    href: "/income-tax-calculator.html",
    subItems: [
      {
        label: "Capital Gains Harvesting",
        href: "/income-tax-calculator.html",
        description: "Tax-efficient portfolio turnover, LTCG exemptions & rebalancing.",
        icon: "Coins",
      },
      {
        label: "Regime Analysis (Old vs New)",
        href: "/income-tax-calculator.html",
        description: "Comparative liability diagnostics for salaried professionals and HNIs.",
        icon: "Receipt",
      },
    ],
  },
  {
    label: "Investment Solutions",
    href: "/mutual-funds.html",
    subItems: [
      {
        label: "Core Mutual Funds",
        href: "/mutual-funds.html",
        description: "Disciplined SIP schedules in high-conviction diversified strategies.",
        icon: "PieChart",
      },
      {
        label: "PMS (₹50 Lakh+ Minimum)",
        href: "/pms-aif.html",
        description: "Discretionary portfolio management with direct demat stock ownership.",
        icon: "BarChart3",
      },
      {
        label: "AIF (₹1 Crore+ Minimum)",
        href: "/pms-aif.html",
        description: "Category II & III private credit, structured debt, and long-short funds.",
        icon: "Layers",
      },
    ],
  },
  {
    label: "Insights & Research",
    href: "/insights.html",
    subItems: [
      {
        label: "Research Essays & Frameworks",
        href: "/insights.html",
        description: "Data-backed perspectives on multi-decade capital compounding.",
        icon: "BookOpen",
      },
      {
        label: "SIP Discipline Study",
        href: "/insight-sip-discipline.html",
        description: "15-year empirical evidence on why SIPs appear broken in year 3.",
        icon: "Activity",
      },
      {
        label: "The Seven-Stage Wealth Ladder",
        href: "/insight-wealth-ladder.html",
        description: "From Dependent to Abundance: systematic milestones of personal wealth.",
        icon: "GitFork",
      },
    ],
  },
  {
    label: "Download Centre & FAQ",
    href: "/downloads.html",
    subItems: [
      {
        label: "Research Whitepapers",
        href: "/downloads.html",
        description: "Detailed historical data compendiums and asset allocation studies.",
        icon: "Download",
      },
      {
        label: "Frequently Asked Questions",
        href: "/faq.html",
        description: "Transparent answers regarding advisory fees, custody, and process.",
        icon: "HelpCircle",
      },
      {
        label: "How We Work",
        href: "/how-we-work.html",
        description: "Our structured consultation process from discovery to ongoing review.",
        icon: "Briefcase",
      },
    ],
  },
];

export const HERO_COPY = {
  eyebrow: "Boutique Wealth Management • Built for Multi-Decade Horizons",
  heading: "Wealth is built by behaviour, not brilliance.",
  lead: "We construct durable, goal-anchored portfolios that outlast market cycles. From foundational mutual fund SIPs to institutional PMS and AIF allocations—designed for investors who think in decades.",
  supportingMicrocopy: "Start today. Time never comes back. Don't let a delay today become an opportunity lost tomorrow.",
  primaryCta: "Schedule a Portfolio Review",
  secondaryCta: "Run the Wealth Simulator",
  footnote: "Illustrative only. Assumes 12% annual return and 7% inflation. Not a forecast or guarantee.",
  fullCalculatorLinkText: "Open the full SIP calculator",
  fullCalculatorHref: "/sip-calculator.html",
};

export const PROOF_STATS: ProofStat[] = [
  {
    numeral: "26×",
    label: "Over 26 Years",
    context: "What the Nifty 50 delivered to investors who sat through every crash from 1999 to 2026: the dot-com bust, 2008, COVID, all of them.",
    source: "NSE published total returns (1999–2026).",
    methodology: "Historical index total returns compounding through all interim market drawdowns without timing the market.",
  },
  {
    numeral: "₹1.07 Cr vs ₹4 L",
    label: "Behaviour, Not Selection",
    context: "The gap between an investor who continued a ₹10,000 monthly SIP for 15 years and one who stopped after 3 flat years. Behaviour, not selection.",
    source: "Prospar illustrative study using actual fund NAV histories.",
    methodology: "Simulated comparison of disciplined continuous compounding versus premature liquidation after market stagnation.",
  },
  {
    numeral: "50%",
    label: "Real Loss Every Decade",
    context: "What inflation quietly takes from idle money at ~7%. The real risk isn't a temporary market fall: it's money that never grows.",
    source: "Long-term Indian CPI inflation benchmark.",
    methodology: "Calculated with 7% annual erosion on uninvested cash purchasing power over 10-year holding periods.",
  },
];

export const WEALTH_LADDER_DATA: LadderRung[] = [
  {
    id: "preservation",
    level: "01",
    title: "Capital Preservation & Liquidity",
    tagline: "Liquidity before velocity.",
    description: "The essential buffer protecting your compounding engine. Uncompromised liquidity ensures you are never forced to liquidate equities during market corrections or life emergencies.",
    instruments: ["Liquid Mutual Funds", "Arbitrage Funds", "High-yield Savings", "Emergency Reserves (6–12 months)"],
    entryCriteria: "3–12 months of fixed living expenses",
    riskScore: 1,
    riskLabel: "Low (Capital Preservation)",
    taxation: "Debt funds taxed at investor slab rate; arbitrage funds taxed as equity capital gains (as per current law, subject to change).",
    lockIn: "Open-ended liquidity (T+1 redemption; nil exit loads after 7 days).",
    targetProfile: "Every disciplined investor before deploying long-term risk capital.",
    routeHref: "/tools.html",
    routeLabel: "Calculate emergency buffer",
  },
  {
    id: "core-compounding",
    level: "02",
    title: "Core Compounding",
    tagline: "A repeatable engine for multi-decade growth.",
    description: "Disciplined SIP allocations across curated large-cap, flexi-cap, and multi-cap mutual funds designed to capture Indian macroeconomic expansion with low frictional cost.",
    instruments: ["Diversified Active & Index Mutual Funds", "Flexi-Cap & Large-Mid Strategies", "Systematic Investment Plans (SIP)"],
    entryCriteria: "Stable monthly surplus with 5+ year time horizon",
    riskScore: 3,
    riskLabel: "Moderate to High (Market Equity)",
    taxation: "Equity LTCG at 12.5% beyond ₹1.25 Lakh annual exemption; STCG at 20% (as per Finance Act 2024, subject to change).",
    lockIn: "Open-ended liquidity; disciplined holding horizon of 5 to 10+ years advised.",
    targetProfile: "Salaried professionals, business founders, and families creating generational wealth.",
    routeHref: "/mutual-funds.html",
    routeLabel: "Explore mutual fund architecture",
  },
  {
    id: "alpha-generation",
    level: "03",
    title: "Alpha Generation",
    tagline: "Concentrated, high-conviction portfolios.",
    description: "SEBI-registered Portfolio Management Services (PMS) providing dedicated portfolio managers, direct demat equity holding, unconstrained active allocations, and disciplined risk mandates.",
    instruments: ["Discretionary Equity PMS", "Factor-driven / Thematic Portfolios", "Unconstrained Small & Mid Cap Alpha"],
    entryCriteria: "₹50 Lakh regulatory minimum per investor",
    riskScore: 4,
    riskLabel: "High (Concentrated Equity)",
    taxation: "Direct pass-through: individual capital gains tax applicable on each trade in investor demat account (as per current law, subject to change).",
    lockIn: "Redeemable with notice period; recommended horizon 3 to 5 years.",
    targetProfile: "High-net-worth individuals and executives with established core equity portfolios.",
    routeHref: "/pms-aif.html",
    routeLabel: "Examine PMS mandates",
  },
  {
    id: "sophisticated-alternatives",
    level: "04",
    title: "Sophisticated Alternatives",
    tagline: "Institutional structures & non-correlated returns.",
    description: "Alternative Investment Funds (Cat II & III AIFs) encompassing private credit, real estate yield, venture debt, pre-IPO growth, and long-short absolute return strategies.",
    instruments: ["Category II AIFs (Private Credit, Pre-IPO)", "Category III AIFs (Long-Short Hedge, Quant Alpha)", "Structured Mezzanine Debt"],
    entryCriteria: "₹1 Crore regulatory minimum per investor",
    riskScore: 5,
    riskLabel: "High to Very High (Alternative Structures)",
    taxation: "Cat II enjoys pass-through taxation with TDS; Cat III is taxed at fund level at maximum marginal rate (as per current law, subject to change).",
    lockIn: "Typically 3 to 7 years commitment period with defined capital drawdown cycles.",
    targetProfile: "Ultra-HNIs, family offices, and accredited institutions seeking uncorrelated returns.",
    routeHref: "/pms-aif.html",
    routeLabel: "Examine AIF structures",
  },
];

export const PLATFORM_TOOLS: ToolHub[] = [
  {
    id: "calculators",
    number: "01",
    title: "Explore 15 Goal Calculators",
    description: "Retirement runway, net worth tracking, step-up SIPs, and child education—make long-term mathematical clarity visible.",
    ctaText: "Visit Calculators Page",
    href: "/tools.html",
    iconName: "Calculator",
    highlights: ["Retirement Corpus", "Step-Up SIP", "Child Education", "Emergency Fund"],
  },
  {
    id: "risk-profile",
    number: "02",
    title: "Discover Your Risk Architecture",
    description: "A 2-minute empirical questionnaire mapping your emotional loss tolerance against actual financial recovery capacity.",
    ctaText: "Take Risk Profile Test",
    href: "/risk-profile.html",
    iconName: "Compass",
    highlights: ["2-Minute Survey", "Loss Aversion Index", "Drawdown Capacity"],
  },
  {
    id: "tax-hub",
    number: "03",
    title: "Tax Optimization Suite",
    description: "Capital gains harvesting insights, regime comparison models, and structural asset-location tax-efficiency guides.",
    ctaText: "Visit Tax Hub",
    href: "/income-tax-calculator.html",
    iconName: "Receipt",
    highlights: ["Capital Gains Harvesting", "Regime Comparison", "Turnover Drag"],
  },
  {
    id: "research",
    number: "04",
    title: "Research & Whitepapers",
    description: "15-year longitudinal SIP studies, empirical drawdown data, and behavioural playbooks for multi-decade compounding.",
    ctaText: "Visit Download Centre",
    href: "/downloads.html",
    iconName: "Download",
    highlights: ["15-Year SIP Study", "Crisis Drawdowns", "Asset Allocation Model"],
  },
];

export const INSIGHT_TEASERS: InsightTeaser[] = [
  {
    title: "SIPs look broken in year 3: that's when they're being built",
    description: "The 15-year data behind the costliest behavioural mistake in investing: abandoning an equity SIP right when units are accumulating at depressed valuations.",
    href: "/insight-sip-discipline.html",
    readTime: "6 min read",
    tag: "Behavioural Study",
  },
  {
    title: "Which rung of the wealth ladder are you on?",
    description: "A seven-stage framework spanning from Dependent to Abundance, mapping the specific asset architecture required before advancing.",
    href: "/insight-wealth-ladder.html",
    readTime: "8 min read",
    tag: "Wealth Architecture",
  },
];

export const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Evidence over emotion",
    description: "Every claim we make is backed by data you can verify, often in our own calculators. If the numbers don't survive scrutiny, we won't say it. Zero speculative tipping, zero market forecasts.",
    motif: "rolling-returns",
  },
  {
    number: "02",
    title: "Time over timing",
    description: "Every 5-year window since 1999 contained a frightening market correction. Portfolios are engineered to be held, not traded. The investors who compound are those who stay invested.",
    motif: "correction-timeline",
  },
  {
    number: "03",
    title: "Structure over products",
    description: "Emergency fund, then goals, then growth, then sophistication. PMS and AIF have their place: on top of a solid core, never instead of it.",
    motif: "asset-stack",
  },
];

export const COMPLIANCE_DISCLOSURES = {
  mainDisclaimer:
    "Figures cited are from published market data (NSE) and our own illustrative studies using actual fund NAV histories; past performance does not guarantee future returns. All content is for education and awareness, not investment advice or an offer of any product. Investments are subject to market risks.",
  regulatoryMinimums:
    "PMS & AIF carry regulatory minimums (₹50 lakh / ₹1 crore) and are distributed through formal tie-ups with SEBI-registered providers.",
  intermediaryNote:
    "Prospar Consulting LLP operates as a boutique wealth solutions partner. Mutual fund distribution is conducted under applicable AMFI registration. PMS and AIF investments are facilitated via formal tie-ups with registered portfolio managers and alternative investment fund managers.",
  registrationDetails: {
    amfiArn: "ARN-XXXXX (Client verification required)",
    sebiPartners: "SEBI Registered Partner Entities (Disclosed per mandate)",
  },
};
