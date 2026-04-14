/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Evidence Upload & Management Page
 */
"use client";

import { useState } from "react";

interface DocumentItem {
  id: string;
  filename: string;
  mimeType: string;
  status: string;
  uploadedAt: string;
}

export default function EvidencePage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/documents/upload?caseId=seed-case-001`,
        { method: "POST", body: formData }
      );

      if (res.ok) {
        const { data } = await res.json();
        setDocuments((prev) => [data, ...prev]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-6">
        <p className="text-amber-800 text-sm font-medium">
          ⚠️ Uploaded documents are processed for case preparation only. Chain of provenance is maintained.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Evidence & Documents</h2>
        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          {uploading ? "Uploading..." : "Upload Document"}
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept=".pdf,.docx,.xlsx,.eml,.msg,.csv,.txt,.png,.jpg,.jpeg"
            disabled={uploading}
          />
        </label>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Supported: PDF, DOCX, XLSX, EML, MSG, CSV, TXT, PNG, JPG
      </div>

      {documents.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center text-gray-400">
          <p className="text-lg mb-2">No documents uploaded yet</p>
          <p className="text-sm">Upload evidence files to begin case preparation</p>
        </div>
      ) : (
        <table className="w-full bg-white border rounded-lg">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="p-3">Filename</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{doc.filename}</td>
                <td className="p-3 text-sm text-gray-500">{doc.mimeType}</td>
                <td className="p-3">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {doc.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-500">{doc.uploadedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
