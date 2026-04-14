/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Red Flags Panel — Contradictions, missing proof, jurisdiction uncertainty
 */

interface RedFlag {
  id: string;
  category: "contradiction" | "missing_proof" | "jurisdiction" | "credibility" | "timing";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  recommendation: string;
}

const RED_FLAGS: RedFlag[] = [
  {
    id: "rf-001",
    category: "missing_proof",
    severity: "high",
    title: "No written agreement for 70/30 revenue split",
    description:
      "The alleged 70% Etrenzik / 30% Inergy Solutions allocation is based on an understanding but no written contract has been identified in the evidence.",
    recommendation: "Search for email or text confirmations of the split arrangement. Attorney should assess oral contract viability under applicable state law.",
  },
  {
    id: "rf-002",
    category: "jurisdiction",
    severity: "high",
    title: "Venue/jurisdiction uncertainty — Alabama vs. Georgia vs. Federal",
    description:
      "Etrenzik is Georgia-based, Inergy Solutions is Alabama-based (Huntsville). Work was performed in Georgia (Gwinnett). Proper venue requires attorney analysis.",
    recommendation: "Attorney must determine whether to file in Georgia (where work was performed), Alabama (defendant's state), or federal court (diversity jurisdiction).",
  },
  {
    id: "rf-003",
    category: "missing_proof",
    severity: "high",
    title: "Gwinnett County Schools payment records not obtained",
    description:
      "We assert Gwinnett paid Inergy Solutions, but no Gwinnett payment records have been produced as evidence.",
    recommendation: "Submit records request to Gwinnett County Schools for all payments to Inergy Solutions related to Etrenzik work.",
  },
  {
    id: "rf-004",
    category: "credibility",
    severity: "medium",
    title: "Accidental invoice may undermine intent narrative",
    description:
      "The June 11, 2025 invoice sent from an IS email account could be characterized by the defense as unauthorized billing, not an accident.",
    recommendation: "Prepare explanation with technical evidence (email client configuration, account access history). Attorney should assess disclosure strategy.",
  },
  {
    id: "rf-005",
    category: "missing_proof",
    severity: "medium",
    title: "1099 dispute requires loan documentation",
    description:
      "The claim that ~$16,000 was a repaid loan (not revenue) requires loan origination and repayment documentation.",
    recommendation: "Gather wire/ACH transfer records, any promissory note, and communications about the loan.",
  },
  {
    id: "rf-006",
    category: "missing_proof",
    severity: "medium",
    title: "Witnesses to Gwinnett meeting not identified",
    description:
      "The alleged July 1, 2025 meeting at Gwinnett County Schools with accusation of theft lacks identified witnesses.",
    recommendation: "Identify specific Gwinnett staff present and obtain declarations or willingness to testify.",
  },
  {
    id: "rf-007",
    category: "missing_proof",
    severity: "medium",
    title: "P&L request documentation incomplete",
    description:
      "Need evidence of repeated requests for P&L / accounting statements (dates, recipients, method of request).",
    recommendation: "Compile all emails, texts, and other communications requesting accounting records.",
  },
];

const SEVERITY_STYLES = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-blue-100 text-blue-800 border-blue-200",
};

const CATEGORY_LABELS: Record<string, string> = {
  contradiction: "Contradiction",
  missing_proof: "Missing Proof",
  jurisdiction: "Jurisdiction",
  credibility: "Credibility Risk",
  timing: "Timing Issue",
};

export default function RedFlagsPage() {
  const highCount = RED_FLAGS.filter((f) => f.severity === "high").length;
  const mediumCount = RED_FLAGS.filter((f) => f.severity === "medium").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-300 rounded-lg p-3 mb-6">
        <p className="text-red-800 text-sm font-bold">
          🚨 ATTORNEY REVIEW REQUIRED — Red flags identify gaps, risks, and contradictions that must be resolved before filing.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Red Flags</h2>
        <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full">{highCount} High</span>
        <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">{mediumCount} Medium</span>
      </div>

      <div className="space-y-4">
        {RED_FLAGS.map((flag) => (
          <div key={flag.id} className={`border rounded-lg p-4 ${SEVERITY_STYLES[flag.severity]}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase">{flag.severity}</span>
              <span className="text-xs px-2 py-0.5 bg-white/50 rounded">{CATEGORY_LABELS[flag.category]}</span>
              <h3 className="font-semibold">{flag.title}</h3>
            </div>
            <p className="text-sm mb-2">{flag.description}</p>
            <p className="text-sm font-medium">→ {flag.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
