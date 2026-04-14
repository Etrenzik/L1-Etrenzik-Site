import type { WorkflowDefinition } from "@l1-etrenzik/core";

/**
 * Invoice Reconciliation Workflow
 * Steps: gather invoices → gather payments → reconcile → compute balance → flag discrepancies
 */
export const invoiceReconciliationWorkflow: WorkflowDefinition = {
  id: "invoice-reconciliation",
  name: "Invoice/Payment Reconciliation",
  description: "Compare invoices issued, payments received, expected allocations, and compute unpaid balances",
  version: "1.0.0",
  steps: [
    {
      id: "gather-invoices",
      name: "Gather All Invoices",
      onSuccess: "gather-payments",
    },
    {
      id: "gather-payments",
      name: "Gather All Payments",
      onSuccess: "reconcile",
    },
    {
      id: "reconcile",
      name: "Reconcile Invoices and Payments",
      toolId: "accounting_reconcile",
      onSuccess: "compute-damages",
    },
    {
      id: "compute-damages",
      name: "Compute Damage Ranges",
      onSuccess: "flag-discrepancies",
    },
    {
      id: "flag-discrepancies",
      name: "Flag Discrepancies",
      requiresReview: true,
    },
  ],
};
