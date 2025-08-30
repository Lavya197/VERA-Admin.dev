"use client";
import { useEffect, useState } from "react";

type Company = {
  id: string;
  name: string;
  email?: string;
  wallet_pubkey?: string;
  status?: string;
  description?: string;
  created_at?: string;
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/companies");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load companies");
      } else {
        setCompanies(data);
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Companies</h2>
        <a href="/dashboard/companies/new" className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Create Company</a>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="space-y-3">
        {companies.map((c) => (
          <div key={c.id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-600">{c.email}</div>
                <div className="text-xs text-gray-500">{c.description}</div>
              </div>
              <div className="text-sm text-gray-700">{c.status}</div>
            </div>
          </div>
        ))}
        {!loading && companies.length === 0 && <p className="text-gray-500">No companies yet.</p>}
      </div>
    </div>
  );
}
