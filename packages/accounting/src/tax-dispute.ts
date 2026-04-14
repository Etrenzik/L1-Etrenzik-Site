/**
 * 1099 Tax Dispute Analyzer
 * Separates loan transactions from revenue transactions.
 * DRAFT WORK PRODUCT — TAX COUNSEL REVIEW REQUIRED
 */

interface TaxDisputeInput {
  taxYear: number;
  reportedAmount: number;
  reportedClassification: "revenue" | "loan" | "disputed";
  loanEvidence: Array<{
    type: string; // "promissory_note", "wire_transfer", "bank_statement", "communication"
    description: string;
    amount?: number;
    date?: string;
  }>;
  repaymentEvidence: Array<{
    type: string;
    description: string;
    amount?: number;
    date?: string;
  }>;
}

interface TaxDisputeOutput {
  disclaimer: string;
  taxYear: number;
  reportedAmount: number;
  classification: {
    reported: string;
    alleged: string;
    evidenceSupport: "strong" | "moderate" | "weak" | "missing";
  };
  loanEvidenceSummary: string;
  repaymentEvidenceSummary: string;
  missingDocumentation: string[];
  recommendation: string;
}

export class TaxDisputeAnalyzer {
  analyze(input: TaxDisputeInput): TaxDisputeOutput {
    const hasLoanDocs = input.loanEvidence.length > 0;
    const hasRepaymentDocs = input.repaymentEvidence.length > 0;

    let evidenceSupport: "strong" | "moderate" | "weak" | "missing";
    if (hasLoanDocs && hasRepaymentDocs) {
      evidenceSupport = "strong";
    } else if (hasLoanDocs || hasRepaymentDocs) {
      evidenceSupport = "moderate";
    } else {
      evidenceSupport = "missing";
    }

    const missingDocumentation: string[] = [];
    if (!hasLoanDocs) missingDocumentation.push("Loan origination documentation (promissory note, agreement)");
    if (!hasRepaymentDocs) missingDocumentation.push("Repayment records (wire transfers, bank statements)");
    if (!input.loanEvidence.some((e) => e.type === "promissory_note")) {
      missingDocumentation.push("Formal promissory note or written loan agreement");
    }

    return {
      disclaimer: "DRAFT WORK PRODUCT — TAX COUNSEL AND ATTORNEY REVIEW REQUIRED",
      taxYear: input.taxYear,
      reportedAmount: input.reportedAmount,
      classification: {
        reported: input.reportedClassification,
        alleged: "loan",
        evidenceSupport,
      },
      loanEvidenceSummary: hasLoanDocs
        ? input.loanEvidence.map((e) => `${e.type}: ${e.description}`).join("; ")
        : "No loan origination documents provided",
      repaymentEvidenceSummary: hasRepaymentDocs
        ? input.repaymentEvidence.map((e) => `${e.type}: ${e.description}`).join("; ")
        : "No repayment documentation provided",
      missingDocumentation,
      recommendation:
        "ATTORNEY AND TAX COUNSEL REVIEW REQUIRED — The classification of this amount as revenue vs. loan repayment requires professional analysis of the documentation and applicable tax law.",
    };
  }
}
