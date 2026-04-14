/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Draft Builder Page
 */
export default function DraftsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-300 rounded-lg p-3 mb-6">
        <p className="text-red-800 text-sm font-bold">
          🔒 ATTORNEY REVIEW REQUIRED — All generated drafts are work product only. Do not file without attorney review.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Draft Builder</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Complaint Draft */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Complaint Draft</h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate a complaint skeleton with parties, jurisdiction placeholders, factual background, candidate counts,
            damages summary, and prayer for relief.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
            Generate Complaint Draft
          </button>
          <p className="text-xs text-gray-400 mt-2">
            TODO: Phase 3 — connects to complaint drafter workflow
          </p>
        </div>

        {/* Demand Letter */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Demand Letter Draft</h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate a demand letter with fact summary, amount demanded, basis for claim, and consequences of
            non-payment placeholder.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
            Generate Demand Letter
          </button>
          <p className="text-xs text-gray-400 mt-2">
            TODO: Phase 3 — connects to demand letter workflow
          </p>
        </div>

        {/* Exhibit Binder */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Exhibit Binder</h3>
          <p className="text-sm text-gray-600 mb-4">
            Compile and number exhibits with index page, source citations, and evidence status tags.
          </p>
          <button className="bg-gray-400 text-white px-4 py-2 rounded text-sm cursor-not-allowed" disabled>
            Coming in Phase 3
          </button>
        </div>

        {/* Discovery Requests */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Discovery Requests</h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate interrogatories, document requests, and deposition question starters.
          </p>
          <button className="bg-gray-400 text-white px-4 py-2 rounded text-sm cursor-not-allowed" disabled>
            Coming in Phase 3
          </button>
        </div>
      </div>
    </div>
  );
}
