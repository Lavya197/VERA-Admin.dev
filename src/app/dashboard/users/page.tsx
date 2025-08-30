"use client";
import { useEffect, useState } from "react";

type User = {
  id: string;
  full_name?: string;
  email: string;
  wallet_pubkey?: string;
  status?: string;
  created_at?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/buyers");
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to load users"); }
      else setUsers(data);
    } catch (err) {
      setError("Server error");
    } finally { setLoading(false); }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Buyers / Users</h2>
        <a href="/dashboard/users/new" className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">Create User</a>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="space-y-3">
        {users.map(u => (
          <div key={u.id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{u.full_name ?? u.email}</div>
              <div className="text-sm text-gray-600">{u.email}</div>
            </div>
            <div className="text-sm text-gray-700">{u.status}</div>
          </div>
        ))}
        {!loading && users.length === 0 && <p className="text-gray-500">No users yet.</p>}
      </div>
    </div>
  );
}
