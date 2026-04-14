/**
 * Guardrails module — enforces critical safety rules
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 *
 * These rules MUST be applied to all generated outputs.
 */

export const SYSTEM_RULES = {
  DISCLAIMER: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE — ATTORNEY REVIEW REQUIRED",

  DRAFTING_PROMPT: `Draft a plaintiff-side complaint skeleton using only supported facts and clearly labeled allegations.

Rules:
- Do not provide final legal advice.
- Do not invent dates, contract terms, or statements.
- Use placeholders where evidence is incomplete.
- For each factual paragraph, attach source citations.
- For each count, label it "candidate claim for attorney review."
- Distinguish:
  - supported fact
  - user allegation
  - missing evidence
  - legal conclusion requiring review

Output sections:
1. Case caption placeholder
2. Parties
3. Jurisdiction and venue placeholders
4. Factual background chronology
5. Candidate claims for attorney review
6. Damages summary
7. Prayer for relief
8. Jury demand placeholder
9. Exhibit list
10. Open issues requiring counsel review`,

  PROHIBITED_ACTIONS: [
    "Do not invent contracts or terms that are not in evidence",
    "Do not state that fraud occurred unless supported and attorney-approved",
    "Do not state venue is proper in Alabama or Georgia without attorney review",
    "Do not state defamation/business interference as established fact",
    "Do not claim the 1099 was unlawful without review",
    "Do not claim criminal conduct",
    "Do not convert user allegations into factual findings",
    "Do not hallucinate citations",
    "Do not output false statements as facts",
  ],

  CLASSIFICATION_RULES: {
    SUPPORTED_FACT: "Facts supported by evidence in the case file",
    USER_ALLEGATION: "Allegations not yet independently supported by evidence",
    INFERRED_CLAIM: "Legal theories inferred from the fact pattern",
    MISSING_EVIDENCE: "Areas where proof has not been provided",
    LEGAL_CONCLUSION: "Legal conclusions that require attorney review and approval",
  },
} as const;

/**
 * Validate that an output contains the required disclaimer
 */
export function assertDisclaimer(output: string): boolean {
  return output.includes("DRAFT WORK PRODUCT") || output.includes("ATTORNEY REVIEW REQUIRED");
}

/**
 * Tag a fact with its classification level
 */
export function classifyFact(
  fact: string,
  hasEvidence: boolean,
  isUserStatement: boolean
): { fact: string; classification: string; reviewRequired: boolean } {
  if (hasEvidence) {
    return { fact, classification: "supported_fact", reviewRequired: false };
  }
  if (isUserStatement) {
    return { fact, classification: "user_allegation", reviewRequired: true };
  }
  return { fact, classification: "missing_evidence", reviewRequired: true };
}

/**
 * Check if a statement crosses into prohibited territory
 */
export function checkProhibitedContent(text: string): string[] {
  const violations: string[] = [];
  const lower = text.toLowerCase();

  if (lower.includes("fraud") && !lower.includes("alleged") && !lower.includes("candidate")) {
    violations.push("Statement appears to assert fraud as established fact");
  }
  if (lower.includes("criminal") && !lower.includes("alleged") && !lower.includes("potential")) {
    violations.push("Statement appears to assert criminal conduct");
  }
  if (lower.includes("venue is proper") && !lower.includes("placeholder") && !lower.includes("review")) {
    violations.push("Statement asserts proper venue without attorney review flag");
  }
  if (lower.includes("unlawful 1099") || lower.includes("illegal 1099")) {
    violations.push("Statement characterizes 1099 as unlawful without attorney review");
  }

  return violations;
}
