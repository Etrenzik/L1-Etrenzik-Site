/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Legal Issues Page — Candidate claims for attorney review
 */

interface CandidateClaim {
  id: string;
  theory: string;
  description: string;
  evidenceSupport: "strong" | "moderate" | "weak" | "missing";
  jurisdictions: string[];
  reviewStatus: "needs_review";
  keyFacts: string[];
  missingProof: string[];
}

const CANDIDATE_CLAIMS: CandidateClaim[] = [
  {
    id: "claim-001",
    theory: "Breach of Contract",
    description:
      "Inergy Solutions allegedly failed to pay Etrenzik its 70% share of revenue from Gwinnett County Schools work.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL"],
    reviewStatus: "needs_review",
    keyFacts: [
      "Work was performed for Gwinnett County Schools",
      "Gwinnett paid Inergy Solutions",
      "Understanding of 70/30 split",
      "Approximately $50,000 unpaid",
    ],
    missingProof: [
      "Written contract or agreement documenting 70/30 split",
      "Individual invoice amounts and dates",
      "Gwinnett payment records to IS",
    ],
  },
  {
    id: "claim-002",
    theory: "Account Stated / Open Account",
    description:
      "Invoices submitted by Etrenzik to Inergy Solutions were not objected to in a timely manner.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL"],
    reviewStatus: "needs_review",
    keyFacts: ["Invoices were submitted", "June 1, 2025 email acknowledged need to close books and pay"],
    missingProof: ["Specific invoices with dates", "Evidence IS received and did not object"],
  },
  {
    id: "claim-003",
    theory: "Unjust Enrichment",
    description:
      "Inergy Solutions received payment from Gwinnett County Schools for work performed by Etrenzik and retained the funds.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL"],
    reviewStatus: "needs_review",
    keyFacts: ["Work performed by Etrenzik", "Payment received by IS from Gwinnett", "IS did not pay Etrenzik"],
    missingProof: ["Gwinnett payment records", "IS bank or accounting records"],
  },
  {
    id: "claim-004",
    theory: "Tortious Interference / Business Disparagement",
    description:
      "Sami Ali allegedly appeared at Gwinnett County Schools with a lawyer and accused Troy of stealing, potentially damaging Etrenzik's business relationship.",
    evidenceSupport: "weak",
    jurisdictions: ["GA"],
    reviewStatus: "needs_review",
    keyFacts: [
      "Alleged appearance at Gwinnett County Schools ~July 1, 2025",
      "Alleged accusation of theft directed at Troy Miller",
      "Statement made in presence of third parties",
    ],
    missingProof: [
      "Witness statements from Gwinnett staff",
      "Specific words used",
      "Evidence of business harm (lost contracts, declined renewals)",
    ],
  },
  {
    id: "claim-005",
    theory: "Declaratory Relief — 1099 Classification",
    description:
      "A 2024 1099 was allegedly issued classifying approximately $16,000 as income that was actually a repaid loan.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL", "FEDERAL"],
    reviewStatus: "needs_review",
    keyFacts: ["1099 issued for ~$16,000", "Amount alleged to be a repaid loan, not revenue"],
    missingProof: [
      "Loan documentation (promissory note, wire transfers)",
      "Repayment records",
      "The actual 1099 form",
      "IRS guidance applicability",
    ],
  },
  {
    id: "claim-006",
    theory: "Accounting / Partnership Accounting",
    description:
      "Sami Ali allegedly failed to produce P&L statements despite repeated requests for final partnership resolution.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL"],
    reviewStatus: "needs_review",
    keyFacts: [
      "Repeated requests for P&L statements",
      "June 1, 2025 email acknowledged need to close books",
      "P&L statements not produced",
    ],
    missingProof: [
      "Written requests for accounting (emails, texts)",
      "Evidence of partnership or joint venture agreement",
    ],
  },
];

const SUPPORT_STYLES = {
  strong: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  weak: "bg-orange-100 text-orange-800",
  missing: "bg-red-100 text-red-800",
};

export default function LegalIssuesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-300 rounded-lg p-3 mb-6">
        <p className="text-red-800 text-sm font-bold">
          🔒 ATTORNEY REVIEW REQUIRED — These are candidate legal theories only. They are NOT adjudicated facts or
          established claims. Do not file without licensed attorney review.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Candidate Legal Claims</h2>

      <div className="space-y-6">
        {CANDIDATE_CLAIMS.map((claim) => (
          <div key={claim.id} className="bg-white border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-bold text-lg">{claim.theory}</h3>
              <span className={`text-xs px-2 py-1 rounded ${SUPPORT_STYLES[claim.evidenceSupport]}`}>
                Evidence: {claim.evidenceSupport}
              </span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                NEEDS ATTORNEY REVIEW
              </span>
              {claim.jurisdictions.map((j) => (
                <span key={j} className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                  {j}
                </span>
              ))}
            </div>

            <p className="text-gray-600 mb-4">{claim.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-1">Supporting Facts</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {claim.keyFacts.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-1">Missing Proof</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {claim.missingProof.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
