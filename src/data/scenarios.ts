export interface SamplePosting {
  rate: number;
  text: string;
}

export interface UpworkRateData {
  jobTitle: string;
  estimatedHours: number;
  perUnitValue: number;
  samplePostings: SamplePosting[];
}

export interface Scenario {
  id: string;
  name: string;
  shortName: string;
  description: string;
  deliverable: string;
  upwork: UpworkRateData;
  color: string;
  defaultCount: number;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'invoicing',
    name: 'Invoicing & Accounts Receivable',
    shortName: 'Invoicing (AR)',
    description:
      'The AI agent generates professional invoices from job completion data, populates line items with correct service codes and pricing, and sends them directly to customers via QuickBooks Online — eliminating manual data entry and reducing days-sales-outstanding.',
    deliverable: 'Invoice Created & Sent',
    upwork: {
      jobTitle: 'Bookkeeper / AR Specialist',
      estimatedHours: 1.5,
      perUnitValue: 90,
      samplePostings: [
        { rate: 55, text: 'Looking for a detail-oriented bookkeeper to prepare and send invoices for a landscaping/snow removal company. Must be proficient in QuickBooks Online. Responsibilities include entering job details, applying correct pricing, and emailing invoices to customers.' },
        { rate: 65, text: 'AR specialist needed to manage invoicing for a growing field services company. You will review completed work orders, create invoices in QBO, and follow up on outstanding balances.' },
        { rate: 50, text: 'Part-time bookkeeper for small commercial services business. Weekly invoicing of 10-20 customers, payment application, and light collections follow-up. QuickBooks Online experience required.' },
      ],
    },
    color: '#0ea5e9',
    defaultCount: 50,
  },
  {
    id: 'insurance',
    name: 'Insurance "Sweet Spot" Calculator',
    shortName: 'Insurance Analysis',
    description:
      'The AI agent parses your insurance renewal quote to extract premium costs for each deductible tier, then queries QuickBooks for all equipment repair and maintenance expenses over the last 36 months. It filters out routine maintenance to find incident-based repairs and calculates the break-even point for each deductible option.',
    deliverable: 'Deductible Analysis Report',
    upwork: {
      jobTitle: 'Insurance Risk Analyst',
      estimatedHours: 12,
      perUnitValue: 1410,
      samplePostings: [
        { rate: 125, text: 'Seeking insurance risk analyst to review commercial fleet policies for a snow removal and landscaping company. Must analyze deductible options against 3 years of maintenance records and produce a break-even recommendation report.' },
        { rate: 110, text: 'Need a commercial insurance consultant to evaluate renewal quotes for a mid-size field services operation. Deliverable is a written analysis comparing premium/deductible tiers with historical claim and repair data.' },
        { rate: 140, text: 'Insurance analytics project: Compare 4 deductible tiers against actual equipment failure rates for a 15-vehicle fleet. Must pull financial data, calculate expected annual costs per tier, and present findings in a professional report.' },
      ],
    },
    color: '#2563eb',
    defaultCount: 18,
  },
  {
    id: 'procurement',
    name: 'Salt & Brine "Price-Lock" Advisor',
    shortName: 'Procurement Negotiation',
    description:
      'The AI agent analyzes NOAA seasonal weather outlook data for precipitation trends, then cross-references your QuickBooks inventory and supply purchase history to calculate your salt-to-snowfall ratio. It drafts a bulk negotiation letter to suppliers proposing a fixed-price contract backed by three years of usage data.',
    deliverable: 'Bulk Negotiation Letter',
    upwork: {
      jobTitle: 'Procurement Specialist',
      estimatedHours: 8,
      perUnitValue: 800,
      samplePostings: [
        { rate: 95, text: 'Need procurement specialist experienced in bulk material negotiation for commercial snow removal operations. Must analyze weather forecasting data and historical usage to draft a fixed-price supply contract.' },
        { rate: 85, text: 'Supply chain consultant for seasonal materials purchasing. Will review 3 years of salt/brine purchase history, analyze NOAA winter outlook, and negotiate pre-season pricing with vendors.' },
        { rate: 110, text: 'Looking for someone to help lock in salt and de-icing material prices before winter season. Must draft professional vendor negotiation letters backed by data analysis. Quick turnaround needed.' },
      ],
    },
    color: '#059669',
    defaultCount: 24,
  },
  {
    id: 'fleet',
    name: 'Machine Life-Cycle & Replacement Forecast',
    shortName: 'Fleet Decision',
    description:
      'The AI agent pulls the total lifetime maintenance spend for a specific vehicle from QuickBooks, calculates the Repair-to-Value ratio using current Blue Book value, and produces a "Retire vs. Repair" executive summary. If maintenance costs in the last 12 months exceed 40% of vehicle value, replacement is recommended with comparable listings.',
    deliverable: 'Retire vs. Repair Executive Summary',
    upwork: {
      jobTitle: 'Fleet Management Consultant',
      estimatedHours: 16,
      perUnitValue: 2040,
      samplePostings: [
        { rate: 120, text: 'Fleet management consultant needed for a 15-vehicle commercial fleet. Must analyze maintenance records, calculate total cost of ownership, and produce retire-vs-repair recommendations for aging equipment.' },
        { rate: 145, text: 'Looking for an experienced fleet analyst to evaluate our 2018 F-550 fleet. Need lifetime cost analysis, Blue Book comparisons, and a professional recommendation report with replacement options.' },
        { rate: 130, text: 'Vehicle lifecycle consultant for a landscaping and snow removal company. Analyze QuickBooks maintenance data against vehicle valuations and produce executive summaries for capital planning decisions.' },
      ],
    },
    color: '#d97706',
    defaultCount: 12,
  },
  {
    id: 'compliance',
    name: 'Adverse Weather "Duty of Care" Alert',
    shortName: 'Legal Compliance',
    description:
      'The AI agent monitors NWS weather feeds for trigger temperatures (below 0\u00B0F wind chill), checks QuickBooks payroll to identify crews currently clocked in and working outdoors, and generates a legal compliance alert with a mandatory warm-up schedule and Cold Stress Checklist — creating a digital audit trail for OSHA "General Duty Clause" protection.',
    deliverable: 'OSHA Compliance Alert Package',
    upwork: {
      jobTitle: 'Occupational Safety Consultant',
      estimatedHours: 6,
      perUnitValue: 960,
      samplePostings: [
        { rate: 150, text: 'OSHA compliance consultant needed for outdoor field services company. Must create cold weather safety protocols, warm-up schedules, and documentation templates that satisfy the General Duty Clause.' },
        { rate: 175, text: 'Seeking safety compliance specialist to build a weather-triggered alert system and crew safety documentation package. Must understand OSHA cold stress regulations and create audit-ready checklists.' },
        { rate: 160, text: 'Need an occupational safety expert to review our cold weather operations procedures. Deliverables include a compliance alert template, supervisor acknowledgment forms, and a legal risk assessment memo.' },
      ],
    },
    color: '#dc2626',
    defaultCount: 35,
  },
  {
    id: 'financial',
    name: 'Two-Year Investor Trajectory Deck',
    shortName: 'Financial Deck',
    description:
      'The AI agent pulls 24 months of Profit & Loss and Balance Sheet data from QuickBooks, performs trend analysis calculating Year-over-Year growth and EBITDA margins, and produces a professional 12-slide financial review presentation with automated charts showing revenue acceleration, expense efficiency, and a projected growth roadmap.',
    deliverable: '12-Slide Financial Review Presentation',
    upwork: {
      jobTitle: 'Financial Analyst / CFO Services',
      estimatedHours: 20,
      perUnitValue: 2750,
      samplePostings: [
        { rate: 135, text: 'Financial analyst needed to create a board-ready investor presentation. Must pull 24 months of P&L and balance sheet data, perform trend analysis, and build a 12-slide deck with professional charts.' },
        { rate: 165, text: 'CFO-level consultant for quarterly investor update. Need YoY growth analysis, EBITDA margin calculations, and a polished PowerPoint deck with financial visualizations.' },
        { rate: 150, text: 'Seeking experienced financial consultant to prepare an investor trajectory presentation for a growing field services company. Must analyze historical financials and project 2-year growth roadmap.' },
      ],
    },
    color: '#7c3aed',
    defaultCount: 8,
  },
];

export function calculateSliceValue(scenario: Scenario, count: number): number {
  return scenario.upwork.perUnitValue * count;
}

export function calculateTotalValue(counts: Map<string, number>): number {
  return SCENARIOS.reduce((sum, s) => {
    const count = counts.get(s.id) ?? s.defaultCount;
    return sum + calculateSliceValue(s, count);
  }, 0);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
