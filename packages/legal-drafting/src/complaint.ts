import { SYSTEM_RULES, checkProhibitedContent } from "@l1-etrenzik/core";

interface ComplaintInput {
  plaintiff: string;
  defendant: string;
  chronology: Array<{
    date: string;
    description: string;
    status: string;
    citations: string[];
  }>;
  candidateClaims: Array<{
    theory: string;
    claimType: string;
    keyFacts: string[];
    missingProof: string[];
  }>;
  damages: Array<{
    description: string;
    amount?: number;
    supportLevel: string;
  }>;
}

interface ComplaintOutput {
  disclaimer: string;
  sections: {
    caseCaption: string;
    parties: string;
    jurisdictionVenue: string;
    factualBackground: string;
    counts: Array<{
      number: number;
      title: string;
      body: string;
      label: string;
      citations: string[];
    }>;
    damagesSummary: string;
    prayerForRelief: string;
    juryDemand: string;
    exhibitList: string[];
    openIssues: string[];
  };
}

/**
 * Complaint Draft Engine
 * Builds complaint skeleton from verified chronology.
 * DOES NOT provide legal advice or finalize any claim.
 * Every count is labeled "candidate claim for attorney review."
 */
export class ComplaintDraftEngine {
  generate(input: ComplaintInput): ComplaintOutput {
    // Validate no prohibited content in input
    const allText = JSON.stringify(input);
    const violations = checkProhibitedContent(allText);
    if (violations.length > 0) {
      throw new Error(`Guardrail violation: ${violations.join("; ")}`);
    }

    const factualBackground = input.chronology
      .map((e, i) => {
        const citeSuffix = e.citations.length > 0 ? ` [See Ex. ${e.citations.join(", ")}]` : "";
        const statusTag = e.status !== "confirmed" ? ` [STATUS: ${e.status.toUpperCase()}]` : "";
        return `${i + 1}. On or about ${e.date}, ${e.description}${statusTag}${citeSuffix}`;
      })
      .join("\n\n");

    const counts = input.candidateClaims.map((claim, i) => ({
      number: i + 1,
      title: `COUNT ${i + 1}: ${claim.theory.toUpperCase()}`,
      body: [
        `Plaintiff incorporates by reference the foregoing paragraphs.`,
        ``,
        `[CANDIDATE CLAIM FOR ATTORNEY REVIEW]`,
        ``,
        `Key Facts:`,
        ...claim.keyFacts.map((f) => `  - ${f}`),
        ``,
        `Missing Proof (must be resolved before filing):`,
        ...claim.missingProof.map((m) => `  - ${m}`),
      ].join("\n"),
      label: "candidate claim for attorney review",
      citations: [],
    }));

    const damagesSummary = input.damages
      .map((d) => {
        const amountStr = d.amount ? `$${d.amount.toLocaleString()}` : "[AMOUNT TO BE DETERMINED]";
        return `- ${d.description}: ${amountStr} (${d.supportLevel})`;
      })
      .join("\n");

    return {
      disclaimer: SYSTEM_RULES.DISCLAIMER,
      sections: {
        caseCaption: `[CASE CAPTION — TO BE COMPLETED BY ATTORNEY]\n\n${input.plaintiff}, Plaintiff,\n  v.\n${input.defendant}, Defendant.`,
        parties: `Plaintiff ${input.plaintiff} and Defendant ${input.defendant}. [COMPLETE PARTY DESCRIPTIONS — ATTORNEY TO VERIFY]`,
        jurisdictionVenue: `[JURISDICTION AND VENUE — ATTORNEY REVIEW REQUIRED]\n\nTODO: Determine proper venue: Alabama (defendant's state), Georgia (where work was performed / plaintiff's state), or Federal (diversity jurisdiction). This determination requires attorney analysis of:\n- Where the contract was formed\n- Where performance occurred\n- Amount in controversy\n- Citizenship of parties`,
        factualBackground,
        counts,
        damagesSummary: `DRAFT DAMAGES SUMMARY — ATTORNEY REVIEW REQUIRED\n\n${damagesSummary}`,
        prayerForRelief: `WHEREFORE, Plaintiff ${input.plaintiff} respectfully requests that this Court:\n\n[PRAYER FOR RELIEF — ATTORNEY TO COMPLETE BASED ON APPROVED CLAIMS]`,
        juryDemand: `[JURY DEMAND — ATTORNEY TO DETERMINE WHETHER TO DEMAND JURY TRIAL]`,
        exhibitList: ["[EXHIBIT LIST TO BE COMPILED FROM EVIDENCE FILES]"],
        openIssues: [
          "Venue determination: Alabama vs. Georgia vs. Federal",
          "Written vs. oral agreement for revenue split",
          "1099 classification — tax counsel review",
          "Business interference witnesses — identification needed",
          "Statute of limitations analysis for each claim",
          "Damage computation verification",
        ],
      },
    };
  }
}
