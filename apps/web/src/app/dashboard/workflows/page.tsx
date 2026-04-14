/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Workflow Monitor Page
 */
export default function WorkflowsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Workflow Monitor</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workflow definitions */}
        <div>
          <h3 className="font-semibold mb-3">Available Workflows</h3>
          <div className="space-y-2">
            {[
              { name: "Evidence Intake", status: "ready" },
              { name: "Timeline Reconstruction", status: "ready" },
              { name: "Invoice Reconciliation", status: "ready" },
              { name: "Partnership Accounting Dispute", status: "ready" },
              { name: "1099 Classification Dispute", status: "ready" },
              { name: "Business Interference Memo", status: "stub" },
              { name: "Complaint Draft", status: "stub" },
              { name: "Demand Letter Draft", status: "stub" },
              { name: "Exhibit Binder", status: "stub" },
            ].map((wf) => (
              <div key={wf.name} className="bg-white border rounded-lg p-3 flex justify-between items-center">
                <span className="text-sm">{wf.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    wf.status === "ready" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {wf.status === "ready" ? "Ready" : "Phase 2-3"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent runs */}
        <div>
          <h3 className="font-semibold mb-3">Recent Workflow Runs</h3>
          <div className="bg-white border rounded-lg p-8 text-center text-gray-400">
            <p>No workflow runs yet</p>
            <p className="text-sm mt-1">Trigger a workflow from the available list</p>
          </div>
        </div>
      </div>
    </div>
  );
}
