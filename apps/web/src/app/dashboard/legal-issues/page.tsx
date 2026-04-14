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
      "IS failed to pay Etrenzik its agreed ~70/30 profit split and $85K salary from GCS and other work, plus the final 2 weeks of 1099 pay (~$3,270) after termination on 6/1/2025. Total owed unknown — IS refuses to provide accounting.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL"],
    reviewStatus: "needs_review",
    keyFacts: [
      "Business arrangement entered 2/1/2022 — ~70/30 split + $85K salary",
      "IS covered all expenses (operating, sales, travel, meals/entertainment)",
      "Troy acted as CIO/COO, merging LED lighting offerings for IS",
      "IS terminated via email 6/1/2025",
      "IS refuses to provide accounting of revenue or payments",
      "Last 2 weeks 1099 pay (~$3,270) not paid",
    ],
    missingProof: [
      "Written contract or agreement documenting 70/30 split + $85K salary",
      "IS accounting records showing total revenue from GCS and other work",
      "Payment history to Etrenzik / Troy Miller",
    ],
  },
  {
    id: "claim-002",
    theory: "Account Stated / Open Account",
    description:
      'June 1, 2025 email from Sami Ali: "submit invoices so books can be closed and amounts due paid" — acknowledging amounts owed. INV-1268636 ($37,725) + INV-1268637 ($16,860.99) submitted and not objected to.',
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL"],
    reviewStatus: "needs_review",
    keyFacts: [
      "June 1, 2025 email acknowledged need to close books and pay amounts due",
      "INV-1268636 ($37,725) sent 8/1/2025",
      "INV-1268637 ($16,860.99) sent 8/1/2025",
      "No timely objection to invoices",
    ],
    missingProof: [
      "Evidence IS received invoices and did not object",
      "Proof of delivery of invoices",
    ],
  },
  {
    id: "claim-003",
    theory: "Unjust Enrichment",
    description:
      "IS received payment from GCS for work performed by Etrenzik and retained funds. Etrenzik also paid $54,585.99 in product/labor on GCS POs that IS benefited from without contributing.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL"],
    reviewStatus: "needs_review",
    keyFacts: [
      "Work performed by Etrenzik for GCS",
      "Payment received by IS from GCS",
      "IS did not pay Etrenzik its share",
      "Etrenzik paid $54,585.99 for PO product/labor",
    ],
    missingProof: ["GCS payment records to IS", "IS bank or accounting records"],
  },
  {
    id: "claim-004",
    theory: "Defamation / Slander Per Se",
    description:
      "On/about July 1, 2025, Sami Ali and legal representation contacted GCS and accused Troy Miller of stealing and misrepresenting the GA office closure. Accusation of a crime (stealing) constitutes slander per se under GA law.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA"],
    reviewStatus: "needs_review",
    keyFacts: [
      "Sami Ali/lawyer contacted GCS ~July 1, 2025",
      "Accused Troy of stealing — accusation of a crime",
      "Accused Troy of misrepresenting GA office closure",
      "Negated own June 1 email stating GA office was closing",
      "Statements made to third parties (GCS staff)",
    ],
    missingProof: [
      "GCS witness statements confirming specific accusations",
      "Exact words spoken by Sami Ali / his attorney",
      "Evidence that statements were false (June 1 email contradicts)",
    ],
  },
  {
    id: "claim-005",
    theory: "Tortious Interference with Business Relations",
    description:
      "Sami Ali's actions at GCS destroyed Etrenzik's business relationship: all POs canceled, $4,000 check canceled, immediate stop of all business averaging $400K–$600K annually, and loss of $750K–$1M in future 12-month revenue.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA"],
    reviewStatus: "needs_review",
    keyFacts: [
      "Existing business relationship — Etrenzik ↔ GCS averaging $400K–$600K/year",
      "Sami Ali knew of the relationship (IS billed GCS work through IS)",
      "Sami Ali/lawyer contacted GCS with accusations",
      "GCS immediately terminated business with Etrenzik",
      "All open POs canceled",
      "$4,000 check from GCS to Etrenzik canceled",
      "Projected loss: $750K–$1M over 12 months",
    ],
    missingProof: [
      "GCS witness statements",
      "GCS PO records (open + canceled)",
      "GCS canceled check documentation",
      "Historical GCS revenue to quantify damages",
    ],
  },
  {
    id: "claim-006",
    theory: "Declaratory Relief — 1099 Classification",
    description:
      "Improper 2024 1099: ~$16K loan classified as income + ~$20K unexplained expenses. Also ~$85K in 2023 1099 chargebacks with detail never provided. Creating tax liability requiring IRS correction.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL", "FEDERAL"],
    reviewStatus: "needs_review",
    keyFacts: [
      "2024 1099: ~$16K repaid loan classified as income",
      "2024 1099: ~$20K in unexplained expenses",
      "2023 1099: ~$85K in chargebacks — detail never provided despite requests",
      "Creates tax liability requiring IRS correction",
    ],
    missingProof: [
      "Loan documentation (promissory note, transfers)",
      "Repayment records",
      "The actual 2024 and 2023 1099 forms",
      "Written requests for 1099 detail",
      "IRS guidance applicability",
    ],
  },
  {
    id: "claim-007",
    theory: "Accounting / Partnership Accounting",
    description:
      "IS has failed to produce P&L statements, revenue split records, or detail of 1099 chargebacks despite repeated requests. Total amounts owed cannot be determined.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL"],
    reviewStatus: "needs_review",
    keyFacts: [
      "Repeated requests for P&L and accounting",
      "June 1, 2025 email acknowledged need to close books",
      "IS has provided zero accounting records",
      "Multiple requests for ~$85K 2023 detail — no response",
      "Multiple requests for ~$20K 2024 detail — no response",
    ],
    missingProof: [
      "Written requests for accounting (emails, texts) with dates",
      "Evidence of business arrangement agreement",
    ],
  },
  {
    id: "claim-008",
    theory: "Conversion — LED Products",
    description:
      "Etrenzik moved ~$50K of LED products to IS Huntsville warehouse — never compensated. GA location sold ~$20K of existing Etrenzik LED inventory with zero compensation for product cost.",
    evidenceSupport: "weak",
    jurisdictions: ["GA", "AL"],
    reviewStatus: "needs_review",
    keyFacts: [
      "~$50K LED products transferred to IS warehouse in Huntsville, AL",
      "~$20K existing Etrenzik LED inventory sold from GA location",
      "Zero compensation received for either",
    ],
    missingProof: [
      "Inventory records of LED products transferred",
      "Documentation of products stored at IS warehouse",
      "GA location LED sales records",
    ],
  },
  {
    id: "claim-009",
    theory: "Employee Misclassification (1099 vs. Employee)",
    description:
      "Despite 1099 classification, IS operated as if Troy was an employee — IS credit card for laptops, travel, vehicle maintenance, gas. Troy was also employed via Insperity PEO for ~11 months.",
    evidenceSupport: "moderate",
    jurisdictions: ["GA", "AL", "FEDERAL"],
    reviewStatus: "needs_review",
    keyFacts: [
      "1099 arrangement started Feb 2022",
      "Switched to Insperity PEO employee for ~11 months",
      "Returned to 1099 mid-2024",
      "IS provided credit card for: laptops, travel, vehicle maintenance, gas",
      "IS controlled manner of work despite 1099 status",
    ],
    missingProof: [
      "IS credit card statements",
      "Insperity employment records",
      "Evidence of IS behavioral/financial control over Troy's work",
    ],
  },
  {
    id: "claim-010",
    theory: "Unreimbursed PO Expenses",
    description:
      "Troy paid $54,585.99 for product and labor on 2 GCS POs (INV-1268636: $37,725 + INV-1268637: $16,860.99). IS had no involvement in purchase or labor. Invoices sent to IS 8/1/2025 — unpaid.",
    evidenceSupport: "strong",
    jurisdictions: ["GA"],
    reviewStatus: "needs_review",
    keyFacts: [
      "2 of 5-6 open POs continued by Troy outside Ali's stated list",
      "Etrenzik paid all product and labor costs",
      "INV-1268636 ($37,725) sent 8/1/2025",
      "INV-1268637 ($16,860.99) sent 8/1/2025",
      "IS had no involvement in product purchase or labor",
      "Ali's June 1 email directed Troy to close books → Troy attempted PO transfer",
    ],
    missingProof: [
      "Product purchase receipts",
      "Labor payment records",
      "GCS PO documentation showing IS as original vendor",
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
