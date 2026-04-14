/**
 * L1-ETRENZIK Database Seed
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 *
 * Seeds the database with initial case data for Etrenzik LLC v. Inergy Solutions LLC.
 * All factual assertions sourced from user-provided information.
 * Evidence status is marked appropriately — nothing is presented as adjudicated.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CASE_ID = "00000000-0000-4000-a000-000000000001";

async function main() {
  console.log("Seeding database...");

  // ── Users ──
  const adminUser = await prisma.user.upsert({
    where: { email: "troy@etrenzik.com" },
    update: {},
    create: {
      email: "troy@etrenzik.com",
      name: "Troy Miller",
      role: "ADMIN",
    },
  });

  // ── Case ──
  await prisma.case.upsert({
    where: { id: CASE_ID },
    update: {},
    create: {
      id: CASE_ID,
      title: "Etrenzik LLC v. Inergy Solutions LLC",
      description:
        "Business dispute involving non-payment of invoices, disputed 1099 reporting, alleged business interference, and accounting/partnership resolution. DRAFT WORK PRODUCT — NOT LEGAL ADVICE.",
      plaintiff: "Etrenzik LLC",
      defendant: "Inergy Solutions LLC",
      jurisdictions: ["GA", "AL"],
      status: "active",
    },
  });

  // ── Entities ──
  const entities = [
    { type: "person", name: "Troy Miller", role: "Plaintiff / Principal — Etrenzik LLC" },
    { type: "person", name: "Sami Ali", role: "Counterparty / Principal — Inergy Solutions LLC" },
    { type: "company", name: "Etrenzik LLC", role: "Plaintiff — Georgia-based LLC" },
    { type: "company", name: "Inergy Solutions LLC", role: "Defendant — Huntsville, Alabama" },
    { type: "client", name: "Gwinnett County Schools", role: "End client for work performed by Etrenzik" },
  ];

  for (const entity of entities) {
    await prisma.entity.create({
      data: {
        caseId: CASE_ID,
        type: entity.type,
        name: entity.name,
        role: entity.role,
      },
    });
  }

  // ── Events (Timeline) ──
  const events = [
    {
      date: new Date("2024-01-01"),
      title: "Etrenzik begins performing work for Gwinnett County Schools",
      description:
        "Etrenzik LLC began performing product and services work for Gwinnett County Schools. Work was coordinated through / billed via Inergy Solutions LLC.",
      participants: ["Troy Miller", "Etrenzik LLC", "Inergy Solutions LLC", "Gwinnett County Schools"],
      status: "alleged",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2024-12-31"),
      title: "2024 tax year — disputed 1099 issued",
      description:
        "Sami Ali / Inergy Solutions allegedly issued or caused a 2024 1099 reporting approximately $16,000 as income to Troy Miller / Etrenzik. Troy alleges this amount was a repaid loan, not revenue.",
      participants: ["Sami Ali", "Troy Miller"],
      status: "alleged",
      jurisdictions: ["GA", "AL", "FEDERAL"],
    },
    {
      date: new Date("2025-06-01"),
      title: "Sami Ali email: Alpharetta office closure",
      description:
        "Email from Sami Ali stating closure of Alpharetta office, no more Georgia work, and directing that invoices be submitted so books could be closed and amounts due paid. Also requested return of Inergy property.",
      participants: ["Sami Ali", "Troy Miller"],
      status: "confirmed",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2025-06-11"),
      title: "Accidental Etrenzik invoice sent from IS email",
      description:
        "An Etrenzik invoice for approximately $19,987 was accidentally sent from an Inergy Solutions email account. This invoice was later cited as basis for allegations against Troy.",
      participants: ["Troy Miller"],
      status: "confirmed",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2025-07-01"),
      title: "Sami Ali appearance at Gwinnett County Schools with lawyer",
      description:
        "Sami Ali allegedly appeared at Gwinnett County Schools with a lawyer and stated that Troy was stealing from Inergy Solutions, allegedly tied to the June 11 accidental invoice.",
      participants: ["Sami Ali", "Unknown attorney", "Gwinnett County Schools staff"],
      status: "alleged",
      jurisdictions: ["GA"],
    },
  ];

  for (const event of events) {
    await prisma.event.create({
      data: {
        caseId: CASE_ID,
        ...event,
      },
    });
  }

  // ── Invoices ──
  await prisma.invoice.create({
    data: {
      caseId: CASE_ID,
      invoiceNumber: "AGG-2024-2025",
      issuer: "Etrenzik LLC",
      recipient: "Inergy Solutions LLC",
      amount: 50000,
      issueDate: new Date("2025-01-01"),
      relatedProject: "Gwinnett County Schools",
      paymentStatus: "unpaid",
      metadata: {
        note: "Aggregate of multiple invoices for Gwinnett work — individual invoices to be itemized. Amount approximate.",
        evidenceStatus: "alleged",
      },
    },
  });

  await prisma.invoice.create({
    data: {
      caseId: CASE_ID,
      invoiceNumber: "ETZ-20250611",
      issuer: "Etrenzik LLC",
      recipient: "Gwinnett County Schools",
      amount: 19987,
      issueDate: new Date("2025-06-11"),
      relatedProject: "Gwinnett County Schools",
      paymentStatus: "disputed",
      metadata: {
        note: "Accidentally sent from Inergy Solutions email account. Cited by Sami Ali as basis for theft allegation.",
        evidenceStatus: "confirmed",
      },
    },
  });

  // ── Loans ──
  await prisma.loan.create({
    data: {
      caseId: CASE_ID,
      borrower: "Troy Miller / Etrenzik LLC",
      lender: "Inergy Solutions LLC / Sami Ali",
      amount: 16000,
      date: new Date("2024-01-01"),
      repaid: true,
      repaymentDate: new Date("2024-12-31"),
      repaymentEvidence: [],
      notes:
        "Troy alleges this was a loan that was repaid, not revenue. However, a 1099 was issued classifying it as approximately $16,000 in income. Loan documentation and repayment evidence needed.",
    },
  });

  // ── Tax Records ──
  await prisma.taxRecord.create({
    data: {
      caseId: CASE_ID,
      taxYear: 2024,
      formType: "1099",
      amount: 16000,
      classification: "disputed",
      reportedBy: "Inergy Solutions LLC",
      reportedTo: "Troy Miller / Etrenzik LLC",
      repaymentEvidence: [],
      notes:
        "Troy alleges this amount represents a repaid loan, not revenue. IS reported it as income on a 1099. TAX COUNSEL REVIEW REQUIRED.",
    },
  });

  // ── Accounting Requests ──
  await prisma.accountingRequest.create({
    data: {
      caseId: CASE_ID,
      requestedBy: "Troy Miller / Etrenzik LLC",
      requestedFrom: "Sami Ali / Inergy Solutions LLC",
      requestType: "pnl",
      date: new Date("2025-01-01"),
      response: "not_provided",
      notes:
        "Repeated requests for P&L statements and final accounting for partnership resolution. Allegedly not produced.",
    },
  });

  // ── Allegations ──
  const allegations = [
    {
      claim: "Non-payment of invoices",
      description:
        "Inergy Solutions failed to pay Etrenzik its agreed share (approximately 70%) of revenue from Gwinnett County Schools work, totaling approximately $50,000.",
      evidenceStatus: "alleged",
      missingProof: [
        "Written agreement for 70/30 split",
        "Individual invoice amounts and dates",
        "Gwinnett payment records to IS",
      ],
      jurisdictions: ["GA", "AL"],
    },
    {
      claim: "Erroneous 1099 classification",
      description:
        "2024 1099 classifying approximately $16,000 as revenue when it was allegedly a repaid loan.",
      evidenceStatus: "alleged",
      missingProof: [
        "Loan documentation",
        "Repayment records",
        "The actual 1099 form",
      ],
      jurisdictions: ["GA", "AL", "FEDERAL"],
    },
    {
      claim: "Failure to produce accounting records",
      description:
        "Sami Ali allegedly failed to produce P&L statements despite repeated requests for final partnership resolution and payment.",
      evidenceStatus: "alleged",
      missingProof: [
        "Written requests for accounting (emails, texts)",
        "Evidence of partnership or joint venture agreement",
      ],
      jurisdictions: ["GA", "AL"],
    },
    {
      claim: "Business interference / defamation at Gwinnett",
      description:
        "Sami Ali allegedly appeared at Gwinnett County Schools with an attorney and told staff that Troy was stealing from Inergy Solutions.",
      evidenceStatus: "alleged",
      missingProof: [
        "Witness statements from Gwinnett staff",
        "Exact words spoken",
        "Evidence of resulting business harm",
      ],
      jurisdictions: ["GA"],
    },
  ];

  for (const allegation of allegations) {
    await prisma.allegation.create({
      data: {
        caseId: CASE_ID,
        ...allegation,
        attorneyReviewRequired: true,
        reviewStatus: "needs_review",
      },
    });
  }

  // ── Damages ──
  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "direct",
      description: "Unpaid invoices for Gwinnett County Schools work",
      amount: 50000,
      basis: "Aggregate of invoices issued by Etrenzik to IS — individual amounts TBD",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "declaratory",
      description: "Correction of 2024 1099 — reclassification of ~$16,000 from revenue to loan repayment",
      amount: 16000,
      basis: "Alleged loan repayment incorrectly reported as income",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "consequential",
      description: "Business interference / reputational harm from Gwinnett incident",
      basis: "Alleged defamatory statements at client site — specific harm TBD",
      supportLevel: "speculative",
      sourceCitations: [],
    },
  });

  // ── Workflows ──
  const workflowDefs = [
    {
      name: "Evidence Intake",
      description: "Process uploaded evidence: parse, chunk, embed, and index",
    },
    {
      name: "Timeline Reconstruction",
      description: "Build chronological timeline, detect gaps and contradictions",
    },
    {
      name: "Invoice Reconciliation",
      description: "Compare invoices, payments, and expected allocations",
    },
    {
      name: "1099 Classification Dispute",
      description: "Analyze loan vs. revenue classification for 1099 dispute",
    },
    {
      name: "Partnership Accounting Dispute",
      description: "Track accounting requests, P&L demands, and split resolution",
    },
    {
      name: "Business Interference Fact Memo",
      description: "Compile evidence for business interference / defamation claims",
    },
    {
      name: "Complaint Draft",
      description: "Generate complaint skeleton with candidate claims",
    },
    {
      name: "Demand Letter Draft",
      description: "Generate demand letter for unpaid amounts",
    },
    {
      name: "Exhibit Binder",
      description: "Compile numbered exhibit list with index",
    },
  ];

  for (const wf of workflowDefs) {
    await prisma.workflow.create({
      data: {
        name: wf.name,
        description: wf.description,
        definition: {},
        version: "1.0.0",
      },
    });
  }

  // ── Audit Log ──
  await prisma.auditLog.create({
    data: {
      action: "seed",
      entityType: "case",
      entityId: CASE_ID,
      userId: adminUser.id,
      metadata: {
        description: "Initial seed data for Etrenzik v. Inergy Solutions case",
        disclaimer: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE",
      },
    },
  });

  console.log("✓ Seed complete");
  console.log("  Case ID:", CASE_ID);
  console.log("  Entities:", entities.length);
  console.log("  Events:", events.length);
  console.log("  Invoices: 2");
  console.log("  Loans: 1");
  console.log("  Tax Records: 1");
  console.log("  Allegations:", allegations.length);
  console.log("  Damages: 3");
  console.log("  Workflows:", workflowDefs.length);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
