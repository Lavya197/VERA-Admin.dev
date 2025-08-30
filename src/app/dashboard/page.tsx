"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="space-y-4">
        <Link href="/dashboard/companies" className="text-blue-500 hover:underline">
          Manage Companies
        </Link>
        <br />
        <Link href="/dashboard/companies/new" className="text-blue-500 hover:underline">
          Add New Company
        </Link>
        <br />
        <Link href="/dashboard/users" className="text-blue-500 hover:underline">
          Manage Users
        </Link>
        <br />
        <Link href="/dashboard/users/new" className="text-blue-500 hover:underline">
          Add New User
        </Link>
      </div>
    </div>
  );
}
