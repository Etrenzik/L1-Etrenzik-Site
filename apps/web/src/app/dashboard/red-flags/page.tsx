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
    title: "No written agreement for ~70/30 split + $85K salary",
    description:
      "The alleged ~70/30 profit split and $85K salary arrangement with IS (entered 2/1/2022) is based on an understanding but no written contract has been identified.",
    recommendation: "Search for email or text confirmations of the arrangement terms. Attorney should assess oral contract viability under applicable state law.",
  },
  {
    id: "rf-002",
    category: "missing_proof",
    severity: "high",
    title: "IS refuses to provide accounting — total damages unknown",
    description:
      "IS has refused all requests for P&L statements, revenue split records, and detail of 1099 chargebacks. The total amount owed cannot be calculated.",
    recommendation: "File for compelled accounting. Subpoena IS financial records during discovery. Also subpoena GCS payment records to IS.",
  },
  {
    id: "rf-003",
    category: "jurisdiction",
    severity: "high",
    title: "Venue/jurisdiction uncertainty — Alabama vs. Georgia vs. Federal",
    description:
      "Etrenzik is Georgia-based, IS is Alabama-based. Work performed in GA (GCS). 1099 involves federal tax. Multiple forums required.",
    recommendation: "Attorney must determine filing venue. Strong GA basis: work performed in GA, office in GA, defamation occurred in GA, GCS is GA entity.",
  },
  {
    id: "rf-004",
    category: "missing_proof",
    severity: "high",
    title: "GCS defamation witnesses not identified",
    description:
      "The ~July 1, 2025 contact by Sami Ali/lawyer at GCS — accusing Troy of stealing — lacks identified GCS witnesses. This is the basis for slander per se and tortious interference claims.",
    recommendation: "Identify specific GCS staff present. Obtain declarations or willingness to testify. This is critical for the highest-value claims ($750K–$1M).",
  },
  {
    id: "rf-005",
    category: "missing_proof",
    severity: "high",
    title: "~$85K 2023 + ~$20K 2024 unexplained 1099 charges — no detail provided",
    description:
      "IS has charged back approximately $85K in 2023 and $20K in 2024 on 1099 forms with no supporting documentation despite multiple requests.",
    recommendation: "Document all written requests for detail. File for compelled accounting. Tax counsel should assess IRS correction path for both years.",
  },
  {
    id: "rf-006",
    category: "missing_proof",
    severity: "medium",
    title: "1099 loan dispute (~$16K) requires loan documentation",
    description:
      "The claim that ~$16,000 was a repaid loan (not revenue) on the 2024 1099 requires loan origination and repayment documentation.",
    recommendation: "Gather wire/ACH transfer records, any promissory note, and communications about the loan.",
  },
  {
    id: "rf-007",
    category: "missing_proof",
    severity: "medium",
    title: "LED product conversion — inventory records needed",
    description:
      "~$50K LED products moved to IS warehouse in Huntsville + ~$20K existing LED sold from GA location — needs documentation.",
    recommendation: "Compile inventory records, shipping/transfer documentation, and GA location sales records.",
  },
  {
    id: "rf-008",
    category: "credibility",
    severity: "medium",
    title: "Troy continued 2 POs outside Ali's stated list",
    description:
      "Troy continued work on 2 of 5-6 POs not listed by Ali as ones IS was willing to finish. Defense may argue unauthorized action.",
    recommendation: "Prepare narrative: Ali directed Troy to transfer POs to Etrenzik; GCS couldn't transfer due to set-aside/year-end; Troy paid all costs from Etrenzik funds — IS had no involvement in product or labor.",
  },
  {
    id: "rf-009",
    category: "missing_proof",
    severity: "medium",
    title: "Insperity PEO records needed for misclassification claim",
    description:
      "Troy was employed through Insperity PEO for ~11 months, then returned to 1099. Records needed to support employee misclassification claim.",
    recommendation: "Obtain Insperity employment records and IS credit card statements showing Troy's authorized expenses.",
  },
  {
    id: "rf-010",
    category: "timing",
    severity: "medium",
    title: "GCS end-of-year PO transfer complications",
    description:
      "POs couldn't be transferred from IS to Etrenzik because it was GCS end of year and they had been classified as a set-aside under IS.",
    recommendation: "Obtain GCS procurement records documenting the set-aside classification and transfer barrier. This contextualizes Troy's decision to continue POs.",
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
