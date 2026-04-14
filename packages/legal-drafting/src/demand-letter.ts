import { SYSTEM_RULES } from "@l1-etrenzik/core";

interface DemandLetterInput {
  plaintiff: string;
  plaintiffAddress: string;
  defendant: string;
  defendantAddress: string;
  amountDemanded: number;
  factSummary: string[];
  basisForClaim: string[];
  deadlineDays: number;
}

interface DemandLetterOutput {
  disclaimer: string;
  letter: string;
  openIssues: string[];
}

/**
 * Demand Letter Draft Engine
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 */
export class DemandLetterEngine {
  generate(input: DemandLetterInput): DemandLetterOutput {
    const deadline = `${input.deadlineDays} days from receipt of this letter`;

    const letter = `${SYSTEM_RULES.DISCLAIMER}

[DATE — TO BE INSERTED]

VIA [CERTIFIED MAIL / EMAIL — ATTORNEY TO DETERMINE]

${input.defendant}
${input.defendantAddress}

Re: Demand for Payment — ${input.plaintiff}

Dear ${input.defendant}:

This letter constitutes a formal demand on behalf of ${input.plaintiff} for the payment of $${input.amountDemanded.toLocaleString()} based on the following:

FACTUAL BACKGROUND:

${input.factSummary.map((f, i) => `${i + 1}. ${f}`).join("\n\n")}

BASIS FOR CLAIM:

${input.basisForClaim.map((b, i) => `${i + 1}. ${b}`).join("\n\n")}

DEMAND:

${input.plaintiff} hereby demands payment of $${input.amountDemanded.toLocaleString()} within ${deadline}.

[CONSEQUENCES OF NON-PAYMENT — ATTORNEY TO COMPLETE]

[CLOSING — ATTORNEY TO COMPLETE]

Sincerely,

[ATTORNEY NAME AND BAR NUMBER]
[FIRM NAME]
[ADDRESS]
On behalf of ${input.plaintiff}`;

    return {
      disclaimer: SYSTEM_RULES.DISCLAIMER,
      letter,
      openIssues: [
        "Attorney must review and approve before sending",
        "Verify amount demanded against evidence",
        "Determine delivery method (certified mail, email, etc.)",
        "Include consequences of non-payment if appropriate",
        "Review for compliance with applicable demand letter requirements",
      ],
    };
  }
}
