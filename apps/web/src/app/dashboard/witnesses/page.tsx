/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Witnesses Page
 */

const KNOWN_PERSONS = [
  {
    id: "person-001",
    name: "Troy Miller",
    role: "Plaintiff / Principal — Etrenzik LLC",
    relevance: "Principal of Etrenzik. Performed work for Gwinnett County Schools. Alleges non-payment and business interference.",
    type: "party",
  },
  {
    id: "person-002",
    name: "Sami Ali",
    role: "Counterparty / Principal — Inergy Solutions LLC",
    relevance: "Principal of Inergy Solutions. Sent June 1, 2025 closure email. Alleged to have appeared at Gwinnett with attorney.",
    type: "party",
  },
  {
    id: "person-003",
    name: "Unknown Attorney",
    role: "Attorney accompanying Sami Ali",
    relevance: "Present at alleged July 1, 2025 Gwinnett County Schools meeting. Identity unknown.",
    type: "witness",
  },
  {
    id: "person-004",
    name: "Gwinnett County Schools Staff",
    role: "Client / Third-party witness(es)",
    relevance: "Present during alleged July 1 meeting. Can corroborate or dispute allegations of theft accusation.",
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
            <li>Describe the revenue allocation arrangement between Inergy Solutions and Etrenzik LLC.</li>
            <li>What payments did Gwinnett County Schools make to Inergy Solutions for work performed by Etrenzik?</li>
            <li>What amounts were paid to Etrenzik from those Gwinnett payments?</li>
            <li>Please explain the June 1, 2025 email regarding closure of the Alpharetta office.</li>
            <li>Did you appear at Gwinnett County Schools on or around July 1, 2025? Who was with you?</li>
            <li>What statements did you make at that meeting regarding Troy Miller or Etrenzik?</li>
            <li>Explain the basis for the 2024 1099 issued to Troy Miller / Etrenzik for approximately $16,000.</li>
            <li>Were P&L statements produced in response to requests from Etrenzik? If so, produce them.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
