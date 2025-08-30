"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email, password, wallet_pubkey: wallet }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to create user"); return; }
      router.push("/dashboard/users");
    } catch (err) {
      setError("Server error");
    }
  }

  return (
    <div className="p-6 max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Create User / Buyer</h2>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <form onSubmit={handleCreate} className="space-y-3">
        <div>
          <label className="block text-sm">Full name</label>
          <input value={fullName} onChange={(e)=>setFullName(e.target.value)} className="w-full p-2 border rounded"/>
        </div>

        <div>
          <label className="block text-sm">Email</label>
          <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded"/>
        </div>

        <div>
          <label className="block text-sm">Password (PoC)</label>
          <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border rounded"/>
        </div>

        <div>
          <label className="block text-sm">Wallet Public Key (optional)</label>
          <input value={wallet} onChange={(e)=>setWallet(e.target.value)} className="w-full p-2 border rounded"/>
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}
