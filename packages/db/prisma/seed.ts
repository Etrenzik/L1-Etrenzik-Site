/**
 * L1-ETRENZIK Database Seed
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 *
 * Seeds the database with initial case data for Etrenzik LLC v. Inergy Solutions, LLC.
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
      title: "Etrenzik LLC v. Inergy Solutions, LLC",
      description:
        "Business dispute: Troy Miller / Etrenzik entered a ~70/30 profit split and $85K salary arrangement with IS on 2/1/2022 (LED lighting sales/installation, CIO/COO role). IS terminated 6/1/2025 via email. IS failed to pay agreed revenue split, final 1099 pay (~$3,270), and owes an untold amount (refuses to provide accounting). Additional claims: defamation/slander per se at GCS, tortious interference ($750K–$1M future revenue lost), conversion (~$50K LED products + ~$20K inventory), improper 1099 (~$16K loan as income + ~$20K unexplained + ~$85K 2023 chargebacks). DRAFT WORK PRODUCT — NOT LEGAL ADVICE.",
      plaintiff: "Etrenzik LLC",
      defendant: "Inergy Solutions, LLC",
      jurisdictions: ["GA", "AL"],
      status: "active",
    },
  });

  // ── Entities ──
  const entities = [
    { type: "person", name: "Troy Miller", role: "Plaintiff / Principal — Etrenzik LLC (CIO/COO of IS arrangement)" },
    { type: "person", name: "Sami Ali", role: "Counterparty / Principal — Inergy Solutions, LLC" },
    { type: "company", name: "Etrenzik LLC", role: "Plaintiff — Georgia-based LLC (LED lighting sales & installation)" },
    { type: "company", name: "Inergy Solutions, LLC", role: "Defendant — Huntsville, Alabama" },
    { type: "client", name: "Gwinnett County Schools", role: "End client — LED lighting projects in GA (averaging $400K–$600K annually)" },
    { type: "company", name: "Insperity", role: "PEO — employed Troy Miller on behalf of IS for ~11 months" },
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
      date: new Date("2022-02-01"),
      title: "Business arrangement begins — Etrenzik / IS",
      description:
        "Troy Miller (Etrenzik) entered business arrangement with Inergy Solutions on 2/1/2022 to continue existing GA operations and merge LED lighting sales/installation offerings for IS, acting as CIO/COO. Agreed ~70/30 profit split + $85K salary in Etrenzik's favor, IS covering all expenses.",
      participants: ["Troy Miller", "Sami Ali", "Etrenzik LLC", "Inergy Solutions, LLC"],
      status: "alleged",
      jurisdictions: ["GA", "AL"],
    },
    {
      date: new Date("2022-08-01"),
      title: "Troy Miller becomes Insperity PEO employee for IS (~11 months)",
      description:
        "Troy Miller transitioned from 1099 to employee of Insperity as a PEO for Inergy Solutions for approximately 11 months.",
      participants: ["Troy Miller", "Insperity", "Inergy Solutions, LLC"],
      status: "alleged",
      jurisdictions: ["GA", "AL"],
    },
    {
      date: new Date("2023-01-01"),
      title: "~$85K in 2023 1099 chargebacks — detail never provided",
      description:
        "Sami Ali / IS charged back approximately $85K in expenses to Troy Miller on the 2023 1099. Multiple requests for detail and accounting have been made with no response.",
      participants: ["Sami Ali", "Troy Miller"],
      status: "alleged",
      jurisdictions: ["GA", "AL", "FEDERAL"],
    },
    {
      date: new Date("2024-01-01"),
      title: "~$50K LED products moved to IS warehouse in Huntsville, AL",
      description:
        "At the onset of the relationship, Etrenzik moved approximately $50,000 worth of LED products into the IS warehouse in Huntsville, AL. Etrenzik has never received consideration for any of it.",
      participants: ["Troy Miller", "Etrenzik LLC", "Inergy Solutions, LLC"],
      status: "alleged",
      jurisdictions: ["AL"],
    },
    {
      date: new Date("2024-01-01"),
      title: "GA location sold ~$20K of existing Etrenzik LED lighting — zero compensation",
      description:
        "The GA location sold approximately $20,000 of existing Etrenzik LED lighting inventory with zero compensation to Etrenzik for the product cost.",
      participants: ["Etrenzik LLC", "Inergy Solutions, LLC"],
      status: "alleged",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2024-01-01"),
      title: "Etrenzik begins performing work for Gwinnett County Schools",
      description:
        "Etrenzik LLC began performing LED lighting product and services work for Gwinnett County Schools (GCS), GA. Work coordinated through / billed via Inergy Solutions, LLC. GCS business averaged $400K–$600K annually.",
      participants: ["Troy Miller", "Etrenzik LLC", "Inergy Solutions, LLC", "Gwinnett County Schools"],
      status: "alleged",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2024-06-01"),
      title: "Troy returns to 1099 status (mid-2024)",
      description:
        "Troy Miller returned to 1099 contractor status from Insperity PEO employment. Despite 1099 classification, Sami Ali continued operating as if Troy was an employee — providing IS credit card for laptops, travel, vehicle maintenance, gas, etc.",
      participants: ["Troy Miller", "Sami Ali"],
      status: "alleged",
      jurisdictions: ["GA", "AL"],
    },
    {
      date: new Date("2024-12-31"),
      title: "2024 tax year — improper 1099 issued (~$16K loan + ~$20K unexplained)",
      description:
        "IS issued an improper 2024 1099 tax form classifying approximately $16K of repaid loan funds as income, plus approximately $20K in unexplained expenses, creating a 2024 tax liability now requiring IRS correction.",
      participants: ["Sami Ali", "Troy Miller"],
      status: "alleged",
      jurisdictions: ["GA", "AL", "FEDERAL"],
    },
    {
      date: new Date("2025-06-01"),
      title: "Sami Ali email: Atlanta office closure / termination",
      description:
        'Email from Sami Ali regarding Atlanta office closure, stating "submit invoices so books can be closed and amounts due paid" — acknowledging outstanding GCS projects he was willing to fund and finish. IS also failed to pay last 2 weeks of 1099 pay (~$3,270).',
      participants: ["Sami Ali", "Troy Miller"],
      status: "confirmed",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2025-06-02"),
      title: "Troy works with GCS to set up Etrenzik as authorized vendor",
      description:
        "Following Sami Ali's direction, Troy Miller worked with GCS to set up Etrenzik as an authorized vendor. Several POs had been issued to IS for work not on Ali's stated list. Troy attempted to get POs transferred to Etrenzik per Ali's direction, but GCS end-of-year and set-aside classification made transfers difficult.",
      participants: ["Troy Miller", "Gwinnett County Schools"],
      status: "alleged",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2025-06-15"),
      title: "Troy continues 2 of 5-6 open POs, pays all product/labor as Etrenzik",
      description:
        "Troy Miller decided to continue installation on 2 POs (of 5 or 6 open) outside of Ali's stated jobs, paying for all product and labor as Etrenzik, anticipating POs would be changed to Etrenzik or Ali would accept funds on Etrenzik's behalf and reimburse since IS had nothing to do with the product purchase or labor installation.",
      participants: ["Troy Miller", "Etrenzik LLC", "Gwinnett County Schools"],
      status: "alleged",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2025-07-01"),
      title: "Sami Ali/lawyer contacts GCS — defamation, negates closure",
      description:
        "On or about July 1, Sami Ali and legal representation reached out to GCS and negated any intent to close the GA office. They went as far as to accuse Troy Miller of stealing and misrepresenting the closing of GA operations to GCS. This constitutes defamation/slander per se (accusation of a crime) and tortious interference with Etrenzik's business relationship with GCS.",
      participants: ["Sami Ali", "Unknown attorney", "Gwinnett County Schools staff"],
      status: "alleged",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2025-07-02"),
      title: "GCS cancels all Etrenzik POs + $4,000 check; business destroyed",
      description:
        "As a result of Sami Ali's actions, GCS immediately stopped business with Etrenzik and Troy Miller: cancellation of all open POs, a $4,000 canceled check payment from GCS to Etrenzik for product sold, and loss of at least $750K–$1M in future 12-month revenue.",
      participants: ["Gwinnett County Schools", "Etrenzik LLC"],
      status: "alleged",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2025-08-01"),
      title: "INV-1268636 ($37,725) sent to Sami Ali / IS",
      description:
        "Invoice INV-1268636 for $37,725.00 sent to Sami Ali / Inergy Solutions for product and labor Etrenzik paid for on GCS POs.",
      participants: ["Troy Miller", "Sami Ali"],
      status: "confirmed",
      jurisdictions: ["GA"],
    },
    {
      date: new Date("2025-08-01"),
      title: "INV-1268637 ($16,860.99) sent to Sami Ali / IS",
      description:
        "Invoice INV-1268637 for $16,860.99 sent to Sami Ali / Inergy Solutions for product and labor Etrenzik paid for on GCS POs.",
      participants: ["Troy Miller", "Sami Ali"],
      status: "confirmed",
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
      invoiceNumber: "INV-1268636",
      issuer: "Etrenzik LLC",
      recipient: "Inergy Solutions, LLC",
      amount: 37725,
      issueDate: new Date("2025-08-01"),
      relatedProject: "Gwinnett County Schools — PO product + labor",
      paymentStatus: "unpaid",
      metadata: {
        note: "Product and labor paid by Etrenzik for GCS POs. Sent to Sami Ali / IS for reimbursement.",
        evidenceStatus: "confirmed",
      },
    },
  });

  await prisma.invoice.create({
    data: {
      caseId: CASE_ID,
      invoiceNumber: "INV-1268637",
      issuer: "Etrenzik LLC",
      recipient: "Inergy Solutions, LLC",
      amount: 16860.99,
      issueDate: new Date("2025-08-01"),
      relatedProject: "Gwinnett County Schools — PO product + labor",
      paymentStatus: "unpaid",
      metadata: {
        note: "Product and labor paid by Etrenzik for GCS POs. Sent to Sami Ali / IS for reimbursement.",
        evidenceStatus: "confirmed",
      },
    },
  });

  await prisma.invoice.create({
    data: {
      caseId: CASE_ID,
      invoiceNumber: "UNPAID-SPLIT-AGG",
      issuer: "Etrenzik LLC",
      recipient: "Inergy Solutions, LLC",
      amount: 0,
      issueDate: new Date("2025-06-01"),
      relatedProject: "Revenue split — all GCS work",
      paymentStatus: "unpaid",
      metadata: {
        note: "Aggregate unpaid revenue split. Total unknown — IS refuses to provide accounting despite repeated requests. Amount based on ~70/30 split of all GCS revenue.",
        evidenceStatus: "alleged",
      },
    },
  });

  await prisma.invoice.create({
    data: {
      caseId: CASE_ID,
      invoiceNumber: "FINAL-1099-PAY",
      issuer: "Etrenzik LLC",
      recipient: "Inergy Solutions, LLC",
      amount: 3270,
      issueDate: new Date("2025-06-01"),
      relatedProject: "Final 2 weeks 1099 pay",
      paymentStatus: "unpaid",
      metadata: {
        note: "Last 2 weeks of 1099 pay not paid after termination on 6/1/2025.",
        evidenceStatus: "alleged",
      },
    },
  });

  // ── Loans ──
  await prisma.loan.create({
    data: {
      caseId: CASE_ID,
      borrower: "Troy Miller / Etrenzik LLC",
      lender: "Inergy Solutions, LLC / Sami Ali",
      amount: 16000,
      date: new Date("2024-01-01"),
      repaid: true,
      repaymentDate: new Date("2024-12-31"),
      repaymentEvidence: [],
      notes:
        "Troy alleges this was a loan that was repaid, not revenue. IS issued 2024 1099 classifying it as ~$16K income. Loan documentation and repayment evidence needed.",
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
      reportedBy: "Inergy Solutions, LLC",
      reportedTo: "Troy Miller / Etrenzik LLC",
      repaymentEvidence: [],
      notes:
        "Improper 2024 1099: ~$16K classifying repaid loan funds as income. Creating tax liability requiring IRS correction. TAX COUNSEL REVIEW REQUIRED.",
    },
  });

  await prisma.taxRecord.create({
    data: {
      caseId: CASE_ID,
      taxYear: 2024,
      formType: "1099",
      amount: 20000,
      classification: "disputed",
      reportedBy: "Inergy Solutions, LLC",
      reportedTo: "Troy Miller / Etrenzik LLC",
      repaymentEvidence: [],
      notes:
        "Approximately $20K in unexplained expenses on 2024 1099. IS has never provided accounting detail. TAX COUNSEL REVIEW REQUIRED.",
    },
  });

  await prisma.taxRecord.create({
    data: {
      caseId: CASE_ID,
      taxYear: 2023,
      formType: "1099",
      amount: 85000,
      classification: "disputed",
      reportedBy: "Inergy Solutions, LLC",
      reportedTo: "Troy Miller / Etrenzik LLC",
      repaymentEvidence: [],
      notes:
        "~$85K in charged-back expenses on 2023 1099. Multiple requests for detail and accounting have been made — IS has never provided the detail. TAX COUNSEL REVIEW REQUIRED.",
    },
  });

  // ── Accounting Requests ──
  await prisma.accountingRequest.create({
    data: {
      caseId: CASE_ID,
      requestedBy: "Troy Miller / Etrenzik LLC",
      requestedFrom: "Sami Ali / Inergy Solutions, LLC",
      requestType: "pnl",
      date: new Date("2025-01-01"),
      response: "not_provided",
      notes:
        "Repeated requests for P&L statements, revenue split accounting, detail of ~$85K 2023 chargebacks, and detail of ~$20K unexplained 2024 1099 expenses. Zero response from Sami Ali or IS to date.",
    },
  });

  // ── Allegations ──
  const allegations = [
    {
      claim: "Breach of Contract — Non-payment of revenue split",
      description:
        "IS failed to pay Etrenzik its agreed share (~70%) of revenue from GCS work and $85K salary. Total owed unknown — IS refuses to provide accounting despite repeated requests.",
      evidenceStatus: "alleged",
      missingProof: [
        "Written agreement for 70/30 split + $85K salary",
        "IS accounting records showing all GCS revenue",
        "Gwinnett payment records to IS",
      ],
      jurisdictions: ["GA", "AL"],
    },
    {
      claim: "Non-payment of final 1099 pay (~$3,270)",
      description:
        "IS failed to pay last 2 weeks of 1099 pay (~$3,270) after terminating the arrangement via email on 6/1/2025.",
      evidenceStatus: "alleged",
      missingProof: [
        "Pay records / schedule",
        "Termination email (confirmed)",
      ],
      jurisdictions: ["GA", "AL"],
    },
    {
      claim: "Improper 1099 classification — loan as income (~$16K)",
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
      claim: "Improper 1099 — unexplained expenses (~$20K in 2024, ~$85K in 2023)",
      description:
        "IS included approximately $20K in unexplained expenses on 2024 1099 and approximately $85K on 2023 1099. Multiple requests for detail have been ignored.",
      evidenceStatus: "alleged",
      missingProof: [
        "Detail and documentation of all 1099 charges",
        "Written requests for detail",
        "IS accounting records",
      ],
      jurisdictions: ["GA", "AL", "FEDERAL"],
    },
    {
      claim: "Failure to produce accounting records",
      description:
        "Sami Ali / IS failed to produce P&L statements, revenue split records, or detail of 1099 chargebacks despite repeated requests.",
      evidenceStatus: "alleged",
      missingProof: [
        "Written requests for accounting (emails, texts)",
        "Evidence of business arrangement agreement",
      ],
      jurisdictions: ["GA", "AL"],
    },
    {
      claim: "Defamation / Slander per se at GCS",
      description:
        "On or about July 1, 2025, Sami Ali and legal representation contacted GCS, negated any intent to close the GA office, and accused Troy Miller of stealing and misrepresenting the closing of GA operations to GCS. Accusation of a crime constitutes slander per se.",
      evidenceStatus: "alleged",
      missingProof: [
        "GCS witness statements",
        "Exact words spoken by Sami Ali / his attorney",
        "Evidence of resulting business harm",
      ],
      jurisdictions: ["GA"],
    },
    {
      claim: "Tortious interference with GCS business relationship",
      description:
        "Sami Ali's actions at GCS led to immediate cessation of business with Etrenzik: cancellation of all open POs, a $4,000 canceled check, and loss of $750K–$1M in future 12-month revenue. GCS had been averaging $400K–$600K annually.",
      evidenceStatus: "alleged",
      missingProof: [
        "GCS witness statements",
        "GCS PO records (open + canceled)",
        "GCS canceled check documentation",
        "Historical GCS revenue to quantify damages",
      ],
      jurisdictions: ["GA"],
    },
    {
      claim: "Conversion — LED products (~$50K warehouse + ~$20K sold inventory)",
      description:
        "Etrenzik moved approximately $50K of LED products into IS warehouse in Huntsville, AL — never compensated. Additionally, the GA location sold approximately $20K of existing Etrenzik LED lighting with zero compensation for product cost.",
      evidenceStatus: "alleged",
      missingProof: [
        "Inventory records of LED products transferred",
        "Documentation of products stored at IS warehouse",
        "Sales records of GA LED inventory",
      ],
      jurisdictions: ["GA", "AL"],
    },
    {
      claim: "Unreimbursed PO invoices ($54,585.99)",
      description:
        "Etrenzik paid for all product and labor on 2 GCS POs: INV-1268636 ($37,725) and INV-1268637 ($16,860.99). Sent to IS per direction of Sami Ali — IS had no involvement in product purchase or labor. Invoices remain unpaid.",
      evidenceStatus: "confirmed",
      missingProof: [
        "Receipts for product purchased",
        "Labor payment records",
      ],
      jurisdictions: ["GA"],
    },
    {
      claim: "Employee misclassification (1099 vs. employee)",
      description:
        "Despite 1099 classification, IS operated as if Troy was an employee — providing IS credit card for laptops, travel, vehicle maintenance, gas, etc. Troy was also employed through Insperity PEO for ~11 months.",
      evidenceStatus: "alleged",
      missingProof: [
        "IS credit card statements showing Troy's authorized expenses",
        "Insperity employment records",
        "Evidence of IS control over manner of work",
      ],
      jurisdictions: ["GA", "AL", "FEDERAL"],
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
      description: "Unpaid revenue split from GCS work — total unknown, IS refuses to provide accounting",
      basis: "~70/30 profit split + $85K salary agreement. IS refuses to provide records showing total GCS revenue.",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "direct",
      description: "Final 2 weeks of 1099 pay",
      amount: 3270,
      basis: "Unpaid after termination on 6/1/2025",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "direct",
      description: "Unreimbursed GCS PO invoices — INV-1268636 + INV-1268637",
      amount: 54585.99,
      basis: "Etrenzik paid all product and labor; invoices sent to IS 8/1/2025. IS had no involvement in purchase/labor.",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "direct",
      description: "LED products moved to IS warehouse — never compensated",
      amount: 50000,
      basis: "~$50K LED products transferred to IS Huntsville warehouse at onset of relationship",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "direct",
      description: "Existing Etrenzik LED lighting sold from GA location w/o compensation",
      amount: 20000,
      basis: "~$20K of existing Etrenzik LED inventory sold with zero compensation for product cost",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "direct",
      description: "GCS canceled check",
      amount: 4000,
      basis: "$4,000 check from GCS to Etrenzik for product sold — canceled as result of Sami Ali's interference",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "declaratory",
      description: "Correction of 2024 1099 — ~$16K loan reclassification + ~$20K unexplained expenses",
      amount: 36000,
      basis: "Improper 1099: ~$16K repaid loan classified as income + ~$20K unexplained expenses. Requires IRS correction.",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "declaratory",
      description: "Accounting for ~$85K 2023 1099 chargebacks — detail never provided",
      amount: 85000,
      basis: "~$85K charged back to Troy in 2023 1099 expenses. Multiple requests for detail ignored.",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "consequential",
      description: "Defamation/slander per se — lost GCS annual revenue ($400K–$600K/yr)",
      basis: "Sami Ali accused Troy of stealing at GCS → immediate loss of all GCS business averaging $400K–$600K annually",
      supportLevel: "potential_requires_proof",
      sourceCitations: [],
    },
  });

  await prisma.damage.create({
    data: {
      caseId: CASE_ID,
      category: "consequential",
      description: "Tortious interference — future GCS revenue ($750K–$1M over 12 months)",
      basis: "All open POs canceled, business relationship destroyed. Projected 12-month loss: $750K–$1M.",
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
