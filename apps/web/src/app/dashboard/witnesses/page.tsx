/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Witnesses Page
 */

const KNOWN_PERSONS = [
  {
    id: "person-001",
    name: "Troy Miller",
    role: "Plaintiff / Principal — Etrenzik LLC (CIO/COO of IS arrangement)",
    relevance: "Principal of Etrenzik. Entered ~70/30 profit split + $85K salary arrangement with IS on 2/1/2022. Performed LED lighting work for GCS. Alleges non-payment, defamation, tortious interference, conversion, improper 1099.",
    type: "party",
  },
  {
    id: "person-002",
    name: "Sami Ali",
    role: "Counterparty / Principal — Inergy Solutions, LLC",
    relevance: "Principal of IS. Sent June 1, 2025 closure email. On/about July 1, 2025 contacted GCS with lawyer — accused Troy of stealing, negated closure — destroying Etrenzik's GCS business. Refuses to provide accounting.",
    type: "party",
  },
  {
    id: "person-003",
    name: "Unknown Attorney",
    role: "Attorney accompanying Sami Ali at GCS",
    relevance: "Present when Sami Ali contacted GCS on/about July 1, 2025. Negated GA office closure. Identity unknown.",
    type: "witness",
  },
  {
    id: "person-004",
    name: "Gwinnett County Schools Staff",
    role: "Client / Third-party witness(es)",
    relevance: "Witnessed Sami Ali/lawyer contact. Can testify to: accusations made, PO cancellations, $4K check cancellation, business relationship termination.",
    type: "witness",
  },
  {
    id: "person-005",
    name: "Insperity Representative",
    role: "PEO employer records",
    relevance: "Troy was employed through Insperity as PEO for IS for ~11 months. Records relevant to employment vs. 1099 misclassification claim.",
    type: "witness",
  },
];

export default function WitnessesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-6">
        <p className="text-amber-800 text-sm font-medium">
          ⚠️ Witness information is preliminary. Attorney should verify identities and assess deposition priorities.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Witnesses & Key Persons</h2>

      <div className="space-y-4">
        {KNOWN_PERSONS.map((person) => (
          <div key={person.id} className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold">{person.name}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  person.type === "party" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                {person.type}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{person.role}</p>
            <p className="text-sm text-gray-600">{person.relevance}</p>
          </div>
        ))}
      </div>

      {/* Deposition Questions */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Deposition Question Bank</h3>
        <p className="text-xs text-red-500 mb-4">ATTORNEY REVIEW REQUIRED — These are starter questions only.</p>
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold mb-2">For Sami Ali</h4>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
            <li>Describe the business arrangement entered into with Etrenzik LLC and Troy Miller on or about February 1, 2022.</li>
            <li>What were the agreed terms for profit split, salary, and expense coverage?</li>
            <li>What is the total revenue IS received from GCS for work performed by Etrenzik / Troy Miller?</li>
            <li>How much of that revenue was paid to Etrenzik / Troy Miller per the agreed split?</li>
            <li>Why was the last 2 weeks of 1099 pay (~$3,270) not paid after termination?</li>
            <li>Please explain the June 1, 2025 email regarding Atlanta office closure and the statement to "submit invoices so books can be closed and amounts due paid."</li>
            <li>On or about July 1, 2025, did you or your attorney contact GCS regarding Troy Miller or Etrenzik?</li>
            <li>Did you accuse Troy Miller of stealing from Inergy Solutions? What was the factual basis?</li>
            <li>Did you negate any intent to close the GA office after your June 1 email stated otherwise?</li>
            <li>Explain INV-1268636 ($37,725) and INV-1268637 ($16,860.99) — why have these not been paid?</li>
            <li>Explain the basis for the 2024 1099 classifying approximately $16,000 of repaid loan funds as income.</li>
            <li>Explain the approximately $20,000 in unexplained expenses on the 2024 1099.</li>
            <li>Explain the approximately $85,000 charged back to Troy Miller on the 2023 1099. Provide the detail and accounting.</li>
            <li>What happened to the approximately $50,000 in LED products Etrenzik moved into the IS Huntsville warehouse?</li>
            <li>Why was Etrenzik not compensated for the approximately $20,000 of existing LED inventory sold from the GA location?</li>
            <li>Has Etrenzik or Troy Miller requested P&L statements or accounting records? Have you provided them?</li>
            <li>Describe Troy Miller's work arrangement — was he treated as an employee or independent contractor? What expenses did IS pay via credit card?</li>
            <li>What was the relationship with Insperity? Why was Troy transitioned to/from PEO employee status?</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
