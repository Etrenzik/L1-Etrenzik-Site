/**
 * Damages Computation Engine
 * Computes unpaid balance ranges and damage categories.
 * DRAFT WORK PRODUCT — ATTORNEY REVIEW REQUIRED
 *
 * Emits both "supported damages" and "potential damages requiring proof."
 */

interface DamageInput {
  unpaidInvoiceTotal: number;
  disputedTaxAmount: number;
  consequentialDamages?: Array<{ description: string; estimatedAmount?: number }>;
}

interface DamageOutput {
  disclaimer: string;
  supportedDamages: Array<{
    category: string;
    description: string;
    amount: number;
    basis: string;
  }>;
  potentialDamagesRequiringProof: Array<{
    category: string;
    description: string;
    estimatedRange?: { min: number; max: number };
    proofNeeded: string[];
  }>;
  totalSupported: number;
  totalPotentialMin: number;
  totalPotentialMax: number;
}

export class DamagesEngine {
  compute(input: DamageInput): DamageOutput {
    const supportedDamages = [
      {
        category: "direct",
        description: "Unpaid invoices for work performed",
        amount: input.unpaidInvoiceTotal,
        basis: "Invoice records and payment history",
      },
    ];

    const potentialDamagesRequiringProof = [
      {
        category: "declaratory",
        description: "Correction of 1099 classification — loan vs. revenue",
        estimatedRange: { min: input.disputedTaxAmount, max: input.disputedTaxAmount },
        proofNeeded: [
          "Loan origination documentation",
          "Repayment records (wire/ACH transfers)",
          "1099 form as issued",
        ],
      },
      {
        category: "consequential",
        description: "Business interference / reputational harm at Gwinnett County Schools",
        estimatedRange: undefined,
        proofNeeded: [
          "Witness statements from Gwinnett staff",
          "Evidence of lost business or contracts",
          "Timeline of events before and after alleged interference",
        ],
      },
      ...(input.consequentialDamages ?? []).map((d) => ({
        category: "consequential" as const,
        description: d.description,
        estimatedRange: d.estimatedAmount
          ? { min: d.estimatedAmount * 0.5, max: d.estimatedAmount * 1.5 }
          : undefined,
        proofNeeded: ["Supporting documentation required"],
      })),
    ];

    return {
      disclaimer: "DRAFT WORK PRODUCT — ATTORNEY REVIEW REQUIRED — Damage figures are preliminary estimates",
      supportedDamages,
      potentialDamagesRequiringProof,
      totalSupported: supportedDamages.reduce((s, d) => s + d.amount, 0),
      totalPotentialMin: potentialDamagesRequiringProof.reduce((s, d) => s + (d.estimatedRange?.min ?? 0), 0),
      totalPotentialMax: potentialDamagesRequiringProof.reduce((s, d) => s + (d.estimatedRange?.max ?? 0), 0),
    };
  }
}
