// src/app/api/companies/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("id, name, email, wallet_pubkey, status, description, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/companies error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/companies exception:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, wallet_pubkey, description } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "name, email and password are required" }, { status: 400 });
    }

    const insertObj = {
      name,
      email,
      password,
      wallet_pubkey: wallet_pubkey ?? null,
      description: description ?? null,
    };

    const { data, error } = await supabase
      .from("companies")
      .insert([insertObj])
      .select()
      .single();

    if (error) {
      console.error("POST /api/companies error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("POST /api/companies exception:", err);
    return NextResponse.json({ error: "Failed to create company" }, { status: 500 });
  }
}
